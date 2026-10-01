import katex from 'katex';
import { addMathCopyButtons } from './copy.js';
import { ignoredMathTags, mathTextNodes, splitMathText } from './math-source.js';

function renderContent(root, inline = false) {
  for (const element of root.querySelectorAll('.kdmath:not([data-math-rendered="true"])')) {
    if (element.closest([...ignoredMathTags].join(', '))) continue;
    const tex = element.textContent.trim().replace(/^\$+|\$+$/g, '');
    if (!tex) continue;
    element.classList.add('math-copy');
    if (!inline) element.classList.add('math-display');
    element.dataset.latex = tex;
    element.dataset.mathRendered = 'true';
    katex.render(tex, element, { displayMode: !inline, throwOnError: false, trust: false });
  }
  for (const node of [...mathTextNodes(root)]) {
    const parts = splitMathText(node.nodeValue);
    if (!parts.some((part) => part.type === 'math')) continue;
    const fragment = document.createDocumentFragment();
    for (const part of parts) {
      if (part.type === 'text') {
        fragment.append(document.createTextNode(part.data));
        continue;
      }
      const wrapper = document.createElement('span');
      const display = part.display && !inline;
      wrapper.className = display ? 'math-copy math-display' : 'math-copy';
      wrapper.dataset.latex = part.data;
      wrapper.dataset.mathRendered = 'true';
      katex.render(part.data, wrapper, { displayMode: display, throwOnError: false, trust: false });
      fragment.append(wrapper);
    }
    node.replaceWith(fragment);
  }
}

export function initMath(content) {
  renderContent(content);
  addMathCopyButtons(content);

  const directory = document.querySelector('.post-directory');
  if (!directory) return;
  renderContent(directory, true);
  for (const element of directory.querySelectorAll('.math-display[data-latex]')) {
    katex.render(element.dataset.latex, element, {
      displayMode: false,
      throwOnError: false,
      trust: false,
    });
    element.classList.remove('math-display');
  }
}
