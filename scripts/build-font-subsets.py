"""为现有字体生成覆盖完整字符范围、按需下载的网页分片。"""

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
import types
import uuid
from concurrent.futures import ProcessPoolExecutor
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'assets/fonts'
OUTPUT = FONTS / 'web'
CSS = ROOT / 'assets/css/fonts.css'


def install_brotli_adapter():
    # 复用前端构建已有的 Node，不增加日常构建依赖。
    adapter = types.ModuleType('brotli')
    adapter.MODE_FONT = 2
    adapter.MODE_TEXT = 1

    def compress(data, mode=2):
        script = "const z=require('node:zlib');process.stdout.write(z.brotliCompressSync(require('node:fs').readFileSync(0),{params:{[z.constants.BROTLI_PARAM_MODE]:Number(process.argv[1]),[z.constants.BROTLI_PARAM_QUALITY]:11}}))"
        return subprocess.run(['node', '-e', script, str(mode)], input=data,
                              capture_output=True, check=True).stdout

    adapter.compress = compress
    adapter.decompress = lambda data: subprocess.run(
        ['node', '-e', "process.stdout.write(require('node:zlib').brotliDecompressSync(require('node:fs').readFileSync(0)))"],
        input=data, capture_output=True, check=True).stdout
    sys.modules['brotli'] = adapter


install_brotli_adapter()
try:
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError as error:
    raise SystemExit('生成字体分片需要 FontTools：python -m pip install fonttools==4.63.0') from error


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hidden_depth = 0
        self.characters = set()

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.hidden_depth += 1

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.hidden_depth -= 1

    def handle_data(self, text):
        if not self.hidden_depth:
            self.characters.update(map(ord, text))


def unicode_ranges(characters):
    """精确合并相邻码点，不让分片之间出现范围重叠。"""
    values = sorted(characters)
    result = []
    for value in values:
        if result and value == result[-1][1] + 1:
            result[-1][1] = value
        else:
            result.append([value, value])
    return [f'U+{start:X}' if start == end else f'U+{start:X}-{end:X}' for start, end in result]


def allowed_characters(cmap, filters):
    if not filters:
        return set(cmap)
    intervals = []
    for value in filters:
        match = re.fullmatch(r'U\+([0-9A-Fa-f]{1,6})(?:-([0-9A-Fa-f]{1,6}))?', value)
        if not match:
            raise ValueError(f'无效字符范围：{value}')
        start, end = int(match[1], 16), int(match[2] or match[1], 16)
        if not 0 <= start <= end <= 0x10FFFF:
            raise ValueError(f'无效字符范围：{value}')
        intervals.append((start, end))
    return {point for point in cmap if any(start <= point <= end for start, end in intervals)}


def variation_sequences(font):
    return {selector: sequences for table in font['cmap'].tables if table.format == 14
            for selector, sequences in table.uvsDict.items()}


def rename_web_family(font, family):
    # 思源字体保留了 Source 名称；网页分片作为修改版采用独立内部名称。
    names = font['name']
    original_ps = names.getDebugName(6).split('-')[0]
    web_ps = family.replace(' ', '')
    protected = {0, 5, 7, 8, 9, 10, 11, 12, 13, 14}
    for record in names.names:
        text = record.toUnicode()
        if record.nameID in (1, 4, 16, 21):
            text = family
        elif record.nameID == 3:
            text = f'{names.getDebugName(5)};{web_ps}'
        elif record.nameID == 25:
            text = web_ps
        elif record.nameID not in protected:
            text = text.replace(original_ps, web_ps)
        if text != record.toUnicode():
            record.string = text.encode(record.getEncoding())
    for tag in ('CFF ', 'CFF2'):
        if tag not in font:
            continue
        cff = font[tag].cff
        cff.fontNames = [name.replace(original_ps, web_ps) for name in cff.fontNames]


def build_part(task):
    settings, label, characters, selectors, temporary = task
    source = (FONTS / settings['source']).resolve()
    if source.parent != FONTS.resolve():
        raise ValueError('字体源文件必须位于 assets/fonts')
    font = TTFont(source, recalcTimestamp=False)
    original_cmap = font.getBestCmap()
    original_metrics = {point: font['hmtx'].metrics[original_cmap[point]] for point in characters}
    options = subset.Options()
    options.layout_features = ['*']
    options.name_IDs = ['*']
    options.name_languages = ['*']
    options.name_legacy = True
    options.glyph_names = True
    options.notdef_outline = True
    options.recalc_timestamp = False
    options.prune_unicode_ranges = False
    options.prune_codepage_ranges = False
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=characters | selectors)
    worker.subset(font)
    if settings.get('rename'):
        rename_web_family(font, settings['family'])
    font.flavor = 'woff2'
    destination = Path(temporary) / f"{settings['id']}-{label}.woff2"
    font.save(destination)
    font.close()
    # 核对保存后的实际字符映射和字宽，不依赖生成器的预期数量。
    converted = TTFont(destination, recalcTimestamp=False)
    cmap = converted.getBestCmap()
    if set(cmap) != characters:
        raise ValueError(f'分片字符范围不一致：{destination.name}')
    if any(converted['hmtx'].metrics[cmap[point]] != metric
           for point, metric in original_metrics.items()):
        raise ValueError(f'分片字形度量不一致：{destination.name}')
    converted.close()
    digest = hashlib.sha256(destination.read_bytes()).hexdigest()
    filename = f"{settings['id']}-{label}-{digest[:12]}.woff2"
    destination.rename(destination.with_name(filename))
    return {'file': filename, 'characters': len(characters), 'ranges': unicode_ranges(characters),
            'bytes': destination.with_name(filename).stat().st_size, 'sha256': digest}


