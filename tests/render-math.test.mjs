import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseFragment } from 'parse5';
import { renderMathHtml } from '../scripts/render-math.mjs';
import { splitMathText } from '../src/js/math-source.js';

function descendants(node, predicate) {
  return (node.childNodes || []).flatMap((child) => [
    ...(predicate(child) ? [child] : []),
    ...descendants(child, predicate),
  ]);
}

function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

test('四种公式标记保持原始 LaTeX、行内与独立显示及无障碍 MathML', () => {
  const source = String.raw`<p>中文 $x_1$，\(a+b\)。</p><div>$$\frac{a}{b}$$</div><p>\[c^2\]</p>`;
  const result = renderMathHtml(source);
  const tree = parseFragment(result.html);
  const formulas = descendants(tree, (node) => attribute(node, 'data-math-rendered') === 'true');
  assert.equal(result.count, 4);
  assert.deepEqual(
    formulas.map((node) => attribute(node, 'data-latex')),
    ['x_1', 'a+b', String.raw`\frac{a}{b}`, 'c^2'],
  );
  assert.deepEqual(
    formulas.map((node) => attribute(node, 'class').includes('math-display')),
    [false, false, true, true],
  );
  assert.equal(descendants(tree, (node) => node.tagName === 'math').length, 4);
});

test('搜索摘要保留公式符号与运算关系，排除重复文字及 LaTeX 命令', () => {
  const result = renderMathHtml(
    String.raw`<p>频率 $\alpha_1+\frac{x^2}{y}$，长度 $\sqrt{a}$。</p><pre><code>$源码$</code></pre>`,
  );
  const preview = parseFragment(result.previewHtml);
  const text = descendants(preview, (node) => node.nodeName === '#text')
    .map((node) => node.value)
    .join('');
  assert.equal(text, '频率 α₁+(x²)/(y)，长度 √(a)。$源码$');
  assert.ok(!text.includes('\\alpha'));
  assert.equal(descendants(preview, (node) => node.tagName === 'math').length, 0);
  assert.equal(
    descendants(parseFragment(result.html), (node) => node.tagName === 'math').length,
    2,
  );
  const escaped = renderMathHtml(String.raw`<p>$\text{&lt;img src=x onerror=alert(1)&gt;}$</p>`);
  assert.equal(
    descendants(parseFragment(escaped.previewHtml), (node) => node.tagName === 'img').length,
    0,
  );
});

test('转义美元符号及花括号内的定界符不提前关闭公式', () => {
  const parts = splitMathText(String.raw`价格 \$5，$\text{a $ b} + \$ + x$，\(y\)，未闭合 $z`);
  assert.deepEqual(
    parts.filter((part) => part.type === 'math').map((part) => part.data),
    [String.raw`\text{a $ b} + \$ + x`, 'y'],
  );
  assert.equal(parts.at(-1).data, '，未闭合 $z');
  assert.equal(parts[0].data, String.raw`价格 \$5，`);
});

test('代码、脚本、表单、模板、HTML 属性与未闭合公式保持原样', () => {
  const source = String.raw`<pre><code>$x_1$</code></pre><script>const x = '$y$';</script><style>p::before{content:'$z$'}</style><textarea>$a$</textarea><select><option>$b$</option></select><template><p>$c$</p></template><p title="$d$">\$5，未闭合 $e</p><!-- $f$ -->`;
  assert.deepEqual(renderMathHtml(source), { html: source, count: 0 });
});

test('标题锚点、链接与含公式的表格结构完整保留', () => {
  const result = renderMathHtml(
    '<h2 id="公式锚点">$x_1$ 与标题</h2><p><a href="/preview/about#intro">链接</a></p><table><tr><td>绝对值</td><td>$|x_y|$</td></tr></table>',
  );
  const tree = parseFragment(result.html);
  assert.equal(result.count, 2);
  assert.equal(descendants(tree, (node) => node.tagName === 'td').length, 2);
  assert.equal(attribute(descendants(tree, (node) => node.tagName === 'h2')[0], 'id'), '公式锚点');
  assert.equal(
    attribute(descendants(tree, (node) => node.tagName === 'a')[0], 'href'),
    '/preview/about#intro',
  );
});

test('Kramdown 独立公式和实体按原文渲染，重复处理保持稳定', () => {
  const first = renderMathHtml(
    '<div id="display" class="kdmath extra">$$&#92;frac{a&#95;1}{b}$$</div>',
  );
  const tree = parseFragment(first.html);
  const node = tree.childNodes[0];
  assert.equal(first.count, 1);
  assert.equal(attribute(node, 'id'), 'display');
  assert.equal(attribute(node, 'data-latex'), String.raw`\frac{a_1}{b}`);
  assert.match(attribute(node, 'class'), /extra/);
  assert.match(attribute(node, 'class'), /math-display/);
  assert.deepEqual(renderMathHtml(first.html), { html: first.html, count: 0 });
});

test('独立 HTML 页面保留文档类型、头部及图像与原生 MathML', () => {
  const source =
    '<!-- 页面 --><!DOCTYPE html><html lang="zh"><head><title>$标题$</title></head><body><p>$x$</p><svg><title>$图像$</title><text>$y$</text></svg><math><mtext>$z$</mtext></math></body></html>';
  const result = renderMathHtml(source);
  assert.equal(result.count, 1);
  assert.ok(result.html.includes('<!DOCTYPE html>'));
  assert.ok(result.html.includes('<html lang="zh">'));
  assert.ok(result.html.includes('<head><title>$标题$</title></head>'));
  assert.ok(result.html.includes('<svg><title>$图像$</title><text>$y$</text></svg>'));
  assert.ok(result.html.includes('<math><mtext>$z$</mtext></math>'));
});

test('无效 LaTeX 显示错误源码，公式不能生成可执行链接或注入属性', () => {
  const source = String.raw`<p>$\frac{1}$；$\href{javascript:alert(1)}{bad}$；$\text{&quot; onerror=&quot;alert(1)}$</p>`;
  const result = renderMathHtml(source);
  const tree = parseFragment(result.html);
  assert.equal(result.count, 3);
  assert.ok(descendants(tree, (node) => attribute(node, 'class')?.includes('katex-error')).length);
  assert.equal(
    descendants(tree, (node) => attribute(node, 'href')?.startsWith('javascript:')).length,
    0,
  );
  assert.equal(
    descendants(tree, (node) => node.attrs?.some((item) => /^on/i.test(item.name))).length,
    0,
  );
});

test('命令行 JSON 保留中文、换行与反斜杠，输出可供 Jekyll 直接读取', () => {
  const source = String.raw`<p>中文 $\alpha_1$</p>` + '\n';
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(new URL('../scripts/render-math.mjs', import.meta.url))],
    {
      input: JSON.stringify({ html: source }),
      encoding: 'utf8',
    },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), renderMathHtml(source));
});
