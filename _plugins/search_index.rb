require 'cgi'
require 'json'

# Index rendered public content, so Liquid, Markdown and baseurl match the published site.
module SiteSearchIndex
  def self.text(html)
    source = html.to_s.gsub(/<(script|style|noscript)\b[^>]*>.*?<\/\1\s*>/im, ' ')
    source = source.gsub(/<!--.*?-->/m, '')
    source = source.gsub(/<\/?(?:p|div|h[1-6]|br|li|tr|td|section|article|pre|blockquote|ul|ol)\b[^>]*>/i, ' ')
    CGI.unescapeHTML(source.gsub(/<[^>]*>/m, '').gsub(/&nbsp;/i, ' ')).gsub(/[[:space:]]+/, ' ').strip
  end

  def self.entries(site)
    posts = site.posts.docs
    seen = {}
    (posts + site.pages).filter_map do |document|
      data = document.data
      next if data['search'] == false || data['published'] == false
      next if document.respond_to?(:output_ext) && document.output_ext != '.html'
      next if document.respond_to?(:pager) && document.pager && document.pager.page > 1

      path = document.url.to_s.sub(/index\.html\z/, '')
      next if path.empty? || ['/search', '/search.html', '/search-index.json'].include?(path)
      next if seen[path]

      html = document.output.to_s
      next if html.empty?
      original = document.instance_variable_get(:@math_source_content)
      html = html.sub(document.content.to_s) { original } if original
      article = posts.include?(document)
      body = if article && document.respond_to?(:content)
               original || document.content.to_s
             else
               html[/<main\b[^>]*>(.*?)<\/main>/im, 1] || html[/<body\b[^>]*>(.*?)<\/body>/im, 1] || html
             end
      nav = Array(site.config['navs']).find { |item| item['href'].to_s.sub(/\.html\z/, '') == path.sub(/\.html\z/, '') }
      title = data['title'] || nav&.fetch('label', nil) || html[/<title\b[^>]*>(.*?)<\/title>/im, 1]
      title ||= site.config['title'] if path == '/'
      next if text(title).empty?

      seen[path] = true
      date = article && data['date'].respond_to?(:strftime) ? data['date'].strftime('%Y-%m-%d') : ''
      entry = {
        'title' => text(title),
        'url' => site.config['baseurl'].to_s.sub(/\/\z/, '') + path,
        'type' => article ? 'post' : 'page',
        'date' => date,
        'tags' => (Array(data['tags']) + Array(data['categories']) + Array(data['category'])).map(&:to_s).uniq,
        'content' => text(body),
      }
      preview = document.instance_variable_get(:@math_preview_content)
      if preview
        preview_body = if article
                         preview
                       else
                         preview_html = document.output.to_s.sub(document.content.to_s) { preview }
                         preview_html[/<main\b[^>]*>(.*?)<\/main>/im, 1] || preview_html[/<body\b[^>]*>(.*?)<\/body>/im, 1] || preview_html
                       end
        entry['excerpt'] = text(preview_body)
      end
      entry
    end
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  site.pages.reject! { |page| page.data['generated_search_index'] }
  output = JSON.generate(SiteSearchIndex.entries(site))
  index = Jekyll::PageWithoutAFile.new(site, site.source, '', 'search-index.json')
  index.data['layout'] = nil
  index.data['search'] = false
  index.data['generated_search_index'] = true
  index.content = output
  index.output = output
  site.pages << index
end
