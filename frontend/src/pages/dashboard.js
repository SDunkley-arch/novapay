import { qs, on, showToast } from '../lib/dom.js';
import { api } from '../api.js';
import { navigate } from '../router.js';
import { state } from '../state.js';
import bellIcon from '../../assets/Bell.png';

export function renderDashboard() {
  const app = qs('#app');

  // Derive user name
  const fullName = state?.session?.user?.name ||
    (state?.session?.user?.email ? state.session.user.email.split('@')[0] : 'User');
  const firstName = fullName.split(' ')[0];
  const initials = firstName.substring(0, 2).toUpperCase();

  const unreadCount = Array.isArray(state.notifications) ? state.notifications.length : 0;
  const hasUnread = unreadCount > 0;
  const unreadLabel = unreadCount > 9 ? '9+' : String(unreadCount);

  // Get avatar from localStorage
  const avatarImage = (() => {
    try {
      return localStorage.getItem('novapay_profile_picture');
    } catch {
      return null;
    }
  })();

  const avatarHtml = avatarImage
    ? `<img src="${avatarImage}" alt="${firstName}" class="wallet-avatar-img" />`
    : `<span class="wallet-avatar-initials">${initials}</span>`;

  app.innerHTML = `
    <div class="wallet-dashboard">
      <!-- Background with frosted overlay -->
      <div class="wallet-bg">
        <div class="wallet-bg-image"></div>
        <div class="wallet-bg-frost"></div>
      </div>

      <!-- Main Content -->
      <div class="wallet-content">
        <!-- Top Header: Avatar, Greeting, Bell -->
        <header class="wallet-header">
          <div class="wallet-user">
            <div class="wallet-avatar" id="walletAvatar">
              ${avatarHtml}
            </div>
            <span class="wallet-greeting">Hello, ${firstName}</span>
          </div>
          <button class="wallet-bell${hasUnread ? ' wallet-bell-active' : ''}" id="walletBell" type="button" aria-label="Notifications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            ${hasUnread ? `<span class="wallet-bell-badge">${unreadLabel}</span>` : ''}
          </button>
        </header>

        <!-- Balance Section -->
        <section class="wallet-balance-section">
          <p class="wallet-balance-label">Wallet balance</p>
          <h1 class="wallet-balance-amount" id="walletBalance">$155,832<span class="wallet-balance-cents">.00</span></h1>
          
          <!-- Change Indicators -->
          <div class="wallet-indicators">
            <div class="wallet-indicator wallet-indicator-positive">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
              <span id="positiveChange">+2,340</span>
            </div>
            <div class="wallet-indicator wallet-indicator-negative">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
              <span id="negativeChange">-1,645</span>
            </div>
          </div>
        </section>

        <!-- Action Bar - matching reference design -->
        <div class="wallet-action-bar">
          <div class="wallet-action-bar-inner">
            <button class="wallet-action" id="actionTransfer" type="button">
              <div class="wallet-action-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
              <span class="wallet-action-label">Transfer</span>
            </button>
            
            <button class="wallet-action" id="actionWithdraw" type="button">
              <div class="wallet-action-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="17" y1="7" x2="7" y2="17"/>
                  <polyline points="17 17 7 17 7 7"/>
                </svg>
              </div>
              <span class="wallet-action-label">Withdraw</span>
            </button>
            
            <button class="wallet-action-grid" id="actionMenu" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="6" height="6" rx="1"/>
                <rect x="14" y="4" width="6" height="6" rx="1"/>
                <rect x="4" y="14" width="6" height="6" rx="1"/>
                <rect x="14" y="14" width="6" height="6" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Send Scroller Card -->
      <section class="quick-send-card">
        <div class="quick-send-header">
          <div class="quick-send-title-row">
            <span class="quick-send-title">Quick send</span>
            <span class="quick-send-count">8</span>
          </div>
          <button class="quick-send-menu" type="button" aria-label="More options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#111111">
              <circle cx="12" cy="5" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="12" cy="19" r="2"/>
            </svg>
          </button>
        </div>
        <div class="quick-send-avatars">
          <div class="quick-send-avatar" data-user="nina">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Nina" />
            </div>
            <span class="quick-send-name">Nina</span>
          </div>
          <div class="quick-send-avatar quick-send-avatar-selected" data-user="kim">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Kim" />
            </div>
            <span class="quick-send-name">Kim</span>
          </div>
          <div class="quick-send-avatar" data-user="john">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="John" />
            </div>
            <span class="quick-send-name">John</span>
          </div>
          <div class="quick-send-avatar" data-user="nomaa">
            <div class="quick-send-avatar-img">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Nomaa" />
            </div>
            <span class="quick-send-name">Nomaa</span>
          </div>
        </div>
      </section>

      <!-- Transactions Card -->
      <section class="transactions-card">
        <div class="transactions-header">
          <h2 class="transactions-title">Transactions</h2>
          <button class="transactions-filter-icon" type="button" aria-label="Filter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            <span class="filter-label">Filter</span>
          </button>
        </div>
        
        <!-- Filter Pills Row -->
        <div class="transactions-pills">
          <button class="transactions-pill transactions-pill-active" data-filter="all">All</button>
          <button class="transactions-pill" data-filter="spendings">Spendings</button>
          <button class="transactions-pill" data-filter="earnings">Earnings</button>
        </div>
        
        <!-- Transaction List -->
        <div class="transactions-list" id="transactionsList">
          <div class="transaction-item">
            <div class="transaction-icon transaction-icon-shopping">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div class="transaction-details">
              <span class="transaction-name">Shopping</span>
              <span class="transaction-time">Today, 3:14 pm</span>
            </div>
            <span class="transaction-amount transaction-amount-negative">-$125</span>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-icon transaction-icon-person">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" alt="Helen T." />
            </div>
            <div class="transaction-details">
              <span class="transaction-name">Helen T.</span>
              <span class="transaction-time">Today, 8:09 am</span>
            </div>
            <span class="transaction-amount transaction-amount-positive">+$38.6</span>
          </div>
          
          <div class="transaction-item">
            <div class="transaction-icon transaction-icon-person">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Marcus J." />
            </div>
            <div class="transaction-details">
              <span class="transaction-name">Marcus J.</span>
              <span class="transaction-time">Yesterday, 3:21 pm</span>
            </div>
            <span class="transaction-amount transaction-amount-negative">-$72</span>
          </div>
        </div>
      </section>
    </div>
  `;

  // Event Listeners
  on('click', '#walletBell', () => navigate('/notifications', { animate: 'slide-right-fade' }));
  on('click', '#walletAvatar', () => navigate('/change-profile-picture'));
  on('click', '#actionTransfer', () => navigate('/transfers'));
  on('click', '#actionWithdraw', () => navigate('/withdraw'));
  on('click', '#actionMenu', () => navigate('/remittance', { animate: 'slide-right-fade' }));

  // Quick send avatar clicks
  on('click', '.quick-send-avatar', (e) => {
    const avatar = e.target.closest('.quick-send-avatar');
    if (avatar) {
      const user = avatar.dataset.user;
      navigate(`/transfers?to=${user}`);
    }
  });

  // Transaction filter pills
  on('click', '.transactions-pill', (e) => {
    const pills = document.querySelectorAll('.transactions-pill');
    pills.forEach(p => p.classList.remove('transactions-pill-active'));
    e.target.classList.add('transactions-pill-active');
  });

  // Load balance data
  loadWalletData();
}

