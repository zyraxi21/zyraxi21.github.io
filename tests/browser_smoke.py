"""Exercise the built site in Chromium, including Jekyll's extensionless URLs."""
import argparse
import json
import re
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
from urllib.parse import unquote, urlsplit, urlencode

from playwright.sync_api import expect, sync_playwright


def contrast_ratio(foreground, background):
    def luminance(color):
        channels = [float(value) / 255 for value in re.findall(r'[\d.]+', color)[:3]]
        linear = [value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4 for value in channels]
        return sum(value * weight for value, weight in zip(linear, [0.2126, 0.7152, 0.0722]))
    values = sorted([luminance(foreground), luminance(background)])
    return (values[1] + 0.05) / (values[0] + 0.05)


def check_code_alignment(page):
    metrics = page.locator('.code-block-wrapper:not(.mermaid-block-wrapper)').evaluate_all('''(blocks) => blocks.map((block) => {
      const code = block.querySelector('pre code');
      const gutter = block.querySelector('.code-lines');
      const codeRange = document.createRange(); codeRange.selectNodeContents(code);
      const numberRange = document.createRange(); numberRange.selectNodeContents(gutter.firstElementChild);
      return {
        topDifference: Math.abs(codeRange.getClientRects()[0].top - numberRange.getBoundingClientRect().top),
        codeLine: parseFloat(getComputedStyle(code).lineHeight),
        numberLine: parseFloat(getComputedStyle(gutter).lineHeight),
        codeFont: getComputedStyle(code).fontSize,
        numberFont: getComputedStyle(gutter).fontSize,
      };
    })''')
    assert metrics
    for metric in metrics:
        assert metric['topDifference'] <= 1.5 and abs(metric['codeLine'] - metric['numberLine']) < 0.1, metric
        assert metric['codeFont'] == metric['numberFont'], metric


def check_glass(element, max_alpha=0.6):
    style = element.evaluate('(element) => ({background: getComputedStyle(element).backgroundColor, blur: getComputedStyle(element).backdropFilter})')
    rgba = [float(value) for value in re.findall(r'[\d.]+', style['background'])]
    assert len(rgba) == 4 and 0 < rgba[3] <= max_alpha, style
    blur = re.search(r'blur\(([\d.]+)px\)', style['blur'])
    assert blur and float(blur.group(1)) >= 24, style


def check_diagram_labels(page):
    # 核对实际可见文字，不能仅用 SVG 存在和没有报错判断渲染成功。
    labels = page.locator('.mermaid-rendered svg .node text').evaluate_all('''(elements) => elements.map(element => {
      const bounds = element.getBoundingClientRect();
      const viewport = element.ownerSVGElement.getBoundingClientRect();
      return {text: element.textContent.trim(), height: bounds.height,
        clipped: bounds.left < viewport.left - 1 || bounds.right > viewport.right + 1
          || bounds.top < viewport.top - 1 || bounds.bottom > viewport.bottom + 1};
    })''')
    assert labels and all(label['text'] and label['height'] >= 7 and not label['clipped'] for label in labels), labels


def category_colors(element):
    return element.evaluate('''async (element) => {
      await Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d');
      const rgb = (color) => {
        context.clearRect(0, 0, 1, 1); context.fillStyle = color; context.fillRect(0, 0, 1, 1);
        return `rgb(${[...context.getImageData(0, 0, 1, 1).data].slice(0, 3).join(', ')})`;
      };
      const style = getComputedStyle(element);
      return {
        background: rgb(style.backgroundColor),
        themeBackground: rgb(style.getPropertyValue('--brand-primary')),
        foreground: rgb(getComputedStyle(element.querySelector('a')).color),
        badgeBackground: rgb(getComputedStyle(element.querySelector('.badge')).backgroundColor),
        badgeForeground: rgb(getComputedStyle(element.querySelector('.badge')).color),
      };
    }''')


def open_panel_with_motion(page, trigger, panel):
    motion = page.evaluate('''async ({trigger, panel}) => {
      const dialog = document.querySelector(panel);
      document.querySelector(trigger).click();
      const start = dialog.getBoundingClientRect();
      await new Promise(requestAnimationFrame);
      const animations = dialog.getAnimations();
      const durations = animations.map((animation) => animation.effect.getTiming().duration);
      await Promise.allSettled(animations.map((animation) => animation.finished));
      const end = dialog.getBoundingClientRect();
      return {distance: Math.hypot(start.x - end.x, start.y - end.y), durations};
    }''', {'trigger': trigger, 'panel': panel})
    assert motion['durations'] and max(motion['durations']) >= 150, motion
    assert motion['distance'] >= 8, motion
    assert page.locator(panel).evaluate('(dialog) => dialog.matches(":modal")')


