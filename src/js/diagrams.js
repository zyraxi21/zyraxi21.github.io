import mermaid from 'mermaid';
import { copyText, createCopyButton } from './copy.js';

function keepDiagramLabelsReadable(svg) {
  const labels = [...svg.querySelectorAll('text')].filter((text) => text.textContent.trim());
  const minimumHeight = () =>
    Math.min(
      ...labels.map((text) => text.getBoundingClientRect().height).filter((height) => height > 0),
    );
  const height = minimumHeight();
  if (!Number.isFinite(height)) return;
  let width = Math.ceil((svg.getBoundingClientRect().width * 13) / height);
  const previousWidth = svg.style.width;
  // 在最小宽度下实际测量，为缩放文字的像素取整保留余量。
  for (let attempt = 0; attempt < 3; attempt += 1) {
    svg.style.minWidth = `${width}px`;
    svg.style.width = `${width}px`;
    const measured = minimumHeight();
    if (measured >= 12) break;
    width = Math.ceil((width * 13) / measured);
  }
  svg.style.width = previousWidth;
}

async function rasterizeSvg(svg) {
  const background = getComputedStyle(document.documentElement)
    .getPropertyValue('--page-bg')
    .trim();
  const source = svg.cloneNode(true);
  const viewBox = source.viewBox.baseVal;
  const width = viewBox.width || 800;
  const height = viewBox.height || 600;
  source.setAttribute('width', width);
  source.setAttribute('height', height);
  source.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  source.style.setProperty('background', 'transparent', 'important');
  source.style.removeProperty('min-width');
  const markup = new XMLSerializer().serializeToString(source);

  return new Promise((resolve, reject) => {
    const image = new Image();
    const timer = setTimeout(() => reject(new Error('SVG 转 PNG 超时')), 8000);
    image.onload = () => {
      clearTimeout(timer);
      try {
        const scale = Math.min(2, 4096 / Math.max(width, height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(width * scale));
        canvas.height = Math.max(1, Math.round(height * scale));
        const context = canvas.getContext('2d');
        if (!context) throw new Error('浏览器不支持画布');
        // PNG 自带当前模式的底色，粘贴到其他背景时仍能辨认连线。
        context.fillStyle = background;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.scale(scale, scale);
        context.drawImage(image, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('PNG 转换失败'));
        }, 'image/png');
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () => {
      clearTimeout(timer);
      reject(new Error('SVG 加载失败'));
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  });
}

async function copyDiagram(pre) {
  const svg = pre.querySelector('svg');
  if (!svg) throw new Error('Mermaid SVG 尚未生成');
  if (navigator.clipboard?.write && window.ClipboardItem) {
    try {
      // 在点击期间发起写入，图片转换交给 ClipboardItem 等待。
      const png = rasterizeSvg(svg);
      // 写入若提前被拒绝，仍接住后续转换失败，避免未处理的拒绝。
      void png.catch(() => {});
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
      return '已复制 PNG';
    } catch {
      // Copy SVG when the browser cannot export or write a PNG.
    }
  }
  await copyText(svg.outerHTML);
  return '已复制 SVG';
}

export async function initDiagrams(content) {
  const blocks = [...content.querySelectorAll('pre > code.language-mermaid')].map((code) => {
    const pre = code.parentElement;
    const source = code.textContent.trim();
    pre.dataset.mermaidSource = source;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper mermaid-block-wrapper';
    const header = document.createElement('div');
    header.className = 'code-header';
    const label = document.createElement('span');
    label.className = 'code-lang';
    label.textContent = 'Mermaid';
    const copyButton = createCopyButton('复制 PNG', () => copyDiagram(pre));
    copyButton.disabled = true;
    header.append(label, copyButton);
    const body = document.createElement('div');
    body.className = 'code-body mermaid-code-body';
    pre.before(wrapper);
    wrapper.append(header, body);
    body.append(pre);
    return { pre, source, copyButton, hasRendered: false };
  });

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let version = 0;
  let sequence = 0;
  let queue = Promise.resolve();
  async function renderBlocks(requestedVersion) {
    if (requestedVersion !== version) return;
    mermaid.initialize({
      startOnLoad: false,
      theme: darkQuery.matches ? 'dark' : 'default',
      themeVariables: { background: 'transparent' },
      securityLevel: 'strict',
      htmlLabels: false,
    });
    for (const block of blocks) {
      const { pre, source, copyButton } = block;
      if (requestedVersion !== version) break;
      const id = `mermaid-diagram-${sequence++}`;
      try {
        const result = await mermaid.render(id, source);
        if (requestedVersion !== version) continue;
        pre.innerHTML = result.svg;
        pre.classList.add('mermaid-rendered');
        pre.classList.remove('mermaid-error');
        // SVG 放入文章后重新核对画布边界，完整包含节点、文字与连线。
        const svg = pre.querySelector('svg');
        await document.fonts?.ready;
        if (requestedVersion !== version) continue;
        const bounds = svg.getBBox();
        const padding = 8;
        if (bounds.width > 0 && bounds.height > 0) {
          svg.setAttribute(
            'viewBox',
            [
              bounds.x - padding,
              bounds.y - padding,
              bounds.width + 2 * padding,
              bounds.height + 2 * padding,
            ].join(' '),
          );
          svg.style.maxWidth = `${bounds.width + 2 * padding}px`;
          // 宽图局部滚动，避免把节点及坐标轴文字缩成难以辨认的标记。
          keepDiagramLabelsReadable(svg);
        }
        result.bindFunctions?.(pre);
        // 首次图表完成后才可复制，避免加载期间提前点击得到失败反馈。
        if (!block.hasRendered) {
          copyButton.disabled = false;
          block.hasRendered = true;
        }
      } catch (error) {
        document.getElementById(`d${id}`)?.remove();
        pre.classList.add('mermaid-error');
        console.error('Mermaid 渲染失败：', error);
      }
    }
    document.dispatchEvent(new Event('site:content-updated'));
  }
  function render() {
    const requestedVersion = ++version;
    queue = queue.then(() => renderBlocks(requestedVersion));
    return queue;
  }
  darkQuery.addEventListener('change', () => void render());
  await render();
}