def write_atomic(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', newline='\n',
                                     dir=path.parent, delete=False) as output:
        output.write(text)
        temporary = Path(output.name)
    try:
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', default='_site', help='用已有构建产物选择常用字符')
    parser.add_argument('--workers', default=2, type=int, help='字体生成并行数，默认 2')
    args = parser.parse_args()
    site = (ROOT / args.site).resolve()
    if not (site / 'index.html').is_file():
        parser.error('请先构建站点，或用 --site 指定已构建的站点目录')
    if args.workers < 1:
        parser.error('--workers 至少为 1')
    used = set()
    for page in site.rglob('*.html'):
        visible = VisibleText()
        visible.feed(page.read_text(encoding='utf-8'))
        used.update(visible.characters)
    config = json.loads((ROOT / 'scripts/font-subsets.json').read_text(encoding='utf-8'))
    chunk_size = config['chunkSize']
    if not isinstance(chunk_size, int) or chunk_size < 1:
        raise ValueError('chunkSize 必须为正整数')
    manifest = {'version': 1, 'fonts': []}
    css = ['/* 由 scripts/build-font-subsets.py 生成；保留原字体文件，分片按字符加载。 */\n']
    cache = ROOT / '.cache'
    cache.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='font-subsets-', dir=cache) as temporary:
        for settings in config['fonts']:
            source = (FONTS / settings['source']).resolve()
            if source.parent != FONTS.resolve():
                raise ValueError('字体源文件必须位于 assets/fonts')
            original = TTFont(source, recalcTimestamp=False)
            cmap = original.getBestCmap()
            allowed = allowed_characters(cmap, settings.get('unicodeRanges', []))
            sequences = variation_sequences(original)
            # 拉丁、标点和组合字符集中放置，避免同一词内跨字体分片。
            core = allowed & (used | {point for point in allowed if point < 0x3400 or 0xFF00 <= point <= 0xFFEF})
            selectors = set()
            for selector, variations in sequences.items():
                bases = {point for point, _glyph in variations if point in allowed}
                if bases:
                    core.update(bases)
                    selectors.add(selector)
            rest = sorted(allowed - core)
            parts = [('core', core, selectors)] + [
                (f'{index // chunk_size + 1:03}', set(rest[index:index + chunk_size]), set())
                for index in range(0, len(rest), chunk_size)
            ]
            print(f"正在生成 {settings['family']}：{len(parts)} 个分片，常用字符 {len(core)} 个", flush=True)
            tasks = [(settings, label, points, selector_values, temporary)
                     for label, points, selector_values in parts if points]
            with ProcessPoolExecutor(max_workers=args.workers) as executor:
                records = list(executor.map(build_part, tasks))
            font_record = {'id': settings['id'], 'source': settings['source'],
                           'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                           'family': settings['family'], 'weight': settings['weight'],
                           'unicodeRanges': settings.get('unicodeRanges', []),
                           'characters': len(allowed),
                           'charactersSha256': hashlib.sha256(' '.join(f'{point:X}' for point in sorted(allowed)).encode()).hexdigest(),
                           'parts': records}
            manifest['fonts'].append(font_record)
            original.close()
            for record in records:
                css.append('\n'.join([
                    '@font-face {', f"  font-family: '{settings['family']}';",
                    f"  src: url('../fonts/web/{record['file']}') format('woff2');",
                    f"  font-weight: {settings['weight']};", '  font-style: normal;',
                    '  font-display: swap;', f"  unicode-range: {', '.join(record['ranges'])};", '}\n'
                ]))
            print(f"完成 {settings['family']}：常用分片 {records[0]['bytes']:,} 字节，完整覆盖 {len(allowed):,} 个字符", flush=True)
        # 所有分片成功后再发布 CSS，失败时继续使用上次完整结果。
        OUTPUT.mkdir(parents=True, exist_ok=True)
        for path in Path(temporary).glob('*.woff2'):
            # 复制到发布目录后再替换，避免沿用临时目录的受限访问权限。
            published = OUTPUT / f'.{uuid.uuid4().hex}.tmp'
            try:
                shutil.copyfile(path, published)
                published.replace(OUTPUT / path.name)
            finally:
                published.unlink(missing_ok=True)
        write_atomic(OUTPUT / 'manifest.json', json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
        write_atomic(CSS, '\n'.join(css))
    print(f'字体分片已写入 {OUTPUT.relative_to(ROOT)}；无需为新文章重新生成。', flush=True)


if __name__ == '__main__':
    main()
