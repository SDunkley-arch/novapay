// Transfer page component
import { qs, on, showToast } from '../lib/dom.js';
import { safeBack } from '../lib/nav.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';

let transferState = {
  step: 1,
  recipient: null,
  amount: 0,
  note: ''
};

export function renderTransfer() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Send Money</h1>
        <div></div>
      </div>
      
      <!-- Step Indicator -->
      <div class="steps">
        <div class="step ${transferState.step >= 1 ? 'active' : ''}">1</div>
        <div class="step ${transferState.step >= 2 ? 'active' : ''}">2</div>
        <div class="step ${transferState.step >= 3 ? 'active' : ''}">3</div>
      </div>
      
      <div id="stepContent">
        ${renderStep()}
      </div>
    </div>
  `;
  
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
    <div class="card">
      <h3 class="text-lg mb-4">Select Recipient</h3>
      
      <div class="form-group">
        <input 
          type="text" 
          id="recipientSearch" 
          class="form-input" 
          placeholder="Search contacts or enter phone number"
        >
      </div>
      
      <div class="mb-4">
        <button class="btn btn-secondary btn-full" data-action="scan-qr">
          📱 Scan QR Code
        </button>
      </div>
      
      <div class="contact-list">
        ${mockContacts.map(contact => `
          <div class="contact-item" data-contact='${JSON.stringify(contact)}'>
            <div class="flex items-center gap-4">
              <div class="text-2xl">${contact.avatar}</div>
              <div>
                <h4 class="font-semibold">${contact.name}</h4>
                <p class="text-muted text-sm">${contact.phone}</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAmountStep() {
  return `
    <div class="card">
      <h3 class="text-lg mb-4">Send to ${transferState.recipient.name}</h3>
      
      <div class="text-center mb-6">
        <div class="flex items-center justify-center mb-4">
          <span class="currency-symbol">J$</span>
          <input 
            type="text" 
            id="amountInput" 
            class="amount-input" 
            placeholder="0"
            inputmode="numeric"
          >
        </div>
        
        <p class="text-muted">
          Available: ${fmtCurrency(state.balances.JMD, 'JMD')}
        </p>
      </div>
      
      <div class="form-group">
        <label class="form-label" for="noteInput">Note (Optional)</label>
        <input 
          type="text" 
          id="noteInput" 
          class="form-input" 
          placeholder="What's this for?"
          maxlength="50"
        >
      </div>
      
      <div class="grid grid-2 gap-4 mb-6">
        <button class="btn btn-secondary" data-quick-amount="1000">J$1,000</button>
        <button class="btn btn-secondary" data-quick-amount="2500">J$2,500</button>
        <button class="btn btn-secondary" data-quick-amount="5000">J$5,000</button>
        <button class="btn btn-secondary" data-quick-amount="10000">J$10,000</button>
      </div>
      
      <button class="btn btn-primary btn-full" id="continueBtn" disabled>
        Continue
      </button>
    </div>
  `;
}

function renderConfirmStep() {
  return `
    <div class="card">
      <h3 class="text-lg mb-6 text-center">Confirm Transfer</h3>
      
      <div class="text-center mb-6">
        <div class="text-3xl mb-2">${transferState.recipient.avatar}</div>
        <h4 class="text-lg font-semibold">${transferState.recipient.name}</h4>
        <p class="text-muted">${transferState.recipient.phone}</p>
      </div>
      
      <div class="space-y-4 mb-6">
        <div class="flex justify-between">
          <span class="text-muted">Amount:</span>
          <span class="font-semibold">${fmtCurrency(transferState.amount, 'JMD')}</span>
        </div>
        
        <div class="flex justify-between">
          <span class="text-muted">Fee:</span>
          <span class="font-semibold">J$0.00</span>
        </div>
        
        ${transferState.note ? `
          <div class="flex justify-between">
            <span class="text-muted">Note:</span>
            <span class="font-semibold">${transferState.note}</span>
          </div>
        ` : ''}
        
        <hr style="border-color: var(--border);">
        
        <div class="flex justify-between">
          <span class="text-muted">Total:</span>
          <span class="font-semibold text-lg">${fmtCurrency(transferState.amount, 'JMD')}</span>
        </div>
      </div>
      
      <button class="btn btn-primary btn-full" data-testid="btnConfirmSend">
        Send Money
      </button>
      
      <button class="btn btn-ghost btn-full mt-4" data-action="edit-amount">
        Edit Amount
      </button>
    </div>
  `;
}

function setupStepListeners() {
  const app = qs('#app');
  
  // Header back
  on(app, '[data-action="nav-back"]', 'click', () => safeBack('/dashboard'));

  // Step 1 listeners
  on(app, '[data-action="scan-qr"]', 'click', () => {
    showToast('QR Scanner coming soon!', 'info');
  });
  
  on(app, '.contact-item', 'click', function () {
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
      continueBtn.classList.remove('opacity-50');
    } else {
      continueBtn.disabled = true;
      continueBtn.classList.add('opacity-50');
    }
  });
  
  on(app, '[data-quick-amount]', 'click', function () {
    const amount = this.dataset.quickAmount;
    qs('#amountInput').value = amount;
    qs('#amountInput').dispatchEvent(new Event('input'));
  });
  
  on(app, '#continueBtn', 'click', () => {
    const amount = parseAmount(qs('#amountInput').value);
    const note = qs('#noteInput').value.trim();
    
    if (!canAfford(amount)) {
      showToast('Insufficient balance', 'error');
      return;
    }
    
    transferState.amount = amount;
    transferState.note = note;
    transferState.step = 3;
    renderTransfer();
  });
  
  // Step 3 listeners
  on(app, '[data-testid="btnConfirmSend"]', 'click', () => {
    if (!canAfford(transferState.amount)) {
      showToast('Insufficient balance. Would you like to add money?', 'error');
      setTimeout(() => navigate('/add-money'), 2000);
      return;
    }
    
    const confirmBtn = qs('[data-testid="btnConfirmSend"]');
    confirmBtn.textContent = 'Sending...';
    confirmBtn.disabled = true;
    
    setTimeout(() => {
      // Debit balance
      updateBalance('JMD', -transferState.amount);
      
      // Add transaction
      addTransaction({
        title: `To ${transferState.recipient.name}`,
        amount: -transferState.amount,
        currency: 'JMD',
        type: 'P2P_SEND'
      });
      
      showToast(`Sent ${fmtCurrency(transferState.amount, 'JMD')} to ${transferState.recipient.name}`, 'success');
      
      // Reset state
      transferState = { step: 1, recipient: null, amount: 0, note: '' };
      
      navigate('/dashboard');
    }, 2000);
  });

  // Edit amount action
  on(app, '[data-action="edit-amount"]', 'click', () => {
    transferState.step = 2;
    renderTransfer();
  });
}

// Add styles for contact list
const style = document.createElement('style');
style.textContent = `
  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
  }
  
  .contact-item:hover {
    border-color: var(--primary);
    background-color: rgba(124, 58, 237, 0.08);
  }
  
  .opacity-50 {
    opacity: 0.5;
  }
`;
document.head.appendChild(style);
