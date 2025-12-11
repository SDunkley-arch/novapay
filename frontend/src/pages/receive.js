import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, save } from '../state.js';
import VisaLogo from '../../assets/Visa.png';
import MastercardLogo from '../../assets/Mastercard.png';
import CIBCLogo from '../../assets/CIBC.png';
import JMMBLogo from '../../assets/JMMB_Bank.png';
import JNLogo from '../../assets/JN.png';
import JNCBLogo from '../../assets/JNCB.png';
import ScotiaLogo from '../../assets/Scotia.jpg';
import JamaicaFlag from '../../assets/Jamaica.png';
import USFlag from '../../assets/United States.png';
import CanadaFlag from '../../assets/Canada.png';
import UKFlag from '../../assets/United Kingdom.png';
import CaymanFlag from '../../assets/Cayman Islands.png';

const bankNames = {
  'first-caribbean': 'First Caribbean Bank',
  jmmb: 'JMMB',
  'jamaica-national': 'Jamaica National Bank',
  ncb: 'National Commercial Bank',
  scotia: 'Scotia Bank',
};

const currencies = [
  { code: 'JMD', label: 'Jamaican Dollar (JMD)', flag: JamaicaFlag },
  { code: 'USD', label: 'US Dollar (USD)', flag: USFlag },
  { code: 'CAD', label: 'Canadian Dollar (CAD)', flag: CanadaFlag },
  { code: 'GBP', label: 'Pound Sterling (GBP)', flag: UKFlag },
  { code: 'KYD', label: 'Cayman Islands Dollar (KYD)', flag: CaymanFlag },
];

let receiveState = {
  bankId: null,
  cardType: '',
  currency: '',
  cardNumber: '',
  expiry: '',
  name: '',
  cvv: '',
  brand: 'visa',
  popupShown: false,
  popupAcknowledged: false,
};

export function renderReceiveLanding() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackReceive">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Receive</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Cash in to NovaPay</h3>
          <p class="form-hint" style="margin-bottom: 20px;">Choose how you'd like to add money.</p>
        </div>

        <div class="receive-methods">
          <button class="receive-method-card" data-method="card" type="button">
            <div class="receive-method-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div class="receive-method-info">
              <h4 class="receive-method-name">Debit / Credit Card</h4>
              <p class="receive-method-desc">Add money using your card</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;

  on('click', '#btnBackReceive', () => {
    navigate('/dashboard', { animate: 'slide-left-fade' });
  });

  on(app, '.receive-method-card', 'click', (e) => {
    const method = e.currentTarget.dataset.method;
    if (method === 'card') {
      resetReceiveState(null);
      navigate('/receive/add-card/none', { animate: 'slide-right-fade' });
    }
  });
}

export function renderReceiveBankSelection() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackReceiveBank">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Select Bank</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Choose Your Bank</h3>
          <p class="form-hint" style="margin-bottom: 20px;">Select the bank that issued your card.</p>
        </div>

        <div class="bank-providers">
          <div class="bank-provider-card" data-bank="first-caribbean">
            <div class="bank-provider-logo">
              <img src="${CIBCLogo}" alt="First Caribbean Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">First Caribbean Bank</h4>
              <p class="bank-provider-desc">CIBC First Caribbean</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jmmb">
            <div class="bank-provider-logo">
              <img src="${JMMBLogo}" alt="JMMB" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">JMMB</h4>
              <p class="bank-provider-desc">Jamaica Money Market Brokers</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jamaica-national">
            <div class="bank-provider-logo">
              <img src="${JNLogo}" alt="Jamaica National Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Jamaica National Bank</h4>
              <p class="bank-provider-desc">JN Bank</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="ncb">
            <div class="bank-provider-logo">
              <img src="${JNCBLogo}" alt="National Commercial Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">National Commercial Bank</h4>
              <p class="bank-provider-desc">NCB Jamaica</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="scotia">
            <div class="bank-provider-logo">
              <img src="${ScotiaLogo}" alt="Scotia Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Scotia Bank</h4>
              <p class="bank-provider-desc">Scotiabank Jamaica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  on('click', '#btnBackReceiveBank', () => {
    navigate('/receive', { animate: 'slide-left-fade' });
  });

  const cards = app.querySelectorAll('.bank-provider-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const bank = card.dataset.bank;
      resetReceiveState(bank);
      navigate(`/receive/add-card/${bank}`, { animate: 'slide-right-fade' });
    });
  });
}

