// NovaPay Frontend — Main Entry Point
import './style.css';
import './styles.css';
import './styles/dashboard.css';
import './styles/pages.css';

import { loadToken } from './api.js';
import { navigate } from './router.js';

console.log('[NovaPay] Vite frontend initializing...');

// ============================
// 1. Load saved authentication
// ============================
try {
  loadToken();
} catch (err) {
  console.error('[NovaPay] Failed to load auth token:', err);
}

// ============================
// 2. Initialize Routing
// ============================
function initApp() {
  if (!location.hash || location.hash === '#/' || location.hash === '') {
    console.log('[NovaPay] No hash detected, redirecting to /login');
    navigate('/login');
  } else {
    console.log(`[NovaPay] Hash detected: ${location.hash}`);
    window.dispatchEvent(new Event('hashchange'));
  }
}

// ============================
// 3. Mount failsafe renderer
// ============================
function renderFailsafe() {
  const mount = document.getElementById('app');
  if (mount && !mount.innerHTML.trim()) {
    mount.innerHTML = `
      <div style="padding:16px;color:#fff;background:#111;text-align:center;">
        <h2>🚀 NovaPay Loaded</h2>
        <p>Frontend running. Check router or console for issues.</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `;
    console.warn('[NovaPay] Failsafe rendered: router did not paint any view.');
  }
}

// ============================
// 4. Initialize App
// ============================
// Module scripts execute after DOM is ready, so we can initialize immediately
// But also listen for DOMContentLoaded in case it hasn't fired yet
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[NovaPay] DOMContentLoaded → initializing...');
    initApp();
    setTimeout(renderFailsafe, 500);
  });
} else {
  // DOM already loaded (module scripts execute deferred)
  console.log('[NovaPay] DOM ready → initializing immediately...');
  initApp();
  setTimeout(renderFailsafe, 500);
}
