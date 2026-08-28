import { mkdirSync, copyFileSync, cpSync, rmSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'esbuild';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const vendorDir = join(root, 'assets', 'vendor');
const nodeModules = join(root, 'node_modules');
const srcDir = join(root, 'src');

rmSync(vendorDir, { recursive: true, force: true });
mkdirSync(vendorDir, { recursive: true });

// 1. Bundle JavaScript with esbuild.
await build({
  entryPoints: [join(srcDir, 'js', 'main.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2018'],
  outfile: join(vendorDir, 'app.js'),
  logLevel: 'info'
});

// 2. Bundle CSS with esbuild.
await build({
  entryPoints: [join(srcDir, 'css', 'main.css')],
  bundle: true,
  minify: true,
  outfile: join(vendorDir, 'app.css'),
  loader: {
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
    '.svg': 'file'
  },
  assetNames: 'assets/[name]-[hash]',
  logLevel: 'info'
});

// 3. Copy runtime files used by the custom math and Mermaid scripts.
const katexRuntime = [
  ['katex/dist/katex.min.js', 'katex.min.js'],
  ['katex/dist/contrib/auto-render.min.js', 'auto-render.min.js'],
  ['mermaid/dist/mermaid.min.js', 'mermaid.min.js'],
];
for (const [src, dest] of katexRuntime) {
  const srcPath = join(nodeModules, src);
  const destPath = join(vendorDir, dest);
  if (!existsSync(srcPath)) {
    console.error(`Missing frontend asset: ${srcPath}`);
    process.exit(1);
  }
  copyFileSync(srcPath, destPath);
  console.log(`Copied ${src} -> ${destPath}`);
}

// 4. Copy KaTeX fonts as a fallback.
const katexFontsSrc = join(nodeModules, 'katex', 'dist', 'fonts');
const katexFontsDest = join(vendorDir, 'fonts');
if (existsSync(katexFontsSrc)) {
  cpSync(katexFontsSrc, katexFontsDest, { recursive: true });
  console.log(`Copied ${katexFontsSrc} -> ${katexFontsDest}`);
}

// 5. Build or copy the Octicons SVG sprite.
const octiconsDir = join(nodeModules, '@primer', 'octicons', 'build');
const spriteSource = join(octiconsDir, 'sprite-octicons.svg');
const dataSource = join(octiconsDir, 'data.json');
const octiconDest = join(vendorDir, 'octicons.svg');

if (existsSync(spriteSource)) {
  copyFileSync(spriteSource, octiconDest);
  console.log(`Copied ${spriteSource} -> ${octiconDest}`);
} else if (existsSync(dataSource)) {
  const data = JSON.parse(readFileSync(dataSource, 'utf8'));
  const symbols = Object.keys(data).map((name) => {
    const icon = data[name];
    const heights = icon.heights || {};
    const chosenKey = heights['16'] ? '16' : (heights['24'] ? '24' : null);
    const chosen = chosenKey ? heights[chosenKey] : null;
    const width = chosen ? chosen.width : 16;
    const height = chosenKey ? parseInt(chosenKey, 10) : 16;
    return `<symbol id="icon-${name}" viewBox="0 0 ${width} ${height}">${chosen ? chosen.path : ''}</symbol>`;
  }).join('\n');
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols}\n</svg>`;
  writeFileSync(octiconDest, sprite, 'utf8');
  console.log(`Generated ${octiconDest} from data.json`);
} else {
  console.error('Missing @primer/octicons build data. Please run npm install.');
  process.exit(1);
}

console.log('Frontend assets built successfully.');
