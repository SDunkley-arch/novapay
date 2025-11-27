// Session Manager - Handles user session timeouts and auto-logout
import { clearToken } from './api.js';
import { navigate } from './router.js';
import { clearSession } from './state.js';

// Configuration
const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes in milliseconds
let inactivityTimer = null;
let lastActivityTime = Date.now();
let isFirstLaunch = false;

// Check if this is the first time the app is launched on this device
export function checkFirstLaunch() {
  try {
    const hasLaunchedBefore = localStorage.getItem('novapay_has_launched');
    isFirstLaunch = !hasLaunchedBefore;
    
    if (isFirstLaunch) {
      // Mark that the app has been launched
      localStorage.setItem('novapay_has_launched', 'true');
      console.log('[NovaPay] First launch detected, redirecting to login');
      navigate('/login');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('[NovaPay] Error checking first launch:', error);
    return false;
  }
}

// Initialize the session manager
export function initSessionManager() {
  // Check if this is the first launch
  if (checkFirstLaunch()) {
    return;
  }
  
  // Start tracking user activity
  resetInactivityTimer();
  
  // Set up event listeners for user activity
  const activityEvents = [
    'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'touchmove'
  ];
  
  activityEvents.forEach(eventName => {
    document.addEventListener(eventName, handleUserActivity, { passive: true });
  });
  
  // Also track hash changes as activity
  window.addEventListener('hashchange', handleUserActivity);
  
  console.log('[NovaPay] Session manager initialized with timeout of', INACTIVITY_TIMEOUT, 'ms');
}

// Handle user activity
function handleUserActivity() {
  lastActivityTime = Date.now();
  resetInactivityTimer();
}

// Reset the inactivity timer
function resetInactivityTimer() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  inactivityTimer = setTimeout(handleSessionTimeout, INACTIVITY_TIMEOUT);
}

// Handle session timeout
function handleSessionTimeout() {
  console.log('[NovaPay] Session timed out due to inactivity');
  
  // Clear the user's session
  clearToken();
  clearSession();
  
  // Redirect to login page
  navigate('/login', { 
    replace: true,
    state: { 
      timeout: true,
      message: 'Your session has expired due to inactivity. Please log in again.'
    }
  });
}

// Check if the session is still valid
export function checkSessionValidity() {
  // Don't check session validity on login or register pages
  const currentHash = window.location.hash;
  if (currentHash.includes('/login') || currentHash.includes('/register') || 
      currentHash.includes('/landing') || currentHash.includes('/forgot-password')) {
    return true;
  }
  
  const currentTime = Date.now();
  const inactiveTime = currentTime - lastActivityTime;
  
  if (inactiveTime >= INACTIVITY_TIMEOUT) {
    handleSessionTimeout();
    return false;
  }
  
  return true;
}

// Clean up event listeners when no longer needed
export function cleanupSessionManager() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  const activityEvents = [
    'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'touchmove'
  ];
  
  activityEvents.forEach(eventName => {
    document.removeEventListener(eventName, handleUserActivity);
  });
  
  window.removeEventListener('hashchange', handleUserActivity);
}
