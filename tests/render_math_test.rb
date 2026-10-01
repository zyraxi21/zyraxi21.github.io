require 'jekyll'
require 'jekyll/converters/markdown/kramdown_parser'
require_relative '../_plugins/protect_math'
require_relative '../_plugins/render_math'

MathDocument = Struct.new(:content, :output_ext, :relative_path)

def assert_equal(expected, actual, label)
  return if expected == actual
  abort "#{label}\nExpected: #{expected.inspect}\nActual: #{actual.inspect}"
end

parser = Jekyll::Converters::Markdown::KramdownParser.new(Jekyll.configuration('quiet' => true))
source = parser.convert("# 公式 $x_1$\n\n| 含义 | 公式 |\n| --- | --- |\n| 绝对值 | $|x_y|$ |\n")
document = MathDocument.new(source, '.html', '公式测试.md')
Jekyll::Hooks.trigger :documents, :post_convert, document
assert_equal(source, document.instance_variable_get(:@math_source_content), '保留索引使用的原始 HTML')
assert_equal(source[/<h1[^>]*id="([^"]+)"/, 1], document.content[/<h1[^>]*id="([^"]+)"/, 1], '公式不改变标题锚点')
assert_equal(4, document.content.scan(/<(?:td|th)>/).length, '公式中的竖线不拆开表格')
abort '公式未预渲染' unless document.content.include?('data-math-rendered="true"')

code = '<pre><code>$x_1$</code></pre>'
page = MathDocument.new(code, '.html', '代码测试.html')
Jekyll::Hooks.trigger :pages, :post_convert, page
assert_equal(code, page.content, '仅代码的页面保持原样')
assert_equal(nil, page.instance_variable_get(:@math_source_content), '没有公式时不缓存旧索引内容')

xml = '<title>$x_1$</title>'
feed = MathDocument.new(xml, '.xml', 'feed.xml')
SiteMathRender.render(feed)
assert_equal(xml, feed.content, '非 HTML 输出保持原样')
site = Struct.new(:posts).new(Struct.new(:docs).new([document]))
template = Liquid::Template.parse('{{ post | math_source_content }}')
rendered = template.render!({ 'post' => { 'path' => document.relative_path, 'content' => document.content } }, registers: { site: site })
assert_equal(source, rendered, 'RSS 使用原始公式正文')
rendered = template.render!({ 'post' => { 'path' => 'unknown.md', 'content' => '普通正文' } }, registers: { site: site })
assert_equal('普通正文', rendered, '普通正文与缺失文档使用传入内容')
puts '数学预渲染与 Jekyll 钩子检查通过（9 项）。'
