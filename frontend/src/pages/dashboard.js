import { qs, on, showToast } from '../lib/dom.js';
import { api } from '../api.js';
import { navigate } from '../router.js';
import { state } from '../state.js';
import sendIcon from '../../assets/Send.png';
import receiveIcon from '../../assets/Receive.png';
import walletIcon from '../../assets/wallet.png';
import withdrawIcon from '../../assets/withdraw.png';
import dollarReceiveIcon from '../../assets/dollar-receive-square.png';
import qrScanIcon from '../../assets/QR Scan.png';
import bellIcon from '../../assets/Bell.png';
import homeIcon from '../../assets/Home.png';
import statisticsIcon from '../../assets/Statistics.png';
import cardsIcon from '../../assets/Cards.png';
import settingsIcon from '../../assets/Settings.png';
import flowAvatar from '../../assets/Flow.png';
import wuAvatar from '../../assets/WU.png';
import pricemartAvatar from '../../assets/Pricemart.png';
import topUpIcon from '../../assets/TopUp.png';

// Ionicons CDN will be loaded via index.html

export function renderDashboard() {
  const app = qs('#app');

  // derive a friendly name
  const name =
    state?.session?.user?.name ||
    (state?.session?.user?.email ? state.session.user.email.split('@')[0] : 'User');
  
  const email = state?.session?.user?.email || '';
  const initials = name.substring(0, 2).toUpperCase();

  const unreadCount = Array.isArray(state.notifications) ? state.notifications.length : 0;
  const hasUnread = unreadCount > 0;
  const unreadLabel = unreadCount > 9 ? '9+' : String(unreadCount);

  const avatarImage = (() => {
    try {
      return localStorage.getItem('novapay_profile_picture');
    } catch {
      return null;
    }
  })();

  const avatarInnerHtml = avatarImage
    ? '<img src="' + avatarImage + '" alt="' + name + '" class="np-avatar-img" />'
    : initials;

  app.innerHTML = `
    <div class="dashboard-container">
      <!-- Header Section -->
      <header class="np-top-nav">
        <div class="np-avatar-wrapper">
          <div class="np-avatar-circle">${avatarInnerHtml}</div>
        </div>
        <button class="np-bell-btn${hasUnread ? ' np-bell-nudge' : ''}" type="button" aria-label="Notifications">
          <img src="${bellIcon}" alt="Notifications" class="np-bell-img" />
          ${hasUnread ? `<span class="np-bell-badge">${unreadLabel}</span>` : ''}
        </button>
      </header>

      <!-- Balance Section -->
      <section class="np-balance-section">
        <p class="np-balance-title">Current Wallet Balance</p>
        <p class="np-balance-amount" id="wallet-balance">$ 5,323.00</p>
      </section>

      <!-- Send / Receive Main Actions -->
      <section class="np-main-actions">
        <button class="np-main-action np-main-action-send" type="button">
          <div class="np-main-action-circle">
            <img src="${sendIcon}" alt="Send" class="np-main-action-img" />
          </div>
          <span class="np-main-action-label">Send</span>
        </button>
        <button class="np-main-action np-main-action-receive" type="button">
          <div class="np-main-action-circle">
            <img src="${receiveIcon}" alt="Receive" class="np-main-action-img" />
          </div>
          <span class="np-main-action-label">Receive</span>
        </button>
      </section>

      <!-- Insight Card -->
      <section class="np-insight-card">
        <div class="np-insight-left">
          <div class="np-insight-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <polyline points="4 19 10 11 14 15 20 5"></polyline>
              <polyline points="4 4 4 19 21 19"></polyline>
            </svg>
          </div>
          <div class="np-insight-copy">
            <div class="np-insight-title">Insight</div>
            <div class="np-insight-subtitle">Balance trend</div>
          </div>
        </div>
        <div class="np-insight-right">
          <div id="weekly-cashflow-amount" class="np-insight-balance">$0.00</div>
          <div id="weekly-cashflow-percent" class="np-insight-trend">0% change</div>
        </div>
        <button type="button" class="np-insight-close" aria-label="Dismiss insight">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CFCFCF" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </section>

      <!-- Mid-level Action Menu -->
      <section class="np-mid-actions">
        <button class="np-mid-action np-mid-action-animate" data-action="remittance" type="button">
          <div class="np-mid-action-icon">
            <img src="${walletIcon}" alt="Remittance" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Remittance</span>
        </button>
        <button class="np-mid-action np-mid-action-animate" data-action="transfer" type="button">
          <div class="np-mid-action-icon">
            <img src="${dollarReceiveIcon}" alt="Transfer" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Transfer</span>
        </button>
        <button class="np-mid-action np-mid-action-animate" data-action="withdraw" type="button">
          <div class="np-mid-action-icon">
            <img src="${withdrawIcon}" alt="Withdraw" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Withdraw</span>
        </button>
        <button class="np-mid-action np-mid-action-animate" data-action="topup" type="button">
          <div class="np-mid-action-icon">
            <img src="${topUpIcon}" alt="Top-up" class="np-mid-action-img" />
          </div>
          <span class="np-mid-action-label">Top-up</span>
        </button>
      </section>

      <!-- Recent Transactions Container -->
      <section class="recentTransactionsContainer">
        <div class="recentTransactionsHeader">
          <h2 class="recentTransactionsTitle">Recent Transactions</h2>
          <a href="#/transactions" class="recentTransactionsSeeAll">See all</a>
        </div>
        <div class="recentTransactionsList" id="txList"></div>
      </section>

      <!-- Floating Action Button -->
      <button class="fab" id="fabAdd" title="Scan QR">
        <div class="fab-icon-wrapper">
          <img src="${qrScanIcon}" alt="Scan QR" class="fab-icon" />
        </div>
      </button>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item nav-item-home nav-item-active" type="button">
          <div class="nav-item-icon">
            <img src="${homeIcon}" alt="Home" class="nav-item-icon-img" />
          </div>
          <span>Home</span>
        </button>

        <button class="nav-item nav-item-statistics" type="button">
          <div class="nav-item-icon">
            <img src="${statisticsIcon}" alt="Finances" class="nav-item-icon-img" />
          </div>
          <span>Finances</span>
        </button>

        <div class="nav-item nav-item-spacer" aria-hidden="true"></div>

        <button class="nav-item nav-item-cards" type="button">
          <div class="nav-item-icon">
            <img src="${cardsIcon}" alt="Cards" class="nav-item-icon-img" />
          </div>
          <span>Cards</span>
        </button>

        <button class="nav-item nav-item-settings" type="button">
          <div class="nav-item-icon">
            <img src="${settingsIcon}" alt="Settings" class="nav-item-icon-img" />
          </div>
          <span>Settings</span>
        </button>
      </nav>
      <div class="home-indicator" aria-hidden="true"></div>
    </div>
  `;
  
  // Bind FAB button
  on('click', '#fabAdd', () => {
    navigate('/scan-qr');
  });

  // Notifications bell
  on('click', '.np-bell-btn', () => {
    navigate('/notifications', { animate: 'slide-right-fade' });
  });

  // Main send/receive actions
  on('click', '.np-main-action-send', () => {
    navigate('/transfers');
  });

  on('click', '.np-main-action-receive', () => {
    navigate('/add-money');
  });

  // Avatar -> Change Profile Picture
  on('click', '.np-avatar-circle', () => {
    navigate('/change-profile-picture');
  });

  // Insight card dismiss
  on('click', '.np-insight-close', () => {
    const card = qs('.np-insight-card');
    if (card) card.style.display = 'none';
  });
  
  // Bind quick actions
  on('click', '[data-action="remittance"]', () => navigate('/remittance', { animate: 'slide-right-fade' }));
  on('click', '[data-action="transfer"]', () => navigate('/transfers'));
  on('click', '[data-action="withdraw"]', () => navigate('/withdraw'));
  on('click', '[data-action="topup"]', () => navigate('/network-selection', { animate: 'slide-right-fade' }));

  // Bottom navigation
  on('click', '.nav-item-home', () => {
    navigate('/dashboard');
  });

  on('click', '.nav-item-statistics', () => {
    navigate('/finances');
  });

  on('click', '.nav-item-cards', () => {
    navigate('/card');
  });

  on('click', '.nav-item-settings', () => {
    navigate('/settings');
  });

  // Load data after render
  loadBalancesAndActivity();
}

