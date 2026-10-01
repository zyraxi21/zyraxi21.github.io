import {
  matchingRanges,
  prepareSearchIndex,
  searchDocuments,
  searchExcerpt,
} from './search-engine.js';

const PREVIEW_COUNT = 5;
const PAGE_SIZE = 10;
const cleanQuery = (value) =>
  String(value ?? '')
    .trim()
    .slice(0, 160);

function searchUrl(action, query, page = 1) {
  const url = new URL(action, window.location.href);
  if (query) url.searchParams.set('q', query);
  if (page > 1) url.searchParams.set('page', String(page));
  return url;
}

function highlighted(text, query) {
  const fragment = document.createDocumentFragment();
  let cursor = 0;
  for (const [start, end] of matchingRanges(text, query)) {
    fragment.append(document.createTextNode(text.slice(cursor, start)));
    const mark = document.createElement('mark');
    mark.textContent = text.slice(start, end);
    fragment.append(mark);
    cursor = end;
  }
  fragment.append(document.createTextNode(text.slice(cursor)));
  return fragment;
}

function resultLink(result, query, compact = false) {
  const link = document.createElement('a');
  link.className = compact ? 'search-preview-link' : 'search-result-link';
  link.href = result.url;
  const meta = document.createElement('span');
  meta.className = 'search-result-meta';
  meta.textContent = [
    result.type === 'post' ? '文章' : '页面',
    result.date.replaceAll('-', '/'),
    ...result.tags.slice(0, 3),
  ]
    .filter(Boolean)
    .join(' · ');
  const title = document.createElement(compact ? 'strong' : 'h2');
  title.className = 'search-result-title';
  title.append(highlighted(result.title, query));
  const excerpt = document.createElement('span');
  excerpt.className = 'search-result-excerpt';
  excerpt.append(highlighted(searchExcerpt(result.content, query, compact ? 100 : 180), query));
  link.append(meta, title, excerpt);
  return link;
}

