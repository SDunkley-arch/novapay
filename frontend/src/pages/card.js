// Card page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, save } from '../state.js';
import { fmtCurrency, fmtDate } from '../utils/format.js';
import teddyImg from '../../assets/Teddy_Lrg.png';

export function renderCard() {
  const app = qs('#app');
  
  if (!state.card.hasCard) {
    renderGetCard();
  } else {
    renderCardDetails();
  }
}

function renderCurrentCardsSection() {
  const cards = Array.isArray(state.card.savedCards) ? state.card.savedCards : [];
  const hasCards = cards.length > 0;

  const rows = hasCards
    ? cards
        .map((card, index) => {
          const label = card.label || 'Saved Card';
          const last4 = card.last4 || (card.masked ? String(card.masked).slice(-4) : '');
          const statusText = card.verified ? 'Verified' : 'Awaiting confirmation';
          const statusClass = card.verified ? 'card-status-pill-success' : 'card-status-pill-pending';

          return `
            <button
              type="button"
              class="current-card-row"
              data-card-id="${card.id || ''}"
              data-card-index="${index}"
            >
              <div class="current-card-main">
                <div class="current-card-title">${label}</div>
                <div class="current-card-subtitle">•••• ${last4}</div>
              </div>
              <span class="card-status-pill ${statusClass}">${statusText}</span>
            </button>
          `;
        })
        .join('')
    : `
        <div class="current-card-empty">
          <p class="current-card-empty-title">No cards added yet</p>
          <p class="current-card-empty-subtitle">Add a card or get your virtual card to start using NovaPay.</p>
        </div>
      `;

  return `
    <section class="current-cards-section">
      <h3 class="section-title-sm current-cards-title">Current Cards</h3>
      <div class="current-cards-list">
        ${rows}
      </div>
    </section>
    <div class="current-cards-divider"></div>
    <div class="current-card-modal-backdrop" id="currentCardModal" aria-hidden="true">
      <div class="current-card-modal" role="dialog" aria-modal="true">
        <h3 class="current-card-modal-title" id="currentCardModalTitle">Card details</h3>
        <p class="current-card-modal-masked" id="currentCardModalMasked">&bull;&bull;&bull;&bull; 0000</p>
        <div class="current-card-modal-status-row">
          <span class="card-status-pill card-status-pill-pending" id="currentCardModalStatusPill">Awaiting confirmation</span>
        </div>
        <button class="btn-primary-modern btn-full current-card-modal-primary" id="currentCardUseBtn">
          Use this card (coming soon)
        </button>
        <button class="btn btn-secondary btn-full current-card-modal-close" id="currentCardCloseBtn">
          Close
        </button>
      </div>
    </div>
  `;
}

function renderGetCard() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" data-action="nav-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Virtual Card</h1>
        <div class="icon-btn-placeholder"></div>
      </div>
      
      <div class="settings-content">
        ${renderCurrentCardsSection()}
        <div class="settings-group">
          <div class="settings-list">
            <div class="card text-center">
              <div class="text-6xl mb-4">💳</div>
              <h3 class="text-lg font-semibold mb-2">Get Your Virtual Card</h3>
              <p class="text-muted mb-6">
                Shop online, pay bills, and make purchases anywhere Visa is accepted
              </p>
              
              <div class="space-y-4 mb-6 text-left">
                <div class="flex items-center gap-4">
                  <div class="text-2xl">🛒</div>
                  <div>
                    <h4 class="font-semibold">Online Shopping</h4>
                    <p class="text-muted text-sm">Use anywhere online that accepts Visa</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="text-2xl">🔒</div>
                  <div>
                    <h4 class="font-semibold">Secure Payments</h4>
                    <p class="text-muted text-sm">Advanced security with instant notifications</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="text-2xl">⚡</div>
                  <div>
                    <h4 class="font-semibold">Instant Activation</h4>
                    <p class="text-muted text-sm">Ready to use in seconds</p>
                  </div>
                </div>
              </div>
              
              <button class="btn-primary-modern btn-full" data-testid="btnActivateCard">
                Get Virtual Card
              </button>
              
              <p class="text-xs text-muted mt-4">
                Free to activate • No monthly fees
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners
  on(app, '[data-testid="btnActivateCard"]', 'click', () => {
    const activateBtn = qs('[data-testid="btnActivateCard"]');
    activateBtn.textContent = 'Activating...';
    activateBtn.disabled = true;
    
    setTimeout(() => {
      state.card.hasCard = true;
      state.card.masked = '•••• •••• •••• 1234';
      state.card.expiry = '12/28';
      state.card.frozen = false;
      save();
      
      showToast('Virtual card activated successfully!', 'success');
      renderCard();
    }, 2000);
  });

  // Bind header back button for this view
  setupCardListeners();
}

