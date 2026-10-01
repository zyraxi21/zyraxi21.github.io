export function initScrollbars(content) {
  const states = new Map();
  let drag = null;
  let scheduled = false;

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      sync();
    });
  }
  const observer = new ResizeObserver(schedule);

  function update(state) {
    const { target, bar, track, thumb } = state;
    const rect = target.getBoundingClientRect();
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 1 || rect.bottom <= 0 || rect.top >= window.innerHeight) {
      bar.classList.remove('visible');
      bar.style.display = 'none';
      return;
    }
    const viewportWidth = document.documentElement.clientWidth;
    const left = Math.max(8, Math.min(rect.left, viewportWidth - 8));
    const right = Math.min(viewportWidth - 8, Math.max(left + 8, rect.right));
    const barHeight = bar.offsetHeight || 20;
    const bottom = Math.max(
      rect.top + barHeight + 8,
      Math.min(rect.bottom - 8, window.innerHeight - 10),
    );
    bar.style.left = `${left}px`;
    bar.style.width = `${Math.max(8, right - left)}px`;
    bar.style.bottom = `${window.innerHeight - bottom}px`;
    bar.style.display = '';
    bar.classList.add('visible');

    const trackWidth = track.clientWidth;
    const thumbWidth = Math.min(
      trackWidth,
      Math.max(36, (trackWidth * target.clientWidth) / target.scrollWidth),
    );
    thumb.style.width = `${thumbWidth}px`;
    thumb.style.transform = `translateX(${(target.scrollLeft / maxScroll) * Math.max(0, trackWidth - thumbWidth)}px)`;
    bar.setAttribute('aria-valuemax', Math.round(maxScroll));
    bar.setAttribute('aria-valuenow', Math.round(target.scrollLeft));
  }

  function stopDrag(event) {
    if (!drag || (event && event.pointerId !== drag.pointerId)) return;
    const previousDrag = drag;
    drag = null;
    if (previousDrag.state.bar.hasPointerCapture(previousDrag.pointerId))
      previousDrag.state.bar.releasePointerCapture(previousDrag.pointerId);
  }

  function create(target) {
    const bar = document.createElement('div');
    bar.className = 'table-floating-scrollbar';
    bar.tabIndex = 0;
    bar.setAttribute('role', 'scrollbar');
    bar.setAttribute('aria-label', '横向滚动内容');
    bar.setAttribute('aria-orientation', 'horizontal');
    bar.setAttribute('aria-valuemin', '0');
    target.id ||= `scrollable-content-${states.size + 1}`;
    bar.setAttribute('aria-controls', target.id);
    const track = document.createElement('div');
    track.className = 'table-floating-scroll-track';
    const thumb = document.createElement('div');
    thumb.className = 'table-floating-scroll-thumb';
    track.append(thumb);
    bar.append(track);
    document.body.append(bar);
    target.classList.add('has-custom-scrollbar');
    target.tabIndex = 0;
    const state = { target, bar, track, thumb };
    states.set(target, state);
    observer.observe(target);
    target.addEventListener('scroll', schedule, { passive: true });

    bar.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      bar.setPointerCapture(event.pointerId);
      drag = {
        state,
        pointerId: event.pointerId,
        startX: event.clientX,
        startScroll: target.scrollLeft,
      };
    });
    bar.addEventListener('pointermove', (event) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      event.preventDefault();
      const usableWidth = Math.max(1, track.clientWidth - thumb.getBoundingClientRect().width);
      target.scrollLeft =
        drag.startScroll +
        ((event.clientX - drag.startX) / usableWidth) * (target.scrollWidth - target.clientWidth);
    });
    bar.addEventListener('pointerup', stopDrag);
    bar.addEventListener('pointercancel', stopDrag);
    bar.addEventListener('lostpointercapture', stopDrag);
    bar.addEventListener('keydown', (event) => {
      const destinations = {
        ArrowLeft: target.scrollLeft - 40,
        ArrowRight: target.scrollLeft + 40,
        Home: 0,
        End: target.scrollWidth,
      };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      target.scrollLeft = destinations[event.key];
    });
    return state;
  }

  function sync() {
    for (const target of content.querySelectorAll('table, .code-block-wrapper pre')) {
      if (target.scrollWidth > target.clientWidth + 1 && !states.has(target)) create(target);
    }
    for (const [target, state] of states) {
      if (!target.isConnected) {
        observer.unobserve(target);
        state.bar.remove();
        states.delete(target);
      } else {
        update(state);
      }
    }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule, { once: true });
  document.addEventListener('site:content-updated', schedule);
  document.fonts?.ready.then(schedule);
  schedule();
}
