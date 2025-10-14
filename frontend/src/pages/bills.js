// Bills page component
import { qs, on, showToast } from '../lib/dom.js';
import { safeBack } from '../lib/nav.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, addBiller, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';

let billState = {
  selectedBiller: null,
  account: '',
  amount: 0
};

export function renderBills() {
  const app = qs('#app');
  
  const billers = [
    { id: 'jps', name: 'JPS', icon: '⚡', category: 'Electricity' },
    { id: 'nwc', name: 'NWC', icon: '💧', category: 'Water' },
    { id: 'flow', name: 'Flow', icon: '📱', category: 'Mobile' },
    { id: 'digicel', name: 'Digicel', icon: '📱', category: 'Mobile' },
    { id: 'lime', name: 'LIME', icon: '☎️', category: 'Internet' },
    { id: 'ncb', name: 'NCB', icon: '🏦', category: 'Credit Card' },
    { id: 'sagicor', name: 'Sagicor', icon: '🛡️', category: 'Insurance' },
    { id: 'guardian', name: 'Guardian Life', icon: '🛡️', category: 'Insurance' }
  ];
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Pay Bills</h1>
        <div></div>
      </div>
      
      ${!billState.selectedBiller ? renderBillerList(billers) : renderBillForm()}
    </div>
  `;
  
  setupBillListeners();
}

function renderBillerList(billers) {
  return `
    <div class="mb-4">
      <input 
        type="text" 
        id="billerSearch" 
        class="form-input" 
        placeholder="Search billers..."
      >
    </div>
    
    ${state.savedBillers.length > 0 ? `
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Saved Billers</h3>
        <div class="saved-billers">
          ${state.savedBillers.map(biller => `
            <div class="biller-item saved" data-biller='${JSON.stringify(biller)}'>
              <div class="flex items-center gap-4">
                <div class="text-2xl">${biller.icon || '📄'}</div>
                <div>
                  <h4 class="font-semibold">${biller.name}</h4>
                  <p class="text-muted text-sm">${biller.account}</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
    
    <div class="card">
      <h3 class="text-lg mb-4">All Billers</h3>
      <div class="biller-grid">
        ${billers.map(biller => `
          <div class="biller-item" data-biller='${JSON.stringify(biller)}'>
            <div class="flex items-center gap-4">
              <div class="text-2xl">${biller.icon}</div>
              <div>
                <h4 class="font-semibold">${biller.name}</h4>
                <p class="text-muted text-sm">${biller.category}</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderBillForm() {
  return `
    <div class="card">
      <div class="flex items-center gap-4 mb-6">
        <div class="text-3xl">${billState.selectedBiller.icon}</div>
        <div>
          <h3 class="text-lg font-semibold">${billState.selectedBiller.name}</h3>
          <p class="text-muted">${billState.selectedBiller.category}</p>
        </div>
      </div>
      
      <form id="billForm">
        <div class="form-group">
          <label class="form-label" for="accountNumber">
            ${getAccountLabel(billState.selectedBiller.id)}
          </label>
          <input 
            type="text" 
            id="accountNumber" 
            class="form-input" 
            placeholder="${getAccountPlaceholder(billState.selectedBiller.id)}"
            required
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="billAmount">Amount (JMD)</label>
          <div class="flex items-center">
            <span class="currency-symbol text-xl mr-2">J$</span>
            <input 
              type="text" 
              id="billAmount" 
              class="form-input" 
              placeholder="0.00"
              inputmode="numeric"
              required
            >
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="billNote">Note (Optional)</label>
          <input 
            type="text" 
            id="billNote" 
            class="form-input" 
            placeholder="Reference or note"
            maxlength="50"
          >
        </div>
        
        <div class="flex gap-4">
          <button type="button" class="btn btn-secondary flex-1" data-action="bill-back">
            Back
          </button>
          <button type="submit" class="btn btn-primary flex-1" data-testid="btnConfirmBill">
            Pay Bill
          </button>
        </div>
      </form>
      
      <div class="mt-4 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-800">
          💡 Save this biller for faster payments next time
        </p>
      </div>
    </div>
  `;
}

function getAccountLabel(billerId) {
  const labels = {
    'jps': 'Account Number',
    'nwc': 'Account Number', 
    'flow': 'Phone Number',
    'digicel': 'Phone Number',
    'lime': 'Account Number',
    'ncb': 'Credit Card Number',
    'sagicor': 'Policy Number',
    'guardian': 'Policy Number'
  };
  return labels[billerId] || 'Account Number';
}

function getAccountPlaceholder(billerId) {
  const placeholders = {
    'jps': '123456789',
    'nwc': '987654321',
    'flow': '876-555-0123',
    'digicel': '876-555-0123',
    'lime': '123456789',
    'ncb': '4111-1111-1111-1111',
    'sagicor': 'POL123456',
    'guardian': 'GL789012'
  };
  return placeholders[billerId] || 'Enter account number';
}

function setupBillListeners() {
  const app = qs('#app');
  
  // Biller selection
  on(app, '.biller-item', 'click', (e) => {
    const billerData = e.currentTarget.dataset.biller;
    billState.selectedBiller = JSON.parse(billerData);
    
    // If it's a saved biller, pre-fill the account
    if (e.currentTarget.classList.contains('saved')) {
      billState.account = billState.selectedBiller.account;
    }
    
    renderBills();
  });
  
  // Header back
  on(app, '[data-action="nav-back"]', 'click', () => safeBack('/dashboard'));
  
  // Back from bill form
  on(app, '[data-action="bill-back"]', 'click', () => {
    billState.selectedBiller = null;
    renderBills();
  });
  
  // Search functionality
  on(app, '#billerSearch', 'input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const billerItems = app.querySelectorAll('.biller-item:not(.saved)');
    
    billerItems.forEach(item => {
      const billerData = JSON.parse(item.dataset.biller);
      const matches = billerData.name.toLowerCase().includes(searchTerm) ||
                     billerData.category.toLowerCase().includes(searchTerm);
      
      item.style.display = matches ? 'flex' : 'none';
    });
  });
  
  // Bill form submission
  on(app, '#billForm', 'submit', (e) => {
    e.preventDefault();
    
    const account = qs('#accountNumber').value.trim();
    const amount = parseAmount(qs('#billAmount').value);
    const note = qs('#billNote').value.trim();
    
    if (!account || amount <= 0) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    if (!canAfford(amount)) {
      showToast('Insufficient balance. Would you like to add money?', 'error');
      setTimeout(() => navigate('/add-money'), 2000);
      return;
    }
    
    const confirmBtn = qs('[data-testid="btnConfirmBill"]');
    confirmBtn.textContent = 'Processing...';
    confirmBtn.disabled = true;
    
    setTimeout(() => {
      // Debit balance
      updateBalance('JMD', -amount);
      
      // Add transaction
      addTransaction({
        title: `${billState.selectedBiller.name} Bill`,
        amount: -amount,
        currency: 'JMD',
        type: 'BILL'
      });
      
      // Save biller for future use
      addBiller({
        ...billState.selectedBiller,
        account: account
      });
      
      showToast(`Paid ${fmtCurrency(amount, 'JMD')} to ${billState.selectedBiller.name}`, 'success');
      
      // Reset state
      billState = { selectedBiller: null, account: '', amount: 0 };
      
      navigate('/dashboard');
    }, 2000);
  });
  
  // Format amount input
  on(app, '#billAmount', 'input', (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = value;
  });
  
  // Pre-fill account if saved biller
  if (billState.selectedBiller && billState.account) {
    setTimeout(() => {
      const accountInput = qs('#accountNumber');
      if (accountInput) {
        accountInput.value = billState.account;
      }
    }, 100);
  }
}

// Add styles for biller items
const style = document.createElement('style');
style.textContent = `
  .biller-item {
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
  
  .biller-item:hover {
    border-color: var(--primary);
    background-color: rgba(124, 58, 237, 0.08);
  }
  
  .biller-item.saved {
    background-color: rgba(124, 58, 237, 0.12);
  }
  
  .flex-1 {
    flex: 1;
  }
`;
document.head.appendChild(style);
