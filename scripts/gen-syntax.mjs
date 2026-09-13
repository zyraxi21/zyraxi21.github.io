#!/usr/bin/env node
/**
 * gen-syntax.mjs —— 从 VS Code 内置默认主题扩展 vscode.theme-defaults 的
 * "2026 Light" / "2026 Dark" 提取 token 配色，生成 assets/css/syntax.css。
 *
 * 用法:
 *   node scripts/gen-syntax.mjs
 *   VSCODE_THEME_DEFAULTS=<路径> node scripts/gen-syntax.mjs   # 手动指定主题目录
 *
 * 只负责"不同 token 类型各自的文字颜色"。代码框与行内代码的**背景色**、以及
 * **无类型文本**的基色，由 common.css 用站点主题色控制（--brand-primary-soft /
 * --brand-primary-hover），本脚本不生成、也不覆盖这两项。
 *
 * 主题用 TextMate scope 描述 token 颜色，脚本按下表把 scope 折算到 Rouge/Pygments
 * 的 class 上。带祖先上下文的选择器（如 `string variable`）需要 scope 栈才能判定，
 * 而这里只有单个 scope 字符串，因此忽略它们，避免把带条件的规则错套上去。
 *
 * 已用各语言的真实 Rouge 渲染结果核对过覆盖范围：
 *   bash/shell、PowerShell、Python、MATLAB、C、C++、Kotlin、CSS。
 * 仍未配色的 class 剩 .n / .p（普通标识符与标点）、.w（空白）与 .py（Kotlin 属性名），
 * 它们在 VS Code 里本来就是"默认前景色"，所以这里同样让它们继承站点主题色。
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(REPO, 'assets', 'css', 'syntax.css');

/* ---------- 1. 定位主题目录 ---------- */

function findThemeDefaults() {
  if (process.env.VSCODE_THEME_DEFAULTS) return process.env.VSCODE_THEME_DEFAULTS;

  const apps = [
    'Microsoft VS Code',
    'Microsoft VS Code Insiders',
    'VSCodium',
    'cursor',
    'Windsurf',
  ];
  const winRoots = [
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Programs'),
    'C:\\Program Files',
    'C:\\Program Files (x86)',
    'D:\\Program Files',
    'E:\\Program Files',
  ].filter(Boolean);
  const unixRoots = ['/usr/share', '/usr/lib', '/opt', '/Applications'];

  // 一次读目录、逐层下探，避免依赖 shell
  const walk = (base, depth) => {
    if (depth < 0 || !existsSync(base)) return null;
    let entries;
    try {
      entries = readdirSync(base, { withFileTypes: true });
    } catch {
      return null;
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (e.name === 'theme-defaults') return join(base, e.name);
      const hit = walk(join(base, e.name), depth - 1);
      if (hit) return hit;
    }
    return null;
  };

  const candidates = [];
  for (const root of winRoots) for (const app of apps) candidates.push(join(root, app));
  for (const root of unixRoots) for (const app of apps) candidates.push(join(root, app));

  for (const c of candidates) {
    // 安装目录下可能有一层版本哈希目录（如 .../Microsoft VS Code/<hash>/resources/...）
    const hit = walk(c, 4);
    if (hit) return hit;
    const mac = join(c + '.app', 'Contents', 'Resources', 'app', 'extensions', 'theme-defaults');
    if (existsSync(mac)) return mac;
  }
  return null;
}

const EXT_DIR = findThemeDefaults();
if (!EXT_DIR) {
  console.error('未找到 vscode.theme-defaults 扩展目录。');
  console.error('请用 VSCODE_THEME_DEFAULTS=<路径> 显式指定，例如：');
  console.error('  VSCODE_THEME_DEFAULTS="/c/.../resources/app/extensions/theme-defaults"');
  process.exit(1);
}
// 主题 JSON 在扩展目录下的 themes/ 里
const THEME_DIR = join(EXT_DIR, 'themes');
if (!existsSync(THEME_DIR)) {
  console.error('主题目录下没有 themes/ 子目录:', THEME_DIR);
  process.exit(1);
}
console.log('主题目录:', THEME_DIR);

/* ---------- 2. 读取主题（含 include 链） ---------- */

