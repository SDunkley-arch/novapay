import { qs, on, showToast } from '../lib/dom.js';
import { api } from '../api.js';
import { navigate } from '../router.js';
import { state } from '../state.js';

// Ionicons CDN will be loaded via index.html

export function renderDashboard() {
  const app = qs('#app');

  // derive a friendly name
  const name =
    state?.session?.user?.name ||
    (state?.session?.user?.email ? state.session.user.email.split('@')[0] : 'User');
  
  const email = state?.session?.user?.email || '';
  const initials = name.substring(0, 2).toUpperCase();

  app.innerHTML = `
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="dashboard-header">
        <div class="header-top">
          <div class="location-badge">
            <svg class="location-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Jamaica</span>
          </div>
          <div class="profile-section">
            <div class="membership-badge">Gold</div>
            <div class="avatar">${initials}</div>
          </div>
        </div>
        
        <div class="greeting-section">
          <h1 class="greeting-title">Hello, ${escapeHtml(capitalize(name))}! 👋</h1>
          <p class="greeting-subtitle">Welcome back to NovaPay</p>
        </div>
      </div>

      <!-- Virtual Card -->
      <div class="virtual-card-container">
        <div class="virtual-card">
          <div class="card-header">
            <div class="card-logo">NovaPay</div>
            <div class="card-type">Virtual</div>
          </div>
          <div class="card-chip"></div>
          <div class="card-number" id="card-number">**** **** **** 5678</div>
          <div class="card-footer">
            <div class="card-holder">
              <div class="card-label">Card Holder</div>
              <div class="card-value">${escapeHtml(name)}</div>
            </div>
            <div class="card-expiry">
              <div class="card-label">Expires</div>
              <div class="card-value">12/25</div>
            </div>
            <div class="card-brand">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <circle cx="15" cy="12" r="10" fill="#EB001B" opacity="0.8"/>
                <circle cx="25" cy="12" r="10" fill="#F79E1B" opacity="0.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Insight Card -->
      <div class="insight-card">
        <div class="insight-header">
          <div>
            <div class="insight-label">Total Balance</div>
            <div class="insight-amount" id="total-balance">$0.00</div>
          </div>
          <div class="insight-trend" id="insight-trend">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span class="trend-value">+12.5%</span>
          </div>
        </div>
        <div class="balance-breakdown">
          <div class="balance-item">
            <span class="balance-currency">JMD</span>
            <span class="balance-value" id="bal-jmd">$0.00</span>
          </div>
          <div class="balance-divider"></div>
          <div class="balance-item">
            <span class="balance-currency">USD</span>
            <span class="balance-value" id="bal-usd">$0.00</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions-section">
        <div class="quick-action" data-action="remittance">
          <div class="action-icon action-icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <span class="action-label">Remittance</span>
        </div>
        <div class="quick-action" data-action="transfer">
          <div class="action-icon action-icon-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <span class="action-label">Transfer</span>
        </div>
        <div class="quick-action" data-action="withdraw">
          <div class="action-icon action-icon-green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <span class="action-label">Withdraw</span>
        </div>
        <div class="quick-action" data-action="more">
          <div class="action-icon action-icon-orange">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </div>
          <span class="action-label">More</span>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="transactions-section">
        <div class="section-header">
          <h2 class="section-title">Recent Transactions</h2>
          <a href="#/transactions" class="see-all-link">See all</a>
        </div>
        <div class="transactions-list" id="txList">
          <!-- Skeleton loader -->
          <div class="transaction-skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
              <div class="skeleton-line skeleton-line-title"></div>
              <div class="skeleton-line skeleton-line-subtitle"></div>
            </div>
            <div class="skeleton-amount"></div>
          </div>
          <div class="transaction-skeleton">
            <div class="skeleton-icon"></div>
            <div class="skeleton-content">
              <div class="skeleton-line skeleton-line-title"></div>
              <div class="skeleton-line skeleton-line-subtitle"></div>
            </div>
            <div class="skeleton-amount"></div>
          </div>
        </div>
      </div>

      <!-- Floating Action Button -->
      <button class="fab" id="fabAdd" title="Add Money">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <a href="#/dashboard" class="nav-item nav-item-active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span>Home</span>
        </a>
        <a href="#/stats" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span>Statistics</span>
        </a>
        <a href="#/card" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          <span>Cards</span>
        </a>
        <a href="#/settings" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  `;
  
  // Bind FAB button
  on('click', '#fabAdd', () => {
    navigate('/add-money');
  });

  // Bind quick actions
  on('click', '[data-action="remittance"]', () => navigate('/add-money'));
  on('click', '[data-action="transfer"]', () => navigate('/transfers'));
  on('click', '[data-action="withdraw"]', () => navigate('/withdraw'));
  on('click', '[data-action="more"]', () => navigate('/bills'));

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
  const txList = qs('#txList');

  try {
    const [bals, txs] = await Promise.all([
      api('/wallet/balances'),
      api('/wallet/transactions').catch(() => [])
    ]);

    // Update balances
    const jmdAmount = fmt(bals.JMD);
    const usdAmount = fmt(bals.USD);
    jEl.textContent = `$${jmdAmount}`;
    uEl.textContent = `$${usdAmount}`;

    const totalUSD = (Number(bals.JMD || 0) / 15500) + (Number(bals.USD || 0) / 100);
    tEl.textContent = `$${totalUSD.toFixed(2)}`;

    // Render transactions with modern UI
    if (!txs || !txs.length) {
      // Show demo transactions if empty
      txList.innerHTML = renderDemoTransactions();
    } else {
      txList.innerHTML = txs.slice(0, 5).map(tx => renderTransaction(tx)).join('');
    }

  } catch (e) {
    console.error('[DASHBOARD]', e);
    // Show demo data on error
    jEl.textContent = '$0.00';
    uEl.textContent = '$0.00';
    tEl.textContent = '$0.00';
    txList.innerHTML = renderDemoTransactions();
  }
}

