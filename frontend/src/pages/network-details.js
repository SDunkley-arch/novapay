// Network Details page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, updateBalance, addTransaction, canAfford } from '../state.js';
import { fmtCurrency, parseAmount } from '../utils/format.js';
import FlowLtdLogo from '../../assets/FlowLtd.png';
import DigicelLogo from '../../assets/Digicel.png';

// Network details state
let networkDetailsState = {
  network: null,
  name: '',
  mobileNumber: '',
  areaCode: '876',
  product: 'topup',
  amount: 0,
  currency: 'JMD'
};

// Network information mapping
const networkInfo = {
  'flow': {
    name: 'Flow Ltd',
    logo: FlowLtdLogo,
    dataPlans: [
      { name: '1-Day Plan', price: 150, data: '500MB' },
      { name: '3-Day Plan', price: 350, data: '1GB' },
      { name: '7-Day Plan', price: 750, data: '2GB' },
      { name: '30-Day Plan', price: 1500, data: '4GB' }
    ]
  },
  'digicel': {
    name: 'Digicel',
    logo: DigicelLogo,
    dataPlans: [
      { name: '1-Day Plan', price: 150, data: '500MB' },
      { name: '3-Day Plan', price: 350, data: '1GB' },
      { name: '7-Day Plan', price: 750, data: '2GB' },
      { name: '30-Day Plan', price: 1500, data: '4GB' }
    ]
  }
};

