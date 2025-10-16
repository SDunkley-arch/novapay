// Transactions page component
import { qs, on, showToast } from '../lib/dom.js';
import { api } from '../api.js';
import { navigate, goBack } from '../router.js';

export function renderTransactions() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Transactions</h1>
        <button class="icon-btn" id="btnFilter">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">All</button>
        <button class="filter-tab" data-filter="income">Income</button>
        <button class="filter-tab" data-filter="expense">Expense</button>
      </div>

      <!-- Transactions List -->
      <div class="transactions-content" id="txContent">
        <!-- Loading skeleton -->
        <div class="tx-skeleton-group">
          <div class="tx-skeleton-date">Loading...</div>
          <div class="tx-skeleton-item"></div>
          <div class="tx-skeleton-item"></div>
          <div class="tx-skeleton-item"></div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  on('click', '#btnBack', () => goBack());
  on('click', '#btnFilter', () => showToast('Filter options coming soon', 'info'));
  
  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;
      loadTransactions(filter);
    });
  });

  // Load initial data
  loadTransactions('all');
}

async function loadTransactions(filter = 'all') {
  const content = qs('#txContent');
  
  try {
    const txs = await api('/wallet/transactions');
    
    if (!txs || txs.length === 0) {
      content.innerHTML = renderEmptyState();
      return;
    }

    // Filter transactions
    let filtered = txs;
    if (filter === 'income') {
      filtered = txs.filter(tx => tx.kind === 'DEPOSIT' || tx.kind === 'RECEIVE');
    } else if (filter === 'expense') {
      filtered = txs.filter(tx => tx.kind === 'WITHDRAW' || tx.kind === 'TRANSFER' || tx.kind === 'BILL');
    }

    // Group by date
    const grouped = groupByDate(filtered);
    content.innerHTML = renderGroupedTransactions(grouped);
    
  } catch (err) {
    console.error('[TRANSACTIONS]', err);
    content.innerHTML = renderDemoTransactions();
  }
}

function groupByDate(transactions) {
  const groups = {};
  
  transactions.forEach(tx => {
    const date = new Date(tx.createdAt);
    const key = formatDateKey(date);
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(tx);
  });
  
  return groups;
}

function formatDateKey(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}

function renderGroupedTransactions(grouped) {
  return Object.entries(grouped).map(([date, txs]) => `
    <div class="tx-group">
      <div class="tx-date-header">${date}</div>
      ${txs.map(tx => renderTransactionCard(tx)).join('')}
    </div>
  `).join('');
}

function renderTransactionCard(tx) {
  const isPositive = tx.kind === 'DEPOSIT' || tx.kind === 'RECEIVE';
  const iconColor = isPositive ? 'tx-icon-green' : 
                    tx.kind === 'TRANSFER' ? 'tx-icon-blue' : 
                    tx.kind === 'BILL' ? 'tx-icon-orange' : 'tx-icon-red';
  const amountClass = isPositive ? 'tx-amount-positive' : 'tx-amount-negative';
  const amountPrefix = isPositive ? '+' : '-';
  
  const icon = getTransactionIcon(tx.kind);
  const label = formatTransactionLabel(tx.kind);
  const time = formatTime(tx.createdAt);
  const amount = (Number(tx.amount || 0) / 100).toFixed(2);
  
  return `
    <div class="tx-card">
      <div class="tx-icon-wrapper ${iconColor}">${icon}</div>
      <div class="tx-details">
        <div class="tx-label">${label}</div>
        <div class="tx-time">${time}</div>
        ${tx.reference ? `<div class="tx-ref">Ref: ${tx.reference}</div>` : ''}
      </div>
      <div class="tx-amount-wrapper">
        <div class="tx-amount ${amountClass}">${amountPrefix}$${amount}</div>
        <div class="tx-currency">${tx.currency}</div>
      </div>
    </div>
  `;
}

function renderDemoTransactions() {
  return `
    <div class="tx-group">
      <div class="tx-date-header">Today</div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">Salary Deposit</div>
          <div class="tx-time">10:30 AM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-positive">+$2,500.00</div>
          <div class="tx-currency">USD</div>
        </div>
      </div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">Transfer to John</div>
          <div class="tx-time">9:15 AM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-negative">-$150.00</div>
          <div class="tx-currency">USD</div>
        </div>
      </div>
    </div>
    <div class="tx-group">
      <div class="tx-date-header">Yesterday</div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-orange">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">Bill Payment</div>
          <div class="tx-time">3:45 PM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-negative">-$85.50</div>
          <div class="tx-currency">USD</div>
        </div>
      </div>
      <div class="tx-card">
        <div class="tx-icon-wrapper tx-icon-red">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <div class="tx-details">
          <div class="tx-label">ATM Withdrawal</div>
          <div class="tx-time">2:20 PM</div>
        </div>
        <div class="tx-amount-wrapper">
          <div class="tx-amount tx-amount-negative">-$200.00</div>
          <div class="tx-currency">JMD</div>
        </div>
      </div>
    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      </div>
      <h3 class="empty-title">No Transactions Yet</h3>
      <p class="empty-text">Your transaction history will appear here</p>
    </div>
  `;
}

function getTransactionIcon(kind) {
  const icons = {
    DEPOSIT: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    WITHDRAW: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
    TRANSFER: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    BILL: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
    RECEIVE: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'
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
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch {
    return 'Recently';
  }
}
