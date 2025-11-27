// Bank Details page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';
import CIBCLogo from '../../assets/CIBC.png';
import JMMBLogo from '../../assets/JMMB_Bank.png';
import JNLogo from '../../assets/JN.png';
import JNCBLogo from '../../assets/JNCB.png';
import ScotiaLogo from '../../assets/Scotia.jpg';

// Bank details state
let bankDetailsState = {
  bank: null,
  accountType: null,
  branch: '',
  accountName: '',
  accountNumber: '',
  amount: 0,
  currency: 'JMD'
};

// Bank information mapping
const bankInfo = {
  'first-caribbean': {
    name: 'First Caribbean Bank',
    logo: CIBCLogo,
    branches: ['New Kingston', 'Montego Bay', 'Ocho Rios', 'Mandeville']
  },
  'jmmb': {
    name: 'JMMB',
    logo: JMMBLogo,
    branches: ['Haughton Terrace', 'Portmore', 'Montego Bay', 'Ocho Rios']
  },
  'jamaica-national': {
    name: 'Jamaica National Bank',
    logo: JNLogo,
    branches: ['Half Way Tree', 'Duke Street', 'Constant Spring', 'May Pen']
  },
  'ncb': {
    name: 'National Commercial Bank',
    logo: JNCBLogo,
    branches: ['Oxford Road', 'Knutsford Boulevard', 'Constant Spring', 'Spanish Town']
  },
  'scotia': {
    name: 'Scotia Bank',
    logo: ScotiaLogo,
    branches: ['King Street', 'Constant Spring', 'Half Way Tree', 'Portmore']
  }
};

export function renderBankDetails(bankId) {
  const app = qs('#app');
  if (!app) return;

  // Set the current bank
  bankDetailsState.bank = bankId;
  
  // Get bank information
  const bank = bankInfo[bankId] || {
    name: 'Unknown Bank',
    logo: null,
    branches: []
  };

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackBankDetails">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Bank Details</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <!-- Bank Logo and Name -->
        <div class="bank-header">
          <div class="bank-logo-container">
            <img src="${bank.logo}" alt="${bank.name}" class="bank-details-logo" />
          </div>
          <h2 class="bank-details-name">${bank.name}</h2>
        </div>

        <form id="bankDetailsForm">
          <!-- Account Type -->
          <div class="form-field">
            <label class="form-label">Account Type</label>
            <div class="account-type-selector">
              <div class="account-type-option" data-type="savings">
                <input type="radio" name="accountType" id="typeSavings" value="savings" class="account-type-radio">
                <label for="typeSavings" class="account-type-label">Savings</label>
              </div>
              <div class="account-type-option" data-type="chequing">
                <input type="radio" name="accountType" id="typeChequing" value="chequing" class="account-type-radio">
                <label for="typeChequing" class="account-type-label">Chequing</label>
              </div>
            </div>
          </div>

          <!-- Branch -->
          <div class="form-field">
            <label class="form-label" for="branchSelect">Branch</label>
            <select id="branchSelect" class="form-input-modern" required>
              <option value="" disabled selected>Select branch</option>
              ${bank.branches.map(branch => `<option value="${branch}">${branch}</option>`).join('')}
            </select>
          </div>

          <!-- Account Name -->
          <div class="form-field">
            <label class="form-label" for="accountName">Name on Account</label>
            <input
              type="text"
              id="accountName"
              class="form-input-modern"
              placeholder="Enter full name on account"
              required
            />
          </div>

          <!-- Account Number -->
          <div class="form-field">
            <label class="form-label" for="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              class="form-input-modern"
              placeholder="Enter account number"
              inputmode="numeric"
              required
            />
          </div>

          <!-- Amount -->
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
            <p class="form-hint">Available: <strong>${fmtCurrency(state.balances.JMD || 0, 'JMD')}</strong> / ${fmtCurrency(state.balances.USD || 0, 'USD')}</p>
          </div>
          
          <!-- Quick Amounts -->
          <div class="form-field">
            <h3 class="section-title-sm">Quick Amounts</h3>
            <div class="quick-amount-grid" id="jmd-quick-amounts">
              <button type="button" class="quick-amount-btn" data-quick-amount="5000">J$5,000</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="10000">J$10,000</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="25000">J$25,000</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="50000">J$50,000</button>
            </div>
            <div class="quick-amount-grid" id="usd-quick-amounts" style="display: none;">
              <button type="button" class="quick-amount-btn" data-quick-amount="50">$50</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="100">$100</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="250">$250</button>
              <button type="button" class="quick-amount-btn" data-quick-amount="500">$500</button>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="form-field">
            <button type="submit" class="btn-primary-modern" id="btnSubmitBankDetails">
              Withdraw Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Event Listeners
  setupBankDetailsListeners();
}

