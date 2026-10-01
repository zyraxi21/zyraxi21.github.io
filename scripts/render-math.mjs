import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';
import { defaultTreeAdapter as tree, parse, parseFragment, serialize } from 'parse5';
import { ignoredMathClasses, ignoredMathTags, splitMathText } from '../src/js/math-source.js';

const htmlNamespace = 'http://www.w3.org/1999/xhtml';

function attribute(element, name) {
  return element.attrs?.find((item) => item.name === name)?.value;
}

function setAttribute(element, name, value) {
  const existing = element.attrs.find((item) => item.name === name);
  if (existing) existing.value = value;
  else element.attrs.push({ name, value });
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(textContent).join('');
}

// 搜索摘要使用 MathML 的单份文字，保留分数、上下标和根式的关系。
function previewScript(text, superscript) {
  const digits = '0123456789+-−=()';
  const symbols = superscript ? '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻⁼⁽⁾' : '₀₁₂₃₄₅₆₇₈₉₊₋₋₌₍₎';
  if (text && [...text].every((character) => digits.includes(character))) {
    return [...text].map((character) => symbols[digits.indexOf(character)]).join('');
  }
  return `${superscript ? '^' : '_'}(${text})`;
}

function previewMathText(node) {
  if (node.nodeName === '#text') return node.value;
  if (
    node.tagName === 'annotation' ||
    (attribute(node, 'class') || '').split(/\s+/).includes('katex-html')
  )
    return '';
  const children = (node.childNodes || []).map(previewMathText);
  if (node.tagName === 'mfrac') return `(${children[0]})/(${children[1]})`;
  if (node.tagName === 'msup') return children[0] + previewScript(children[1], true);
  if (node.tagName === 'msub') return children[0] + previewScript(children[1], false);
  if (node.tagName === 'msubsup') {
    return children[0] + previewScript(children[1], false) + previewScript(children[2], true);
  }
  if (node.tagName === 'msqrt') return `√(${children.join('')})`;
  if (node.tagName === 'mroot') return `${previewScript(children[1], true)}√(${children[0]})`;
  if (node.tagName === 'mspace') return ' ';
  if (node.tagName === 'mtr') return children.join(', ');
  if (node.tagName === 'mtable') return children.join('; ');
  return children.join('');
}

function fillMath(element, tex, display) {
  const classes = new Set((attribute(element, 'class') || '').split(/\s+/).filter(Boolean));
  classes.add('math-copy');
  if (display) classes.add('math-display');
  setAttribute(element, 'class', [...classes].join(' '));
  setAttribute(element, 'data-latex', tex);
  setAttribute(element, 'data-math-rendered', 'true');
  const math = parseFragment(
    katex.renderToString(tex, { displayMode: display, throwOnError: false, trust: false }),
  );
  const preview = previewMathText(math).replace(/[\u200b\u2061-\u2064]/gu, '');
  for (const child of [...element.childNodes]) tree.detachNode(child);
  for (const child of [...math.childNodes]) {
    tree.detachNode(child);
    tree.appendChild(element, child);
  }
  return preview;
}

export function renderMathHtml(html) {
  const document = /^\s*(?:<!--[\s\S]*?-->\s*)*(?:<!doctype\b|<html\b)/i.test(html);
  const fragment = document ? parse(html) : parseFragment(html);
  let count = 0;
  const previews = [];
  function visit(node) {
    if (ignoredMathTags.has(node.tagName)) return;
    const classes = (attribute(node, 'class') || '').split(/\s+/);
    if (classes.some((name) => ignoredMathClasses.has(name))) return;
    if (classes.includes('kdmath')) {
      const tex = textContent(node)
        .trim()
        .replace(/^\$+|\$+$/g, '');
      if (tex) {
        previews.push([node, fillMath(node, tex, true)]);
        count += 1;
      }
      return;
    }
    if (node.nodeName === '#text') {
      const parts = splitMathText(node.value);
      if (!parts.some((part) => part.type === 'math')) return;
      for (const part of parts) {
        let replacement;
        if (part.type === 'text') replacement = tree.createTextNode(part.data);
        else {
          replacement = tree.createElement('span', htmlNamespace, []);
          previews.push([replacement, fillMath(replacement, part.data, part.display)]);
          count += 1;
        }
        tree.insertBefore(node.parentNode, replacement, node);
      }
      tree.detachNode(node);
      return;
    }
    for (const child of [...(node.childNodes || [])]) visit(child);
  }
  visit(fragment);
  if (!count) return { html, count };
  const renderedHtml = serialize(fragment);
  for (const [element, preview] of previews) {
    for (const child of [...element.childNodes]) tree.detachNode(child);
    tree.appendChild(element, tree.createTextNode(preview));
  }
  return { html: renderedHtml, previewHtml: serialize(fragment), count };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  const { html } = JSON.parse(input);
  if (typeof html !== 'string') throw new TypeError('数学预渲染需要 HTML 字符串。');
  process.stdout.write(JSON.stringify(renderMathHtml(html)));
}