function renderCardDetails() {
  const app = qs('#app');
  
  // Mock card transactions
  const cardTxs = state.txs.filter(tx => tx.type === 'CARD').slice(0, 5);
  
  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" data-action="nav-back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Virtual Card</h1>
        <div class="icon-btn-placeholder"></div>
      </div>
      
      <div class="settings-content">
        ${renderCurrentCardsSection()}
        <!-- Card Display -->
        <div class="card-display">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="text-sm opacity-80">NovaPay Virtual</div>
              <div class="text-lg font-semibold">Visa Debit</div>
            </div>
            <div class="text-2xl">💳</div>
          </div>
          
          <div class="card-number" id="cardNumber">
            ${state.card.masked}
          </div>
          
          <div class="card-details">
            <div>
              <div class="text-xs opacity-80">VALID THRU</div>
              <div class="font-semibold">${state.card.expiry}</div>
            </div>
            <div>
              <div class="text-xs opacity-80">CVV</div>
              <div class="font-semibold" id="cvvDisplay">•••</div>
            </div>
          </div>
        </div>
        
        <!-- Card Actions -->
        <div class="grid grid-2 gap-4 mb-6">
          <button class="btn btn-secondary" id="toggleCvv">
            👁️ Reveal CVV
          </button>
          <button class="btn btn-secondary" id="toggleFreeze">
            ${state.card.frozen ? '🔓 Unfreeze' : '🔒 Freeze'} Card
          </button>
        </div>
        
        <!-- Additional Actions -->
        <div class="card mb-6">
          <h3 class="text-lg mb-4">Account Management</h3>
          
          <div class="space-y-4">
            <button class="card-action" id="addToWallet">
              <div class="flex items-center gap-4">
                <div class="text-2xl">📱</div>
                <div>
                  <h4 class="font-semibold">Add to Wallet</h4>
                  <p class="text-muted text-sm">Add to Apple Pay or Google Pay</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </button>

            <button class="card-action" id="addBankCard">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🏦</div>
                <div>
                  <h4 class="font-semibold">Add Bank/Card</h4>
                  <p class="text-muted text-sm">Link a new bank account or debit card</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </button>
            
            <button class="card-action" id="setLimits">
              <div class="flex items-center gap-4">
                <div class="text-2xl">⚙️</div>
                <div>
                  <h4 class="font-semibold">Set Limits</h4>
                  <p class="text-muted text-sm">Manage spending limits</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </button>
            
            <button class="card-action" id="cardSettings">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🔧</div>
                <div>
                  <h4 class="font-semibold">Card Settings</h4>
                  <p class="text-muted text-sm">Notifications and preferences</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </button>
          </div>
        </div>
        
        <!-- Linked Accounts & Cards -->
        <div class="card">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg">Linked accounts & cards</h3>
          </div>
          
          <div class="linked-list">
            ${state.card.linkedAccounts && state.card.linkedAccounts.length ? state.card.linkedAccounts.map(acc => `
              <div class="linked-item">
                <div class="linked-main">
                  <div class="linked-label">${acc.label}</div>
                  <div class="linked-meta">${acc.type === 'BANK' ? 'Bank account' : 'Card'} · ${acc.masked || ''}</div>
                </div>
                <div class="linked-status">${acc.status || 'Active'}</div>
              </div>
            `).join('') : `
              <div class="linked-empty">
                <img src="${teddyImg}" alt="" class="linked-empty-img" />
                <div class="linked-empty-text">
                  <p class="text-muted">No bank accounts or cards linked yet</p>
                  <p class="text-muted text-sm">Use \"Add Bank/Card\" above to link one.</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
  
  setupCardListeners();
}

function setupCardListeners() {
  const app = qs('#app');
  
  // Header back
  on(app, '[data-action="nav-back"]', 'click', () => navigate('/dashboard'));
  
  // Toggle CVV visibility
  on(app, '#toggleCvv', 'click', () => {
    const cvvDisplay = qs('#cvvDisplay');
    const toggleBtn = qs('#toggleCvv');
    
    if (cvvDisplay.textContent === '•••') {
      cvvDisplay.textContent = '123';
      toggleBtn.textContent = '🙈 Hide CVV';
    } else {
      cvvDisplay.textContent = '•••';
      toggleBtn.textContent = '👁️ Reveal CVV';
    }
  });
  
  // Toggle card freeze
  on(app, '#toggleFreeze', 'click', () => {
    const toggleBtn = qs('#toggleFreeze');
    
    state.card.frozen = !state.card.frozen;
    save();
    
    if (state.card.frozen) {
      toggleBtn.textContent = '🔓 Unfreeze Card';
      showToast('Card frozen successfully', 'success');
    } else {
      toggleBtn.textContent = '🔒 Freeze Card';
      showToast('Card unfrozen successfully', 'success');
    }
  });
  
  // Add to wallet
  on(app, '#addToWallet', 'click', () => {
    showToast('Add to Wallet feature coming soon!', 'info');
  });
  
  // Add bank/card
  on(app, '#addBankCard', 'click', () => {
    showToast('Add Bank/Card linking is coming soon!', 'info');
  });
  
  // Set limits
  on(app, '#setLimits', 'click', () => {
    showToast('Set Limits feature coming soon!', 'info');
  });
  
  // Card settings
  on(app, '#cardSettings', 'click', () => {
    showToast('Card Settings feature coming soon!', 'info');
  });

  // Current Cards: open detail modal
  on(app, '.current-card-row', 'click', (event) => {
    const row = event.target.closest('.current-card-row');
    if (!row) return;

    const cards = Array.isArray(state.card.savedCards) ? state.card.savedCards : [];
    const cardId = row.dataset.cardId;
    const indexAttr = row.dataset.cardIndex;

    let card = null;
    if (cardId) {
      card = cards.find((c) => c && c.id === cardId) || null;
    }
    if (!card && indexAttr != null) {
      const idx = Number(indexAttr);
      if (!Number.isNaN(idx) && cards[idx]) {
        card = cards[idx];
      }
    }
    if (!card) return;

    const modal = qs('#currentCardModal');
    const titleEl = qs('#currentCardModalTitle');
    const maskedEl = qs('#currentCardModalMasked');
    const statusPill = qs('#currentCardModalStatusPill');
    if (!modal || !titleEl || !maskedEl || !statusPill) return;

    const label = card.label || 'Saved Card';
    const last4 = card.last4 || (card.masked ? String(card.masked).slice(-4) : '');
    const statusText = card.verified ? 'Verified' : 'Awaiting confirmation';

    titleEl.textContent = label;
    maskedEl.textContent = `•••• ${last4}`;
    statusPill.textContent = statusText;
    statusPill.classList.remove('card-status-pill-success', 'card-status-pill-pending');
    statusPill.classList.add(card.verified ? 'card-status-pill-success' : 'card-status-pill-pending');

    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
  });

  // Current Cards: close modal
  on(app, '#currentCardCloseBtn', 'click', () => {
    const modal = qs('#currentCardModal');
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
  });

  // Close when tapping backdrop
  on(app, '#currentCardModal', 'click', (event) => {
    if (event.target.id !== 'currentCardModal') return;
    const modal = qs('#currentCardModal');
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
  });

  // Use this card (coming soon)
  on(app, '#currentCardUseBtn', 'click', () => {
    showToast('Using this card for payments is coming soon!', 'info');
  });
}

// Add styles for card actions
const style = document.createElement('style');
style.textContent = `
  .card-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: transparent;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    color: var(--text);
  }
  
  .card-action:hover {
    border-color: var(--accent);
    background-color: rgba(79, 209, 197, 0.05);
  }
  
  .space-y-4 > * + * {
    margin-top: 1rem;
  }

  .linked-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .linked-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
  }

  .linked-item:last-child {
    border-bottom: none;
  }

  .linked-label {
    font-weight: 600;
  }

  .linked-meta,
  .linked-status {
    font-size: 0.85rem;
    color: var(--text);
    opacity: 0.7;
  }

  .linked-empty {
    position: relative;
    padding: 2.5rem 1rem 1.75rem;
    text-align: center;
    overflow: hidden;
  }

  .linked-empty-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    max-width: 180px;
    width: 80%;
    opacity: 1;
    pointer-events: none;
  }

  .linked-empty-text {
    position: relative;
    z-index: 1;
    margin-top: 1.25rem;
  }
  
  .current-cards-section {
    margin-bottom: 16px;
  }
  .current-cards-title {
    margin-bottom: 8px;
  }
  .current-cards-list {
    border-radius: 16px;
    background: #FFFFFF;
    padding: 4px 0;
  }
  .current-card-row {
    width: 100%;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }
  .current-card-row + .current-card-row {
    border-top: 1px solid var(--border);
  }
  .current-card-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .current-card-title {
    font-size: 15px;
    font-weight: 600;
  }
  .current-card-subtitle {
    font-size: 13px;
    color: var(--text);
    opacity: 0.7;
  }
  .card-status-pill {
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 500;
    white-space: nowrap;
  }
  .card-status-pill-success {
    background: var(--colorsalertssuccess);
    color: #FFFFFF;
  }
  .card-status-pill-pending {
    background: #FFF4E5;
    color: #8A6116;
  }
  .current-card-empty {
    padding: 16px 0;
    text-align: left;
  }
  .current-card-empty-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  .current-card-empty-subtitle {
    font-size: 13px;
    color: var(--text);
    opacity: 0.7;
  }
  .current-cards-divider {
    height: 1px;
    background: var(--border);
    margin: 12px 0 24px;
  }
  .current-card-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 16px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 60;
  }
  .current-card-modal-backdrop.is-visible {
    opacity: 1;
    pointer-events: auto;
  }
  .current-card-modal {
    width: 100%;
    max-width: 480px;
    background: #FFFFFF;
    border-radius: 20px 20px 12px 12px;
    padding: 16px 16px 20px;
    box-shadow: 0 -8px 30px rgba(15, 23, 42, 0.35);
  }
  .current-card-modal-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .current-card-modal-masked {
    font-size: 14px;
    color: var(--text);
    opacity: 0.8;
    margin-bottom: 8px;
  }
  .current-card-modal-status-row {
    margin-bottom: 16px;
  }
  .current-card-modal-primary {
    margin-bottom: 8px;
  }
  .current-card-modal-close {
    display: block;
    width: 30%;
    max-width: 220px;
    margin: 0 auto;
    text-align: center;
  }
`;
document.head.appendChild(style);
