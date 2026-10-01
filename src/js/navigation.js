import { createMobilePanel } from './panels.js';

function initDirectory() {
  const directory = document.querySelector('.post-directory ol');
  if (!directory) return;
  for (const [index, heading] of [
    ...document.querySelectorAll('article .markdown-body :is(h1, h2, h3, h4, h5, h6)'),
  ].entries()) {
    if (!heading.id) {
      let id = `section-${index + 1}`;
      while (document.getElementById(id)) id += '-heading';
      heading.id = id;
    }
    const entry = document.createElement('li');
    entry.className = `toc-${heading.tagName.toLowerCase()}`;
    const link = document.createElement('a');
    link.className = 'jumper';
    link.href = `#${encodeURIComponent(heading.id)}`;
    for (const node of heading.childNodes) link.append(node.cloneNode(true));
    for (const nestedLink of link.querySelectorAll('a'))
      nestedLink.replaceWith(...nestedLink.childNodes);
    entry.append(link);
    directory.append(entry);
  }
}

export function initNavigation() {
  initDirectory();

  const compact = window.matchMedia('(max-width: 991px)');
  const directory = document.querySelector('#post-directory-module');
  if (directory) {
    const nav = directory.querySelector('nav');
    const dialog = document.querySelector('#post-directory-panel');
    const toggle = document.querySelector('.post-directory-toggle');
    const panel = createMobilePanel(dialog, toggle);
    const updateDirectory = () => {
      void panel.close({ immediate: true, restoreFocus: false });
      directory.hidden = compact.matches;
      directory.open = !compact.matches;
      toggle.hidden = !compact.matches;
      (compact.matches ? dialog.querySelector('.mobile-panel-body') : directory).append(nav);
    };
    updateDirectory();
    compact.addEventListener('change', updateDirectory);
    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (
        !compact.matches ||
        !link ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      void panel.close({ restoreFocus: false }).then(() => {
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
      });
    });
  }

  const header = document.querySelector('.site-header');
  if (header) {
    const toggle = header.querySelector('.site-nav-toggle');
    const navigation = header.querySelector('.site-header-nav');
    const dialog = document.querySelector('#site-nav-panel');
    const panel = createMobilePanel(dialog, toggle);
    const originalPosition = document.createComment('desktop navigation');
    navigation.before(originalPosition);
    function updateMenu() {
      void panel.close({ immediate: true, restoreFocus: false });
      toggle.hidden = !compact.matches;
      if (compact.matches) dialog.querySelector('.mobile-panel-body').append(navigation);
      else originalPosition.after(navigation);
    }
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) void panel.close({ immediate: true, restoreFocus: false });
    });
    compact.addEventListener('change', updateMenu);
    updateMenu();
    const update = () => {
      header.classList.toggle('site-header-nav-scrolled', !compact.matches && window.scrollY > 70);
      header.classList.toggle(
        'site-header-nav-scrolled-ph',
        compact.matches && window.scrollY > 40,
      );
    };
    let scheduled = false;
    window.addEventListener(
      'scroll',
      () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          update();
        });
      },
      { passive: true },
    );
    compact.addEventListener('change', update);
    update();
  }

  document.querySelector('[data-back-to-top]')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  });

  for (const link of document.querySelectorAll(
    '.site-footer a[href], .post .markdown-body a[href]',
  )) {
    const url = new URL(link.href, window.location.href);
    if (!/^https?:$/.test(url.protocol) || link.getAttribute('href').startsWith('#')) continue;
    if (
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.hash
    )
      continue;
    link.target = '_blank';
    link.relList.add('noopener', 'noreferrer');
  }
}
