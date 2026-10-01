import assert from 'node:assert/strict';
import test from 'node:test';
import {
  prepareSearchIndex,
  searchDocuments,
  matchingRanges,
  searchExcerpt,
  searchResultExcerpt,
} from '../src/js/search-engine.js';

test('search ranks exact titles before tags and body, breaking ties by date', () => {
  const index = prepareSearchIndex([
    { title: '正文匹配', content: '光学', url: '/body' },
    { title: '分类匹配', tags: ['光学'], url: '/tag' },
    { title: '光学', date: '2026-01-01', url: '/old' },
    { title: '光学', date: '2026-09-01', url: '/new' },
  ]);
  assert.deepEqual(
    searchDocuments(index, '光学').map((entry) => entry.url),
    ['/new', '/old', '/tag', '/body'],
  );
  assert.deepEqual(searchDocuments(index, '  '), []);
});

test('search requires all terms across fields and supports CJK, case and fullwidth input', () => {
  const index = prepareSearchIndex([
    { title: '光学笔记', tags: ['Python'], content: '频谱处理', url: '/match' },
    { title: '光学笔记', tags: ['Java'], url: '/other' },
  ]);
  assert.deepEqual(
    searchDocuments(index, '光学 ＰＹＴＨＯＮ').map((entry) => entry.url),
    ['/match'],
  );
  assert.equal(searchDocuments(index, '光学 频谱').length, 1);
  assert.equal(searchDocuments(index, '光学 量子').length, 0);
});

test('literal punctuation in code searches does not become regular expressions', () => {
  const index = prepareSearchIndex([
    { title: 'C++ [a+b]', url: '/cpp' },
    { title: 'C# ab', url: '/csharp' },
  ]);
  assert.equal(searchDocuments(index, 'C++')[0].url, '/cpp');
  assert.equal(searchDocuments(index, '[a+b]')[0].url, '/cpp');
  assert.deepEqual(matchingRanges('C++ [a+b]', 'C++ [a+b]'), [
    [0, 3],
    [4, 9],
  ]);
});

test('结果元信息合并大小写和全角重复标签，保留原有名称及检索能力', () => {
  const [document] = prepareSearchIndex([
    { title: '样例', url: '/note', tags: [' CSS ', 'css', 'ＣＳＳ', '', null, 'C++'] },
  ]);
  assert.deepEqual(document.tags, ['CSS', 'C++']);
  assert.equal(searchDocuments([document], 'css')[0], document);
  assert.equal(searchDocuments([document], 'C++')[0], document);
});

test('the index rejects external or executable links and removes duplicate pages', () => {
  const index = prepareSearchIndex([
    { title: '有效页面', url: '/preview/page.html' },
    { title: '重复页面', url: '/preview/page.html' },
    { title: '脚本', url: 'javascript:alert(1)' },
    { title: '跨域', url: '//example.com/' },
    { title: '反斜线', url: '/\\example.com/' },
    null,
  ]);
  assert.equal(index.length, 1);
  assert.equal(index[0].title, '有效页面');
  assert.throws(() => prepareSearchIndex({}), TypeError);
});

test('highlight ranges preserve Unicode text and merge overlapping terms', () => {
  assert.deepEqual(matchingRanges('光学 Ｐｙｔｈｏｎ', 'python'), [[3, 9]]);
  assert.deepEqual(matchingRanges('cafe\u0301', 'café'), [[0, 5]]);
  assert.deepEqual(matchingRanges('ﬀ', 'ff'), [[0, 1]]);
  assert.deepEqual(matchingRanges('JavaJava', 'Java JavaJava'), [[0, 8]]);
});

test('snippets show the actual matching context without breaking surrogate pairs', () => {
  const content = '开头。'.repeat(100) + '频谱分析 ' + '🙂'.repeat(100);
  const excerpt = searchExcerpt(content, '频谱', 71);
  assert.ok(excerpt.includes('频谱分析'));
  assert.ok(excerpt.startsWith('…') && excerpt.endsWith('…'));
  assert.ok(excerpt.isWellFormed());
  assert.equal(searchExcerpt('  一条 笔记  ', '笔记'), '一条 笔记');
});

test('公式摘要可读且可用符号检索，直接查 LaTeX 命令仍显示源码', () => {
  const [document] = prepareSearchIndex([
    {
      title: '电磁波',
      url: '/waves',
      content: String.raw`传播条件：$\alpha_1=0$，$\beta_1=k_1$。`,
      excerpt: '传播条件：α_(1)=0，β_(1)=k_(1)。',
    },
  ]);
  assert.equal(searchResultExcerpt(document, '传播'), document.excerpt);
  assert.equal(searchDocuments([document], 'α')[0], document);
  assert.deepEqual(matchingRanges(searchResultExcerpt(document, 'α'), 'α'), [[5, 6]]);
  assert.equal(searchDocuments([document], 'alpha')[0], document);
  assert.equal(searchResultExcerpt(document, 'alpha'), document.content);
  assert.equal(searchResultExcerpt(document, '电磁波 alpha'), document.content);
  const [ordinary] = prepareSearchIndex([{ title: '普通文章', url: '/post', content: '正文匹配' }]);
  assert.equal(searchResultExcerpt(ordinary, '正文'), '正文匹配');
});