export function renderNetworkDetails(networkId) {
  const app = qs('#app');
  if (!app) return;

  // Set the current network
  networkDetailsState.network = networkId;
  
  // Get network information
  const network = networkInfo[networkId] || {
    name: 'Unknown Network',
    logo: null,
    dataPlans: []
  };

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackNetworkDetails">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Top Up</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <!-- Network Logo and Name -->
        <div class="network-header">
          <div class="network-logo-container">
            <img src="${network.logo}" alt="${network.name}" class="network-details-logo" />
          </div>
          <h2 class="network-details-name">${network.name}</h2>
        </div>

        <form id="networkDetailsForm">
          <!-- Name (Optional) -->
          <div class="form-field">
            <label class="form-label" for="recipientName">Name (Optional)</label>
            <input
              type="text"
              id="recipientName"
              class="form-input-modern"
              placeholder="Enter recipient name"
            />
          </div>

          <!-- Mobile Number -->
          <div class="form-field">
            <label class="form-label" for="mobileNumber">Mobile Number</label>
            <div class="input-group">
              <select id="areaCode" class="form-input-modern area-code-select">
                <option value="876">876</option>
                <option value="658">658</option>
              </select>
              <input
                type="text"
                id="mobileNumber"
                class="form-input-modern mobile-input"
                placeholder="Enter mobile number"
                inputmode="numeric"
                maxlength="7"
                required
              />
            </div>
            <p class="form-hint">Enter a valid 10-digit Jamaican mobile number</p>
          </div>

          <!-- Product Type -->
          <div class="form-field">
            <label class="form-label">Product</label>
            <div class="product-type-selector">
              <div class="product-type-option" data-product="topup">
                <input type="radio" name="productType" id="typeTopUp" value="topup" class="product-type-radio" checked>
                <label for="typeTopUp" class="product-type-label">Top Up</label>
              </div>
              <div class="product-type-option" data-product="dataplan">
                <input type="radio" name="productType" id="typeDataPlan" value="dataplan" class="product-type-radio">
                <label for="typeDataPlan" class="product-type-label">Data Plan</label>
              </div>
            </div>
          </div>

          <!-- Top Up Amount (shown when Top Up is selected) -->
          <div id="topUpSection">
            <div class="form-field">
              <label class="form-label" for="topUpAmount">Amount</label>
              <div class="input-group">
                <select id="topUpCurrency" class="form-input-modern currency-select">
                  <option value="JMD">JMD</option>
                  <option value="USD">USD</option>
                </select>
                <input
                  type="text"
                  id="topUpAmount"
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
                <button type="button" class="quick-amount-btn" data-quick-amount="100">J$100</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="200">J$200</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="500">J$500</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="1000">J$1,000</button>
              </div>
              <div class="quick-amount-grid" id="usd-quick-amounts" style="display: none;">
                <button type="button" class="quick-amount-btn" data-quick-amount="5">$5</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="10">$10</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="20">$20</button>
                <button type="button" class="quick-amount-btn" data-quick-amount="50">$50</button>
              </div>
            </div>
          </div>

          <!-- Data Plan Selection (hidden by default) -->
          <div id="dataPlanSection" style="display: none;">
            <div class="form-field">
              <label class="form-label">Select Data Plan</label>
              <div class="data-plans-list">
                ${network.dataPlans.map((plan, index) => `
                  <div class="data-plan-card" data-plan-index="${index}">
                    <div class="data-plan-info">
                      <h4 class="data-plan-name">${plan.name}</h4>
                      <p class="data-plan-data">${plan.data}</p>
                      <p class="data-plan-price">${fmtCurrency(plan.price, 'JMD')}</p>
                    </div>
                    <input type="radio" name="dataPlan" value="${index}" class="data-plan-radio">
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="form-field">
            <button type="submit" class="btn-primary-modern" id="btnSubmitNetworkDetails">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Event Listeners
  setupNetworkDetailsListeners();
}

function setupNetworkDetailsListeners() {
  const app = qs('#app');

  // Back button handler
  on('click', '#btnBackNetworkDetails', () => navigate('/network-selection', { animate: 'slide-left-fade' }));

  // Name input
  on(app, '#recipientName', 'input', (e) => {
    networkDetailsState.name = e.target.value;
  });

  // Area code selection
  on(app, '#areaCode', 'change', (e) => {
    networkDetailsState.areaCode = e.target.value;
  });

  // Mobile number input
  on(app, '#mobileNumber', 'input', (e) => {
    // Only allow digits
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value;
    networkDetailsState.mobileNumber = value;
  });

  // Product type selection
  on(app, '.product-type-option', 'click', (e) => {
    const radio = e.currentTarget.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      networkDetailsState.product = radio.value;
      
      // Toggle sections based on product type
      const topUpSection = qs('#topUpSection');
      const dataPlanSection = qs('#dataPlanSection');
      
      if (networkDetailsState.product === 'topup') {
        topUpSection.style.display = 'block';
        dataPlanSection.style.display = 'none';
      } else {
        topUpSection.style.display = 'none';
        dataPlanSection.style.display = 'block';
      }
    }
  });

  // Currency selection
  on(app, '#topUpCurrency', 'change', (e) => {
    networkDetailsState.currency = e.target.value;
    
    // Toggle quick amount sections based on selected currency
    const jmdQuickAmounts = qs('#jmd-quick-amounts');
    const usdQuickAmounts = qs('#usd-quick-amounts');
    
    if (networkDetailsState.currency === 'JMD') {
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
      
      if (networkDetailsState.currency === 'JMD') {
        balanceHint.innerHTML = `Available: <strong>${jmdBalance}</strong> / ${usdBalance}`;
      } else {
        balanceHint.innerHTML = `Available: ${jmdBalance} / <strong>${usdBalance}</strong>`;
      }
    }
  });

  // Quick amount buttons
  on(app, '.quick-amount-btn', 'click', (e) => {
    const amount = e.currentTarget.dataset.quickAmount;
    const amountInput = qs('#topUpAmount');
    if (amountInput) {
      amountInput.value = amount;
      networkDetailsState.amount = parseAmount(amount);
    }
  });

  // Amount input
  on(app, '#topUpAmount', 'input', (e) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    e.target.value = value;
    networkDetailsState.amount = parseAmount(value);
  });

  // Data plan selection
  on(app, '.data-plan-card', 'click', (e) => {
    const radio = e.currentTarget.querySelector('input[type="radio"]');
    if (radio) {
      radio.checked = true;
      const planIndex = parseInt(e.currentTarget.dataset.planIndex);
      const network = networkInfo[networkDetailsState.network];
      if (network && network.dataPlans && network.dataPlans[planIndex]) {
        networkDetailsState.amount = network.dataPlans[planIndex].price;
      }
    }
  });

  // Form submission
  on(app, '#networkDetailsForm', 'submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!networkDetailsState.mobileNumber || networkDetailsState.mobileNumber.length !== 7) {
      showToast('Please enter a valid 7-digit mobile number', 'error');
      return;
    }
    
    if (networkDetailsState.product === 'topup' && networkDetailsState.amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    if (networkDetailsState.product === 'dataplan' && !document.querySelector('input[name="dataPlan"]:checked')) {
      showToast('Please select a data plan', 'error');
      return;
    }
    
    if (networkDetailsState.product === 'topup' && !canAfford(networkDetailsState.amount)) {
      showToast('Insufficient balance', 'error');
      return;
    }
    
    // Process top-up
    processTopUp();
  });
}

function processTopUp() {
  const submitBtn = qs('#btnSubmitNetworkDetails');
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // Debit balance if it's a top-up
    if (networkDetailsState.product === 'topup') {
      updateBalance(networkDetailsState.currency, -networkDetailsState.amount);
      
      // Add transaction
      addTransaction({
        title: `${networkInfo[networkDetailsState.network].name} Top Up`,
        amount: -networkDetailsState.amount,
        currency: networkDetailsState.currency,
        type: 'BILL'
      });
      
      showToast(`Top-up of ${fmtCurrency(networkDetailsState.amount, networkDetailsState.currency)} successful`, 'success');
    } else {
      // For data plan
      const planIndex = parseInt(document.querySelector('input[name="dataPlan"]:checked').value);
      const plan = networkInfo[networkDetailsState.network].dataPlans[planIndex];
      
      updateBalance('JMD', -plan.price);
      
      // Add transaction
      addTransaction({
        title: `${networkInfo[networkDetailsState.network].name} ${plan.name}`,
        amount: -plan.price,
        currency: 'JMD',
        type: 'BILL'
      });
      
      showToast(`Data plan purchase of ${fmtCurrency(plan.price, 'JMD')} successful`, 'success');
    }
    
    // Reset state and navigate back to dashboard
    networkDetailsState = {
      network: null,
      name: '',
      mobileNumber: '',
      areaCode: '876',
      product: 'topup',
      amount: 0,
      currency: 'JMD'
    };
    
    navigate('/dashboard', { animate: 'slide-left-fade' });
  }, 2000);
}

// Add styles for the Network Details page
const style = document.createElement('style');
style.textContent = `
  .network-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .network-logo-container {
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
  
  .network-details-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }
  
  .network-details-name {
    font-size: 20px;
    font-weight: 600;
    color: var(--colorscharade-100);
    text-align: center;
  }
  
  .product-type-selector {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .product-type-option {
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
  
  .product-type-option:hover {
    border-color: var(--colorssecondary-100);
  }
  
  .product-type-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .product-type-radio:checked + .product-type-label {
    color: var(--colorssecondary-100);
    font-weight: 600;
  }
  
  .product-type-radio:checked ~ .product-type-option {
    border-color: var(--colorssecondary-100);
    background-color: rgba(84, 58, 248, 0.05);
  }
  
  .product-type-label {
    font-size: 15px;
    cursor: pointer;
  }
  
  .area-code-select {
    width: 80px;
    flex-shrink: 0;
  }
  
  .mobile-input {
    flex: 1;
  }
  
  .data-plans-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .data-plan-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .data-plan-card:hover {
    border-color: var(--colorssecondary-100);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.1);
  }
  
  .data-plan-info {
    flex: 1;
  }
  
  .data-plan-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .data-plan-data {
    font-size: 14px;
    color: var(--colorssecondary-100);
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .data-plan-price {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  
  .data-plan-radio {
    width: 20px;
    height: 20px;
    accent-color: var(--colorssecondary-100);
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
