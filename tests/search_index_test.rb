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
puts 'Search index regression checks passed (6 scenarios).'
