import { qs, on, showToast } from '../lib/dom.js';
import { api } from '../api.js';
import { navigate } from '../router.js';
import { state } from '../state.js';

export function renderDashboard() {
  const app = qs('#app');

  // derive a friendly name
  const name =
    state?.session?.user?.name ||
    (state?.session?.user?.email ? state.session.user.email.split('@')[0] : 'there');

  app.innerHTML = `
    <!-- Top header -->
    <div class="page-header">
      <button class="back-btn" data-testid="btnBack">←</button>
      <h1 class="page-title">Dashboard</h1>
      <button id="btnLogout" class="text-sm text-red-600">Logout</button>
    </div>

      <!-- Greeting -->
      <div class="mb-4">
        <div class="text-lg font-semibold">Hello, ${escapeHtml(capitalize(name))}</div>
        <div class="text-xs text-muted">Welcome back to NovaPay</div>
      </div>

      <!-- Verify banner -->
      <div class="mb-6 rounded-xl border border-yellow-300/40 bg-yellow-50 text-yellow-900 px-4 py-3 flex items-start gap-3 shadow-sm">
        <div class="mt-0.5">🔒</div>
        <div class="text-sm leading-5">
          Complete your verification to unlock higher limits and more features.
          <a href="#/profile" class="underline font-medium text-yellow-900/90">Verify now</a>
        </div>
      </div>

      <!-- Balance Hero -->
      <div class="card-lg mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-muted text-sm">Total Balance</div>
            <div class="text-3xl font-semibold" id="total-balance">—</div>
            <div class="text-xs text-muted" id="available-note">Fetching…</div>
          </div>
          <div class="rounded-xl px-4 py-2 bg-indigo-600/10 text-indigo-600 text-sm font-medium">
            NovaPay
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <a href="#/add-money" class="btn btn-secondary w-full text-center">Add Money</a>
        <a href="#/transfers"  class="btn btn-primary  w-full text-center">Send Money</a>
        <a href="#/bills"      class="btn btn-secondary w-full text-center">Pay Bills</a>
        <a href="#/withdraw"   class="btn btn-secondary w-full text-center">Cash Out</a>
      </div>

      <!-- Wallet Balances -->
      <div class="card-lg mb-6">
        <h2 class="h5 mb-3">Wallet Balances</h2>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <div class="text-muted text-sm">JMD</div>
            <div class="text-xl font-semibold">$ <span id="bal-jmd">0.00</span></div>
          </div>
          <div>
            <div class="text-muted text-sm">USD</div>
            <div class="text-xl font-semibold">$ <span id="bal-usd">0.00</span></div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card-lg mb-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="h5">Recent Activity</h2>
          <a href="#/transactions" class="text-sm text-indigo-600">View All</a>
        </div>
        <ul id="txList" class="divide-y divide-slate-200/20">
          <li class="py-3 text-sm text-muted">Loading…</li>
        </ul>
      </div>

      <!-- More Services -->
      <div class="mb-2 text-sm font-medium text-muted">More Services</div>
      <div class="grid grid-cols-2 gap-4">
        <a href="#/card" class="card-sm text-center hover:shadow transition">
          <div class="text-2xl mb-1">💳</div>
          <div class="font-medium">Virtual Card</div>
          <div class="text-xs text-muted">Create & spend online</div>
        </a>
        <a href="#/profile" class="card-sm text-center hover:shadow transition">
          <div class="text-2xl mb-1">⚙️</div>
          <div class="font-medium">Settings</div>
          <div class="text-xs text-muted">Limits, security, KYC</div>
        </a>
      </div>
    </div>
  `;
  
  // Back button (history-aware)
  on(app, '[data-testid="btnBack"]', 'click', () => {
    if (history.length > 1) {
      history.back();
    } else {
      navigate('/login');
    }
  });

  // Bind Logout button after DOM is rendered
  on(app, '#btnLogout', 'click', () => {
    localStorage.removeItem('nv_token');
    try {
      if (state?.session) state.session = null;
    } catch {}
    navigate('/login');
  });

  // Load data after render
  loadBalancesAndActivity();
}

// ---------- helpers ----------

function fmt(n) { return (Number(n || 0) / 100).toFixed(2); }
function prettyTime(iso) { return new Date(iso).toLocaleString(); }
function capitalize(s){ try { return s.charAt(0).toUpperCase() + s.slice(1); } catch { return s; } }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m])); }

async function loadBalancesAndActivity() {
  const jEl = qs('#bal-jmd');
  const uEl = qs('#bal-usd');
  const tEl = qs('#total-balance');
  const note = qs('#available-note');
  const ul = qs('#txList');

  try {
    const [bals, txs] = await Promise.all([
      api('/wallet/balances'),
      api('/wallet/transactions').catch(() => [])
    ]);

    jEl.textContent = fmt(bals.JMD);
    uEl.textContent = fmt(bals.USD);

    const totalUSD = (Number(bals.JMD || 0) / 15500) + (Number(bals.USD || 0) / 100); // demo FX
    tEl.textContent = `$ ${totalUSD.toFixed(2)} (est. USD)`;
    note.textContent = 'Available to spend';

    if (!txs || !txs.length) {
      ul.innerHTML = `<li class="py-3 text-sm text-muted">No transactions yet.</li>`;
    } else {
      ul.innerHTML = txs.slice(0, 5).map(tx => `
        <li class="py-3 flex items-center justify-between">
          <div>
            <div class="font-medium">${tx.kind}</div>
            <div class="text-xs text-muted">${prettyTime(tx.createdAt)}</div>
          </div>
          <div class="font-medium">${fmt(tx.amount)} ${tx.currency}</div>
        </li>
      `).join('');
    }

  } catch (e) {
    console.error('[DASHBOARD]', e);
    localStorage.removeItem('nv_token');
    showToast('Session expired. Please sign in again.', 'error');
    navigate('/login');
  }
}