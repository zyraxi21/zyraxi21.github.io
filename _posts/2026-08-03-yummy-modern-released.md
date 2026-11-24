---
layout: post
title: Jekyll 博客模板 Yummy Modern 发布
category: 开源项目
tags:
  - Jekyll
  - 主题
  - GitHub Pages
  - Bootstrap 5
  - 开源
excerpt: 对 Yummy Jekyll 主题的现代化改造：在保留原版简洁风格的基础上，为 Yummy Jekyll 换上现代前端构建、KaTeX 公式、Mermaid 图表、全站搜索与移动端适配。
---

我的个人站点一直很喜欢 [Yummy Jekyll](https://github.com/DONGChuan/Yummy-Jekyll) 这套经典主题的排版气质：结构克制、信息层级清晰，同时兼顾了博客时间线、开源项目展示与书签整理。不过原主题诞生于 2016 年，底层依赖仍停留在 Jekyll 3、Bootstrap 3、jQuery 与 Bower，在当下的本地开发、GitHub Pages 部署以及移动端阅读体验上已经有些力不从心。

于是我把这段时间对个人站点的持续改造抽离成了一套独立可复用的模板主题 **[Yummy Modern 主题](https://zyraxi21.github.io/Yummy-Modern/)**，代码托管在 **[zyraxi21/Yummy-Modern: 对 Yummy Jekyll 主题的现代化改造](https://github.com/zyraxi21/Yummy-Modern)**。如果你也在寻找一套轻量、克制、适合记录技术笔记与展示项目的 Jekyll 博客主题，欢迎直接预览或 Fork 使用。

## 为什么做一次「现代化改造」？

这次改造的核心原则是**保留原模板干净耐看的 Bootstrap 视觉骨架，把底层工程链路和阅读体验全面更新到当下标准**：

- **告别陈旧依赖**：摆脱 Bower、Bootstrap 3 和 jQuery，减少历史包袱与安全告警；
- **开箱即用的技术写作能力**：让数学公式、流程图、代码块、多级目录与全站搜索无需额外折腾第三方服务；
- **更好的跨端体验**：补齐深色模式、玻璃态顶栏、移动端侧边导航与浮动目录，让长文在手机上同样顺手好读。

## 主要特性与改造亮点

### 1. 现代技术栈与自动化部署

- **核心框架升级**：从 Jekyll 3 / Liquid 3 升级至 **Jekyll 4.4 / Liquid 4**，界面框架从 Bootstrap 3 升级至 **Bootstrap 5**；
- **现代前端构建**：移除 Bower 与 jQuery，改用 **npm + esbuild** 管理依赖与打包前端静态资源，页面交互拆分为独立的 ES 模块；
- **一键部署到 GitHub Pages**：内置 GitHub Actions 工作流，推送到 `main` 分支即可自动完成前端构建、严格 Front Matter 校验、链接检查与 Pages 发布，同时原生兼容域名根目录与项目子目录（`baseurl`）两种部署方式。

### 2. 面向技术写作的阅读与排版体验

- **KaTeX 数学公式预渲染**：构建期在 Markdown 转换后直接预渲染行内与独立公式，并生成供辅助技术读取的 MathML；浏览时无需等待前端加载渲染器，关闭 JavaScript 也能正常阅读，启用脚本后支持一键复制原始 LaTeX，窄屏下超宽公式可独立横向滚动；
- **Mermaid 图表与代码增强**：按文章内容按需加载 Mermaid 图表渲染，代码块支持一键复制，表格支持横向滚动；
- **统一的中英文字体方案**：代码块、行内代码与行号统一采用 **Ubuntu Mono + LXGW Bright Code GB** 组合，正文中文配合思源黑体网页分片按需加载，兼顾清晰度与首屏速度；
- **自动多级目录**：根据文章中的 `#` 至 `######` 自动生成按层级缩进的目录，不需要目录的文章可在 Front Matter 中添加 `no-post-nav: true` 关闭。

### 3. 零外部依赖的纯静态全站搜索

点击顶栏放大镜即可展开搜索框：

- **实时预览与完整结果页**：输入关键词即时展示最多 5 条匹配结果，支持上下方向键与回车跳转；进入完整搜索页后支持分页与关键词高亮，URL 保留 `q` 与 `page` 参数便于分享；
- **覆盖全面且按需加载**：索引在 Jekyll 构建时自动生成，覆盖文章和独立页面的标题、标签、分类与正文，首次打开搜索时才加载，无需接入 Algolia 等第三方服务；不希望被检索的内容只需在 Front Matter 中配置 `search: false`。

### 4. 深色模式与移动端适配

- **浅色 / 深色模式切换**：全站组件、代码块、公式与搜索浮窗均做了配色与对比度适配；
- **移动端交互优化**：竖屏与窄屏下提供半透明玻璃顶栏、带开合动画的导航侧栏，以及右下角的浮动玻璃目录按钮，方便单手阅读长文章与快速跳转章节。

### 5. 面向开发者的站点模块

- **时间线博客与分类筛选**：按时间线组织文章列表，支持分类快速筛选；
- **开源项目展示**：支持通过 `npm run fetch:projects` 拉取个人或组织公开仓库生成静态 `_data/projects.json`（离线也可正常构建），也支持手动配置静态列表或按需开启 `jekyll-github-metadata`；
- **书签、关于与可选评论**：内置书签页与关于页，Disqus 评论默认留空不加载，填写配置后按需启用。

## 快速上手

本地预览需要 Node.js 22.13+、npm 10+、Ruby 3.4+ 与 Bundler：

```bash
# 1. 克隆你 Fork 后的仓库并安装依赖
npm ci
npm run build
bundle install

# 2. 启动本地预览
bundle exec jekyll serve
```

在正式发布前，记得先修改 `_config.yml` 中的站点信息，并将默认的演示站地址替换为自己的正式域名和 `baseurl`（部署在 `your-name.github.io` 根目录时设 `baseurl: ''`，普通项目仓库设 `baseurl: '/你的仓库名'`），然后在 GitHub 仓库的 **Settings → Pages** 中将 Source 设为 **GitHub Actions**，推送到 `main` 分支即可自动上线。

更详细的字段说明、子目录验证与回归检查命令，可以直接查阅仓库的 README。

## 相关链接与开源协议

- **在线演示站**：[Yummy Modern 主题](https://zyraxi21.github.io/Yummy-Modern/)
- **主题源码仓库**：[zyraxi21/Yummy-Modern: 对 Yummy Jekyll 主题的现代化改造](https://github.com/zyraxi21/Yummy-Modern)
- **原始主题**：[DONGChuan/Yummy-Jekyll](https://github.com/DONGChuan/Yummy-Jekyll)（Copyright (c) 2016 DONG Chuan）
- **开源协议**：遵循原项目协议，采用 **Apache License 2.0** 开源分发，仓库内完整保留了 `LICENSE`、`NOTICE` 与 `CHANGES.md`。

欢迎试用体验，如果在使用或部署过程中遇到问题，也欢迎直接到仓库提交 Issue 或 Pull Request。
