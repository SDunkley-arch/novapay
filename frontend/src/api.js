// src/api.js

const isAndroid = /Android/i.test(navigator.userAgent);
const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const isCapacitor = typeof window !== 'undefined' && !!window.Capacitor;

let API_BASE;

// Decide API base differently for dev vs production.
const envBase = import.meta.env.VITE_API_BASE;
const host = location.hostname;

if (import.meta.env.MODE === 'production' && !isAndroid && !isCapacitor) {
  // Hosted web build → prefer configured API base, otherwise default prod API.
  API_BASE = envBase || 'https://api.novapay.app';
} else if (isCapacitor && isAndroid) {
  // Capacitor webview on Android - ALWAYS use 10.0.2.2 (works for emulators)
  API_BASE = 'http://10.0.2.2:3000';
  console.log('[NovaPay] Android Capacitor detected, using 10.0.2.2:3000');
} else if (isAndroid) {
  // Android browser (not Capacitor) - also use 10.0.2.2
  API_BASE = 'http://10.0.2.2:3000';
  console.log('[NovaPay] Android browser detected, using 10.0.2.2:3000');
} else if (isCapacitor) {
  // Capacitor webview on other platforms → use current hostname with backend port
  API_BASE = `http://${host}:3000`;
} else if (isLocalhost) {
  // Local browser hitting backend on same machine - use dynamic hostname (localhost or 127.0.0.1)
  API_BASE = `http://${location.hostname}:3000`;
} else {
  // Any other dev host (e.g. 192.168.x.x:8081) → use that host with backend port 4000
  API_BASE = `http://${host}:3000`;
}

export const API_BASE_URL = API_BASE;

// Light-weight runtime debug so we can see what URL the app is using
try {
  console.log('[NovaPay] API_BASE_URL =', API_BASE_URL);
  console.log('[NovaPay] isAndroid =', isAndroid);
  console.log('[NovaPay] isCapacitor =', isCapacitor);
  console.log('[NovaPay] userAgent =', navigator.userAgent);
} catch { }

let token = null;

// Control how auth tokens are persisted.
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
    console.log('[NovaPay] Fetch', opts.method || 'GET', url);
  } catch { }

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
    console.error('[NovaPay] Network Error:', fetchError);

    if (!navigator.onLine || fetchError.name === 'TypeError') {
      throw {
        error: {
          code: 'NETWORK_ERROR',
          message: 'Cannot connect to server. Please check your connection.'
        }
      };
    }

    throw fetchError;
  }
}