function loadTheme(file) {
  const j = JSON.parse(readFileSync(join(THEME_DIR, file), 'utf8'));
  const out = { name: j.name, rules: [] };
  if (j.include) out.rules.push(...loadTheme(j.include.replace(/^\.\//, '')).rules);
  for (const e of j.tokenColors || []) {
    const scope = Array.isArray(e.scope) ? e.scope : [e.scope];
    out.rules.push([scope.filter(Boolean), e.settings || {}]);
  }
  return out;
}

/** 在文本中取 path 段（保留 # / :: 等后续段） */
function parseScope(s) {
  return String(s).split(' ')[0].split('.');
}

function segMatch(scopeParts, selParts) {
  if (selParts.length > scopeParts.length) return false;
  return selParts.every((b, i) => b === '*' || b === scopeParts[i]);
}

/** 解析某个 scope 下 prop 的取值；忽略带祖先上下文的选择器 */
function resolveScope(scope, rules, prop) {
  const scopeParts = scope.split('.');
  let best = null;
  rules.forEach(([sels, settings], order) => {
    if (!(prop in settings)) return;
    for (const sel of sels) {
      const s = String(sel).trim();
      if (s.includes(' ')) continue;
      const selParts = parseScope(s);
      if (segMatch(scopeParts, selParts)) {
        const key = [selParts.length, order];
        if (!best || key[0] > best.key[0] || (key[0] === best.key[0] && key[1] >= best.key[1])) {
          best = { key, value: settings[prop] };
        }
      }
    }
  });
  return best ? best.value : null;
}

/* ---------- 3. Rouge/Pygments class -> TextMate scope 映射 ---------- */

const GROUPS = [
  ['注释', 'comment', ['.c', '.c1', '.cm', '.cs', '.cd', '.go', '.gp', '.gr', '.ge', '.gt']],
  ['预处理指令', 'keyword.control', ['.cp']],
  ['关键字', 'keyword', ['.k', '.kc', '.kd', '.kn', '.kp', '.kr', '.kv']],
  ['类型关键字', 'storage.type', ['.kt']],
  ['运算符', 'keyword.operator', ['.o', '.ow']],
  ['数字', 'constant.numeric', ['.m', '.mb', '.mf', '.mh', '.mi', '.mo', '.mx', '.il']],
  ['字符串', 'string', ['.s', '.s1', '.s2', '.sa', '.sb', '.sc', '.sd', '.sh', '.si', '.sx', '.ss']],
  ['头文件名', 'string.quoted.other.lt-gte', ['.cpf']],
  ['正则', 'string.regexp', ['.sr']],
  ['转义字符', 'constant.character.escape', ['.se']],
  ['函数名', 'entity.name.function', ['.nf', '.gs']],
  ['标识符', 'entity.name', ['.ni']],
  ['内置函数', 'support.function', ['.nb']],
  ['内置伪名', 'support.constant', ['.bp']],
  ['常量', 'constant', ['.no']],
  ['类 / 类型', 'entity.name.class', ['.nc', '.ne', '.nn']],
  ['标签', 'entity.name.tag', ['.nt']],
  ['属性名', 'entity.other.attribute-name', ['.na']],
  ['伪类 / 伪元素', 'entity.other.attribute-name.pseudo-class', ['.nd']],
  ['CSS 属性名', 'support.type.property-name', ['.nl']],
  ['CSS 属性值', 'support.constant.property-value', ['.nx']],
  ['变量', 'variable', ['.nv', '.vc', '.vg', '.vi']],
  ['错误', 'invalid', ['.err']],
  ['新增行', 'markup.inserted', ['.gi']],
  ['删除行', 'markup.deleted', ['.gd']],
  ['变更行', 'markup.changed', ['.gu']],
  ['标题', 'markup.heading', ['.gh']],
];

function build(file) {
  const theme = loadTheme(file);
  const rows = GROUPS.map(([label, scope, classes]) => {
    const fg = resolveScope(scope, theme.rules, 'foreground');
    const fs = resolveScope(scope, theme.rules, 'fontStyle') || '';
    return { label, scope, classes, fg, fs };
  });
  return { name: theme.name, rows };
}

const light = build('2026-light.json');
const dark = build('2026-dark.json');

/* ---------- 4. 生成 CSS ---------- */

function emitGroup(rows, indent = '') {
  return rows
    .filter((r) => r.fg)
    .map(({ label, scope, classes, fg, fs }) => {
      const sel = classes.map((c) => `${indent}.highlight ${c}`).join(',\n');
      let decl = `color: ${fg};`;
      if (fs.includes('bold')) decl += ' font-weight: bold;';
      if (fs.includes('italic')) decl += ' font-style: italic;';
      if (fs.includes('underline')) decl += ' text-decoration: underline;';
      return `${indent}/* ${label} ← ${scope} */\n${sel} {\n${indent}    ${decl}\n${indent}}`;
    })
    .join('\n\n');
}

const HEADER = `/*
 * 代码配色：取自 VS Code 内置默认主题扩展 vscode.theme-defaults
 *   · 浅色 "2026 Light"
 *   · 深色 "2026 Dark"
 *
 * 本文件只负责"不同 token 类型各自的文字颜色"。代码框与行内代码的**背景色**、
 * 以及**无类型文本**（未落入任何 token 的代码，如 Rouge 的 .n / .p）的基色，
 * 仍由 common.css 用站点主题色控制：
 *   --brand-primary-soft   背景
 *   --brand-primary-hover  无类型文本
 * 所以这里不写 .highlight 的背景色与基底文字色，也不给 .n / .p 定义颜色。
 *
 * 已用各语言的真实 Rouge 渲染结果核对过覆盖范围：
 *   bash/shell、PowerShell、Python、MATLAB、C、C++、Kotlin、CSS。
 * 仍未配色的 class 剩 .n / .p（普通标识符与标点）、.w（空白）与 .py（Kotlin 属性名），
 * 它们在 VS Code 里本来就是"默认前景色"，所以这里同样让它们继承站点主题色。
 *
 * 主题用 TextMate scope 描述 token 颜色，脚本按下述映射折算到 Rouge/Pygments 的
 * class 上。带祖先上下文的选择器（如 \`string variable\`）需要 scope 栈才能判定，
 * 生成脚本会忽略它们，只取无上下文的选择器。
 *
 * 本文件由脚本生成：node scripts/gen-syntax.mjs
 * 改配色请改主题或脚本后重新生成，不要手改。
 */

.highlight table td { padding: 5px; }
.highlight table pre { margin: 0; }
`;

let out = HEADER + '\n' + emitGroup(light.rows) + '\n';
out += '\n@media (prefers-color-scheme: dark) {\n';
out += emitGroup(dark.rows, '    ');
out += '\n}\n';

writeFileSync(OUT, out, 'utf8');
console.log('已写入', OUT, `(${out.length} 字符)`);

console.log('\n==== token 颜色（light / dark）====');
for (const [l, d] of light.rows.map((r, i) => [r, dark.rows[i]])) {
  if (!l.fg && !d.fg) continue;
  console.log(`  ${l.scope.padEnd(40)} ${String(l.fg).padEnd(9)} / ${String(d.fg).padEnd(9)} ${l.fs || '-'}`);
}
