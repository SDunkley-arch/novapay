// src/app.js
import { loadToken } from './api.js';
import { navigate } from './router.js';

console.log('[APP] Bootstrap start');
loadToken();

// Ensure starting route and trigger router processing
if (!location.hash) {
  navigate('/login');
} else {
  window.dispatchEvent(new Event('hashchange'));
}

// Failsafe marker if nothing rendered
setTimeout(() => {
  const mount = document.getElementById('app');
  if (mount && !mount.innerHTML.trim()) {
    mount.innerHTML = '<div style="padding:16px;color:#fff;background:#111">Boot OK: no view rendered. Check route registrations.</div>';
    console.warn('[APP] Failsafe rendered: router did not paint any view.');
  }
}, 300);
