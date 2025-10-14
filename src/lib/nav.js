// Navigation helpers
import { navigate } from '../router.js';

/**
 * Go back in history when available and same-origin; otherwise navigate to fallback route.
 * @param {string} fallback Hash route to navigate to when no usable history. Default '/dashboard'.
 */
export function safeBack(fallback = '/dashboard') {
  try {
    const hasHistory = history.length > 1;
    const ref = document.referrer;
    const sameOrigin = ref ? new URL(ref).origin === window.location.origin : false;
    if (hasHistory && sameOrigin) {
      history.back();
      return;
    }
  } catch (_) {
    // If any errors parsing referrer, fall through to fallback
  }
  navigate(fallback);
}