def check_heading_levels(page, post_address, screenshots):
    # Add headings before the production module runs; leave the source article unchanged.
    headings = ''.join(
        f'<h{level} id="smoke-heading-{level}">{level} 级标题</h{level}>'
        for level in range(1, 7)
    )
    fixture = f'<section class="markdown-body" id="smoke-heading-levels">{headings}</section>'

    def add_headings(route):
        response = route.fetch()
        html = response.text()
        assert '</article>' in html
        route.fulfill(response=response, body=html.replace('</article>', fixture + '</article>', 1))

    page.route(post_address, add_headings)
    try:
        page.set_viewport_size({'width': 1440, 'height': 1000})
        page.emulate_media(color_scheme='light', reduced_motion='no-preference')
        page.goto(post_address)
        page.wait_for_load_state('networkidle')
        entries = page.locator('.post-directory li:has(a[href^="#smoke-heading-"])')
        expect(entries).to_have_count(6)

        for width in [1440, 320]:
            page.set_viewport_size({'width': width, 'height': 900})
            if width == 320:
                page.locator('.post-directory-toggle').click()
                expect(page.locator('#post-directory-panel')).to_be_visible()
            metrics = entries.evaluate_all('''(items) => items.map((item) => {
              const link = item.querySelector('a');
              const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
              const style = getComputedStyle(item);
              return {tag: heading.tagName, id: heading.id, text: link.textContent,
                padding: parseFloat(style.paddingLeft), border: parseFloat(style.borderLeftWidth)};
            })''')
            assert [item['tag'] for item in metrics] == [f'H{level}' for level in range(1, 7)], metrics
            assert [item['id'] for item in metrics] == [f'smoke-heading-{level}' for level in range(1, 7)], metrics
            assert [item['text'] for item in metrics] == [f'{level} 级标题' for level in range(1, 7)], metrics
            assert all(first['padding'] < second['padding'] for first, second in zip(metrics, metrics[1:])), metrics
            if width == 320:
                assert all(item['border'] == 0 for item in metrics), metrics
                entries.last.locator('a').hover()
                assert entries.last.evaluate('(item) => getComputedStyle(item).borderLeftWidth') == '0px'
                entries.last.scroll_into_view_if_needed()
                page.screenshot(path=str(screenshots / 'heading-levels-mobile.png'))
            else:
                page.locator('#smoke-heading-levels').scroll_into_view_if_needed()
                entries.last.scroll_into_view_if_needed()
                page.screenshot(path=str(screenshots / 'heading-levels-desktop.png'))
            entries.last.locator('a').click()
            assert urlsplit(page.url).fragment == 'smoke-heading-6'
            if width == 320:
                expect(page.locator('#post-directory-panel')).to_be_hidden()
                expect(page.locator('#smoke-heading-6')).to_be_focused()
                assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1')
    finally:
        page.unroute(post_address, add_headings)