function renderTransaction(tx) {
  const isPositive = tx.kind === 'DEPOSIT' || tx.kind === 'RECEIVE';
  const iconColor = isPositive ? 'tx-icon-green' : 'tx-icon-red';
  const amountClass = isPositive ? 'tx-amount-positive' : 'tx-amount-negative';
  const amountPrefix = isPositive ? '+' : '-';
  
  const icon = getTransactionIcon(tx.kind);
  const label = formatTransactionLabel(tx.kind);
  const time = formatTime(tx.createdAt);
  
  return `
    <div class="transaction-item">
      <div class="tx-icon ${iconColor}">${icon}</div>
      <div class="tx-info">
        <div class="tx-title">${label}</div>
        <div class="tx-time">${time}</div>
      </div>
      <div class="tx-amount ${amountClass}">${amountPrefix}${fmt(tx.amount)} ${tx.currency}</div>
    </div>
  `;
}

function renderDemoTransactions() {
  return `
    <div class="transaction-item">
      <div class="tx-icon tx-icon-green">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="tx-info">
        <div class="tx-title">Salary Deposit</div>
        <div class="tx-time">Today, 10:30 AM</div>
      </div>
      <div class="tx-amount tx-amount-positive">+$2,500.00</div>
    </div>
    <div class="transaction-item">
      <div class="tx-icon tx-icon-blue">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      <div class="tx-info">
        <div class="tx-title">Transfer to John</div>
        <div class="tx-time">Yesterday, 3:45 PM</div>
      </div>
      <div class="tx-amount tx-amount-negative">-$150.00</div>
    </div>
    <div class="transaction-item">
      <div class="tx-icon tx-icon-orange">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      </div>
      <div class="tx-info">
        <div class="tx-title">Bill Payment</div>
        <div class="tx-time">Dec 10, 2:15 PM</div>
      </div>
      <div class="tx-amount tx-amount-negative">-$85.50</div>
    </div>
  `;
}

function getTransactionIcon(kind) {
  const icons = {
    DEPOSIT: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    WITHDRAW: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
    TRANSFER: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    BILL: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>'
  };
  return icons[kind] || icons.TRANSFER;
}

function formatTransactionLabel(kind) {
  const labels = {
    DEPOSIT: 'Deposit',
    WITHDRAW: 'Withdrawal',
    TRANSFER: 'Transfer',
    BILL: 'Bill Payment',
    RECEIVE: 'Received'
  };
  return labels[kind] || kind;
}

function formatTime(iso) {
  try {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}