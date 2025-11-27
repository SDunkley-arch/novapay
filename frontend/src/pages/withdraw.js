// Withdraw page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';

// Format dollar amount to match dashboard format
function formatDollarAmount(amount) {
  const totalUSD = (Number(amount) / 15500);
  return `$ ${totalUSD.toFixed(2)}`;
}

let withdrawState = {
  method: null,
  amount: 0,
  bankAccount: null,
  currency: 'JMD'
};

export function renderWithdraw() {
  const app = qs('#app');
  if (!app) return;
  
  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackWithdraw">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Cash Out</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        ${!withdrawState.method ? renderMethodSelection() : renderWithdrawForm()}
      </div>
    </div>
  `;
  
  // Back button handler
  on('click', '#btnBackWithdraw', () => {
    if (withdrawState.method) {
      withdrawState.method = null;
      renderWithdraw();
    } else {
      navigate('/dashboard', { animate: 'slide-left-fade' });
    }
  });
  
  setupWithdrawListeners();
}

function renderMethodSelection() {
  return `
    <div class="form-field">
      <h3 class="section-title-sm">Choose Withdrawal Method</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Select how you would like to withdraw your funds.
      </p>
    </div>

    <div class="withdraw-methods">
      <div class="withdraw-method-card" data-method="bank">
        <div class="withdraw-method-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        </div>
        <div class="withdraw-method-info">
          <h4 class="withdraw-method-name">Bank Transfer</h4>
          <p class="withdraw-method-desc">Transfer to your bank account</p>
          <p class="withdraw-method-meta">Free • 1-2 business days</p>
        </div>
      </div>
    </div>

    <section class="np-balance-section withdraw-balance-section">
      <p class="np-balance-title">Available Balance</p>
      <p class="np-balance-amount">${formatDollarAmount(state.balances.JMD || 0)}</p>
    </section>
  `;
}

function renderWithdrawForm() {
  return renderBankWithdraw();
}

function renderBankWithdraw() {
  const savedAccounts = [
    { id: 'acc1', bank: 'NCB', account: '****1234', name: 'John Doe' },
    { id: 'acc2', bank: 'Scotiabank', account: '****5678', name: 'John Doe' }
  ];
  
  return `
    <div class="form-field">
      <h3 class="section-title-sm">Bank Transfer</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Transfer funds directly to your linked bank account.
      </p>
    </div>
    
    <form id="bankWithdrawForm">
      <div class="form-field">
        <label class="form-label">Select Bank Account</label>
        
        <div class="bank-accounts-list">
          ${savedAccounts.map(account => `
            <div class="bank-account-card" data-account='${JSON.stringify(account)}'>
              <div class="bank-account-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div class="bank-account-info">
                <h4 class="bank-account-name">${account.bank}</h4>
                <p class="bank-account-number">${account.account} • ${account.name}</p>
              </div>
              <input type="radio" name="bankAccount" value="${account.id}" class="bank-account-radio">
            </div>
          `).join('')}
          
          <div class="bank-account-card add-account" data-action="add-account">
            <div class="bank-account-icon add-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <div class="bank-account-info">
              <h4 class="bank-account-name">Add New Account</h4>
              <p class="bank-account-number">Link a new bank account</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-field">
        <label class="form-label" for="withdrawAmount">Amount</label>
        <div class="input-group">
          <select id="withdrawCurrency" class="form-input-modern currency-select">
            <option value="JMD">JMD</option>
            <option value="USD">USD</option>
          </select>
          <input
            type="text"
            id="withdrawAmount"
            class="form-input-modern amount-input"
            placeholder="0.00"
            inputmode="decimal"
            required
          />
        </div>
        <p class="form-hint">Available: ${fmtCurrency(state.balances.JMD || 0, 'JMD')}</p>
      </div>
      
      <div class="form-field">
        <h3 class="section-title-sm">Quick Amounts</h3>
        <div class="quick-amount-grid">
          <button type="button" class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="25000">J$25,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="50000">J$50,000</button>
        </div>
      </div>
      
      <div class="form-field">
        <button type="submit" class="btn-primary-modern" data-testid="btnConfirmWithdraw">
          Withdraw Funds
        </button>
      </div>
    </form>
  `;
}

function renderAgentWithdraw() {
  return `
    <div class="form-field">
      <h3 class="section-title-sm">Cash Agent Withdrawal</h3>
      <p class="form-hint" style="margin-bottom: 20px;">
        Generate a code to pick up cash at any NovaPay agent location.
      </p>
    </div>
    
    <form id="agentWithdrawForm">
      <div class="form-field">
        <label class="form-label" for="agentAmount">Amount</label>
        <div class="input-group">
          <select id="agentCurrency" class="form-input-modern currency-select">
            <option value="JMD">JMD</option>
          </select>
          <input
            type="text"
            id="agentAmount"
            class="form-input-modern amount-input"
            placeholder="0.00"
            inputmode="decimal"
            required
          />
        </div>
        <p class="form-hint">Available: ${fmtCurrency(state.balances.JMD || 0, 'JMD')} • Fee: J$50</p>
      </div>
      
      <div class="form-field">
        <h3 class="section-title-sm">Quick Amounts</h3>
        <div class="quick-amount-grid">
          <button type="button" class="quick-amount-btn" data-quick-amount="2000">J$2,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
          <button type="button" class="quick-amount-btn" data-quick-amount="20000">J$20,000</button>
        </div>
      </div>
      
      <div class="form-field">
        <div class="info-card">
          <h4 class="info-card-title">How it works:</h4>
          <ol class="info-card-list">
            <li>1. Confirm your withdrawal</li>
            <li>2. Get your one-time pickup code</li>
            <li>3. Visit any NovaPay agent</li>
            <li>4. Show your ID and pickup code</li>
          </ol>
        </div>
      </div>
      
      <div class="form-field">
        <button type="submit" class="btn-primary-modern">
          Generate Pickup Code
        </button>
      </div>
    </form>
  `;
}

function setupWithdrawListeners() {
  const app = qs('#app');

  // Method selection
  on(app, '.withdraw-method-card', 'click', (e) => {
    const method = e.currentTarget.dataset.method;
    withdrawState.method = method;
    
    // If bank method is selected, navigate to bank selection page
    if (method === 'bank') {
      navigate('/bank-selection', { animate: 'slide-right-fade' });
      return;
    }
    
    renderWithdraw();
  });
  
  // Bank account selection
  on(app, '.bank-account-card', 'click', (e) => {
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
  
  // Currency selection
  on(app, '#withdrawCurrency, #agentCurrency', 'change', (e) => {
    withdrawState.currency = e.target.value;
  });
  
  // Quick amount buttons
  on(app, '.quick-amount-btn', 'click', (e) => {
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
    const currency = qs('#withdrawCurrency').value;
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
    
    withdrawState.currency = currency;
    processWithdrawal(amount, 'BANK_TRANSFER');
  });
  
  // Agent withdraw form
  on(app, '#agentWithdrawForm', 'submit', (e) => {
    e.preventDefault();
    
    const amount = parseAmount(qs('#agentAmount').value);
    const currency = qs('#agentCurrency').value;
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
    
    withdrawState.currency = currency;
    // Show pickup code
    showPickupCode(amount);
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
    withdrawState = { method: null, amount: 0, bankAccount: null, currency: 'JMD' };
    navigate('/dashboard', { animate: 'slide-left-fade' });
  });
}

function processWithdrawal(amount, type) {
  const confirmBtn = qs('[data-testid="btnConfirmWithdraw"]');
  confirmBtn.textContent = 'Processing...';
  confirmBtn.disabled = true;
  
  setTimeout(() => {
    // Debit balance
    updateBalance(withdrawState.currency, -amount);
    
    // Add transaction
    addTransaction({
      title: 'Bank Withdrawal',
      amount: -amount,
      currency: withdrawState.currency,
      type: 'WITHDRAW'
    });
    
    showToast(`Withdrawal of ${fmtCurrency(amount, withdrawState.currency)} initiated`, 'success');
    
    // Reset state
    withdrawState = { method: null, amount: 0, bankAccount: null, currency: 'JMD' };
    
    navigate('/dashboard', { animate: 'slide-left-fade' });
  }, 2000);
}

function showPickupCode(amount) {
  const fee = 50;
  const total = amount + fee;
  const pickupCode = Math.random().toString(36).substr(2, 8).toUpperCase();
  
  const app = qs('#app');
  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <div class="icon-btn-placeholder"></div>
        <h1 class="page-title-modern">Pickup Code</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field text-center">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="section-title-sm text-center">Withdrawal Approved</h3>
          <p class="form-hint text-center" style="margin-bottom: 24px;">
            Your cash is ready for pickup
          </p>
        </div>
        
        <div class="pickup-code-card">
          <h4 class="pickup-code-label">Pickup Code</h4>
          <div class="pickup-code">${pickupCode}</div>
        </div>
        
        <div class="form-field">
          <h3 class="section-title-sm">Transaction Details</h3>
        </div>

        <div class="transaction-details">
          <div class="transaction-detail-row">
            <span class="transaction-detail-label">Amount</span>
            <span class="transaction-detail-value">${fmtCurrency(amount, 'JMD')}</span>
          </div>

          <div class="transaction-detail-row">
            <span class="transaction-detail-label">Fee</span>
            <span class="transaction-detail-value">${fmtCurrency(fee, 'JMD')}</span>
          </div>

          <div class="transaction-detail-divider"></div>

          <div class="transaction-detail-row total-row">
            <span class="transaction-detail-label">Total Deducted</span>
            <span class="transaction-detail-value total-value">${fmtCurrency(total, 'JMD')}</span>
          </div>
        </div>
        
        <div class="form-field">
          <div class="info-card info-card-blue">
            <h4 class="info-card-title">Instructions:</h4>
            <ul class="info-card-list">
              <li>• Visit any NovaPay agent within 24 hours</li>
              <li>• Bring a valid ID</li>
              <li>• Provide this pickup code</li>
              <li>• Code expires in 24 hours</li>
            </ul>
          </div>
        </div>
        
        <div class="form-field">
          <button class="btn-primary-modern" data-action="agent-complete" data-total="${total}">
            Done
          </button>
        </div>
      </div>
    </div>
  `;
}

