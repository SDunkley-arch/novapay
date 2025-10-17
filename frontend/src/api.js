// src/api.js

const isAndroid = /Android/i.test(navigator.userAgent);
const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

let API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Android emulator → connects to backend running on host PC
if (isAndroid) {
  API_BASE = 'http://10.0.2.2:4000';
}

// Physical Android device → uses LAN IP
if (!isLocalhost && !isAndroid) {
  API_BASE = 'http://192.168.0.6:4000'; // <-- your actual PC IP
}

if (import.meta.env.MODE === 'production') {
  API_BASE = import.meta.env.VITE_API_BASE || 'https://api.novapay.app';
}

export const API_BASE_URL = API_BASE;

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
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

export async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...opts,
    headers: headers(opts.headers || {})
  });

  let data = null;
  try {
    data = await res.clone().json();
  } catch {
    data = null;
  }

  if (res.status === 401) {
    clearToken();
    window.location.hash = '#/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    throw data || new Error(`HTTP ${res.status}`);
  }

  return data;
}