def check_search(page, origin, baseurl, site, post_url, screenshots, requests):
    catalog = json.loads((site / 'search-index.json').read_text(encoding='utf-8'))
    assert catalog and all(item['url'].startswith(baseurl + '/') for item in catalog)
    assert all(item['type'] in ['post', 'page'] for item in catalog)
    assert not any(item['url'].endswith('/search.html') for item in catalog)
    demonstration = next(item for item in catalog if item['url'] == post_url)
    independent = next(item for item in catalog if item['type'] == 'page' and 'about' in item['url'])
    query = demonstration['title']
    index_address = origin + baseurl + '/search-index.json'
    home = origin + baseurl + '/'
    search_address = origin + baseurl + '/search'
    assert not any(urlsplit(request).path.endswith('/search-index.json') for request in requests), 'Index must load on demand'
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.emulate_media(color_scheme='light', reduced_motion='no-preference')
    page.goto(home)
    page.wait_for_load_state('networkidle')
    button = page.locator('.site-search-button')
    input_box = page.locator('#site-search-input')
    popover = page.locator('#site-search-popover')
    before = button.locator('svg').bounding_box()
    # 在同一浏览器任务中展开并采样，避免自动等待跨过短动画。
    durations = page.locator('.header-search-form').evaluate('''async (form) => {
      form.querySelector('button').click();
      await new Promise(requestAnimationFrame);
      const animations = form.getAnimations();
      const durations = animations.map((animation) => animation.effect.getTiming().duration);
      await Promise.allSettled(animations.map((animation) => animation.finished));
      return durations;
    }''')
    expect(input_box).to_be_focused()
    assert durations and max(durations) >= 150, durations
    after = button.locator('svg').bounding_box()
    assert abs(before['x'] - after['x']) <= 1 and abs(before['y'] - after['y']) <= 1, (before, after)
    assert page.locator('.header-search-form').bounding_box()['width'] > 180
    input_box.fill(query)
    expect(popover.locator('[role="option"]').first).to_be_visible()
    expect(popover.locator('.search-result-title').first).to_have_text(query)
    assert 1 <= popover.locator('[role="option"]').count() <= 5
    check_glass(popover, max_alpha=0.9)
    popover.evaluate('async (element) => { await Promise.allSettled(element.getAnimations().map((animation) => animation.finished)); }')
    page.screenshot(path=str(screenshots / 'search-preview-desktop.png'))
    input_box.press('ArrowUp')
    expect(input_box).to_have_attribute('aria-activedescendant', popover.locator('[role="option"]').last.get_attribute('id'))
    input_box.press('Escape')
    expect(popover).to_be_hidden()
    expect(button).to_be_focused()
    button.click()
    expect(popover.locator('[role="option"]').first).to_be_visible()
    input_box.press('ArrowDown')
    input_box.press('Enter')
    page.wait_for_url(lambda address: urlsplit(address).path == demonstration['url'])
    page.wait_for_load_state('networkidle')

    # Both direct clicks and an unselected Enter use the expected destination.
    page.goto(home)
    page.wait_for_load_state('networkidle')
    button.click()
    input_box.fill(query)
    popover.locator('[role="option"]').first.click()
    page.wait_for_url(lambda address: urlsplit(address).path == demonstration['url'])
    page.goto(home)
    page.wait_for_load_state('networkidle')
    button.click()
    input_box.fill(query)
    input_box.press('Enter')
    page.wait_for_url(lambda address: urlsplit(address).path == baseurl + '/search')
    page.wait_for_load_state('networkidle')
    expect(page.locator('#page-search-input')).to_have_value(query)
    expect(page.locator('.search-results-list .search-result-title').first).to_have_text(query)
    assert page.locator('.search-results-list mark').count() > 0
    page.screenshot(path=str(screenshots / 'search-results-desktop.png'))
    page.locator('#page-search-input').fill(independent['title'])
    expect(page.locator('.search-results-list a[href="' + independent['url'] + '"]')).to_be_visible()

    page.goto(home)
    page.wait_for_load_state('networkidle')
    button.click()
    input_box.fill(query)
    button.click()
    page.wait_for_url(lambda address: urlsplit(address).path == baseurl + '/search')
    expect(page.locator('#page-search-input')).to_have_value(query)

    # Empty and hostile queries remain plain text.
    page.goto(search_address)
    page.wait_for_load_state('networkidle')
    expect(page.locator('.search-empty h2')).to_have_text('输入关键词开始搜索')
    hostile = '<img src=x onerror=window.searchInjected=1>'
    page.locator('#page-search-input').fill(hostile)
    expect(page.locator('.search-empty h2')).to_contain_text(hostile)
    assert page.evaluate('window.searchInjected') is None
    assert page.locator('.search-page img').count() == 0

    # The index fetch can fail and then recover in the same expanded control.
    page.goto(home)
    page.wait_for_load_state('networkidle')
    abort_index = lambda route: route.abort()
    page.route(index_address, abort_index)
    button.click()
    input_box.fill(query)
    expect(popover.locator('.search-preview-status')).to_have_text('搜索暂时不可用，请重试')
    page.unroute(index_address, abort_index)
    popover.locator('.search-retry').click()
    expect(popover.locator('[role="option"]').first).to_be_visible()
    input_box.focus()
    input_box.dispatch_event('compositionstart')
    # fill 在 Firefox 中会结束组合；直接发送仍处于组合状态的输入事件。
    input_box.evaluate('''(input, value) => {
      input.value = value;
      input.dispatchEvent(new InputEvent('input', {bubbles: true, isComposing: true}));
    }''', query)
    expect(popover).to_be_hidden()
    input_box.dispatch_event('compositionend')
    expect(popover.locator('[role="option"]').first).to_be_visible()
    page.locator('#main-content').click(position={'x': 5, 'y': 5})
    expect(popover).to_be_hidden()

    # A deterministic fixture exercises all-results pagination and reload restoration.
    paginated = [
        {'title': '搜索分页样例 ' + str(number), 'url': demonstration['url'] + '?sample=' + str(number),
         'content': '分页正文', 'type': 'post', 'date': '', 'tags': []}
        for number in range(11)
    ]
    serve_pages = lambda route: route.fulfill(status=200, content_type='application/json', body=json.dumps(paginated))
    page.route(index_address, serve_pages)
    page.goto(search_address + '?' + urlencode({'q': '搜索分页样例'}))
    page.wait_for_load_state('networkidle')
    expect(page.locator('.search-results-list li')).to_have_count(10)
    page.locator('[data-search-next]').click()
    expect(page.locator('.search-results-list li')).to_have_count(1)
    assert 'page=2' in page.url
    page.reload()
    page.wait_for_load_state('networkidle')
    expect(page.locator('.search-results-list li')).to_have_count(1)
    expect(page.locator('.search-page-number')).to_have_text('2 / 2')
    page.locator('[data-search-previous]').click()
    expect(page.locator('.search-results-list li')).to_have_count(10)
    page.unroute(index_address, serve_pages)

    for scheme in ['light', 'dark']:
        page.emulate_media(color_scheme=scheme)
        for width in [320, 375, 390, 414, 768]:
            page.set_viewport_size({'width': width, 'height': 900})
            page.goto(home)
            page.wait_for_load_state('networkidle')
            before = button.locator('svg').bounding_box()
            button.click()
            input_box.fill(query)
            expect(popover.locator('[role="option"]').first).to_be_visible()
            for element in [page.locator('.header-search-form'), popover]:
                element.evaluate('async (element) => { await Promise.allSettled(element.getAnimations().map((animation) => animation.finished)); }')
            after = button.locator('svg').bounding_box()
            assert abs(before['x'] - after['x']) <= 1 and abs(before['y'] - after['y']) <= 1, (before, after)
            bounds = popover.bounding_box()
            assert bounds['x'] >= 0 and bounds['x'] + bounds['width'] <= width + 1, bounds
            check_glass(popover)
            assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1')
            if width == 390:
                page.screenshot(path=str(screenshots / ('search-preview-mobile-' + scheme + '.png')))
            input_box.press('Enter')
            page.wait_for_url(lambda address: urlsplit(address).path == baseurl + '/search')
            page.wait_for_load_state('networkidle')
            expect(page.locator('.search-results-list li').first).to_be_visible()
            assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1')
            if width == 390:
                page.screenshot(path=str(screenshots / ('search-results-mobile-' + scheme + '.png')))
    page.emulate_media(reduced_motion='reduce')
    button.click()
    expect(input_box).to_be_focused()
    input_box.press('Escape')
    expect(button).to_be_focused()


