// src/api.js

const isAndroid = /Android/i.test(navigator.userAgent);
const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const isCapacitor = typeof window !== 'undefined' && !!window.Capacitor;

let API_BASE;

// Decide API base differently for dev vs production.
// - In dev (including when served from a LAN IP or inside a Capacitor webview),
//   always talk back to the same host on port 4000 so real devices can reach the backend.
// - In production web, allow an explicit VITE_API_BASE override or fall back to the
//   hosted API domain.
const envBase = import.meta.env.VITE_API_BASE;
const host = location.hostname;

if (import.meta.env.MODE === 'production' && !isAndroid && !isCapacitor) {
  // Hosted web build → prefer configured API base, otherwise default prod API.
  API_BASE = envBase || 'https://api.novapay.app';
} else if (isCapacitor && isAndroid) {
  // Capacitor webview on Android
  // For emulators, use 10.0.2.2 to reach host machine
  // For physical devices, use the development machine's IP address
  const isEmulator = navigator.userAgent.includes('Android SDK');
  if (isEmulator) {
    API_BASE = 'http://10.0.2.2:4000';
    console.log('[NovaPay] Android emulator detected, using 10.0.2.2:4000');
  } else {
    // Physical device - use the actual server IP on the local network
    // Extract the IP from the current URL if possible
    const currentUrl = window.location.href;
    const ipMatch = currentUrl.match(/http:\/\/(\d+\.\d+\.\d+\.\d+)/);
    if (ipMatch && ipMatch[1]) {
      API_BASE = `http://${ipMatch[1]}:4000`;
      console.log('[NovaPay] Using extracted IP from current URL:', API_BASE);
    } else {
      // Fallback to the hardcoded development IP
      API_BASE = 'http://192.168.0.5:4000';
      console.log('[NovaPay] Using hardcoded development IP:', API_BASE);
    }
  }
} else if (isCapacitor) {
  // Capacitor webview on other platforms → use current hostname with backend port
  API_BASE = `http://${host}:4000`;
} else if (isAndroid && (host === '10.0.2.2' || isLocalhost)) {
  // Android emulator browser talking to host machine
  API_BASE = 'http://10.0.2.2:4000';
} else if (isLocalhost) {
  // Local browser hitting backend on same machine
  API_BASE = 'http://localhost:4000';
} else {
  // Any other dev host (e.g. 192.168.x.x:8081) → use that host with backend port 4000
  API_BASE = `http://${host}:4000`;
}

export const API_BASE_URL = API_BASE;

// Light-weight runtime debug so we can see what URL the app is using
try {
  // eslint-disable-next-line no-console
  console.log('[NovaPay] API_BASE_URL =', API_BASE_URL);
} catch {}

let token = null;

// Control how auth tokens are persisted.
// If options.persist is true (default) the token is written to localStorage.
// If options.ttlMs is provided, an absolute expiry timestamp is stored in nv_token_exp
// and enforced when loading.
export function setToken(t, options) {
  token = t;

  try {
    const opts = options || {};
    const persist = opts.persist !== undefined ? opts.persist : true;
    const hasTtl = typeof opts.ttlMs === 'number' && opts.ttlMs > 0;

    if (!persist) {
      localStorage.removeItem('nv_token');
      localStorage.removeItem('nv_token_exp');
      return;
    }

    localStorage.setItem('nv_token', t);

    if (hasTtl) {
      const expiresAt = Date.now() + opts.ttlMs;
      localStorage.setItem('nv_token_exp', String(expiresAt));
    } else {
      localStorage.removeItem('nv_token_exp');
    }
  } catch {
    // Swallow storage errors (e.g., private mode)
  }
}

export function loadToken() {
  try {
    const t = localStorage.getItem('nv_token');
    if (!t) return;

    const expRaw = localStorage.getItem('nv_token_exp');
    if (expRaw) {
      const exp = Number(expRaw);
      if (!Number.isNaN(exp) && Date.now() > exp) {
        clearToken();
        return;
      }
    }

    token = t;
  } catch {
    // If we can't read storage, just leave token as in-memory only
  }
}

export function clearToken() {
  token = null;
  localStorage.removeItem('nv_token');
  localStorage.removeItem('nv_token_exp');
}

function headers(extra = {}) {
  const base = { 'Content-Type': 'application/json', ...extra };
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

export async function api(path, opts = {}) {
  const url = `${API_BASE_URL}${path}`;

  try {
    // eslint-disable-next-line no-console
    console.log('[NovaPay] Fetch', opts.method || 'GET', url, 'Body:', opts.body ? JSON.parse(opts.body) : 'none');
    console.log('[NovaPay] Network status:', navigator.onLine ? 'Online' : 'Offline');
    console.log('[NovaPay] User agent:', navigator.userAgent);
  } catch (logError) {
    console.error('[NovaPay] Error logging request details:', logError);
  }

  try {
    const res = await fetch(url, {
      ...opts,
      headers: headers(opts.headers || {})
    });

    let data = null;
    try {
      data = await res.clone().json();
    } catch (parseError) {
      console.error('[NovaPay] JSON parse error:', parseError);
      data = null;
    }

    if (res.status === 401) {
      clearToken();
      window.location.hash = '#/login';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      console.error(`[NovaPay] API Error: HTTP ${res.status}`, data);
      throw data || new Error(`HTTP ${res.status}`);
    }

    return data;
  } catch (fetchError) {
    // Handle network connectivity errors
    console.error('[NovaPay] Network Error:', fetchError);
    
    // Check if it's a network connectivity issue
    if (!navigator.onLine || fetchError.name === 'TypeError') {
      throw { 
        error: { 
          code: 'NETWORK_ERROR',
          message: 'Network connection issue. Please check your internet connection.'
        }
      };
    }
    
    // Check for Capacitor HTTP plugin errors
    if (fetchError.code === 'ConnectException' || 
        (fetchError.message && fetchError.message.includes('Failed to connect'))) {
      console.error('[NovaPay] Server connection error:', fetchError);
      throw { 
        error: { 
          code: 'ConnectException',
          message: 'Failed to connect to server. Please check server address and ensure it is running.'
        }
      };
    }
    
    // Re-throw the original error
    throw fetchError;
  }
}