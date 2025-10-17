// NovaPay Hash Router — Frontend Routing System
import { isLoggedIn } from './state.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderLanding } from './pages/landing.js';
import { renderTransfer } from './pages/transfer.js';
import { renderAddMoney } from './pages/add-money.js';
import { renderBills } from './pages/bills.js';
import { renderWithdraw } from './pages/withdraw.js';
import { renderCard } from './pages/card.js';
import { renderProfile } from './pages/profile.js';
import { renderTransactions } from './pages/transactions.js';
import { renderKYC } from './pages/kyc.js';
import { renderSettings } from './pages/settings.js';
import { renderEditProfile } from './pages/edit-profile.js';
import { renderPersonalInfo } from './pages/personal-info.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.defaultRoute = '/login';
    this.authRoute = '/dashboard';

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

  // Navigation helpers
  navigate(path) {
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

    let route = this.routes.get(hash);

    // If route not found → redirect to defaults
    if (!route) {
      const fallback = isLoggedIn() ? this.authRoute : this.defaultRoute;
      console.warn(`[Router] Unknown route "${hash}". Redirecting to: ${fallback}`);
      this.redirect(fallback);
      return;
    }

    // Auth checks
    if (route.requiresAuth && !isLoggedIn()) {
      console.warn(`[Router] Protected route "${hash}" blocked — user not logged in`);
      this.redirect(this.defaultRoute);
      return;
    }

    if (!route.requiresAuth && isLoggedIn() &&
        (hash === '/login' || hash === '/register' || hash === '/landing')) {
      console.log(`[Router] User logged in, redirecting from public route "${hash}" to dashboard`);
      this.redirect(this.authRoute);
      return;
    }

    // Execute the route handler
    try {
      console.log(`[Router] Rendering route: ${hash}`);
      const mount = document.getElementById('app');
      if (mount) mount.innerHTML = ''; // Clear old content
      route.handler();
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
}

// Instantiate router
export const router = new Router();

// Expose helpers for easy navigation
export function navigate(path) { router.navigate(path); }
export function redirect(path) { router.redirect(path); }
export function goBack() { router.goBack(); }

// Route Registration
router.addRoute('/login', renderLogin);
router.addRoute('/register', renderRegister);
router.addRoute('/landing', renderLanding);
router.addRoute('/dashboard', renderDashboard, true);
router.addRoute('/transfers', renderTransfer, true);
router.addRoute('/add-money', renderAddMoney, true);
router.addRoute('/bills', renderBills, true);
router.addRoute('/withdraw', renderWithdraw, true);
router.addRoute('/card', renderCard, true);
router.addRoute('/profile', renderProfile, true);
router.addRoute('/transactions', renderTransactions, true);
router.addRoute('/kyc', renderKYC, true);
router.addRoute('/settings', renderSettings, true);
router.addRoute('/edit-profile', renderEditProfile, true);
router.addRoute('/personal-info', renderPersonalInfo, true);

// Defaults
router.setDefaults('/login', '/dashboard');

console.log('[Router] Routes registered:', Array.from(router.routes.keys()));
