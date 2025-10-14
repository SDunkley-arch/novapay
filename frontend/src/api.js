// src/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';
let token = null;

export function setToken(t) {
  token = t;
  localStorage.setItem('nv_token', t);
}
export function loadToken() {
  const t = localStorage.getItem('nv_token');
  if (t) token = t;
}
export function clearToken() {
  token = null;
  localStorage.removeItem('nv_token');
}

function headers(extra = {}) {
  const base = { 'Content-Type': 'application/json', ...extra };
  return token ? { ...base, Authorization: `Bearer ${token}`  } : base;
}

export async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}` , {
    ...opts,
    headers: headers(opts.headers || {})
  });

  // Handle empty bodies safely
  let data = null;
  try { data = await res.clone().json(); } catch { data = null; }

  if (res.status === 401) {
    // Global unauthorized handling: clear token and kick to login
    clearToken();
    // Avoid importing router to prevent cycles
    window.location.hash = '#/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    throw data || new Error(`HTTP ${res.status}` );
  }
  return data;
}
