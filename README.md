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

## 代码规范与检查

编辑源码后可运行以下命令；前端构建产物位于 `assets/vendor/`，由构建脚本生成：

```bash
npm run format       # 格式化 JavaScript、CSS、Liquid 模板与配置
npm run check        # ESLint、Prettier、JavaScript 与数学插件回归检查
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

浏览器回归检查需要 Python 3.9+ 与 Playwright，覆盖复制、公式、图表、分类、目录、导航及 320–768px 竖屏布局：

```bash
python -m pip install playwright==1.63.0
python -m playwright install chromium
python tests/browser_smoke.py
# 使用已安装的 Chrome 时：python tests/browser_smoke.py --browser-channel chrome
```

规范约定、修改范围和检查结果见 [代码检查记录](docs/CODE_QUALITY.md)。