// ---------- helpers ----------

// Main send/receive actions
on('click', '.np-main-action-send', () => {
  navigate('/transfers');
});

on('click', '.np-main-action-receive', () => {
  navigate('/add-money');
});

// Avatar -> Change Profile Picture
on('click', '.np-avatar-circle', () => {
  navigate('/change-profile-picture');
});

// Insight card dismiss
on('click', '.np-insight-close', () => {
  const card = qs('.np-insight-card');
  if (card) card.style.display = 'none';
});

// Bind quick actions
on('click', '[data-action="remittance"]', () => navigate('/remittance', { animate: 'slide-right-fade' }));
on('click', '[data-action="transfer"]', () => navigate('/transfers'));
on('click', '[data-action="withdraw"]', () => navigate('/withdraw'));
on('click', '[data-action="topup"]', () => navigate('/network-selection', { animate: 'slide-right-fade' }));

// Bottom navigation
on('click', '.nav-item-home', () => {
  navigate('/dashboard');
});

on('click', '.nav-item-statistics', () => {
  navigate('/finances');
});

on('click', '.nav-item-cards', () => {
  navigate('/card');
});

on('click', '.nav-item-settings', () => {
  navigate('/settings');
});

// Load data after render
function fmt(n) { return (Number(n || 0) / 100).toFixed(2); }
function prettyTime(iso) { return new Date(iso).toLocaleString(); }
function capitalize(s){ try { return s.charAt(0).toUpperCase() + s.slice(1); } catch { return s; } }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m])); }

