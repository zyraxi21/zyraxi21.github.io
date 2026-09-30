export function matchesCategory(categories, selected) {
  const normalized = selected.trim().toLowerCase();
  return (
    !normalized ||
    categories.some((category) => String(category).trim().toLowerCase() === normalized)
  );
}

export function initCategories() {
  const filters = [...document.querySelectorAll('#blog-categories .category-filter')];
  if (!filters.length) return;
  const posts = [...document.querySelectorAll('#posts-list .posts-list-item')].map((element) => ({
    element,
    categories: JSON.parse(element.dataset.categories || '[]'),
  }));

  function apply(selected) {
    const category =
      filters.find((filter) => filter.dataset.category.toLowerCase() === selected.toLowerCase())
        ?.dataset.category || '';
    for (const { element, categories } of posts) {
      element.hidden = !matchesCategory(categories, category);
    }
    for (const filter of filters) {
      const active = filter.dataset.category === category;
      filter.classList.toggle('active', active);
      const link = filter.querySelector('a');
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }

  for (const filter of filters) {
    filter.addEventListener('click', (event) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      const selected = filter.dataset.category;
      const url = new URL(window.location.href);
      if (selected) url.searchParams.set('category', selected);
      else url.searchParams.delete('category');
      window.history.replaceState(null, '', url);
      apply(selected);
    });
  }
  const applyFromUrl = () =>
    apply(new URLSearchParams(window.location.search).get('category') || '');
  applyFromUrl();
  window.addEventListener('popstate', applyFromUrl);
}