function initHeaderSearch(root, loadIndex) {
  const form = root.querySelector('form');
  const input = root.querySelector('input');
  const button = root.querySelector('button');
  const header = root.closest('header');
  const popover = document.getElementById('site-search-popover');
  const options = popover.querySelector('[role="listbox"]');
  const status = popover.querySelector('.search-preview-status');
  const allResults = popover.querySelector('.search-all-results');
  const retry = popover.querySelector('.search-retry');
  let open = false;
  let composing = false;
  let generation = 0;
  let timer;
  let frame;
  let active = -1;

  const contains = (target) => root.contains(target) || popover.contains(target);

  function geometry() {
    const icon = button.getBoundingClientRect();
    const container = header.querySelector('.container').getBoundingClientRect();
    const logo = header
      .querySelector('.site-brand-logo, #site-header-brand > .octicon')
      .getBoundingClientRect();
    const width = Math.min(360, icon.right - logo.right - 12);
    root.style.setProperty('--search-width', Math.max(140, width) + 'px');
    header.classList.toggle(
      'search-overlaps-brand',
      open &&
        icon.right - width <
          header.querySelector('#site-header-brand').getBoundingClientRect().right + 12,
    );
    const panelWidth = Math.min(420, container.width - 30, window.innerWidth - 30);
    const left = Math.min(
      Math.max(container.left + 15, icon.right - panelWidth),
      window.innerWidth - panelWidth - 15,
    );
    popover.style.width = panelWidth + 'px';
    popover.style.left = left + 'px';
    const top = header.getBoundingClientRect().bottom + 8;
    const viewport = window.visualViewport;
    const bottom = (viewport?.offsetTop ?? 0) + (viewport?.height ?? window.innerHeight);
    popover.style.top = top + 'px';
    popover.style.maxHeight = Math.max(96, Math.min(570, bottom - top - 16)) + 'px';
    if (open) frame = requestAnimationFrame(geometry);
  }

  function resetActive() {
    active = -1;
    input.removeAttribute('aria-activedescendant');
    for (const option of options.children) option.setAttribute('aria-selected', 'false');
  }

  function hideResults() {
    popover.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    resetActive();
  }

  function close(restoreFocus = false) {
    open = false;
    generation += 1;
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    root.classList.remove('is-open');
    header.classList.remove('search-overlaps-brand');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', '搜索全站');
    input.tabIndex = -1;
    hideResults();
    if (restoreFocus) button.focus({ preventScroll: true });
  }

  async function updateResults() {
    const current = ++generation;
    const query = cleanQuery(input.value);
    if (!open || !query || composing) {
      hideResults();
      return;
    }
    resetActive();
    options.replaceChildren();
    allResults.hidden = true;
    retry.hidden = true;
    status.textContent = '正在搜索…';
    popover.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    try {
      const documents = await loadIndex();
      if (current !== generation || !open || composing) return;
      const results = searchDocuments(documents, query);
      const fragment = document.createDocumentFragment();
      for (const [index, result] of results.slice(0, PREVIEW_COUNT).entries()) {
        const link = resultLink(result, query, true);
        link.id = 'site-search-option-' + index;
        link.role = 'option';
        link.tabIndex = -1;
        link.setAttribute('aria-selected', 'false');
        fragment.append(link);
      }
      options.replaceChildren(fragment);
      status.textContent = results.length
        ? results.length + ' 条结果'
        : '没有找到结果，试试其他关键词';
      allResults.href = searchUrl(form.action, query).href;
      allResults.hidden = false;
      allResults.textContent = results.length ? '查看全部结果 →' : '前往搜索页 →';
    } catch {
      if (current !== generation || !open) return;
      status.textContent = '搜索暂时不可用，请重试';
      retry.hidden = false;
    }
  }

  function expand() {
    if (open) return;
    open = true;
    geometry();
    root.classList.add('is-open');
    input.tabIndex = 0;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', '查看全部搜索结果');
    input.focus({ preventScroll: true });
    void loadIndex().catch(() => {});
    void updateResults();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!open) expand();
    else if (!composing)
      window.location.assign(searchUrl(form.action, cleanQuery(input.value)).href);
  });
  input.addEventListener('input', () => {
    generation += 1;
    resetActive();
    clearTimeout(timer);
    if (!composing) timer = setTimeout(() => void updateResults(), 80);
  });
  input.addEventListener('compositionstart', () => {
    composing = true;
    generation += 1;
    clearTimeout(timer);
    hideResults();
  });
  input.addEventListener('compositionend', () => {
    composing = false;
    void updateResults();
  });
  input.addEventListener('keydown', (event) => {
    if (event.isComposing || composing || event.keyCode === 229) return;
    if (
      ['ArrowDown', 'ArrowUp'].includes(event.key) &&
      !popover.hidden &&
      options.children.length
    ) {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      active =
        active < 0
          ? direction > 0
            ? 0
            : options.children.length - 1
          : (active + direction + options.children.length) % options.children.length;
      for (const [index, option] of [...options.children].entries()) {
        option.setAttribute('aria-selected', String(index === active));
      }
      const option = options.children[active];
      input.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      window.location.assign(options.children[active].href);
    }
  });
  for (const element of [root, popover]) {
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !event.isComposing && !composing && open) {
        event.preventDefault();
        close(true);
      }
    });
  }
  retry.addEventListener('click', () => void updateResults());
  document.addEventListener('pointerdown', (event) => {
    if (open && !contains(event.target)) close();
  });
  document.addEventListener('focusin', (event) => {
    if (open && !contains(event.target)) close();
  });
  window.addEventListener('pagehide', () => close());
}

