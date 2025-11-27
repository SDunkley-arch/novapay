// NovaPay Hash Router — Frontend Routing System
import { isLoggedIn } from './state.js';
import { checkSessionValidity } from './session-manager.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderForgotPassword } from './pages/forgot-password.js';
import { renderCheckEmail } from './pages/check-email.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderLanding } from './pages/landing.js';
import { renderTransfer } from './pages/transfer.js';
import { renderAddMoney } from './pages/add-money.js';
import { renderBills } from './pages/bills.js';
import { renderWithdraw } from './pages/withdraw.js';
import { renderCard } from './pages/card.js';
import { renderProfile } from './pages/profile.js';
import { renderNotifications } from './pages/notifications.js';
import { renderTransactions } from './pages/transactions.js';
import { renderFinances } from './pages/finances-savings.js';
import { renderKYC } from './pages/kyc.js';
import { renderSettings } from './pages/settings.js';
import { renderPersonalInfo } from './pages/personal-info.js';
import { renderBillersPage } from './pages/billers.js';
import { renderBillerPaymentPage } from './pages/billerPayment.js';
import { renderBillerConfirmPage } from './pages/billerConfirm.js';
import { renderBillerSuccessPage } from './pages/billerSuccess.js';
import { renderRemittancePage } from './pages/RemittancePage.jsx';
import { renderRemittanceWUPage } from './pages/RemittanceWUPage.jsx';
import { renderRemittanceMGPage } from './pages/RemittanceMGPage.jsx';
import { renderRemittanceSuccessScreen } from './components/SuccessScreen.jsx';
import { renderRemittanceErrorScreen } from './components/ErrorScreen.jsx';
import { renderChangeProfilePicture } from './pages/change-profile-picture.js';
import { renderScanQR } from './pages/scan-qr.js';
import { renderBankSelection } from './pages/bank-selection.js';
import { renderBankDetails } from './pages/bank-details.js';
import { renderNetworkSelection } from './pages/network-selection.js';
import { renderNetworkDetails } from './pages/network-details.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.defaultRoute = '/login';
    this.authRoute = '/dashboard';
    this.pendingAnimation = null;

    // Bind event handlers
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());

    console.log('[Router] Initialized hash-based routing system ✅');
  }

  // Register a route
  addRoute(path, handler, requiresAuth = false) {
    this.routes.set(path, { handler, requiresAuth });
  }

  // Set default (public) and auth (protected) routes
  setDefaults(defaultRoute, authRoute) {
    this.defaultRoute = defaultRoute;
    this.authRoute = authRoute;
  }

  matchRoute(hash) {
    const direct = this.routes.get(hash);
    if (direct) {
      return { path: hash, params: {}, ...direct };
    }

    for (const [pattern, config] of this.routes.entries()) {
      if (!pattern.includes(':')) continue;

      const paramNames = [];
      const regexPattern = pattern
        .split('/')
        .map((segment) => {
          if (segment.startsWith(':')) {
            paramNames.push(segment.slice(1));
            return '([^/]+)';
          }
          return segment;
        })
        .join('/');

      const regex = new RegExp(`^${regexPattern}$`);
      const match = hash.match(regex);
      if (match) {
        const params = {};
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        return { path: pattern, params, ...config };
      }
    }

    return null;
  }

  // Navigation helpers
  navigate(path, options = {}) {
    this.pendingAnimation = options && options.animate ? options.animate : null;

    if (window.location.hash !== `#${path}`) {
      window.location.hash = path;
    } else {
      this.handleRoute(); // Re-render if same hash
    }
  }

  redirect(path) {
    window.location.replace(`#${path}`);
  }

  goBack() {
    window.history.back();
  }

  // Extract current route (without the leading #)
  getCurrentHash() {
    return window.location.hash.slice(1) || '';
  }

  // Route handler
  handleRoute() {
    const hash = this.getCurrentHash();
    console.log(`[Router] Handling route: ${hash || '(none)'}`);

    const route = this.matchRoute(hash);

    // If route not found → redirect to defaults
    if (!route) {
      const fallback = isLoggedIn() ? this.authRoute : this.defaultRoute;
      console.warn(`[Router] Unknown route "${hash}". Redirecting to: ${fallback}`);
      this.redirect(fallback);
      return;
    }

    // Auth checks
    if (route.requiresAuth) {
      // First check if user is logged in
      if (!isLoggedIn()) {
        console.warn(`[Router] Protected route "${hash}" blocked — user not logged in`);
        this.redirect(this.defaultRoute);
        return;
      }
      
      // Then check if session has timed out due to inactivity
      if (!checkSessionValidity()) {
        console.warn(`[Router] Protected route "${hash}" blocked — session timed out`);
        // Session manager will handle the redirect to login
        return;
      }
    }

    if (!route.requiresAuth && isLoggedIn() &&
        (hash === '/login' || hash === '/register' || hash === '/landing' || hash === '/forgot-password' || hash === '/check-email')) {
      console.log(`[Router] User logged in, redirecting from public route "${hash}" to dashboard`);
      this.redirect(this.authRoute);
      return;
    }

    // Execute the route handler
    try {
      console.log(`[Router] Rendering route: ${hash}`);
      const mount = document.getElementById('app');
      if (mount) mount.innerHTML = ''; // Clear old content
      route.handler(route.params || {});
      this.applyAnimation();
      this.currentRoute = hash;
    } catch (err) {
      console.error(`[Router] Error rendering route "${hash}":`, err);
      const mount = document.getElementById('app');
      if (mount) {
        mount.innerHTML = `
          <div style="padding:20px;color:#fff;background:#111;text-align:center;">
            <h3>🚨 Rendering Error</h3>
            <p>${err.message}</p>
          </div>`;
      }
    }
  }

  applyAnimation() {
    if (!this.pendingAnimation) return;

    const mount = document.getElementById('app');
    if (!mount) {
      this.pendingAnimation = null;
      return;
    }

    const classMap = {
      'slide-right-fade': 'np-anim-slide-right-fade',
      'slide-left-fade': 'np-anim-slide-left-fade',
    };

    const cls = classMap[this.pendingAnimation];
    this.pendingAnimation = null;
    if (!cls) return;

    mount.classList.remove('np-anim-slide-right-fade', 'np-anim-slide-left-fade');
    // Force reflow so the animation restarts each time
    void mount.offsetWidth;
    mount.classList.add(cls);

    mount.addEventListener(
      'animationend',
      () => {
        mount.classList.remove(cls);
      },
      { once: true }
    );
  }
}

