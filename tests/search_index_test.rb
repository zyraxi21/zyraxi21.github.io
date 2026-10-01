require 'jekyll'
require_relative '../_plugins/search_index'

SearchDocument = Struct.new(:data, :url, :output, :output_ext, :pager, :content)
SearchPosts = Struct.new(:docs)
SearchSite = Struct.new(:config, :posts, :pages)

def assert_equal(expected, actual, label)
  return if expected == actual
  abort "#{label}\nExpected: #{expected.inspect}\nActual: #{actual.inspect}"
end

post = SearchDocument.new(
  { 'title' => '科学笔记', 'date' => Time.utc(2026, 9, 1), 'tags' => ['光学'], 'categories' => ['笔记'] },
  '/blog/note.html',
  '<header>不要索引导航</header><main><aside>目录</aside><p>小知识 &amp; C++</p><p>Java<strong>Script</strong></p></main><footer>不要索引页脚</footer>',
  '.html', nil, '<p>小知识 &amp; C++</p><p>Java<strong>Script</strong></p><script>DROP_ME</script>'
)
about = SearchDocument.new({ 'title' => '关于' }, '/about.html', '<main>独立页面</main>', '.html', nil)
hidden = SearchDocument.new({ 'title' => '隐藏', 'search' => false }, '/hidden.html', '<main>秘密</main>', '.html', nil)
unpublished = SearchDocument.new({ 'title' => '未发布', 'published' => false }, '/draft.html', '<main>草稿</main>', '.html', nil)
search = SearchDocument.new({ 'title' => '搜索' }, '/search.html', '<main>搜索</main>', '.html', nil)
feed = SearchDocument.new({ 'title' => 'RSS' }, '/feed.xml', '<rss>feed</rss>', '.xml', nil)
pagination = SearchDocument.new({ 'title' => '第二页' }, '/page2/', '<main>列表副本</main>', '.html', Struct.new(:page).new(2))
site = SearchSite.new({ 'baseurl' => '/preview' }, SearchPosts.new([post]), [about, hidden, unpublished, search, feed, pagination, about])
entries = SiteSearchIndex.entries(site)
assert_equal(['科学笔记', '关于'], entries.map { |entry| entry['title'] }, 'only public HTML documents and unique pages enter the index')
assert_equal('/preview/blog/note.html', entries.first['url'], 'project prefix comes from the effective build configuration')
assert_equal('小知识 & C++ JavaScript', entries.first['content'], 'rendered body excludes layout, TOC and scripts, preserving inline text')
assert_equal(['光学', '笔记'], entries.first['tags'], 'tags and categories are searchable')
assert_equal('2026-09-01', entries.first['date'], 'post date is normalized')
site.config['baseurl'] = ''
assert_equal('/blog/note.html', SiteSearchIndex.entries(site).first['url'], 'root deployment does not retain a project prefix')
post.instance_variable_set(:@math_source_content, '<p>公式 $x_1$ 与 &#92;alpha</p>')
post.content = '<p>公式 <span class="katex"><math>x1</math><span>x1</span></span></p>'
assert_equal('公式 $x_1$ 与 \\alpha', SiteSearchIndex.entries(site).first['content'], '预渲染公式的索引保留源码，不重复索引视觉和 MathML 文本')

about.instance_variable_set(:@math_source_content, '<p>页面 $x+y$</p>')
about.content = '<p>页面 <span class="katex"><math>x+y</math><span>x+y</span></span></p>'
about.output = "<header>导航</header><main><h1>关于</h1><section>#{about.content}</section></main><footer>页脚</footer>"
assert_equal('关于 页面 $x+y$', SiteSearchIndex.entries(site).last['content'], '独立页面保留 main 内的版式文字及原始公式')
puts 'Search index regression checks passed (8 scenarios).'
