# Modifications to Yummy-Jekyll

This repository is a derivative work based on Yummy-Jekyll.

Changes made by zyraxi21 include, but are not limited to:

- Removed polyfill.io references for security.
- Migrated from Jekyll 3 to Jekyll 4 / Liquid 4.0.4.
- Added GitHub Actions workflow for GitHub Pages deployment.
- Replaced Bower front-end dependencies with CDN resources.
- Upgraded Bootstrap 3 to Bootstrap 5 and added compatibility styles.
- Removed Google Analytics.
- Removed MathJax and kept KaTeX for math rendering.
- Added Open Graph / Twitter Card social sharing tags.
- Updated blog category filtering.
- Reorganized and cleaned site content.

## 2026-10-01 代码规范与竖屏适配

- 加入 EditorConfig、LF 换行约定、ESLint、Prettier 和 Liquid 模板格式化。
- 将内联页面行为拆分为 ES 模块，移除 jQuery；KaTeX 与 Mermaid 按文章内容加载。
- 修复目录锚点、完整分类匹配、剪贴板失败反馈和数学保护插件的未闭合代码处理。
- 统一资源、字体、RSS 和导航路径，支持 `baseurl`；排除开发源码与临时页面的发布。
- 采用配置驱动、分页、超时保护和原子写入的 GitHub 项目获取脚本。
- 加入窄屏导航菜单、正文前的折叠目录、紧凑博客时间线和独立内容横向滚动。
- 加入回归检查、生成站点检查和 GitHub Actions 质量检查。
- 按公式标记区分行内与独立公式，改善窄屏科学笔记的段落排版。

## 2026-10-01 移动端交互修复

- 滚动后的顶栏保留半透明玻璃背景。
- 将下拉菜单替换为带开合动画的导航侧栏，加入焦点循环和遮罩关闭。
- 选中分类在悬停和焦点状态保持主题背景与可读文字。
- 统一代码与行号的字号、行高和内边距。
- 窄屏文章目录改为右下角的浮动玻璃按钮和动画面板。
- 补充浅深色对比度、动画、焦点、模糊和行号对齐的浏览器回归检查。

## 2026-10-01 玻璃效果与主题色修正

- 降低手机端顶栏、目录按钮及浮窗底色的不透明度，增强背景模糊的可见程度。
- 分类选中背景恢复 rgb(247, 121, 60)，保留白字；悬停和焦点时轻微加深橙色并加入变色过渡。
- 手机导航入口简化为无边框的三横线图标，保留触摸区域与无障碍标签。
- 更新浏览器回归检查，验证主题色、悬停反馈、白字、玻璃透明度及图标入口。
