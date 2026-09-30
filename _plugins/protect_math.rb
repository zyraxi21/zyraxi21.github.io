# Protect LaTeX from Markdown while preserving fenced and inline code verbatim.
# HTML entities are decoded by the browser before KaTeX reads the math source.
module MathProtector
  ENTITIES = {
    '\\' => '&#92;', '_' => '&#95;', '|' => '&#124;', "'" => '&#39;',
    '"' => '&#34;', '*' => '&#42;', '<' => '&lt;', '>' => '&gt;',
    '&' => '&amp;', '[' => '&#91;', ']' => '&#93;'
  }.freeze
  MATH = /(?<!\\)(\$\$.+?\$\$|\$(?!\$)[^$\n]+?(?<!\\)\$|\\\[.+?\\\]|\\\(.+?\\\))/m

  def self.protect(content)
    result = +''
    text = +''
    fence = nil
    content.each_line do |line|
      if fence
        result << line
        closing = /\A[ ]{0,3}#{Regexp.escape(fence[0])}{#{fence.length},}[ \t]*(?:\r?\n)?\z/
        fence = nil if line.match?(closing)
      elsif (opening = line.match(/\A[ ]{0,3}(`{3,}|~{3,})([^\r\n]*)(?:\r?\n)?\z/)) &&
            !(opening[1].start_with?('`') && opening[2].include?('`'))
        result << protect_code_aware(text)
        text.clear
        result << line
        fence = opening[1]
      else
        text << line
      end
    end
    result << protect_code_aware(text)
  end

  def self.protect_code_aware(text)
    result = +''
    cursor = 0
    while (opening = text.match(/`+/, cursor))
      result << protect_math(text[cursor...opening.begin(0)])
      marker = Regexp.escape(opening[0])
      closing = text.match(/(?<!`)#{marker}(?!`)/, opening.end(0))
      unless closing
        result << protect_math(text[opening.begin(0)..])
        return result
      end
      result << text[opening.begin(0)...closing.end(0)]
      cursor = closing.end(0)
    end
    result << protect_math(text[cursor..] || '')
  end

  def self.protect_math(text)
    text.gsub(MATH) do |match|
      match.gsub(/[\\_|'"*<>&\[\]]/) { |character| ENTITIES.fetch(character) }
    end
  end
end

module MathProtectedMarkdown
  def convert(content)
    super(MathProtector.protect(content))
  end
end

Jekyll::Converters::Markdown::KramdownParser.prepend(MathProtectedMarkdown)
