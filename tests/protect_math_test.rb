require 'jekyll'
require 'jekyll/converters/markdown/kramdown_parser'
require 'cgi'
require_relative '../_plugins/protect_math'

def assert_equal(expected, actual, label)
  return if expected == actual

  abort "#{label}\nExpected: #{expected.inspect}\nActual: #{actual.inspect}"
end

cases = {
  'unclosed backtick fence' => "intro\n```ruby\n$x_y$\n",
  'unclosed tilde fence' => "intro\n~~~ruby\n$x_y$\n",
  'long fence containing a shorter fence' => "````markdown\n```ruby\n$x_y$\n```\n````\n",
  'double backtick span' => 'before ``a ` $x_y$`` after',
  'closed backtick fence' => "```ruby\n$x_y$\n```\n",
  'escaped dollar' => '\\$x_y\\$',
}
cases.each do |label, source|
  assert_equal(source, MathProtector.protect(source), label)
end

source = 'before `unclosed $x_y$'
actual = MathProtector.protect(source)
assert_equal(source, CGI.unescapeHTML(actual), 'unclosed inline backtick must not duplicate text')
assert_equal(1, actual.scan('before').size, 'unclosed inline backtick duplicated prefix')

['$x_y|z$', '$$\\frac{a_b}{c}|d$$', '\\(a_b\\)', '\\[a|b\\]'].each do |source|
  protected = MathProtector.protect(source)
  assert_equal(source, CGI.unescapeHTML(protected), 'protected math must decode to the original')
  abort "Unprotected math: #{source}" if protected.include?('_') || protected.include?('|')
end

table = "| Value | Formula |\n| --- | --- |\n| abs | $|x_y|$ |\n"
parser = Jekyll::Converters::Markdown::KramdownParser.new(Jekyll.configuration('quiet' => true))
html = parser.convert(table)
assert_equal(4, html.scan('<td>').size + html.scan('<th>').size, 'math pipes must not split table cells')
abort 'Math source lost during Markdown conversion' unless CGI.unescapeHTML(html).include?('$|x_y|$')
puts "Math protection regression checks passed (#{cases.size + 6} scenarios)."
