// src/api.js
const API_BASE = "http://127.0.0.1:4000";
let token = null;

export function setToken(t){ token = t; localStorage.setItem("nv_token", t); }
export function loadToken(){ const t = localStorage.getItem("nv_token"); if (t) token = t; }

function headers(extra = {}) {
  const h = { "Content-Type": "application/json", ...extra };
  return token ? { ...h, Authorization: `Bearer ${token}` } : h;
}

export async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers: headers(opts.headers || {}) });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
