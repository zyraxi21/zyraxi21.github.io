# zyraxi 的主页

基于 [Yummy-Jekyll](https://github.com/DONGChuan/Yummy-Jekyll) 修改的博客站点。

- 原模板：https://github.com/DONGChuan/Yummy-Jekyll
- 原模板协议：Apache License 2.0
- 网站代码许可见 [LICENSE](LICENSE)
- 署名与修改说明见 [NOTICE](NOTICE)

## 许可

- 网站代码、主题、脚本、构建配置：Apache License 2.0
- 博客文章内容：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-hans)
- 文章内容许可说明见 [CONTENT-LICENSE](CONTENT-LICENSE)

## 本地开发

环境要求：Node.js 22.13+（推荐 24）、npm 10+、Ruby 3.4+ 和 Bundler。

安装依赖并构建静态资源：

```bash
npm ci
bundle install
npm run build
```

启动 Jekyll：

```bash
bundle exec jekyll serve
```

访问：

```
http://127.0.0.1:4000
```

## 文章目录

正文标题按井号数量对应级别：`# 一级标题`、`## 二级标题`，以此类推，最多支持 `###### 六级标题`。目录收录 h1 至 h6，按实际级别逐级缩进。

需要关闭某篇文章的目录时，在 Front Matter 中设置 `no-post-nav: true`。

## 数学公式

行内公式支持 `$E=mc^2$` 与 `\(E=mc^2\)`；独立公式支持 `$$E=mc^2$$` 与 `\[E=mc^2\]`。行内多行表达式使用 `aligned` 环境，`align` 环境用于独立公式。

Jekyll 在 Markdown 转换后使用 KaTeX 预渲染公式，并生成供辅助技术读取的 MathML。运行 Jekyll 前需先完成 `npm ci`；公式无需等待浏览器下载渲染器，关闭 JavaScript 也能阅读。超宽公式在手机上可横向滚动，启用 JavaScript 后可复制原始 LaTeX。

## 代码字体

代码中的英文优先使用 Ubuntu Mono，中文回退到 LXGW Bright Code GB。代码块、行内代码、行号与语言标签使用同一组合；两种字体都使用 Regular 文件，粗体与斜体由浏览器合成。

网页加载 `assets/fonts/UbuntuMono-R.woff2` 和 `assets/fonts/LXGWBrightCodeGB-Regular.woff2`，同目录保留 TTF 原文件。替换代码字体时，请同步更新对应的 WOFF2 文件或 `assets/css/common.css` 中的字体声明。

## 全站搜索

点击顶栏导航左侧的放大镜展开搜索框，输入后实时显示最多 5 条结果。点击结果直接打开页面；按回车或再次点击放大镜查看完整结果。也可以用上下方向键选择结果、按回车打开，按 Escape 收起搜索框。

搜索覆盖文章和独立页面的标题、标签、分类及正文；多个关键词以空格分隔，完整结果每页显示 10 条，并高亮匹配文字。搜索页地址中的 `q` 和 `page` 保留关键词与页码，可以复制分享。

Jekyll 构建时自动生成搜索索引，首次打开搜索时才加载，无需外部搜索服务。新增或修改内容后重新构建即可更新；要排除某个页面或文章，在 Front Matter 中设置 `search: false`。

## 开源项目数据

项目列表优先读取 `_data/projects.json`，没有该文件时使用 `_config.yml` 中的 `projects`。更新项目列表时运行 `npm run fetch:projects`；获取过程需要访问 GitHub API，获取完成后即可使用本地数据构建和预览。

`jekyll-github-metadata` 默认关闭，避免构建时因 GitHub API 的网络或 TLS 错误而中断。需要 `site.github` 元数据时，可取消 `_config.yml` 中对应插件的注释，填写 `repository: 用户名/仓库名`，并确保能访问 GitHub API。修改插件配置后重新启动 Jekyll。

## 代码规范与检查

编辑源码后可运行以下命令；前端构建产物位于 `assets/vendor/`，由构建脚本生成：

```bash
npm run format       # 格式化 JavaScript、CSS、Liquid 模板与配置
npm run check        # ESLint、Prettier、JavaScript、数学与搜索索引回归检查
npm run build
bundle exec jekyll build --strict_front_matter
npm run check:site   # 检查本地链接、资源及发布目录
```

子目录部署请设置 `_config.yml` 的 `baseurl`，例如 `/my-blog`，并使用对应路径验证：

```bash
bundle exec jekyll build --baseurl /preview --destination .cache/preview
npm run check:site -- --site .cache/preview --baseurl /preview
```

仓库已提供代码质量和 GitHub Pages 部署工作流。竖屏使用带动画的导航侧栏；文章目录通过右下角的浮动玻璃按钮打开，博客分类显示为可换行的筛选按钮。

浏览器回归检查需要 Python 3.9+ 与 Playwright，覆盖搜索、复制、公式、图表、分类、目录、导航及 320–768px 竖屏布局：

```bash
python -m pip install playwright==1.63.0
python -m playwright install chromium
python tests/browser_smoke.py
# 使用已安装的 Chrome 时：python tests/browser_smoke.py --browser-channel chrome
```

规范约定、修改范围和检查结果见 [代码检查记录](docs/CODE_QUALITY.md)。
