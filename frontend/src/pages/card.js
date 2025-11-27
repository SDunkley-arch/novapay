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
`;
document.head.appendChild(style);
