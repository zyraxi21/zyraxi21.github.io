require 'json'
require 'open3'

module SiteMathRender
  SCRIPT = File.expand_path('../scripts/render-math.mjs', __dir__).freeze

  def self.render(document)
    document.instance_variable_set(:@math_source_content, nil)
    document.instance_variable_set(:@math_preview_content, nil)
    return unless document.output_ext == '.html'

    source = document.content.to_s
    return unless source.match?(/[$\\]|&#|&(?:bsol|dollar);|kdmath/)

    output, error, status = Open3.capture3('node', SCRIPT, stdin_data: JSON.generate('html' => source))
    unless status.success?
      raise Jekyll::Errors::FatalException, "数学预渲染失败：#{document.relative_path}。请先运行 npm ci。\n#{error}"
    end
    rendered = JSON.parse(output)
    return if rendered.fetch('count').zero?

    document.instance_variable_set(:@math_source_content, source)
    document.instance_variable_set(:@math_preview_content, rendered.fetch('previewHtml'))
    document.content = rendered.fetch('html')
  end
end

# RSS 保留预渲染前的正文，避免阅读器重复呈现公式的视觉与 MathML 标记。
module SiteMathSourceFilter
  def math_source_content(post)
    site = @context.registers[:site]
    document = site.posts.docs.find { |item| item.relative_path == post['path'] }
    document&.instance_variable_get(:@math_source_content) || post['content'].to_s
  end
end
Liquid::Template.register_filter(SiteMathSourceFilter)

# Markdown 转换之后处理公式，保留标题锚点与表格结构；布局保持原样。
Jekyll::Hooks.register [:pages, :documents], :post_convert do |document|
  SiteMathRender.render(document)
end
