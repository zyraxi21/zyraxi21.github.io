import katex from 'katex';
import renderMathInElement from 'katex/contrib/auto-render';
import { addMathCopyButtons } from './copy.js';

const delimiters = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true },
];

function wrapMathTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('code, pre, script, style, .kdmath, .math-copy, .katex')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const pattern = /(?<!\\)(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$(?!\$)[^$\n]+?\$)/g;

  for (const node of nodes) {
    const text = node.nodeValue;
    const matches = [...text.matchAll(pattern)];
    if (!matches.length) continue;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of matches) {
      fragment.append(document.createTextNode(text.slice(cursor, match.index)));
      const wrapper = document.createElement('span');
      wrapper.className = 'math-copy';
      if (match[0].startsWith('$$') || match[0].startsWith('\\[')) {
        wrapper.classList.add('math-display');
      }
      const delimiterLength = match[0].startsWith('$$') || match[0].startsWith('\\') ? 2 : 1;
      wrapper.dataset.latex = match[0].slice(delimiterLength, -delimiterLength);
      wrapper.textContent = match[0];
      fragment.append(wrapper);
      cursor = match.index + match[0].length;
    }
    fragment.append(document.createTextNode(text.slice(cursor)));
    node.replaceWith(fragment);
  }
}

export function initMath(content) {
  for (const element of content.querySelectorAll('.kdmath')) {
    const tex = element.textContent.trim().replace(/^\$+|\$+$/g, '');
    if (!tex) continue;
    element.classList.add('math-copy', 'math-display');
    element.dataset.latex = tex;
    katex.render(tex, element, { displayMode: true, throwOnError: false });
  }
  wrapMathTextNodes(content);
  renderMathInElement(content, { delimiters, throwOnError: false });
  addMathCopyButtons(content);

  const directory = document.querySelector('.post-directory');
  if (directory) {
    for (const element of directory.querySelectorAll('.kdmath')) {
      katex.render(element.textContent.trim(), element, {
        displayMode: false,
        throwOnError: false,
      });
      element.classList.remove('kdmath');
    }
    renderMathInElement(directory, {
      delimiters: delimiters.map((delimiter) => ({ ...delimiter, display: false })),
      throwOnError: false,
    });
  }
}
