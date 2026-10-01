export function normalizeSearch(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase();
}

export function queryTerms(query) {
  return [...new Set(normalizeSearch(query).trim().split(/\s+/u).filter(Boolean))];
}

export function prepareSearchIndex(entries) {
  if (!Array.isArray(entries)) throw new TypeError('Invalid search index');
  const seen = new Set();
  return entries.flatMap((entry) => {
    if (
      !entry ||
      typeof entry.title !== 'string' ||
      typeof entry.url !== 'string' ||
      !entry.url.startsWith('/') ||
      entry.url.startsWith('//') ||
      entry.url.includes('\\') ||
      seen.has(entry.url)
    )
      return [];
    seen.add(entry.url);
    const document = {
      title: entry.title,
      url: entry.url,
      type: entry.type === 'post' ? 'post' : 'page',
      date: typeof entry.date === 'string' ? entry.date : '',
      tags: Array.isArray(entry.tags) ? entry.tags.filter((tag) => typeof tag === 'string') : [],
      content: typeof entry.content === 'string' ? entry.content : '',
    };
    const title = normalizeSearch(document.title);
    const tags = normalizeSearch(document.tags.join(' '));
    const content = normalizeSearch(document.content);
    return [
      { ...document, fields: { title, tags, content, all: [title, tags, content].join(' ') } },
    ];
  });
}

export function searchDocuments(documents, query) {
  const terms = queryTerms(query);
  if (!terms.length) return [];
  const phrase = normalizeSearch(query).trim();
  return documents
    .filter((document) => terms.every((term) => document.fields.all.includes(term)))
    .map((document) => {
      let score = document.fields.title === phrase ? 100 : 0;
      if (document.fields.title.startsWith(phrase)) score += 30;
      for (const term of terms) {
        if (document.fields.title.includes(term)) score += 60;
        if (document.fields.tags.includes(term)) score += 25;
        if (document.fields.content.includes(term)) score += 5;
      }
      return { document, score };
    })
    .sort(
      (first, second) =>
        second.score - first.score || second.document.date.localeCompare(first.document.date),
    )
    .map(({ document }) => document);
}

// Map normalized matches back to the original text, preserving CJK and Unicode typography.
export function matchingRanges(text, query) {
  const original = String(text);
  const terms = queryTerms(query);
  if (!terms.length) return [];
  const units =
    typeof Intl.Segmenter === 'function'
      ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(original)
      : [...original].map((segment) => ({ segment }));
  let normalized = '';
  let offset = 0;
  const positions = [];
  for (const { segment } of units) {
    const part = normalizeSearch(segment);
    for (let index = 0; index < part.length; index += 1) {
      positions.push([offset, offset + segment.length]);
    }
    normalized += part;
    offset += segment.length;
  }
  const ranges = [];
  for (const term of terms) {
    let start = normalized.indexOf(term);
    while (start !== -1) {
      ranges.push([positions[start][0], positions[start + term.length - 1][1]]);
      start = normalized.indexOf(term, start + term.length);
    }
  }
  ranges.sort((first, second) => first[0] - second[0]);
  const merged = [];
  for (const range of ranges) {
    const previous = merged.at(-1);
    if (previous && range[0] <= previous[1]) previous[1] = Math.max(previous[1], range[1]);
    else merged.push([...range]);
  }
  return merged;
}

export function searchExcerpt(text, query, limit = 160) {
  const source = String(text).replace(/\s+/gu, ' ').trim();
  const firstMatch = matchingRanges(source, query)[0];
  let start = Math.max(0, (firstMatch?.[0] ?? 0) - 40);
  let end = Math.min(source.length, start + limit);
  if (/[\uDC00-\uDFFF]/u.test(source[start] ?? '')) start -= 1;
  if (/[\uDC00-\uDFFF]/u.test(source[end] ?? '')) end += 1;
  return (start ? '…' : '') + source.slice(start, end).trim() + (end < source.length ? '…' : '');
}
