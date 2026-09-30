"""Exercise the built site in Chromium, including Jekyll's extensionless URLs."""
import argparse
import json
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
from urllib.parse import unquote, urlsplit

from playwright.sync_api import expect, sync_playwright


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', default='_site')
    parser.add_argument('--baseurl', default='')
    parser.add_argument('--browser-channel', default=None)
    parser.add_argument('--post', help='Path to a built demonstration post with code, math and Mermaid')
    parser.add_argument('--screenshots', default='.cache/screenshots')
    parser.add_argument('--inspect', action='store_true', help='Capture portrait layouts before running interactions')
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
            page.emulate_media(reduced_motion='reduce')
            page.goto(url)
            page.wait_for_load_state('networkidle')
            assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1')
            toggle = page.locator('.site-nav-toggle')
            expect(toggle).to_be_visible()
            expect(page.locator('#site-navigation')).to_be_hidden()
            toggle.click()
            expect(toggle).to_have_attribute('aria-expanded', 'true')
            expect(page.locator('#site-navigation')).to_be_visible()
            page.keyboard.press('Escape')
            expect(toggle).to_be_focused()
            expect(page.locator('#site-navigation')).to_be_hidden()
            page.evaluate('window.scrollTo(0, 200)')
            expect(page.locator('.site-header')).to_have_class('site-header site-header-nav-scrolled-ph')
            page.screenshot(path=str(screenshots / 'home-mobile-dark.png'))
            page.goto(origin + post_url)
            page.wait_for_load_state('networkidle')
            page.locator('.mermaid-rendered svg').first.wait_for(timeout=30000)
            directory = page.locator('#post-directory-module')
            assert not directory.evaluate('(element) => element.open')
            directory.locator('summary').click()
            expect(directory.locator('nav')).to_be_visible()
            directory.locator('a').first.click()
            assert not directory.evaluate('(element) => element.open')
            page.screenshot(path=str(screenshots / 'post-mobile-dark.png'))
            for width in [320, 375, 390, 414, 768]:
                page.set_viewport_size({'width': width, 'height': 900})
                for route in portrait_routes:
                    page.goto(origin + route)
                    page.wait_for_load_state('networkidle')
                    assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1'), f'Page overflow at {width}px: {route}'
            assert not errors, errors
            assert not missing, missing
            browser.close()
            print(f'Browser checks passed (desktop/mobile, math/diagrams, copy/fallbacks, categories, TOC, scrollbars; baseurl={baseurl or "/"}).')
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