async function loadBalancesAndActivity() {
  const balanceEl = qs('#wallet-balance');
  const txList = qs('#txList');
  const cashflowAmountEl = qs('#weekly-cashflow-amount');
  const cashflowPercentEl = qs('#weekly-cashflow-percent');

  try {
    const [bals, txs] = await Promise.all([
      api('/wallet/balances'),
      api('/wallet/transactions').catch(() => [])
    ]);

    const totalUSD = (Number(bals.JMD || 0) / 15500) + (Number(bals.USD || 0) / 100);
    if (balanceEl) {
      balanceEl.textContent = `$ ${totalUSD.toFixed(2)}`;
    }

    if (!txs || !txs.length) {
      txList.innerHTML = renderDemoTransactions();
      updateWeeklyCashflowInsight(renderDemoWeeklyCashflow());
    } else {
      // Sort transactions by timestamp in descending order (newest first)
      const sortedTxs = [...txs].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      // Render only the 5 most recent transactions
      txList.innerHTML = sortedTxs.slice(0, 5).map(tx => renderTransaction(tx)).join('');
      updateWeeklyCashflowInsight(calculateWeeklyCashflow(txs));
    }

  } catch (e) {
    console.error('[DASHBOARD]', e);
    if (balanceEl) {
      balanceEl.textContent = '$ 0.00';
    }
    if (txList) {
      txList.innerHTML = renderDemoTransactions();
    }
    updateWeeklyCashflowInsight(renderDemoWeeklyCashflow());
  }
}

