export function qs(selector) {
  return document.querySelector(selector);
}

export function on(root, selector, event, handler) {
  try {
    const base = root instanceof Element ? root : document;

    // Delegate if element isn't found yet
    if (!base.querySelector(selector)) {
      base.addEventListener(event, e => {
        if (e.target.closest(selector)) {
          handler(e);
        }
      });
      return;
    }

    // Direct bind if element exists
    const el = base.querySelector(selector);
    if (el && typeof handler === 'function') {
      el.addEventListener(event, handler);
    } else {
      console.warn(`[NovaPay] Invalid listener for ${selector} (${event})`);
    }
  } catch (err) {
    console.error('[NovaPay] Event binding failed:', err);
  }
}

export function showToast(msg) {
  alert(msg);
}