export function renderReceiveAddCard(bankId) {
  const app = qs('#app');
  if (!app) return;

  resetReceiveState(bankId && bankId !== 'none' ? bankId : null);
  const bankName = receiveState.bankId ? bankNames[receiveState.bankId] || 'Selected Bank' : '';

  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackReceiveAddCard">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Add a Card</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="receive-card-preview">
          <div class="receive-card-visual">
            <img src="${VisaLogo}" alt="Card network" class="receive-card-network" id="receiveCardNetwork" />
          </div>
        </div>

        <form id="receiveCardForm">
          <div class="form-field" id="receiveBankField">
            <label class="form-label">Bank Issuer</label>
            <button type="button" class="receive-select-trigger" id="receiveBankTrigger">
              <span class="receive-select-value" id="receiveBankSelectedLabel">${bankName || 'Select bank'}</span>
              <span class="receive-select-chevron">▾</span>
            </button>
            <div class="receive-select-menu np-hidden" id="receiveBankMenu">
              <button type="button" class="receive-select-option" data-bank="first-caribbean">
                <img src="${CIBCLogo}" alt="First Caribbean Bank" class="receive-bank-logo" />
                <span>First Caribbean Bank</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="jmmb">
                <img src="${JMMBLogo}" alt="JMMB" class="receive-bank-logo" />
                <span>JMMB</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="jamaica-national">
                <img src="${JNLogo}" alt="Jamaica National Bank" class="receive-bank-logo" />
                <span>Jamaica National Bank</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="ncb">
                <img src="${JNCBLogo}" alt="National Commercial Bank" class="receive-bank-logo" />
                <span>National Commercial Bank</span>
              </button>
              <button type="button" class="receive-select-option" data-bank="scotia">
                <img src="${ScotiaLogo}" alt="Scotia Bank" class="receive-bank-logo" />
                <span>Scotia Bank</span>
              </button>
            </div>
          </div>

          <div class="form-field np-hidden" id="receiveCardTypeField">
            <label class="form-label" for="receiveCardType">Select card type</label>
            <select id="receiveCardType" class="form-input-modern">
              <option value="">Select card type</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>

          <div class="form-field np-hidden" id="receiveCurrencyField">
            <label class="form-label">Select Currency</label>
            <button type="button" class="receive-select-trigger" id="receiveCurrencyTrigger">
              <span class="receive-select-value" id="receiveCurrencySelectedLabel">Select currency</span>
              <span class="receive-select-chevron">▾</span>
            </button>
            <div class="receive-select-menu np-hidden" id="receiveCurrencyMenu">
              ${currencies
                .map(
                  (c) => `
                <button type="button" class="receive-select-option" data-code="${c.code}">
                  <img src="${c.flag}" alt="${c.label}" class="receive-currency-flag" />
                  <span>${c.label}</span>
                </button>
              `,
                )
                .join('')}
            </div>
          </div>

          <div class="form-field np-hidden" id="receiveNumberField">
            <label class="form-label" for="receiveCardNumber">Enter your card number</label>
            <input
              type="text"
              id="receiveCardNumber"
              class="form-input-modern"
              placeholder="1234-5678-9012-3456"
              inputmode="numeric"
              maxlength="19"
            />
          </div>

          <div class="form-field np-hidden" id="receiveExpiryField">
            <label class="form-label" for="receiveExpiry">Enter expiration date</label>
            <input
              type="text"
              id="receiveExpiry"
              class="form-input-modern"
              placeholder="MM/YY"
              inputmode="numeric"
              maxlength="5"
            />
          </div>

          <div class="form-field np-hidden" id="receiveNameField">
            <label class="form-label" for="receiveName">Enter cardholders name</label>
            <input
              type="text"
              id="receiveName"
              class="form-input-modern"
              placeholder="Cardholder name"
            />
          </div>

          <div class="form-field np-hidden" id="receiveCVVField">
            <label class="form-label" for="receiveCVV">Enter CVV</label>
            <input
              type="password"
              id="receiveCVV"
              class="form-input-modern"
              placeholder="CVV"
              inputmode="numeric"
              maxlength="3"
            />
          </div>

          <div class="form-field">
            <button type="submit" class="btn-primary-modern" id="btnReceiveComplete" disabled>
              Complete
            </button>
          </div>
        </form>
      </div>

      <div class="receive-modal np-hidden" id="receiveModal">
        <div class="receive-modal-backdrop"></div>
        <div class="receive-modal-dialog">
          <h2 class="receive-modal-title">Stay Informed</h2>
          <p class="receive-modal-body">We'll charge a refundable amount to validate your card.</p>
          <div class="receive-modal-footer">
            <button type="button" class="btn-primary-modern" id="receiveModalOk">OK</button>
          </div>
        </div>
      </div>
    </div>
  `;

  setupAddCardListeners();
}

function resetReceiveState(bankId) {
  receiveState = {
    bankId: bankId || null,
    cardType: '',
    currency: '',
    cardNumber: '',
    expiry: '',
    name: '',
    cvv: '',
    brand: 'visa',
    popupShown: false,
    popupAcknowledged: false,
  };
}

function setupAddCardListeners() {
  const app = qs('#app');
  if (!app) return;

  const bankTrigger = qs('#receiveBankTrigger');
  const bankMenu = qs('#receiveBankMenu');
  if (bankTrigger && bankMenu) {
    bankTrigger.addEventListener('click', () => {
      bankMenu.classList.toggle('np-hidden');
    });

    const bankOptions = bankMenu.querySelectorAll('.receive-select-option');
    bankOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        const bank = opt.dataset.bank;
        receiveState.bankId = bank;
        const label = qs('#receiveBankSelectedLabel');
        if (label) {
          label.textContent = bankNames[bank] || 'Selected Bank';
        }
        bankMenu.classList.add('np-hidden');
        updateFieldVisibility();
        updateBrandLogo();
        updateCompleteState();
      });
    });
  }

  const currencyTrigger = qs('#receiveCurrencyTrigger');
  const currencyMenu = qs('#receiveCurrencyMenu');
  if (currencyTrigger && currencyMenu) {
    currencyTrigger.addEventListener('click', () => {
      currencyMenu.classList.toggle('np-hidden');
    });

    const currencyOptions = currencyMenu.querySelectorAll('.receive-select-option');
    currencyOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        const code = opt.dataset.code;
        receiveState.currency = code;
        const selected = currencies.find((c) => c.code === code);
        const label = qs('#receiveCurrencySelectedLabel');
        if (label && selected) {
          label.textContent = selected.label;
        }
        currencyMenu.classList.add('np-hidden');
        updateFieldVisibility();
        updateCompleteState();
      });
    });
  }

  on('click', '#btnBackReceiveAddCard', () => {
    navigate('/receive', { animate: 'slide-left-fade' });
  });

  on(app, '#receiveCardType', 'change', (e) => {
    receiveState.cardType = e.target.value;
    updateFieldVisibility();
    updateCompleteState();
  });

  on(app, '#receiveCardNumber', 'input', (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
    receiveState.cardNumber = digits;
    if (digits.length >= 6) {
      receiveState.brand = detectBrand(digits);
    } else {
      receiveState.brand = 'visa';
    }
    e.target.value = formatCardNumber(digits);
    updateBrandLogo();
    updateFieldVisibility();
    updateCompleteState();
  });

  on(app, '#receiveExpiry', 'input', (e) => {
    let v = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
    receiveState.expiry = v;
    updateFieldVisibility();
    updateCompleteState();
  });

  on(app, '#receiveName', 'input', (e) => {
    const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, '');
    e.target.value = cleaned;
    receiveState.name = cleaned.trim();
    updateFieldVisibility();
    updateCompleteState();
  });

  on(app, '#receiveCVV', 'input', (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
    e.target.value = digits;
    receiveState.cvv = digits;
    updateCompleteState();
  });

  on('click', '#receiveModalOk', () => {
    const modal = qs('#receiveModal');
    receiveState.popupAcknowledged = true;
    if (modal) modal.classList.add('np-hidden');
    updateCompleteState();
  });

  on(app, '#receiveCardForm', 'submit', (e) => {
    e.preventDefault();
    const btn = qs('#btnReceiveComplete');
    if (!btn || btn.disabled) return;
    if (!isFormValid()) {
      showToast('Please complete all required fields.', 'error');
      return;
    }
    // Persist saved card in state for Current Cards section
    try {
      const brandLabel = receiveState.brand === 'mastercard' ? 'Mastercard' : 'Visa';
      const kindLabel = receiveState.cardType === 'debit' ? 'Debit Card' : 'Credit Card';
      const label = `${brandLabel} ${kindLabel}`;
      const last4 = receiveState.cardNumber.slice(-4);

      const newCard = {
        id: 'card-' + Date.now(),
        brand: receiveState.brand,
        cardType: receiveState.cardType,
        label,
        last4,
        verified: false
      };

      if (!Array.isArray(state.card.savedCards)) {
        state.card.savedCards = [];
      }
      state.card.savedCards.push(newCard);
      save();
    } catch (err) {
      console.error('[Receive] Failed to save card locally', err);
    }

    showToast('Card saved successfully. Cash-in flow coming soon.', 'success');
    navigate('/dashboard', { animate: 'slide-left-fade' });
  });

  updateBrandLogo();
  updateFieldVisibility();
  updateCompleteState();
}

function detectBrand(digits) {
  if (digits[0] === '4') return 'visa';
  if (digits.length >= 2) {
    const two = parseInt(digits.slice(0, 2), 10);
    if (two >= 51 && two <= 55) return 'mastercard';
  }
  if (digits.length >= 4) {
    const four = parseInt(digits.slice(0, 4), 10);
    if (four >= 2221 && four <= 2720) return 'mastercard';
  }
  return 'visa';
}

function formatCardNumber(digits) {
  const groups = [];
  for (let i = 0; i < digits.length; i += 4) groups.push(digits.slice(i, i + 4));
  return groups.join('-');
}

function updateBrandLogo() {
  const img = qs('#receiveCardNetwork');
  if (!img) return;
  img.src = receiveState.brand === 'mastercard' ? MastercardLogo : VisaLogo;
}

function isExpiryValid(v) {
  const m = /^([0-9]{2})\/([0-9]{2})$/.exec(v || '');
  if (!m) return false;
  const month = parseInt(m[1], 10);
  const year = parseInt(m[2], 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const yy = now.getFullYear() % 100;
  const mm = now.getMonth() + 1;
  if (year < yy) return false;
  if (year === yy && month < mm) return false;
  return true;
}

function isNameValid(name) {
  return !!name && name.trim().length >= 2;
}

function isFormValid() {
  return (
    !!receiveState.bankId &&
    !!receiveState.cardType &&
    !!receiveState.currency &&
    receiveState.cardNumber.length === 16 &&
    isExpiryValid(receiveState.expiry) &&
    isNameValid(receiveState.name) &&
    receiveState.cvv.length === 3
  );
}

function updateFieldVisibility() {
  const cardTypeField = qs('#receiveCardTypeField');
  const currencyField = qs('#receiveCurrencyField');
  const numberField = qs('#receiveNumberField');
  const expiryField = qs('#receiveExpiryField');
  const nameField = qs('#receiveNameField');
  const cvvField = qs('#receiveCVVField');

  // Show card type only after Bank Issuer is selected
  if (cardTypeField) {
    cardTypeField.classList.toggle('np-hidden', !receiveState.bankId);
  }

  // Show currency only after card type is selected
  if (currencyField) {
    currencyField.classList.toggle('np-hidden', !receiveState.cardType);
  }

  // Show card number only after currency is selected
  if (numberField) {
    numberField.classList.toggle('np-hidden', !receiveState.currency);
  }

  // Show expiry only after a full 16-digit card number is entered
  if (expiryField) {
    expiryField.classList.toggle('np-hidden', receiveState.cardNumber.length !== 16);
  }

  // Show name only after expiry is valid
  if (nameField) {
    nameField.classList.toggle('np-hidden', !isExpiryValid(receiveState.expiry));
  }

  // Show CVV only after name is valid
  if (cvvField) {
    cvvField.classList.toggle('np-hidden', !isNameValid(receiveState.name));
  }
}

function updateCompleteState() {
  const btn = qs('#btnReceiveComplete');
  if (!btn) return;
  const valid = isFormValid();
  if (valid && !receiveState.popupShown) {
    receiveState.popupShown = true;
    const modal = qs('#receiveModal');
    if (modal) modal.classList.remove('np-hidden');
  }
  btn.disabled = !(valid && receiveState.popupAcknowledged);
}

// Minimal styles for Receive pages
const style = document.createElement('style');
style.textContent = `
  .receive-methods {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  .receive-method-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    width: 100%;
    text-align: left;
  }
  .receive-method-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  .receive-method-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(84, 58, 248, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--colorssecondary-100);
    flex-shrink: 0;
  }
  .receive-method-info { flex: 1; }
  .receive-method-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  .receive-method-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
  .receive-card-preview { margin-bottom: 24px; }
  .receive-card-visual {
    width: 100%;
    max-width: 320px;
    margin: 0 auto 8px;
    padding: 24px 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    box-shadow: none;
  }
  .receive-card-bank { display: none; }
  .receive-card-network {
    position: static;
    width: 120px;
    height: auto;
  }
  .receive-currency-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .receive-currency-flag {
    width: 24px;
    height: 24px;
    object-fit: contain;
    border-radius: 4px;
  }
  .receive-select-trigger {
    width: 100%;
    margin-top: 4px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid #E0E0E0;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: var(--colorscharade-100);
  }
  .receive-select-value {
    flex: 1;
    text-align: left;
  }
  .receive-select-chevron {
    margin-left: 8px;
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  .receive-select-menu {
    margin-top: 12px;
  }
  .receive-select-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;
    text-align: left;
    cursor: pointer;
    position: relative;
    margin-bottom: 12px;
  }
  .receive-select-option::after {
    content: '→';
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  .receive-select-option:last-child {
    margin-bottom: 0;
  }
  .receive-bank-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: contain;
    flex-shrink: 0;
  }
  .receive-modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1600;
  }
  .receive-modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
  }
  .receive-modal-dialog {
    position: relative;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 20px 20px 16px;
    max-width: 320px;
    width: 90%;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .receive-modal-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--colorscharade-100);
  }
  .receive-modal-body {
    font-size: 14px;
    color: var(--colorscharade-70);
    margin-bottom: 16px;
  }
  .receive-modal-footer { text-align: right; }
  .np-hidden { display: none !important; }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
