// Withdraw page component
import { qs, on, showToast } from '../lib/dom.js';
import { safeBack } from '../lib/nav.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';

let withdrawState = {
  method: null,
  amount: 0,
  bankAccount: null
};

export function renderWithdraw() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Cash Out</h1>
        <div></div>
      </div>
      
      ${!withdrawState.method ? renderMethodSelection() : renderWithdrawForm()}
    </div>
  `;
  
  setupWithdrawListeners();
}

function renderMethodSelection() {
  return `
    <div class="card mb-6">
      <h3 class="text-lg mb-4">Choose withdrawal method</h3>
      
      <div class="method-list">
        <div class="method-item" data-method="bank">
          <div class="flex items-center gap-4">
            <div class="text-2xl">🏦</div>
            <div>
              <h4 class="font-semibold">Bank Transfer</h4>
              <p class="text-muted text-sm">Transfer to your bank account</p>
              <p class="text-xs text-success">Free • 1-2 business days</p>
            </div>
          </div>
          <div class="text-muted">→</div>
        </div>
        
        <div class="method-item" data-method="agent">
          <div class="flex items-center gap-4">
            <div class="text-2xl">🏪</div>
            <div>
              <h4 class="font-semibold">Cash Agent</h4>
              <p class="text-muted text-sm">Pick up cash at agent location</p>
              <p class="text-xs text-success">J$50 fee • Instant</p>
            </div>
          </div>
          <div class="text-muted">→</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h3 class="text-lg mb-4">Available Balance</h3>
      <div class="text-center">
        <div class="text-3xl font-bold text-accent mb-2">
          ${fmtCurrency(state.balances.JMD, 'JMD')}
        </div>
        <p class="text-muted">Ready to withdraw</p>
      </div>
    </div>
  `;
}

function renderWithdrawForm() {
  if (withdrawState.method === 'bank') {
    return renderBankWithdraw();
  } else if (withdrawState.method === 'agent') {
    return renderAgentWithdraw();
  }
}

function renderBankWithdraw() {
  const savedAccounts = [
    { id: 'acc1', bank: 'NCB', account: '****1234', name: 'John Doe' },
    { id: 'acc2', bank: 'Scotiabank', account: '****5678', name: 'John Doe' }
  ];
  
  return `
    <div class="card">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-3xl">🏦</div>
        <div>
          <h3 class="text-lg font-semibold">Bank Transfer</h3>
          <p class="text-muted">Transfer to your bank account</p>
        </div>
      </div>
      
      <form id="bankWithdrawForm">
        <div class="form-group">
          <label class="form-label">Select Bank Account</label>
          
          ${savedAccounts.map(account => `
            <div class="bank-account-item" data-account='${JSON.stringify(account)}'>
              <div class="flex items-center gap-4">
                <div class="text-xl">🏦</div>
                <div>
                  <h4 class="font-semibold">${account.bank}</h4>
                  <p class="text-muted text-sm">${account.account} • ${account.name}</p>
                </div>
              </div>
              <input type="radio" name="bankAccount" value="${account.id}">
            </div>
          `).join('')}
          
          <div class="bank-account-item" data-action="add-account">
            <div class="flex items-center gap-4">
              <div class="text-xl">➕</div>
              <div>
                <h4 class="font-semibold">Add New Account</h4>
                <p class="text-muted text-sm">Link a new bank account</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="withdrawAmount">Amount (JMD)</label>
          <div class="flex items-center">
            <span class="currency-symbol text-xl mr-2">J$</span>
            <input 
              type="text" 
              id="withdrawAmount" 
              class="form-input" 
              placeholder="0.00"
              inputmode="numeric"
              required
            >
          </div>
          <p class="text-xs text-muted mt-1">
            Available: ${fmtCurrency(state.balances.JMD, 'JMD')}
          </p>
        </div>
        
        <div class="grid grid-2 gap-4 mb-6">
          <button type="button" class="btn btn-secondary" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="25000">J$25,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="50000">J$50,000</button>
        </div>
        
        <div class="flex gap-4">
          <button type="button" class="btn btn-secondary flex-1" data-action="withdraw-back">
            Back
          </button>
          <button type="submit" class="btn btn-primary flex-1" data-testid="btnConfirmWithdraw">
            Withdraw
          </button>
        </div>
      </form>
    </div>
  `;
}

function renderAgentWithdraw() {
  return `
    <div class="card">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-3xl">🏪</div>
        <div>
          <h3 class="text-lg font-semibold">Cash Agent</h3>
          <p class="text-muted">Pick up cash at any agent location</p>
        </div>
      </div>
      
      <form id="agentWithdrawForm">
        <div class="form-group">
          <label class="form-label" for="agentAmount">Amount (JMD)</label>
          <div class="flex items-center">
            <span class="currency-symbol text-xl mr-2">J$</span>
            <input 
              type="text" 
              id="agentAmount" 
              class="form-input" 
              placeholder="0.00"
              inputmode="numeric"
              required
            >
          </div>
          <p class="text-xs text-muted mt-1">
            Available: ${fmtCurrency(state.balances.JMD, 'JMD')} • Fee: J$50
          </p>
        </div>
        
        <div class="grid grid-2 gap-4 mb-6">
          <button type="button" class="btn btn-secondary" data-quick-amount="2000">J$2,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="btn btn-secondary" data-quick-amount="20000">J$20,000</button>
        </div>
        
        <div class="p-4 bg-yellow-50 rounded-lg mb-6">
          <h4 class="font-semibold text-yellow-800 mb-2">How it works:</h4>
          <ol class="text-sm text-yellow-700 space-y-1">
            <li>1. Confirm your withdrawal</li>
            <li>2. Get your one-time pickup code</li>
            <li>3. Visit any NovaPay agent</li>
            <li>4. Show your ID and pickup code</li>
          </ol>
        </div>
        
        <div class="flex gap-4">
          <button type="button" class="btn btn-secondary flex-1" data-action="withdraw-back">
            Back
          </button>
          <button type="submit" class="btn btn-primary flex-1">
            Generate Code
          </button>
        </div>
      </form>
    </div>
  `;
}

function setupWithdrawListeners() {
  const app = qs('#app');
  
  // Header back (history-aware)
  on(app, '[data-action="nav-back"]', 'click', () => {
    if (history.length > 1) {
      history.back();
    } else {
      navigate('/dashboard');
    }
  });

  // Method selection
  on(app, '.method-item', 'click', (e) => {
    const method = e.currentTarget.dataset.method;
    withdrawState.method = method;
    renderWithdraw();
  });
  
  // Bank account selection
  on(app, '.bank-account-item', 'click', (e) => {
    if (e.currentTarget.dataset.action === 'add-account') {
      showToast('Add bank account feature coming soon!', 'info');
      return;
    }
    
    // Select radio button
    const radio = e.currentTarget.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      withdrawState.bankAccount = JSON.parse(e.currentTarget.dataset.account);
    }
  });
  
  // Quick amount buttons
  on(app, '[data-quick-amount]', 'click', (e) => {
    const amount = e.currentTarget.dataset.quickAmount;
    const amountInput = qs('#withdrawAmount') || qs('#agentAmount');
    if (amountInput) {
      amountInput.value = amount;
      amountInput.dispatchEvent(new Event('input'));
    }
  });
  
  // Format amount inputs
  on(app, '#withdrawAmount, #agentAmount', 'input', (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = value;
  });
  
  // Bank withdraw form
  on(app, '#bankWithdrawForm', 'submit', (e) => {
    e.preventDefault();
    
    const amount = parseAmount(qs('#withdrawAmount').value);
    const selectedAccount = qs('input[name="bankAccount"]:checked');
    
    if (!selectedAccount) {
      showToast('Please select a bank account', 'error');
      return;
    }
    
    if (amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    if (!canAfford(amount)) {
      showToast('Insufficient balance', 'error');
      return;
    }
    
    processWithdrawal(amount, 'BANK_TRANSFER');
  });
  
  // Agent withdraw form
  on(app, '#agentWithdrawForm', 'submit', (e) => {
    e.preventDefault();
    
    const amount = parseAmount(qs('#agentAmount').value);
    const fee = 50;
    const total = amount + fee;
    
    if (amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    if (!canAfford(total)) {
      showToast('Insufficient balance (including J$50 fee)', 'error');
      return;
    }
    
    // Show pickup code
    showPickupCode(amount);
  });

  // Back buttons within forms
  on(app, '[data-action="withdraw-back"]', 'click', () => {
    withdrawState.method = null;
    renderWithdraw();
  });
  
  // Complete agent withdrawal
  on(app, '[data-action="agent-complete"]', 'click', (e) => {
    const total = parseFloat(e.currentTarget.getAttribute('data-total'));
    if (isNaN(total)) return;
    // Debit balance
    updateBalance('JMD', -total);
    // Add transaction
    addTransaction({
      title: 'Agent Withdrawal',
      amount: -total,
      currency: 'JMD',
      type: 'WITHDRAW'
    });
    showToast('Withdrawal completed successfully!', 'success');
    withdrawState = { method: null, amount: 0, bankAccount: null };
    navigate('/dashboard');
  });
}

function processWithdrawal(amount, type) {
  const confirmBtn = qs('[data-testid="btnConfirmWithdraw"]');
  confirmBtn.textContent = 'Processing...';
  confirmBtn.disabled = true;
  
  setTimeout(() => {
    // Debit balance
    updateBalance('JMD', -amount);
    
    // Add transaction
    addTransaction({
      title: 'Bank Withdrawal',
      amount: -amount,
      currency: 'JMD',
      type: 'WITHDRAW'
    });
    
    showToast(`Withdrawal of ${fmtCurrency(amount, 'JMD')} initiated`, 'success');
    
    // Reset state
    withdrawState = { method: null, amount: 0, bankAccount: null };
    
    navigate('/dashboard');
  }, 2000);
}

function showPickupCode(amount) {
  const fee = 50;
  const total = amount + fee;
  const pickupCode = Math.random().toString(36).substr(2, 8).toUpperCase();
  
  const app = qs('#app');
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <div></div>
        <h1 class="page-title">Pickup Code</h1>
        <div></div>
      </div>
      
      <div class="card text-center">
        <div class="text-6xl mb-4">✅</div>
        <h3 class="text-lg font-semibold mb-2">Withdrawal Approved</h3>
        <p class="text-muted mb-6">Your cash is ready for pickup</p>
        
        <div class="p-6 bg-accent-light rounded-lg mb-6">
          <h4 class="font-semibold mb-2">Pickup Code</h4>
          <div class="text-3xl font-mono font-bold text-accent">${pickupCode}</div>
        </div>
        
        <div class="space-y-2 mb-6 text-left">
          <div class="flex justify-between">
            <span class="text-muted">Amount:</span>
            <span>${fmtCurrency(amount, 'JMD')}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted">Fee:</span>
            <span>${fmtCurrency(fee, 'JMD')}</span>
          </div>
          <hr>
          <div class="flex justify-between font-semibold">
            <span>Total Deducted:</span>
            <span>${fmtCurrency(total, 'JMD')}</span>
          </div>
        </div>
        
        <div class="p-4 bg-blue-50 rounded-lg mb-6 text-left">
          <h4 class="font-semibold text-blue-800 mb-2">Instructions:</h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• Visit any NovaPay agent within 24 hours</li>
            <li>• Bring a valid ID</li>
            <li>• Provide this pickup code</li>
            <li>• Code expires in 24 hours</li>
          </ul>
        </div>
        
        <button class="btn btn-primary btn-full" data-action="agent-complete" data-total="${total}">
          Done
        </button>
      </div>
    </div>
  `;
}

// Add styles
const style = document.createElement('style');
style.textContent = `
  .method-item, .bank-account-item {
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
  
  .method-item:hover, .bank-account-item:hover {
    border-color: var(--primary);
    background-color: rgba(124, 58, 237, 0.08);
  }
  
  .flex-1 { flex: 1; }
  .space-y-1 > * + * { margin-top: 0.25rem; }
  .space-y-2 > * + * { margin-top: 0.5rem; }
`;
document.head.appendChild(style);