async function loadWalletData() {
  const balanceEl = qs('#walletBalance');
  const positiveEl = qs('#positiveChange');
  const negativeEl = qs('#negativeChange');

  try {
    const [bals, txs] = await Promise.all([
      api('/wallet/balances'),
      api('/wallet/transactions').catch(() => [])
    ]);

    // Calculate total balance in USD
    const jmdInUsd = (Number(bals.JMD || 0) / 100) / 155;
    const usd = Number(bals.USD || 0) / 100;
    const total = jmdInUsd + usd;

    if (balanceEl) {
      const formatted = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const [dollars, cents] = formatted.split('.');
      balanceEl.innerHTML = `$${dollars}<span class="wallet-balance-cents">.${cents}</span>`;
    }

    // Calculate weekly changes
    if (txs && txs.length > 0) {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      let positiveTotal = 0;
      let negativeTotal = 0;

      txs.forEach(tx => {
        const txDate = new Date(tx.createdAt);
        if (txDate >= weekAgo) {
          const amt = Number(tx.amount || 0) / 100;
          if (tx.kind === 'DEPOSIT' || tx.kind === 'RECEIVE' || tx.kind === 'P2P_RECV') {
            positiveTotal += amt;
          } else {
            negativeTotal += amt;
          }
        }
      });

      if (positiveEl) positiveEl.textContent = `+${positiveTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      if (negativeEl) negativeEl.textContent = `-${negativeTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }

  } catch (e) {
    console.error('[WALLET DASHBOARD]', e);
    // Keep demo values on error
  }
}