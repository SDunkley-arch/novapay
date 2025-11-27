// Transfer page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';

let transferState = {
  step: 1,
  recipient: null,
  amount: 0,
  note: '',
  currency: 'JMD'
};

export function renderTransfer() {
  const app = qs('#app');
  if (!app) return;
  
  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackTransfer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Transfer</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div id="stepContent">
          ${renderStep()}
        </div>
      </div>
    </div>
  `;
  
  // Back button handler
  on('click', '#btnBackTransfer', () => {
    if (transferState.step > 1) {
      transferState.step -= 1;
      renderTransfer();
    } else {
      navigate('/dashboard', { animate: 'slide-left-fade' });
    }
  });
  
  setupStepListeners();
}

function renderStep() {
  switch (transferState.step) {
    case 1:
      return renderRecipientStep();
    case 2:
      return renderAmountStep();
    case 3:
      return renderConfirmStep();
    default:
      return renderRecipientStep();
  }
}

function renderRecipientStep() {
  const mockContacts = [
    { id: 'c1', name: 'John Smith', phone: '876-555-0101', avatar: '👨' },
    { id: 'c2', name: 'Sarah Johnson', phone: '876-555-0102', avatar: '👩' },
    { id: 'c3', name: 'Mike Brown', phone: '876-555-0103', avatar: '👨‍💼' },
    { id: 'c4', name: 'Lisa Davis', phone: '876-555-0104', avatar: '👩‍💻' }
  ];
  
  return `
    <div class="form-field">
      <h3 class="section-title-sm">Send Money to a Contact</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Select a recipient from your contacts or search by phone number.
      </p>
    </div>

    <div class="form-field">
      <label class="form-label" for="recipientSearch">Search Contacts</label>
      <div class="input-wrapper">
        <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          id="recipientSearch"
          class="form-input-modern"
          placeholder="Name or phone number"
        />
      </div>
    </div>

    <div class="form-field">
      <button class="btn-primary-modern" data-action="scan-qr">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="8" y1="3" x2="8" y2="21"></line>
          <line x1="16" y1="3" x2="16" y2="21"></line>
          <line x1="3" y1="8" x2="21" y2="8"></line>
          <line x1="3" y1="16" x2="21" y2="16"></line>
        </svg>
        Scan QR Code
      </button>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Recent Contacts</h3>
    </div>

    <div class="contact-cards">
      ${mockContacts.map(contact => `
        <div class="contact-card" data-contact='${JSON.stringify(contact)}'>
          <div class="contact-avatar">${contact.avatar}</div>
          <div class="contact-info">
            <h4 class="contact-name">${contact.name}</h4>
            <p class="contact-phone">${contact.phone}</p>
          </div>
          <div class="contact-arrow">→</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAmountStep() {
  return `
    <div class="form-field">
      <h3 class="section-title-sm">Send to ${transferState.recipient.name}</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Enter the amount you want to send and add an optional note.
      </p>
    </div>

    <div class="form-field">
      <label class="form-label" for="amountInput">Amount</label>
      <div class="input-group">
        <select id="currency" class="form-input-modern currency-select">
          <option value="JMD">JMD</option>
          <option value="USD">USD</option>
        </select>
        <input
          type="text"
          id="amountInput"
          class="form-input-modern amount-input"
          placeholder="0.00"
          inputmode="decimal"
        />
      </div>
      <p class="form-hint">Available: ${fmtCurrency(state.balances.JMD || 0, 'JMD')}</p>
    </div>

    <div class="form-field">
      <label class="form-label" for="noteInput">Note (Optional)</label>
      <div class="input-wrapper">
        <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <input
          type="text"
          id="noteInput"
          class="form-input-modern"
          placeholder="What's this for?"
          maxlength="50"
        />
      </div>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Quick Amounts</h3>
      <div class="quick-amount-grid">
        <button class="quick-amount-btn" data-quick-amount="1000">J$1,000</button>
        <button class="quick-amount-btn" data-quick-amount="2500">J$2,500</button>
        <button class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
        <button class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
      </div>
    </div>

    <button class="btn-primary-modern" id="continueBtn" disabled>
      Continue
    </button>
  `;
}

function renderConfirmStep() {
  const currencySymbol = transferState.currency === 'USD' ? '$' : 'J$';
  
  return `
    <div class="form-field">
      <h3 class="section-title-sm">Confirm Transfer</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Please review the details before sending money.
      </p>
    </div>

    <div class="confirm-recipient-card">
      <div class="confirm-recipient-avatar">${transferState.recipient.avatar}</div>
      <div class="confirm-recipient-info">
        <h4 class="confirm-recipient-name">${transferState.recipient.name}</h4>
        <p class="confirm-recipient-phone">${transferState.recipient.phone}</p>
      </div>
    </div>

    <div class="form-field">
      <h3 class="section-title-sm">Transaction Details</h3>
    </div>

    <div class="transaction-details">
      <div class="transaction-detail-row">
        <span class="transaction-detail-label">Amount</span>
        <span class="transaction-detail-value">${fmtCurrency(transferState.amount, transferState.currency)}</span>
      </div>

      <div class="transaction-detail-row">
        <span class="transaction-detail-label">Fee</span>
        <span class="transaction-detail-value">${currencySymbol}0.00</span>
      </div>

      ${transferState.note ? `
        <div class="transaction-detail-row">
          <span class="transaction-detail-label">Note</span>
          <span class="transaction-detail-value note-text">${transferState.note}</span>
        </div>
      ` : ''}

      <div class="transaction-detail-divider"></div>

      <div class="transaction-detail-row total-row">
        <span class="transaction-detail-label">Total</span>
        <span class="transaction-detail-value total-value">${fmtCurrency(transferState.amount, transferState.currency)}</span>
      </div>
    </div>

    <div class="form-field">
      <button class="btn-primary-modern" data-testid="btnConfirmSend">
        Send Transfer
      </button>
    </div>

    <div class="form-field">
      <button class="btn-outline-modern" data-action="edit-amount">
        Edit Details
      </button>
    </div>
  `;
}

function setupStepListeners() {
  const app = qs('#app');

  // Step 1 listeners
  on(app, '[data-action="scan-qr"]', 'click', () => {
    navigate('/scan-qr', { animate: 'slide-right-fade' });
  });
  
  on(app, '.contact-card', 'click', function () {
    const contactData = this.dataset.contact;
    transferState.recipient = JSON.parse(contactData);
    transferState.step = 2;
    renderTransfer();
  });
  
  // Step 2 listeners
  on(app, '#amountInput', 'input', (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = value;
    
    const amount = parseAmount(value);
    const continueBtn = qs('#continueBtn');
    
    if (amount > 0 && canAfford(amount)) {
      continueBtn.disabled = false;
    } else {
      continueBtn.disabled = true;
    }
  });
  
  on(app, '#currency', 'change', (e) => {
    transferState.currency = e.target.value;
  });
  
  on(app, '.quick-amount-btn', 'click', function () {
    const amount = this.dataset.quickAmount;
    qs('#amountInput').value = amount;
    qs('#amountInput').dispatchEvent(new Event('input'));
  });
  
  on(app, '#continueBtn', 'click', () => {
    const amount = parseAmount(qs('#amountInput').value);
    const note = qs('#noteInput').value.trim();
    const currency = qs('#currency').value;
    
    if (!canAfford(amount)) {
      showToast('Insufficient balance', 'error');
      return;
    }
    
    transferState.amount = amount;
    transferState.note = note;
    transferState.currency = currency;
    transferState.step = 3;
    renderTransfer();
  });
  
  // Step 3 listeners
  on(app, '[data-testid="btnConfirmSend"]', 'click', () => {
    if (!canAfford(transferState.amount)) {
      showToast('Insufficient balance. Would you like to add money?', 'error');
      setTimeout(() => navigate('/add-money', { animate: 'slide-right-fade' }), 2000);
      return;
    }
    
    const confirmBtn = qs('[data-testid="btnConfirmSend"]');
    confirmBtn.textContent = 'Processing...';
    confirmBtn.disabled = true;
    
    setTimeout(() => {
      // Debit balance
      updateBalance(transferState.currency, -transferState.amount);
      
      // Add transaction
      addTransaction({
        title: `To ${transferState.recipient.name}`,
        amount: -transferState.amount,
        currency: transferState.currency,
        type: 'P2P_SEND'
      });
      
      showToast(`Sent ${fmtCurrency(transferState.amount, transferState.currency)} to ${transferState.recipient.name}`, 'success');
      
      // Reset state
      transferState = { step: 1, recipient: null, amount: 0, note: '', currency: 'JMD' };
      
      navigate('/dashboard', { animate: 'slide-left-fade' });
    }, 2000);
  });

  // Edit amount action
  on(app, '[data-action="edit-amount"]', 'click', () => {
    transferState.step = 2;
    renderTransfer();
  });
}

// Add styles for the Transfer page to match Remittance page
const style = document.createElement('style');
style.textContent = `
  /* Contact cards styling */
  .contact-cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .contact-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .contact-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .contact-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .contact-card:active {
    transform: translateY(0);
  }
  
  .contact-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  
  .contact-info {
    flex: 1;
  }
  
  .contact-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .contact-phone {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  
  /* Quick amount buttons */
  .quick-amount-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .quick-amount-btn {
    padding: 12px;
    background: #FFFFFF;
    border: 2px solid var(--colorscharade-20);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--colorscharade-80);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .quick-amount-btn:hover {
    border-color: var(--colorssecondary-100);
    color: var(--colorssecondary-100);
  }
  
  /* Confirm step styling */
  .confirm-recipient-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
  }
  
  .confirm-recipient-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
  }
  
  .confirm-recipient-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .confirm-recipient-phone {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  .transaction-details {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  
  .transaction-detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
  }
  
  .transaction-detail-label {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  .transaction-detail-value {
    font-size: 14px;
    font-weight: 600;
    color: var(--colorscharade-100);
  }
  
  .note-text {
    max-width: 200px;
    text-align: right;
    word-break: break-word;
  }
  
  .transaction-detail-divider {
    height: 1px;
    background: var(--colorscharade-10);
    margin: 8px 0;
  }
  
  .total-row {
    margin-top: 8px;
  }
  
  .total-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--colorssecondary-100);
  }
  
  /* Button styles */
  .btn-outline-modern {
    width: 100%;
    padding: 14px 24px;
    font-size: 15px;
    font-weight: 600;
    color: var(--colorssecondary-100);
    background: transparent;
    border: 2px solid var(--colorssecondary-100);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }
  
  .btn-outline-modern:hover {
    background: rgba(84, 58, 248, 0.1);
  }
`;
document.head.appendChild(style);
