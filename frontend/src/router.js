// Hash-based router for NovaPay
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
class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.defaultRoute = null;
    this.authRoute = null;
    
    // Listen for hash changes and initial load
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }
  
  // Register a route
  addRoute(path, handler, requiresAuth = false) {
    this.routes.set(path, { handler, requiresAuth });
  }
  
  // Set default routes
  setDefaults(defaultRoute, authRoute) {
    this.defaultRoute = defaultRoute;
    this.authRoute = authRoute;
  }
  
  // Navigate to a route
  navigate(path) {
    window.location.hash = path;
  }
  
  // True redirect without adding a history entry
  redirect(path) {
    window.location.replace(`#${path}`);
  }
  
  // Get current hash without #
  getCurrentHash() {
    return window.location.hash.slice(1) || '';
  }
  
  // Handle route changes
  handleRoute() {
    const hash = this.getCurrentHash();
    let route = this.routes.get(hash);
    
    // If route doesn't exist, use defaults
    if (!route) {
      const targetRoute = isLoggedIn() ? this.authRoute : this.defaultRoute;
      if (targetRoute && hash !== targetRoute) {
        this.redirect(targetRoute);
        return;
      }
      route = this.routes.get(targetRoute);
    }
    
    // Check authentication
    if (route && route.requiresAuth && !isLoggedIn()) {
      this.redirect(this.defaultRoute);
      return;
    }
    
    // If logged in and trying to access public routes, redirect to dashboard
    if (route && !route.requiresAuth && isLoggedIn() && 
        (hash === '/landing' || hash === '/login' || hash === '/register')) {
      this.redirect(this.authRoute);
      return;
    }
    
    // Execute route handler
    if (route && route.handler) {
      this.currentRoute = hash;
      route.handler();
    } else {
      console.warn(`No handler found for route: ${hash}`);
    }
  }
  
  // Get current route
  getCurrentRoute() {
    return this.currentRoute;
  }
  
  // Go back
  goBack() {
    window.history.back();
  }
}

// Create and export router instance
export const router = new Router();

// Navigation helpers
export function navigate(path) {
  router.navigate(path);
}

export function redirect(path) {
  router.redirect(path);
}

export function goBack() {
  router.goBack();
}

// Register routes
router.addRoute('/login', renderLogin);
router.addRoute('/register', renderRegister);
router.addRoute('/landing', renderLanding);
router.addRoute('/dashboard', renderDashboard, true); // true = requiresAuth
router.addRoute('/transfers', renderTransfer, true);
router.addRoute('/add-money', renderAddMoney, true);
router.addRoute('/bills', renderBills, true);
router.addRoute('/withdraw', renderWithdraw, true);
router.addRoute('/card', renderCard, true);
router.addRoute('/profile', renderProfile, true);

// Set defaults: first arg = default (public), second = requires auth
router.setDefaults('/login', '/dashboard');