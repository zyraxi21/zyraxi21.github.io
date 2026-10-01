export const ignoredMathTags = new Set([
  'code',
  'pre',
  'script',
  'style',
  'noscript',
  'textarea',
  'option',
  'template',
  'head',
  'title',
  'svg',
  'math',
]);
export const ignoredMathClasses = new Set(['katex', 'math-copy']);

function closingDelimiter(text, start, delimiter) {
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (depth <= 0 && text.startsWith(delimiter, index)) return index;
    if (text[index] === '\\') index += 1;
    else if (text[index] === '{') depth += 1;
    else if (text[index] === '}') depth -= 1;
  }
  return -1;
}

/* 构建与浏览器共用同一套标记识别，保留转义字符和花括号内的定界符。 */
export function splitMathText(text) {
  const opening = /(?<!\\)(\$\$|\$|\\\(|\\\[)/g;
  const parts = [];
  let cursor = 0;
  for (let match; (match = opening.exec(text));) {
    const left = match[0];
    const right = left === '\\(' ? '\\)' : left === '\\[' ? '\\]' : left;
    const start = match.index + left.length;
    const end = closingDelimiter(text, start, right);
    if (end < 0) continue;
    if (match.index > cursor) parts.push({ type: 'text', data: text.slice(cursor, match.index) });
    parts.push({
      type: 'math',
      data: text.slice(start, end),
      display: left === '$$' || left === '\\[',
    });
    cursor = end + right.length;
    opening.lastIndex = cursor;
  }
  if (cursor < text.length) parts.push({ type: 'text', data: text.slice(cursor) });
  return parts;
}

const ignoredSelector = [
  ...ignoredMathTags,
  ...[...ignoredMathClasses].map((name) => `.${name}`),
].join(', ');

export function* mathTextNodes(root) {
  const walker = root.ownerDocument.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return NodeFilter.FILTER_ACCEPT;
        return node.matches(`${ignoredSelector}, .kdmath`)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_SKIP;
      },
    },
  );
  while (walker.nextNode()) yield walker.currentNode;
}

export function hasUnrenderedMath(root) {
  for (const element of root.querySelectorAll('.kdmath:not([data-math-rendered="true"])')) {
    if (!element.closest(ignoredSelector)) return true;
  }
  for (const node of mathTextNodes(root)) {
    if (splitMathText(node.nodeValue).some((part) => part.type === 'math')) return true;
  }
  return false;
}
