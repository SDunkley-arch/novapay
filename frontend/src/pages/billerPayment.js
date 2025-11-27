// Biller payment details page: /more/billers/:id
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, canAfford, updateBalance, addTransaction, addBiller } from '../state.js';

const BILLERS = [
  { id: 'jps', name: 'JPS', icon: '⚡', category: 'Electricity' },
  { id: 'nwc', name: 'NWC', icon: '💧', category: 'Water' },
  { id: 'flow', name: 'Flow', icon: '📱', category: 'Mobile' },
  { id: 'digicel', name: 'Digicel', icon: '📱', category: 'Mobile' },
  { id: 'lime', name: 'LIME', icon: '☎️', category: 'Internet' },
  { id: 'ncb', name: 'NCB', icon: '🏦', category: 'Credit Card' },
  { id: 'sagicor', name: 'Sagicor', icon: '🛡️', category: 'Insurance' },
  { id: 'guardian', name: 'Guardian Life', icon: '🛡️', category: 'Insurance' },
];

function findBiller(id) {
  return BILLERS.find((b) => b.id === id);
}

function getAccountLabel(billerId) {
  const labels = {
    jps: 'Account Number',
    nwc: 'Account Number',
    flow: 'Phone Number',
    digicel: 'Phone Number',
    lime: 'Account Number',
    ncb: 'Credit Card Number',
    sagicor: 'Policy Number',
    guardian: 'Policy Number',
  };
  return labels[billerId] || 'Account Number';
}

function getAccountPlaceholder(billerId) {
  const placeholders = {
    jps: '123456789',
    nwc: '987654321',
    flow: '876-555-0123',
    digicel: '876-555-0123',
    lime: '123456789',
    ncb: '4111-1111-1111-1111',
    sagicor: 'POL123456',
    guardian: 'GL789012',
  };
  return placeholders[billerId] || 'Enter account number';
}

function parseAmount(raw) {
  if (!raw) return 0;
  const cleaned = String(raw).replace(/[^0-9.]/g, '');
  const num = Number(cleaned || '0');
  return Math.round(num * 100);
}

export function renderBillerPaymentPage(params) {
  const { id } = params || {};
  const biller = findBiller(id);
  const app = qs('#app');
  if (!app) return;

  if (!biller) {
    app.innerHTML = `
      <div class="container page">
        <div class="page-header">
          <button class="back-btn" data-action="nav-back">←</button>
          <h1 class="page-title">Bill Payment</h1>
          <div></div>
        </div>
        <div class="card">
          <p>Biller not found.</p>
        </div>
      </div>
    `;
    on('click', '[data-action="nav-back"]', () => navigate('/more/billers'));
    return;
  }

  // Try to find any saved account for this biller
  const saved = state.savedBillers.find((b) => b.name === biller.name);
  const savedAccount = saved?.account || '';

  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Bill Payment</h1>
        <div></div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-3xl">${biller.icon}</div>
          <div>
            <h3 class="text-lg font-semibold">${biller.name}</h3>
            <p class="text-muted">${biller.category}</p>
          </div>
        </div>

        <form id="billerPaymentForm">
          <div class="form-group">
            <label class="form-label" for="accountNumber">
              ${getAccountLabel(biller.id)}
            </label>
            <input
              type="text"
              id="accountNumber"
              class="form-input"
              placeholder="${getAccountPlaceholder(biller.id)}"
              value="${savedAccount}"
              required
            />
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
              />
            </div>
          </div>

          <div class="flex gap-4 mt-4">
            <button type="button" class="btn btn-secondary flex-1" data-action="bill-back">
              Back
            </button>
            <button type="submit" class="btn btn-primary flex-1" data-testid="btnContinueBill">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  on('click', '[data-action="nav-back"]', () => navigate('/more/billers'));
  on('click', '[data-action="bill-back"]', () => navigate('/more/billers'));

  // Amount input formatting
  on('input', '#billAmount', (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    e.target.value = value;
  });

  on('submit', '#billerPaymentForm', (e) => {
    e.preventDefault();

    const account = qs('#accountNumber').value.trim();
    const amount = parseAmount(qs('#billAmount').value);

    if (!account || amount <= 0) {
      showToast('Please fill in all required fields');
      return;
    }

    if (!canAfford(amount)) {
      showToast('Insufficient balance. Please add money first.');
      return;
    }

    const payload = {
      billerId: biller.id,
      billerName: biller.name,
      icon: biller.icon,
      category: biller.category,
      account,
      amount,
    };

    sessionStorage.setItem('novapay_biller_draft', JSON.stringify(payload));
    navigate(`/more/billers/${biller.id}/confirm`);
  });
}