def check_initial_mobile_layout(browser, origin, post_url, site):
    # 暂停主模块初始化，直接检查首次绘制时的手机布局。
    context = browser.new_context(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(origin) else route.abort())
    delayed = 'await new Promise(resolve => { window.__releaseInitialLayout = resolve; });\n'
    delayed += (site / 'assets/vendor/app.js').read_text(encoding='utf-8')
    context.route('**/assets/vendor/app.js', lambda route: route.fulfill(body=delayed, content_type='application/javascript'))
    page = context.new_page()
    try:
        page.goto(origin + post_url, wait_until='commit')
        page.wait_for_function('typeof window.__releaseInitialLayout === "function"')
        page.evaluate('async () => { await document.fonts.ready; }')
        metrics = '''() => ({
          contentTop: document.querySelector('.post-content').getBoundingClientRect().top,
          searchLeft: document.querySelector('.site-search-button').getBoundingClientRect().left,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        })'''
        initial = page.evaluate(metrics)
        assert page.locator('.site-nav-toggle').is_visible()
        assert not page.locator('.site-header-actions > .site-header-nav').is_visible()
        page.evaluate('window.__releaseInitialLayout()')
        page.wait_for_load_state('networkidle')
        page.wait_for_function('document.querySelector(".post-directory-toggle:not([hidden])")')
        final = page.evaluate(metrics)
        assert not initial['overflow'] and not final['overflow'], (initial, final)
        assert abs(initial['contentTop'] - final['contentTop']) <= 1, (initial, final)
        assert abs(initial['searchLeft'] - final['searchLeft']) <= 1, (initial, final)
    finally:
        context.close()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', default='_site')
    parser.add_argument('--baseurl', default='')
    parser.add_argument('--browser-channel', default=None)
    parser.add_argument('--post', help='Path to a built demonstration post with code, math and Mermaid')
    parser.add_argument('--screenshots', default='.cache/screenshots')
    parser.add_argument('--inspect', action='store_true', help='Capture portrait layouts before running interactions')
    parser.add_argument('--search-only', action='store_true', help='Exercise search interactions and responsive layouts')
    args = parser.parse_args()
    site = Path(args.site).resolve()
    baseurl = args.baseurl.rstrip('/')
    screenshots = Path(args.screenshots)
    screenshots.mkdir(parents=True, exist_ok=True)
    # Keep testing the demonstration after new posts are added to the homepage.
    post_path = args.post or next((name for name in [
        'blog/test.html', 'blog/markdown-effect-demonstration.html'
    ] if (site / name).is_file()), None)
    if not post_path or not (site / post_path.lstrip('/')).is_file():
        parser.error('Provide --post with the path to a built code/math/Mermaid demonstration')
    post_url = baseurl + '/' + post_path.lstrip('/')

    class Handler(SimpleHTTPRequestHandler):
        def translate_path(self, path):
            route = unquote(urlsplit(path).path)
            if baseurl and route != baseurl and not route.startswith(baseurl + '/'):
                return str(site / '__not_found__')
            target = (site / route[len(baseurl):].lstrip('/')).resolve()
            if not target.is_relative_to(site):
                return str(site / '__not_found__')
            if not route.endswith('/') and not target.suffix and target.with_suffix('.html').is_file():
                target = target.with_suffix('.html')
            return str(target)

        def log_message(self, *_args):
            pass

    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(site)))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    origin = f'http://127.0.0.1:{server.server_port}'
    url = origin + baseurl + '/'
    errors = []
    missing = []
    requests = []

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, channel=args.browser_channel)
            if not args.search_only:
                check_initial_mobile_layout(browser, origin, post_url, site)
            context = browser.new_context(viewport={'width': 1440, 'height': 1000})
            context.grant_permissions(['clipboard-read', 'clipboard-write'])
            context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(origin) else route.abort())
            page = context.new_page()
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.on('request', lambda request: requests.append(request.url))
            page.on('response', lambda response: missing.append(response.url) if response.url.startswith(origin) and response.status >= 400 else None)

            page.goto(url)
            page.wait_for_load_state('networkidle')
            expect(page.locator('#main-content')).to_be_visible()
            assert page.locator('.site-header-nav-item.selected').count() == 1
            assert not any('chunks/math-' in request or 'chunks/diagrams-' in request for request in requests)
            if args.search_only:
                check_search(page, origin, baseurl, site, post_url, screenshots, requests)
                assert not errors, errors
                assert not missing, missing
                browser.close()
                print('Search browser checks passed (motion, fixed icon, lazy index, keyboard/IME, navigation, safe queries, retry, pagination, portrait layouts).')
                return
            portrait_routes = list(dict.fromkeys([
                baseurl + '/', baseurl + '/blog', post_url,
                *page.locator('.site-header-nav-item').evaluate_all('(links) => links.map((link) => link.getAttribute("href"))'),
            ]))
            for extra in ['donate.html', 'page2/index.html', 'blog/Example-No-Sidebar-Nav.html']:
                if (site / extra).is_file():
                    portrait_routes.append(baseurl + '/' + extra)
            if args.inspect:
                for width in [320, 375, 768]:
                    page.set_viewport_size({'width': width, 'height': 900})
                    for label, route in [('home', baseurl + '/'), ('blog', baseurl + '/blog'), ('post', post_url)]:
                        page.goto(origin + route)
                        page.wait_for_load_state('networkidle')
                        page.screenshot(path=str(screenshots / f'{label}-{width}.png'))
                        details = page.evaluate('''() => ({
                          viewport: innerWidth,
                          document: document.documentElement.scrollWidth,
                          headerHeight: document.querySelector('.site-header').getBoundingClientRect().height,
                          overflowing: [...document.querySelectorAll('main *')].filter((element) => {
                            const rect = element.getBoundingClientRect();
                            return rect.right > innerWidth + 1 && !element.closest('pre, table, .katex-display');
                          }).slice(0, 8).map((element) => element.tagName + '.' + element.className)
                        })''')
                        print(json.dumps({'page': label, 'width': width, **details}, ensure_ascii=True))
                browser.close()
                return
            page.screenshot(path=str(screenshots / 'home-desktop.png'), full_page=True)
            page.keyboard.press('Tab')
            expect(page.locator('.skip-link')).to_be_focused()

            page.locator('.site-header-nav-item', has_text='博客').click()
            page.wait_for_load_state('networkidle')
            filters = page.locator('#blog-categories .category-filter')
            assert filters.count() > 1
            category = filters.nth(1).get_attribute('data-category')
            filters.nth(1).locator('a').click()
            expect(filters.nth(1)).to_have_class('list-group-item category-filter active')
            for width in [1440, 375]:
                page.set_viewport_size({'width': width, 'height': 1000})
                for scheme in ['light', 'dark']:
                    page.emulate_media(color_scheme=scheme)
                    selected = filters.nth(1)
                    selected.locator('a').evaluate('(link) => link.blur()')
                    page.mouse.move(0, 0)
                    normal = category_colors(selected)
                    assert normal['background'] == normal['themeBackground'], normal
                    assert normal['foreground'] == 'rgb(255, 255, 255)', normal
                    selected.hover()
                    hovered = category_colors(selected)
                    assert hovered['background'] != normal['background'], hovered
                    channels = lambda color: [float(value) for value in re.findall(r'[\d.]+', color)[:3]]
                    changes = [abs(before - after) for before, after in zip(channels(normal['background']), channels(hovered['background']))]
                    assert 0 < max(changes) <= 20, hovered
                    assert hovered['foreground'] == normal['foreground'], hovered
                    page.mouse.move(0, 0)
                    selected.locator('a').focus()
                    focused = category_colors(selected)
                    assert focused['background'] == hovered['background'], focused
                    assert focused['foreground'] == normal['foreground'], focused
                    assert contrast_ratio(focused['badgeForeground'], focused['badgeBackground']) >= 4.5, focused
            page.set_viewport_size({'width': 1440, 'height': 1000})
            page.emulate_media(color_scheme='light')
            visible_categories = page.locator('#posts-list .posts-list-item:not([hidden])').evaluate_all('(items) => items.map((item) => JSON.parse(item.dataset.categories))')
            assert visible_categories and all(category in categories for categories in visible_categories)
            page.reload()
            page.wait_for_load_state('networkidle')
            assert page.locator('#posts-list .posts-list-item:not([hidden])').count() == len(visible_categories)
            filters.first.locator('a').click()
            assert page.locator('#posts-list .posts-list-item[hidden]').count() == 0

            page.goto(origin + post_url)
            page.wait_for_load_state('networkidle')
            page.locator('.mermaid-rendered svg').first.wait_for(timeout=30000)
            check_diagram_labels(page)
            assert page.locator('.markdown-body .katex').count() > 0
            assert page.locator('.markdown-body .katex-error').count() == 0
            assert page.locator('.markdown-body .math-copy:not(:has(.katex-display)) .katex').count() > 0, 'Inline formulas must remain within paragraphs'
            assert page.locator('.markdown-body .katex-display').count() > 0, 'Display formulas must remain separate'
            assert page.locator('.code-block-wrapper .code-copy-btn').count() > 1
            assert page.locator('.post-directory a').count() > 0
            assert page.locator('.post-directory a').evaluate_all('(links) => links.every((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))')

            block = page.locator('.code-block-wrapper:not(.mermaid-block-wrapper)').first
            copied_text = block.locator('code').text_content()
            copy_button = block.locator('.code-copy-btn')
            copy_button.click()
            expect(copy_button).to_have_text('复制成功')
            assert page.evaluate('navigator.clipboard.readText()').replace('\r\n', '\n') == copied_text.replace('\r\n', '\n')
            expect(copy_button).to_have_text('复制', timeout=4000)

            # Permission denial must use the fallback, and a failed fallback must report failure.
            page.evaluate('''() => {
              window.originalWrite = navigator.clipboard.writeText.bind(navigator.clipboard);
              window.originalExec = document.execCommand.bind(document);
              navigator.clipboard.writeText = () => Promise.reject(new Error('Denied'));
            }''')
            copy_button.click()
            expect(copy_button).to_have_text('复制成功')
            expect(copy_button).to_have_text('复制', timeout=4000)
            page.evaluate('document.execCommand = () => false')
            copy_button.click()
            expect(copy_button).to_have_text('复制失败')
            page.evaluate('''() => {
              navigator.clipboard.writeText = window.originalWrite;
              document.execCommand = window.originalExec;
            }''')

            math = page.locator('.markdown-body .math-copy[data-latex]:not(.code-copy-wrap)').first
            math.scroll_into_view_if_needed()
            math.hover()
            math.locator('.latex-copy-btn').click()
            assert page.evaluate('navigator.clipboard.readText()').replace('\r\n', '\n') == math.get_attribute('data-latex').replace('\r\n', '\n')

            svg = page.locator('.mermaid-rendered svg').first
            first_id = svg.get_attribute('id')
            page.emulate_media(color_scheme='dark')
            page.wait_for_function('(id) => document.querySelector(".mermaid-rendered svg")?.id !== id', arg=first_id)
            assert page.locator('.mermaid-error').count() == 0
            diagram_button = page.locator('.mermaid-block-wrapper .code-copy-btn').first
            diagram_button.click()
            expect(diagram_button).to_have_text('已复制 PNG', timeout=15000)
            assert page.evaluate('''async () => (await navigator.clipboard.read())[0].types.includes('image/png')''')

            # The visual scrollbar must support keyboard input and pointer dragging.
            page.evaluate('''() => {
              const table = document.createElement('table');
              table.id = 'smoke-overflow';
              table.style.cssText = 'display:block;width:240px;overflow-x:auto';
              table.innerHTML = '<tbody><tr><td style="min-width:1400px">Scrollable content</td></tr></tbody>';
              document.querySelector('.markdown-body').append(table);
              table.scrollIntoView({behavior:'instant'});
              document.dispatchEvent(new Event('site:content-updated'));
            }''')
            scrollbar = page.locator('[role="scrollbar"][aria-controls="smoke-overflow"]')
            expect(scrollbar).to_be_visible()
            scrollbar.focus()
            scrollbar.press('End')
            assert page.locator('#smoke-overflow').evaluate('(element) => element.scrollLeft') > 0
            scrollbar.press('Home')
            assert page.locator('#smoke-overflow').evaluate('(element) => element.scrollLeft') == 0
            thumb = scrollbar.locator('.table-floating-scroll-thumb')
            bounds = thumb.bounding_box()
            page.mouse.move(bounds['x'] + bounds['width'] / 2, bounds['y'] + bounds['height'] / 2)
            page.mouse.down()
            page.mouse.move(bounds['x'] + bounds['width'] / 2 + 60, bounds['y'] + bounds['height'] / 2, steps=8)
            page.mouse.up()
            assert page.locator('#smoke-overflow').evaluate('(element) => element.scrollLeft') > 0
            page.evaluate('document.getElementById("smoke-overflow").remove(); document.dispatchEvent(new Event("site:content-updated"))')

            page.set_viewport_size({'width': 375, 'height': 812})
            page.emulate_media(reduced_motion='no-preference')
            page.goto(url)
            page.wait_for_load_state('networkidle')
            assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1')
            toggle = page.locator('.site-nav-toggle')
            expect(toggle).to_be_visible()
            assert toggle.inner_text().strip() == ''
            expect(toggle).to_have_accessible_name('展开导航菜单')
            toggle_style = toggle.evaluate('(element) => ({width:element.clientWidth, height:element.clientHeight, border:getComputedStyle(element).borderWidth})')
            assert toggle_style['width'] >= 44 and toggle_style['height'] >= 44 and toggle_style['border'] == '0px', toggle_style
            drawer = page.locator('#site-nav-panel')
            expect(drawer).to_be_hidden()
            open_panel_with_motion(page, '.site-nav-toggle', '#site-nav-panel')
            expect(toggle).to_have_attribute('aria-expanded', 'true')
            expect(page.locator('#site-navigation')).to_be_visible()
            check_glass(drawer)
            close = drawer.locator('.mobile-panel-close')
            assert close.inner_text().strip() == ''
            expect(close).to_have_accessible_name('关闭导航菜单')
            assert page.evaluate('getComputedStyle(document.documentElement).overflowY') == 'hidden'
            for _ in range(page.locator('.site-header-nav-item').count() + 2):
                page.keyboard.press('Tab')
                assert page.evaluate('Boolean(document.activeElement.closest("#site-nav-panel"))')
            page.keyboard.press('Shift+Tab')
            assert page.evaluate('Boolean(document.activeElement.closest("#site-nav-panel"))')
            page.screenshot(path=str(screenshots / 'mobile-drawer.png'))
            exit_motion = page.evaluate('''() => {
              const dialog = document.querySelector('#site-nav-panel');
              dialog.querySelector('.mobile-panel-close').click();
              return {open:dialog.open, durations:dialog.getAnimations().map((animation) => animation.effect.getTiming().duration)};
            }''')
            assert exit_motion['open'] and exit_motion['durations'], exit_motion
            expect(drawer).to_be_hidden()
            expect(toggle).to_be_focused()
            toggle.click()
            page.keyboard.press('Escape')
            expect(toggle).to_be_focused()
            expect(drawer).to_be_hidden()
            toggle.click()
            drawer.locator('h2').click()
            assert drawer.evaluate('(dialog) => dialog.open')
            page.mouse.click(8, 300)
            expect(drawer).to_be_hidden()
            assert page.evaluate('getComputedStyle(document.documentElement).overflowY') != 'hidden'
            toggle.click()
            page.set_viewport_size({'width': 1440, 'height': 1000})
            expect(drawer).to_be_hidden()
            expect(page.locator('.site-header #site-navigation')).to_be_visible()
            page.set_viewport_size({'width': 375, 'height': 812})
            page.evaluate('window.scrollTo({top:200, behavior:"instant"})')
            expect(page.locator('.site-header')).to_have_class('site-header site-header-nav-scrolled-ph')
            page.locator('.site-header').evaluate('async (header) => { await Promise.allSettled(header.getAnimations().map((animation) => animation.finished)); }')
            check_glass(page.locator('.site-header'))
            page.screenshot(path=str(screenshots / 'home-mobile-dark.png'))
            toggle.click()
            drawer.locator('.site-header-nav-item', has_text='博客').click()
            page.wait_for_load_state('networkidle')
            assert urlsplit(page.url).path == baseurl + '/blog'
            assert page.evaluate('getComputedStyle(document.documentElement).overflowY') != 'hidden'
            page.goto(origin + post_url)
            page.wait_for_load_state('networkidle')
            page.locator('.mermaid-rendered svg').first.wait_for(timeout=30000)
            check_diagram_labels(page)
            directory = page.locator('#post-directory-module')
            expect(directory).to_be_hidden()
            directory_toggle = page.locator('.post-directory-toggle')
            expect(directory_toggle).to_be_visible()
            check_glass(directory_toggle)
            check_code_alignment(page)
            position = directory_toggle.bounding_box()
            assert position['x'] > 200 and position['y'] > 650, position
            open_panel_with_motion(page, '.post-directory-toggle', '#post-directory-panel')
            directory_panel = page.locator('#post-directory-panel')
            check_glass(directory_panel)
            page.screenshot(path=str(screenshots / 'mobile-directory.png'))
            first_heading_id = page.locator('.post-directory a').first.get_attribute('href')[1:]
            page.locator('.post-directory a').first.click()
            expect(directory_panel).to_be_hidden()
            expect(directory_toggle).to_have_attribute('aria-expanded', 'false')
            page.wait_for_function('(id) => document.activeElement.id === decodeURIComponent(id)', arg=first_heading_id)
            directory_toggle.click()
            page.keyboard.press('Escape')
            expect(directory_panel).to_be_hidden()
            expect(directory_toggle).to_be_focused()
            after_scroll = directory_toggle.bounding_box()
            assert abs(position['x'] - after_scroll['x']) < 1 and abs(position['y'] - after_scroll['y']) < 1, after_scroll
            page.emulate_media(reduced_motion='reduce')
            directory_toggle.click()
            expect(directory_panel).to_be_visible()
            page.set_viewport_size({'width': 1440, 'height': 1000})
            expect(directory_panel).to_be_hidden()
            expect(directory.locator('.post-directory')).to_be_visible()
            page.set_viewport_size({'width': 375, 'height': 812})
            page.screenshot(path=str(screenshots / 'post-mobile-dark.png'))
            for width in [320, 375, 390, 414, 768]:
                page.set_viewport_size({'width': width, 'height': 900})
                for route in portrait_routes:
                    page.goto(origin + route)
                    page.wait_for_load_state('networkidle')
                    assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1'), f'Page overflow at {width}px: {route}'
                    if route == post_url:
                        check_code_alignment(page)
                        expect(page.locator('.post-directory-toggle')).to_be_visible()
                    if 'Example-No-Sidebar-Nav' in route:
                        assert page.locator('.post-directory-toggle').count() == 0
            check_heading_levels(page, origin + post_url, screenshots)
            check_search(page, origin, baseurl, site, post_url, screenshots, requests)
            assert not errors, errors
            assert not missing, missing
            browser.close()
            print(f'Browser checks passed (full-site search, six heading levels/anchors/indentation, animated panels/focus/glass, icon navigation, category theme/hover/white text, line alignment, math/diagrams, copy, scrollbars, portrait layouts; baseurl={baseurl or "/"}).')
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
