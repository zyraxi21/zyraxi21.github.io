# Protect LaTeX math from Kramdown parsing.
# Kramdown treats `_`, `|`, and backslashes inside math as Markdown syntax.
# This patch replaces them with HTML entities before Kramdown sees them,
# so KaTeX will receive the original LaTeX after the browser decodes HTML.

module MathProtector
  def self.protect(content)
    content.gsub(/(\$\$[\s\S]+?\$\$|\$(?!\$)[^$\n]+?\$)/) do |match|
      match.gsub(/\\/, '&#92;').gsub('_', '&#95;').gsub('|', '&#124;')
    end
  end

  def self.fix_output(html)
    html.gsub(/(\$\$[\s\S]+?\$\$|\$(?!\$)[^$\n]+?\$)/) do |match|
      match.gsub('<em>', '_').gsub('</em>', '_')
    end
  end
end

Jekyll::Hooks.register :posts, :post_render do |post|
  post.output = MathProtector.fix_output(post.output)
end

Jekyll::Hooks.register :pages, :post_render do |page|
  page.output = MathProtector.fix_output(page.output)
end

module Jekyll
  module Converters
    class Markdown
      class KramdownParser
        alias_method :convert_without_math_protection, :convert

        def convert(content)
          convert_without_math_protection(MathProtector.protect(content))
        end
      end
    end
  end
end