function updateWeeklyCashflowInsight(cashflowData) {
  const { difference, percentChange, isPositive } = cashflowData;
  const cashflowAmountEl = qs('#weekly-cashflow-amount');
  const cashflowPercentEl = qs('#weekly-cashflow-percent');
  
  if (cashflowAmountEl) {
    const prefix = isPositive ? '+' : '';
    const formattedAmount = Math.abs(difference).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    cashflowAmountEl.textContent = `${prefix}$${formattedAmount}`;
    cashflowAmountEl.style.color = isPositive ? '#00C853' : '#D32F2F';
  }
  
  if (cashflowPercentEl) {
    const percentPrefix = isPositive ? '+' : '';
    cashflowPercentEl.textContent = `${percentPrefix}${percentChange.toFixed(1)}% vs last week`;
    cashflowPercentEl.style.color = isPositive ? '#00C853' : '#D32F2F';
  }
}

function renderDemoWeeklyCashflow() {
  // Demo data for the insight card
  const difference = 11000;
  const percentChange = 110;
  const isPositive = true;
  
  return { difference, percentChange, isPositive };
}

function renderTransaction(tx) {
  const isPositive = tx.kind === 'DEPOSIT' || tx.kind === 'RECEIVE';
  const amountClass = isPositive ? 'np-tx-amount-positive' : 'np-tx-amount-negative';
  const amountPrefix = isPositive ? '+ ' : '- ';
  const amount = fmt(tx.amount);

  const companyRaw = tx.merchant || tx.counterparty || formatTransactionLabel(tx.kind);
  const descriptionRaw = tx.description || tx.reference || 'Pro Subscription';
  const time = formatTime(tx.createdAt);

  const company = escapeHtml(companyRaw || '');
  const description = escapeHtml(descriptionRaw || '');

  let iconSrc = null;
  if (/flow/i.test(companyRaw || '')) {
    iconSrc = flowAvatar;
  } else if (/western/i.test(companyRaw || '')) {
    iconSrc = wuAvatar;
  } else if (/pricemart/i.test(companyRaw || '')) {
    iconSrc = pricemartAvatar;
  }

  const statusClass = isPositive ? 'np-tx-status-positive' : 'np-tx-status-negative';

  return `
    <div class="np-tx-row">
      <div class="np-tx-icon">
        ${iconSrc ? `<img src="${iconSrc}" alt="${company}" class="np-tx-icon-img" />` : ''}
      </div>
      <div class="np-tx-main">
        <div class="np-tx-company">${company}</div>
        <div class="np-tx-desc-row">
          <div class="np-tx-desc">${description}</div>
          <span class="np-tx-status ${statusClass}"></span>
        </div>
      </div>
      <div class="np-tx-meta">
        <div class="np-tx-amount ${amountClass}">${amountPrefix}$${amount}</div>
        <div class="np-tx-time">${time}</div>
      </div>
    </div>
  `;
}

function renderDemoTransactions() {
  const now = new Date().toISOString();
  // Create timestamps for different times
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const demoTxs = [
    {
      kind: 'BILL',
      merchant: 'Flow Ltd',
      description: 'Pro Subscription',
      createdAt: now,
      amount: 120000,
    },
    {
      kind: 'RECEIVE',
      merchant: 'Western Union',
      description: 'Money Transfer',
      createdAt: now,
      amount: 780000,
    },
    {
      kind: 'BILL',
      merchant: 'Pricemart',
      description: 'Grocery Shopping',
      createdAt: yesterday.toISOString(),
      amount: 540000,
    },
    {
      kind: 'TRANSFER',
      merchant: 'John Smith',
      description: 'Payment',
      createdAt: yesterday.toISOString(),
      amount: 250000,
    },
    {
      kind: 'BILL',
      merchant: 'Amazon',
      description: 'Online Purchase',
      createdAt: twoDaysAgo.toISOString(),
      amount: 189500,
    },
  ];

  // Sort demo transactions by timestamp in descending order (newest first)
  const sortedDemoTxs = [...demoTxs].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  return sortedDemoTxs.map(tx => renderTransaction(tx)).join('');
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