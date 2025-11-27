export function qs(selector) {
  return document.querySelector(selector);
}

export function on(root, selector, event, handler) {
  try {
    let base = document;
    let sel;
    let evt;
    let fn;

    const looksLikeSelector = (s) => typeof s === 'string' && (s[0] === '#' || s[0] === '.' || s[0] === '[' || s.includes(' '));

    // 3-argument usage: on('click', '#selector', handler) OR on('#selector', 'click', handler)
    if (
      typeof root === 'string' &&
      typeof selector === 'string' &&
      typeof event === 'function' &&
      handler === undefined
    ) {
      base = document;
      const a = root;
      const b = selector;

      if (looksLikeSelector(a) && !looksLikeSelector(b)) {
        sel = a;
        evt = b;
      } else if (looksLikeSelector(b) && !looksLikeSelector(a)) {
        sel = b;
        evt = a;
      } else {
        // Fallback: assume second argument is selector
        sel = b;
        evt = a;
      }
      fn = event;
    } else {
      // 4-argument usage: on(rootElement, selector, event, handler)
      base = root instanceof Element ? root : document;
      sel = selector;
      evt = event;
      fn = handler;
    }

    if (typeof fn !== 'function' || typeof evt !== 'string' || typeof sel !== 'string') {
      console.warn(`[NovaPay] Invalid listener for ${sel ?? selector} (${evt ?? event})`);
      return;
    }

    // Delegate if element isn't found yet
    if (!base.querySelector(sel)) {
      base.addEventListener(evt, (e) => {
        if (e.target.closest(sel)) {
          fn(e);
        }
      });
      return;
    }

    // Direct bind if element exists
    const el = base.querySelector(sel);
    if (el) {
      el.addEventListener(evt, fn);
    } else {
      console.warn(`[NovaPay] Invalid listener for ${sel} (${evt})`);
    }
  } catch (err) {
    console.error('[NovaPay] Event binding failed:', err);
  }
}

export function showToast(msg) {
  alert(msg);
}