// Add styles for the Withdraw page to match Remittance page
const style = document.createElement('style');
style.textContent = `
  /* Withdraw method cards styling */
  .withdraw-methods {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .withdraw-method-card {
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
  
  .withdraw-method-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .withdraw-method-card:active {
    transform: translateY(0);
  }
  
  .withdraw-method-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(84, 58, 248, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorssecondary-100);
    flex-shrink: 0;
  }
  
  .withdraw-method-info {
    flex: 1;
  }
  
  .withdraw-method-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .withdraw-method-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
    margin-bottom: 4px;
  }
  
  .withdraw-method-meta {
    font-size: 12px;
    color: var(--colorsalertssuccess);
  }
  
  /* Balance card styling */
  .balance-card {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;
  }
  
  .balance-amount {
    font-size: 28px;
    font-weight: 700;
    color: var(--colorssecondary-100);
    margin-bottom: 8px;
  }
  
  .balance-label {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  /* Bank account cards styling */
  .bank-accounts-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .bank-account-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .bank-account-card:hover {
    border-color: var(--colorssecondary-100);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.1);
  }
  
  .bank-account-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(84, 58, 248, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorssecondary-100);
    flex-shrink: 0;
  }
  
  .add-icon {
    background: rgba(0, 197, 102, 0.1);
    color: var(--colorsalertssuccess);
  }
  
  .bank-account-info {
    flex: 1;
  }
  
  .bank-account-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .bank-account-number {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  
  .bank-account-radio {
    width: 20px;
    height: 20px;
    accent-color: var(--colorssecondary-100);
    margin-right: 8px;
  }
  
  /* Pickup code styling */
  .pickup-code-card {
    background: rgba(84, 58, 248, 0.1);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .pickup-code-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--colorscharade-80);
    margin-bottom: 8px;
  }
  
  .pickup-code {
    font-family: monospace;
    font-size: 28px;
    font-weight: 700;
    color: var(--colorssecondary-100);
    letter-spacing: 2px;
  }
  
  /* Info card styling */
  .info-card {
    background: #F8F9FF;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }
  
  .info-card-blue {
    background: #EBF3FF;
  }
  
  .info-card-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-90);
    margin-bottom: 12px;
  }
  
  .info-card-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .info-card-list li {
    font-size: 14px;
    color: var(--colorscharade-80);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
  
  .success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(0, 197, 102, 0.1);
    color: var(--colorsalertssuccess);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }
  
  .text-center {
    text-align: center;
  }
  
  /* Match dashboard balance section */
  .withdraw-balance-section {
    padding: 0;
    margin-bottom: 24px;
  }
  
  .np-balance-section {
    padding: 0 24px;
    margin-bottom: 24px;
  }
  
  .np-balance-title {
    font-size: 14px;
    color: var(--colorscharade-60);
    margin-bottom: 8px;
  }
  
  .np-balance-amount {
    font-size: 28px;
    font-weight: 700;
    color: var(--colorscharade-100);
    margin: 0;
  }
`;
document.head.appendChild(style);