function setupBankDetailsListeners() {
  const app = qs('#app');

  // Back button handler
  on('click', '#btnBackBankDetails', () => navigate('/bank-selection', { animate: 'slide-left-fade' }));

  // Account type selection
  on(app, '.account-type-option', 'click', (e) => {
    const radio = e.currentTarget.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      bankDetailsState.accountType = radio.value;
    }
  });

  // Branch selection
  on(app, '#branchSelect', 'change', (e) => {
    bankDetailsState.branch = e.target.value;
  });

  // Account name input
  on(app, '#accountName', 'input', (e) => {
    bankDetailsState.accountName = e.target.value;
  });

  // Account number input
  on(app, '#accountNumber', 'input', (e) => {
    bankDetailsState.accountNumber = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = bankDetailsState.accountNumber;
  });

  // Currency selection
  on(app, '#withdrawCurrency', 'change', (e) => {
    bankDetailsState.currency = e.target.value;
    
    // Toggle quick amount sections based on selected currency
    const jmdQuickAmounts = qs('#jmd-quick-amounts');
    const usdQuickAmounts = qs('#usd-quick-amounts');
    
    if (bankDetailsState.currency === 'JMD') {
      jmdQuickAmounts.style.display = 'grid';
      usdQuickAmounts.style.display = 'none';
    } else {
      jmdQuickAmounts.style.display = 'none';
      usdQuickAmounts.style.display = 'grid';
    }
    
    // Update available balance hint
    const balanceHint = qs('.form-hint');
    if (balanceHint) {
      const jmdBalance = fmtCurrency(state.balances.JMD || 0, 'JMD');
      const usdBalance = fmtCurrency(state.balances.USD || 0, 'USD');
      
      if (bankDetailsState.currency === 'JMD') {
        balanceHint.innerHTML = `Available: <strong>${jmdBalance}</strong> / ${usdBalance}`;
      } else {
        balanceHint.innerHTML = `Available: ${jmdBalance} / <strong>${usdBalance}</strong>`;
      }
    }
  });

  // Quick amount buttons
  on(app, '.quick-amount-btn', 'click', (e) => {
    const amount = e.currentTarget.dataset.quickAmount;
    const amountInput = qs('#withdrawAmount');
    if (amountInput) {
      amountInput.value = amount;
      bankDetailsState.amount = parseAmount(amount);
    }
  });

  // Amount input
  on(app, '#withdrawAmount', 'input', (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = value;
    bankDetailsState.amount = parseAmount(value);
  });

  // Form submission
  on(app, '#bankDetailsForm', 'submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!bankDetailsState.accountType) {
      showToast('Please select an account type', 'error');
      return;
    }
    
    if (!bankDetailsState.branch) {
      showToast('Please select a branch', 'error');
      return;
    }
    
    if (!bankDetailsState.accountName) {
      showToast('Please enter the account name', 'error');
      return;
    }
    
    if (!bankDetailsState.accountNumber) {
      showToast('Please enter the account number', 'error');
      return;
    }
    
    if (bankDetailsState.amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    if (!canAfford(bankDetailsState.amount)) {
      showToast('Insufficient balance', 'error');
      return;
    }
    
    // Process withdrawal
    processWithdrawal();
  });
}

function processWithdrawal() {
  const submitBtn = qs('#btnSubmitBankDetails');
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // Debit balance
    updateBalance(bankDetailsState.currency, -bankDetailsState.amount);
    
    // Add transaction
    addTransaction({
      title: `${bankInfo[bankDetailsState.bank].name} Withdrawal`,
      amount: -bankDetailsState.amount,
      currency: bankDetailsState.currency,
      type: 'WITHDRAW'
    });
    
    showToast(`Withdrawal of ${fmtCurrency(bankDetailsState.amount, bankDetailsState.currency)} initiated`, 'success');
    
    // Reset state and navigate back to dashboard
    bankDetailsState = {
      bank: null,
      accountType: null,
      branch: '',
      accountName: '',
      accountNumber: '',
      amount: 0,
      currency: 'JMD'
    };
    
    navigate('/dashboard', { animate: 'slide-left-fade' });
  }, 2000);
}

// Add styles for the Bank Details page
const style = document.createElement('style');
style.textContent = `
  .bank-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .bank-logo-container {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  
  .bank-details-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }
  
  .bank-details-name {
    font-size: 20px;
    font-weight: 600;
    color: var(--colorscharade-100);
    text-align: center;
  }
  
  .account-type-selector {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .account-type-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .account-type-option:hover {
    border-color: var(--colorssecondary-100);
  }
  
  .account-type-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .account-type-radio:checked + .account-type-label {
    color: var(--colorssecondary-100);
    font-weight: 600;
  }
  
  .account-type-radio:checked ~ .account-type-option {
    border-color: var(--colorssecondary-100);
    background-color: rgba(84, 58, 248, 0.05);
  }
  
  .account-type-label {
    font-size: 15px;
    cursor: pointer;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