function initResultsPage(root, loadIndex) {
  const form = root.querySelector('form');
  const input = root.querySelector('input');
  const list = root.querySelector('.search-results-list');
  const status = root.querySelector('.search-page-status');
  const empty = root.querySelector('.search-empty');
  const emptyTitle = empty.querySelector('h2');
  const emptyMessage = empty.querySelector('p');
  const retry = empty.querySelector('button');
  const pager = root.querySelector('.search-pagination');
  const previous = pager.querySelector('[data-search-previous]');
  const next = pager.querySelector('[data-search-next]');
  const pageLabel = pager.querySelector('.search-page-number');
  const originalTitle = document.title;
  let generation = 0;
  let timer;
  let composing = false;
  let currentPage = 1;
  let results = [];
  let currentQuery = '';

  function showPage() {
    const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, currentPage), pages);
    const fragment = document.createDocumentFragment();
    for (const result of results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)) {
      const item = document.createElement('li');
      item.append(resultLink(result, currentQuery));
      fragment.append(item);
    }
    list.replaceChildren(fragment);
    pager.hidden = pages <= 1;
    previous.disabled = currentPage <= 1;
    next.disabled = currentPage >= pages;
    pageLabel.textContent = currentPage + ' / ' + pages;
  }

  function syncUrl() {
    window.history.replaceState(null, '', searchUrl(form.action, currentQuery, currentPage));
  }

  async function update({ fromUrl = false } = {}) {
    const current = ++generation;
    currentQuery = cleanQuery(input.value);
    if (!fromUrl) currentPage = 1;
    list.replaceChildren();
    pager.hidden = true;
    retry.hidden = true;
    empty.hidden = true;
    root.removeAttribute('aria-busy');
    document.title = currentQuery ? currentQuery + ' — ' + originalTitle : originalTitle;
    if (!fromUrl) syncUrl();
    if (!currentQuery) {
      status.textContent = '';
      emptyTitle.textContent = '输入关键词开始搜索';
      emptyMessage.textContent = '可以搜索文章标题、标签和正文，也可以查找独立页面。';
      empty.hidden = false;
      return;
    }
    status.textContent = '正在搜索“' + currentQuery + '”…';
    root.setAttribute('aria-busy', 'true');
    try {
      results = searchDocuments(await loadIndex(), currentQuery);
      if (current !== generation) return;
      status.textContent = results.length + ' 条结果 · “' + currentQuery + '”';
      if (results.length) {
        showPage();
        syncUrl();
      } else {
        emptyTitle.textContent = '没有找到“' + currentQuery + '”';
        emptyMessage.textContent = '试试更短的关键词，或检查拼写。';
        empty.hidden = false;
      }
    } catch {
      if (current !== generation) return;
      status.textContent = '';
      emptyTitle.textContent = '搜索暂时不可用';
      emptyMessage.textContent = '请重试加载搜索结果。';
      retry.hidden = false;
      empty.hidden = false;
    } finally {
      if (current === generation) root.removeAttribute('aria-busy');
    }
  }

  function restoreUrl() {
    const parameters = new URL(window.location.href).searchParams;
    input.value = cleanQuery(parameters.get('q'));
    currentPage = Math.max(1, Math.floor(Number(parameters.get('page'))) || 1);
    void update({ fromUrl: true });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(timer);
    if (!composing) void update();
  });
  input.addEventListener('input', () => {
    generation += 1;
    clearTimeout(timer);
    if (!composing) timer = setTimeout(() => void update(), 100);
  });
  input.addEventListener('compositionstart', () => {
    composing = true;
    generation += 1;
    clearTimeout(timer);
  });
  input.addEventListener('compositionend', () => {
    composing = false;
    void update();
  });
  retry.addEventListener('click', () => void update());
  for (const [button, direction] of [
    [previous, -1],
    [next, 1],
  ]) {
    button.addEventListener('click', () => {
      currentPage += direction;
      showPage();
      syncUrl();
      form.scrollIntoView({ block: 'start', behavior: 'instant' });
      input.focus({ preventScroll: true });
    });
  }
  window.addEventListener('popstate', restoreUrl);
  restoreUrl();
}

export function initSearch() {
  const root = document.querySelector('.site-search');
  if (!root) return;
  let indexPromise;
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(root.dataset.indexUrl)
        .then((response) => {
          if (!response.ok) throw new Error('Search index could not be loaded');
          return response.json();
        })
        .then(prepareSearchIndex)
        .catch((error) => {
          indexPromise = undefined;
          throw error;
        });
    }
    return indexPromise;
  }
  initHeaderSearch(root, loadIndex);
  const page = document.querySelector('.search-page');
  if (page) initResultsPage(page, loadIndex);
}
