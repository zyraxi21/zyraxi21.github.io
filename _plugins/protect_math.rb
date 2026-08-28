# Protect LaTeX math from Kramdown parsing.
# Kramdown treats `_`, `|`, and backslashes inside math as Markdown syntax.
# This patch replaces them with HTML entities before Kramdown sees them,
# so KaTeX will receive the original LaTeX after the browser decodes HTML.

module MathProtector
  def self.protect(content)
    result = +''
    cursor = 0

    while (fence_start = content.index('```', cursor))
      result << protect_code_aware(content[cursor...fence_start])
      fence_end = content.index('```', fence_start + 3)
      break unless fence_end
      result << content[fence_start..(fence_end + 2)]
      cursor = fence_end + 3
    end

    result << protect_code_aware(content[cursor..-1] || '')
    result
  end

  def self.protect_code_aware(text)
    result = +''
    cursor = 0

    while (span_start = text.index('`', cursor))
      result << protect_math(text[cursor...span_start])
      span_end = text.index('`', span_start + 1)
      break unless span_end
      result << text[span_start..span_end]
      cursor = span_end + 1
    end

    result << protect_math(text[cursor..-1] || '')
    result
  end

  def self.protect_math(text)
    text.gsub(/(\$\$[\s\S]+?\$\$|\$(?!\$)[^$\n]+?\$)/) do |match|
      match
        .gsub(/\\/, '&#92;')
        .gsub('_', '&#95;')
        .gsub('|', '&#124;')
        .gsub("'", '&#39;')
    end
  end
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
