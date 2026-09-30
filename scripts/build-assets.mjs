import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vendorDir = join(root, 'assets', 'vendor');
const cacheDir = join(root, '.cache');
const iconData = join(root, 'node_modules', '@primer', 'octicons', 'build', 'data.json');
const icons = JSON.parse(readFileSync(iconData, 'utf8'));
mkdirSync(cacheDir, { recursive: true });
const outputDir = mkdtempSync(join(cacheDir, 'assets-'));

try {
  const entryPoints = { app: join(root, 'src', 'js', 'main.js') };
  const donateEntry = join(root, 'src', 'js', 'donate.js');
  if (existsSync(donateEntry)) entryPoints.donate = donateEntry;
  await build({
    entryPoints,
    outdir: outputDir,
    bundle: true,
    splitting: true,
    minify: true,
    format: 'esm',
    target: ['es2020'],
    chunkNames: 'chunks/[name]-[hash]',
    legalComments: 'linked',
    logLevel: 'warning',
  });

  await build({
    entryPoints: [join(root, 'src', 'css', 'main.css')],
    bundle: true,
    minify: true,
    outfile: join(outputDir, 'app.css'),
    loader: { '.woff': 'file', '.woff2': 'file', '.ttf': 'file', '.eot': 'file', '.svg': 'file' },
    assetNames: 'fonts/[name]-[hash]',
    legalComments: 'linked',
    logLevel: 'warning',
  });

  const symbols = Object.entries(icons).map(([name, icon]) => {
    const height = icon.heights['16']
      ? 16
      : icon.heights['24']
        ? 24
        : Number(Object.keys(icon.heights)[0]);
    const variant = icon.heights[height];
    if (!variant) throw new Error(`No supported Octicon size: ${name}`);
    return `<symbol id="icon-${name}" viewBox="0 0 ${variant.width} ${height}">${variant.path}</symbol>`;
  });
  writeFileSync(
    join(outputDir, 'octicons.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg">\n${symbols.join('\n')}\n</svg>\n`,
  );

  // Publish only after every build step succeeds, preserving the last usable assets on errors.
  if (resolve(vendorDir) !== join(root, 'assets', 'vendor'))
    throw new Error('Invalid asset destination');
  rmSync(vendorDir, { recursive: true, force: true });
  renameSync(outputDir, vendorDir);
  console.log('Frontend assets built successfully (ES modules and lazy-loaded math/diagrams).');
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}