// Instantiate router
export const router = new Router();

// Expose helpers for easy navigation
export function navigate(path, options) { router.navigate(path, options || {}); }
export function redirect(path) { router.redirect(path); }
export function goBack() { router.goBack(); }

// Route Registration
router.addRoute('/login', renderLogin);
router.addRoute('/register', renderRegister);
router.addRoute('/forgot-password', renderForgotPassword);
router.addRoute('/check-email', renderCheckEmail);
router.addRoute('/landing', renderLanding);
router.addRoute('/dashboard', renderDashboard, true);
router.addRoute('/transfers', renderTransfer, true);
router.addRoute('/add-money', renderAddMoney, true);
router.addRoute('/bills', () => navigate('/more/billers'), true);
router.addRoute('/withdraw', renderWithdraw, true);
router.addRoute('/card', renderCard, true);
router.addRoute('/profile', renderProfile, true);
router.addRoute('/notifications', renderNotifications, true);
router.addRoute('/change-profile-picture', renderChangeProfilePicture, true);
router.addRoute('/transactions', renderTransactions, true);
router.addRoute('/finances', renderFinances, true);
router.addRoute('/scan-qr', renderScanQR, true);
router.addRoute('/kyc', renderKYC, true);
router.addRoute('/settings', renderSettings, true);
router.addRoute('/personal-info', renderPersonalInfo, true);
router.addRoute('/more/billers', renderBillersPage, true);
router.addRoute('/more/billers/:id', renderBillerPaymentPage, true);
router.addRoute('/more/billers/:id/confirm', renderBillerConfirmPage, true);
router.addRoute('/more/billers/:id/success', renderBillerSuccessPage, true);
router.addRoute('/remittance', renderRemittancePage, true);
router.addRoute('/remittance/western-union', renderRemittanceWUPage, true);
router.addRoute('/remittance/moneygram', renderRemittanceMGPage, true);
router.addRoute('/remittance/success', renderRemittanceSuccessScreen, true);
router.addRoute('/remittance/error', renderRemittanceErrorScreen, true);
router.addRoute('/bank-selection', renderBankSelection, true);
router.addRoute('/bank-details/:bank', (params) => renderBankDetails(params.bank), true);
router.addRoute('/network-selection', renderNetworkSelection, true);
router.addRoute('/network-details/:network', (params) => renderNetworkDetails(params.network), true);

// Defaults
router.setDefaults('/login', '/dashboard');

console.log('[Router] Routes registered:', Array.from(router.routes.keys()));
