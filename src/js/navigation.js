function initDirectory() {
  const directory = document.querySelector('.post-directory ol');
  if (!directory) return;
  for (const [index, heading] of [
    ...document.querySelectorAll(
      'article .markdown-body h1, article .markdown-body h2, article .markdown-body h3',
    ),
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
    const updateDirectory = () => {
      directory.open = !compact.matches;
    };
    updateDirectory();
    compact.addEventListener('change', updateDirectory);
    directory.querySelector('nav')?.addEventListener('click', (event) => {
      if (compact.matches && event.target.closest('a')) directory.open = false;
    });
  }

  const header = document.querySelector('.site-header');
  if (header) {
    const toggle = header.querySelector('.site-nav-toggle');
    const navigation = header.querySelector('.site-header-nav');
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '收起导航菜单' : '展开导航菜单');
      navigation.hidden = compact.matches && !open;
    }
    function updateMenu() {
      toggle.hidden = !compact.matches;
      setMenu(false);
    }
    toggle.addEventListener('click', () =>
      setMenu(toggle.getAttribute('aria-expanded') !== 'true'),
    );
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
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
