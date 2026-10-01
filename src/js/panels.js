// Native modal panels keep focus inside the drawer and make the page behind it inert.
export function createMobilePanel(dialog, trigger) {
  let frame;
  let version = 0;
  let pointerStartedOutside = false;

  function syncScrollLock() {
    document.documentElement.classList.toggle(
      'mobile-panel-open',
      Boolean(document.querySelector('.mobile-panel[open]')),
    );
  }

  function open() {
    const current = ++version;
    cancelAnimationFrame(frame);
    if (!dialog.open) dialog.showModal();
    syncScrollLock();
    trigger.setAttribute('aria-expanded', 'true');
    // Commit the off-screen state before starting the entrance transition.
    dialog.getBoundingClientRect();
    frame = requestAnimationFrame(() => {
      if (current === version && dialog.open) dialog.classList.add('is-visible');
    });
  }

  async function close({ immediate = false, restoreFocus = true } = {}) {
    if (!dialog.open) return;
    const current = ++version;
    cancelAnimationFrame(frame);
    trigger.setAttribute('aria-expanded', 'false');
    dialog.classList.remove('is-visible');
    if (!immediate) {
      await Promise.allSettled(dialog.getAnimations().map((animation) => animation.finished));
    }
    if (current !== version) return;
    dialog.close();
    syncScrollLock();
    if (restoreFocus && !trigger.hidden) trigger.focus({ preventScroll: true });
  }

  function outside(event) {
    const bounds = dialog.getBoundingClientRect();
    return (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    );
  }

  trigger.addEventListener('click', open);
  dialog.querySelector('.mobile-panel-close').addEventListener('click', () => void close());
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    void close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const controls = [
      ...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex]'),
    ].filter(
      (element) => element.tabIndex >= 0 && !element.disabled && element.getClientRects().length,
    );
    const first = controls[0];
    const last = controls.at(-1);
    if (!first) return;
    if (
      event.shiftKey &&
      (document.activeElement === first || !dialog.contains(document.activeElement))
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      (document.activeElement === last || !dialog.contains(document.activeElement))
    ) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener('pointerdown', (event) => {
    pointerStartedOutside = outside(event);
  });
  dialog.addEventListener('click', (event) => {
    if (pointerStartedOutside && outside(event)) void close();
  });
  return { close };
}
