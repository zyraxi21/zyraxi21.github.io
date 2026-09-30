export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some browsers deny clipboard access even on secure pages. Try the fallback.
    }
  }

  const previousFocus = document.activeElement;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.append(textarea);
  textarea.select();
  try {
    if (!document.execCommand('copy')) throw new Error('浏览器不允许复制');
  } finally {
    textarea.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function createCopyButton(label, action, className = 'code-copy-btn') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.setAttribute('aria-label', label);
  button.setAttribute('aria-live', 'polite');
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    button.disabled = true;
    try {
      const copiedLabel = await action();
      button.textContent = copiedLabel || '复制成功';
      button.classList.add('copied');
    } catch {
      button.textContent = '复制失败';
    } finally {
      setTimeout(() => {
        button.textContent = label;
        button.classList.remove('copied');
        button.disabled = false;
      }, 1500);
    }
  });
  return button;
}

export function addMathCopyButtons(root) {
  for (const element of root.querySelectorAll('.math-copy')) {
    if (element.querySelector('.latex-copy-btn')) continue;
    const button = createCopyButton(
      '复制',
      () => copyText(element.dataset.latex || ''),
      'latex-copy-btn',
    );
    button.setAttribute(
      'aria-label',
      element.classList.contains('code-copy-wrap') ? '复制代码' : '复制 LaTeX 代码',
    );
    element.append(button);
  }
}

export function initCodeCopy(root) {
  for (const pre of root.querySelectorAll('pre')) {
    const code = pre.querySelector('code');
    if (!code || code.classList.contains('language-mermaid')) continue;
    const block = pre.closest('.highlighter-rouge, figure.highlight') || pre;
    if (block.closest('.code-block-wrapper')) continue;

    const text = code.textContent;
    const languageMatch = `${block.className} ${code.className}`.match(/language-([\w+#.-]+)/);
    const language = languageMatch?.[1] || 'text';
    const header = document.createElement('div');
    header.className = 'code-header';
    const label = document.createElement('span');
    label.className = 'code-lang';
    label.textContent = /^(cpp|c\+\+)$/i.test(language) ? 'C++' : language;
    const button = createCopyButton('复制', () => copyText(text));
    button.setAttribute('aria-label', `复制 ${label.textContent} 代码`);
    header.append(label, button);

    const numbers = document.createElement('div');
    numbers.className = 'code-lines';
    numbers.setAttribute('aria-hidden', 'true');
    const lineCount = Math.max(1, text.replace(/\n$/, '').split('\n').length);
    for (let index = 1; index <= lineCount; index += 1) {
      const number = document.createElement('span');
      number.textContent = index;
      numbers.append(number);
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    const body = document.createElement('div');
    body.className = 'code-body';
    block.before(wrapper);
    wrapper.append(header, body);
    body.append(numbers, block);
  }

  for (const code of root.querySelectorAll('code')) {
    if (code.closest('pre, .math-copy')) continue;
    const wrapper = document.createElement('span');
    wrapper.className = 'math-copy code-copy-wrap';
    wrapper.dataset.latex = code.textContent;
    code.before(wrapper);
    wrapper.append(code);
  }
  addMathCopyButtons(root);
}
