import Tooltip from 'bootstrap/js/dist/tooltip';
import GeoPattern from '../vendor/geopattern.min.cjs';
import { initCodeCopy } from './copy.js';
import { initCategories } from './categories.js';
import { initNavigation } from './navigation.js';
import { initScrollbars } from './scrollbars.js';

async function init() {
  initNavigation();
  initCategories();

  const comments = document.querySelector('#disqus_thread');
  if (comments) {
    const shortname = comments.dataset.disqusHost.replace(/\.disqus\.com$/i, '');
    if (/^[a-z0-9-]+$/i.test(shortname)) {
      window.disqus_config = function () {
        this.page.url = comments.dataset.disqusUrl;
        this.page.identifier = comments.dataset.disqusIdentifier;
      };
      const script = document.createElement('script');
      script.src = `https://${shortname}.disqus.com/embed.js`;
      script.async = true;
      document.head.append(script);
    }
  }

  for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
    Tooltip.getOrCreateInstance(element);
  }
  for (const element of document.querySelectorAll('.geopattern')) {
    element.style.backgroundImage = GeoPattern.generate(
      element.dataset.patternId || '',
    ).toDataUrl();
  }

  const content = document.querySelector('.markdown-body');
  if (!content) return;

  initCodeCopy(content);
  initScrollbars(content);

  const enhancements = [];
  if (content.querySelector('.kdmath') || /\$|\\[([]/.test(content.textContent)) {
    enhancements.push(import('./math.js').then(({ initMath }) => initMath(content)));
  }
  if (content.querySelector('code.language-mermaid')) {
    enhancements.push(import('./diagrams.js').then(({ initDiagrams }) => initDiagrams(content)));
  }
  for (const result of await Promise.allSettled(enhancements)) {
    if (result.status === 'rejected') console.error('文章增强功能加载失败：', result.reason);
  }
  document.dispatchEvent(new Event('site:content-updated'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  void init();
}
