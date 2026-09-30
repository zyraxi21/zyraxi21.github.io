import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: { site: { type: 'string', default: '_site' }, baseurl: { type: 'string', default: '' } },
});
const site = resolve(root, values.site);
const baseurl = values.baseurl.replace(/\/$/, '');
const errors = [];
let checked = 0;

function* files(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

function checkReference(reference, origin, documentPath) {
  if (!reference || /^(?:#|data:|https?:|\/\/|mailto:|tel:)/i.test(reference)) return;
  const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
  let path;
  if (pathname.startsWith('/')) {
    if (baseurl && !pathname.startsWith(`${baseurl}/`) && pathname !== baseurl) {
      errors.push(`${documentPath}: URL does not include baseurl: ${reference}`);
      return;
    }
    path = join(site, pathname.slice(baseurl.length));
  } else {
    path = resolve(origin, pathname);
  }
  checked += 1;
  if (!existsSync(path) && !existsSync(`${path}.html`) && !existsSync(join(path, 'index.html'))) {
    errors.push(`${documentPath}: Missing local resource: ${reference}`);
  }
}

if (!existsSync(join(site, 'index.html'))) throw new Error(`Build the site first: ${site}`);
for (const forbidden of [
  'src',
  'scripts',
  'tests',
  'docs',
  'node_modules',
  'package.json',
  'package-lock.json',
  'dump.html',
  'fetched-page.html',
  'fetched-page2.html',
]) {
  if (existsSync(join(site, forbidden))) errors.push(`Development file published: ${forbidden}`);
}

for (const path of files(site)) {
  const extension = extname(path);
  if (!['.html', '.css', '.js'].includes(extension)) continue;
  const text = readFileSync(path, 'utf8');
  if (extension === '.html') {
    for (const tag of text.matchAll(/<(?:script|link|img|use|a)\b[^>]*>/gi)) {
      const attribute = tag[0].match(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/i);
      if (attribute) checkReference(attribute[2].replace(/&amp;/g, '&'), dirname(path), path);
    }
    if (/\bhre\s*=|href=["']javascript:/i.test(text))
      errors.push(`${path}: Invalid navigation attribute`);
  } else if (extension === '.css') {
    for (const match of text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
      checkReference(match[1], dirname(path), path);
    }
  } else if (statSync(path).size < 10000000) {
    for (const match of text.matchAll(
      /(?:\bfrom\s*|\bimport\s*\(?\s*)["'](\.{1,2}\/[^"']+)["']/g,
    )) {
      checkReference(match[1], dirname(path), path);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Site checks passed (${checked} local references; baseurl=${baseurl || '/'}).`);
}
