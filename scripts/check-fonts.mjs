import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, 'scripts/font-subsets.json'), 'utf8'));
const manifest = JSON.parse(readFileSync(join(root, 'assets/fonts/web/manifest.json'), 'utf8'));
const css = readFileSync(join(root, 'assets/css/fonts.css'), 'utf8');
const faces = [...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].map((match) => match[1]);
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
let checked = 0;

if (manifest.version !== 1 || manifest.fonts.length !== config.fonts.length)
  throw new Error('字体清单与配置不一致，请重新生成分片。');

for (const settings of config.fonts) {
  const font = manifest.fonts.find((item) => item.id === settings.id);
  if (
    !font ||
    font.source !== settings.source ||
    font.family !== settings.family ||
    font.weight !== settings.weight ||
    JSON.stringify(font.unicodeRanges) !== JSON.stringify(settings.unicodeRanges ?? [])
  )
    throw new Error(`字体配置已变化，请重新生成分片：${settings.id}`);
  if (sha256(readFileSync(join(root, 'assets/fonts', settings.source))) !== font.sourceSha256)
    throw new Error(`原字体已变化，请重新生成分片：${settings.source}`);

  const coverage = new Set();
  for (const part of font.parts) {
    if (!/^[a-z]+-(?:core|\d{3})-[a-f0-9]{12}\.woff2$/.test(part.file))
      throw new Error(`无效字体分片路径：${part.file}`);
    const data = readFileSync(join(root, 'assets/fonts/web', part.file));
    if (
      data.toString('ascii', 0, 4) !== 'wOF2' ||
      data.length !== part.bytes ||
      sha256(data) !== part.sha256
    )
      throw new Error(`字体分片缺失或被修改：${part.file}`);
    const face = faces.find((value) => value.includes(`../fonts/web/${part.file}`));
    if (
      !face ||
      !face.includes(`font-family: '${font.family}';`) ||
      !face.includes(`font-weight: ${font.weight};`) ||
      !face.includes('font-display: swap;')
    )
      throw new Error(`CSS 字体声明与清单不一致：${part.file}`);
    const ranges = face
      .match(/unicode-range:\s*([^;]+);/)?.[1]
      .split(',')
      .map((value) => value.trim());
    if (JSON.stringify(ranges) !== JSON.stringify(part.ranges))
      throw new Error(`CSS 字符范围与清单不一致：${part.file}`);
    let characters = 0;
    for (const range of part.ranges) {
      const match = range.match(/^U\+([0-9A-F]{1,6})(?:-([0-9A-F]{1,6}))?$/);
      if (!match) throw new Error(`无效字符范围：${range}`);
      const start = Number.parseInt(match[1], 16);
      const end = Number.parseInt(match[2] ?? match[1], 16);
      if (start > end || end > 0x10ffff) throw new Error(`无效字符范围：${range}`);
      for (let point = start; point <= end; point += 1) {
        if (coverage.has(point)) throw new Error(`分片字符范围重叠：${range}`);
        coverage.add(point);
        characters += 1;
      }
    }
    if (characters !== part.characters) throw new Error(`分片字符数量不一致：${part.file}`);
    checked += 1;
  }
  const points = [...coverage]
    .sort((a, b) => a - b)
    .map((point) => point.toString(16).toUpperCase());
  if (coverage.size !== font.characters || sha256(points.join(' ')) !== font.charactersSha256)
    throw new Error(`分片未完整覆盖原字体字符范围：${font.family}`);
}
if (faces.length !== checked) throw new Error('CSS 存在未记录的字体分片。');
console.log(`字体检查通过（${manifest.fonts.length} 种字体，${checked} 个分片）。`);
