// NovaPay Frontend — Main Entry Point
import './style.css';
import './styles.css';
import './styles/dashboard.css';
import './styles/pages.css';
import './styles/global.css'; // Global styles for scrolling and layout fixes
import './styles/auth-fix.css'; // Additional fixes for auth pages
import './styles/fullscreen.css'; // Full-screen edge-to-edge display styles
import './styles/recentTransactions.css'; // New Recent Transactions block styles
import './styles/floating-transactions.css'; // Floating Apple Wallet style transactions card
import './styles/bottom-nav.css'; // New bottom navigation bar styling
import './styles/wallet-dashboard.css'; // New wallet dashboard premium design

import { loadToken } from './api.js';
import { navigate } from './router.js';
import { initSessionManager, checkFirstLaunch } from './session-manager.js';
import { initViewportFix } from './viewport-fix.js';

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
  // Initialize viewport fix for mobile devices
  initViewportFix();

  // Check if this is the first launch on this device
  const isFirstTime = checkFirstLaunch();

  if (!isFirstTime) {
    // Initialize session manager for timeout tracking
    initSessionManager();
  }

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
