import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { api } from '../api.js';
import { state } from '../state.js';
import JamaicaFlag from '../../assets/Jamaica.png';
import CanadaFlag from '../../assets/Canada.png';
import UnitedStatesFlag from '../../assets/United States.png';
import UnitedKingdomFlag from '../../assets/United Kingdom.png';

export function renderRemittanceMGPage() {
  const app = qs('#app');
  if (!app) return;

  // Get user data from state for auto-filling
  const user = state?.session?.user || {};
  const fullName = user.name || '';
  const addressStreet = user.addressStreet || '';
  const addressCity = user.addressCity || '';
  const addressStateParish = user.addressStateParish || '';
  const addressCountry = user.addressCountry || '';
  
  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackMG">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">MoneyGram</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <form id="mgRemittanceForm" class="auth-form">
          <!-- MTCN Field -->
          <div class="form-field">
            <label class="form-label" for="mgReferenceNumber">Reference Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <input
                type="text"
                id="mgReferenceNumber"
                class="form-input-modern"
                placeholder="XX-XX-XX-XX"
                maxlength="11"
              />
            </div>
            <p class="form-hint">Enter the 8-digit reference number provided by the sender</p>
          </div>

          <!-- Sender Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Sender Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgSenderName">Sender's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="mgSenderName"
                class="form-input-modern"
                placeholder="Full legal name"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgSenderCountry">Sender's Country</label>
            <div class="input-wrapper">
              <img
                id="mgSenderCountryFlagIcon"
                class="input-icon country-flag-icon"
                alt="Country flag"
              />
              <select id="mgSenderCountry" class="form-input-modern">
                <option value="">Select country</option>
                <option value="Jamaica">Jamaica</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgSenderPhone">Sender's Phone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.27l4.52 1.13a1 1 0 0 1 .75 1z"></path>
              </svg>
              <input
                type="tel"
                id="mgSenderPhone"
                class="form-input-modern"
                placeholder="Phone number"
              />
            </div>
          </div>

          <!-- Receiver Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Receiver Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgReceiverName">Receiver's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="mgReceiverName"
                class="form-input-modern"
                placeholder="Full legal name"
                value="${escapeHtml(fullName)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgReceiverAddress">Receiver's Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="mgReceiverAddress"
                class="form-input-modern"
                placeholder="Street address"
                value="${escapeHtml(addressStreet)}"
                readonly
              />
            </div>
            <p class="form-hint">Address auto-filled from your profile</p>
          </div>

          <!-- Expected Amount Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Transaction Details</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgExpectedAmount">Expected Amount</label>
            <div class="input-group">
              <select id="mgCurrency" class="form-input-modern currency-select">
                <option value="USD">USD</option>
                <option value="JMD">JMD</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
              <input
                type="text"
                id="mgExpectedAmount"
                class="form-input-modern amount-input"
                placeholder="0.00"
                inputmode="decimal"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgIdType">Government Issued ID</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <circle cx="9" cy="10" r="2"></circle>
                <path d="M15 8h2"></path>
                <path d="M15 12h2"></path>
                <path d="M7 16h10"></path>
              </svg>
              <select id="mgIdType" class="form-input-modern">
                <option value="">Select ID type</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Residence Permit">Residence Permit</option>
              </select>
            </div>
            <p class="form-hint">ID must be verified in your account</p>
          </div>

          <div class="form-field">
            <label class="form-label" for="mgPurpose">Purpose of Transaction</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <select id="mgPurpose" class="form-input-modern">
                <option value="">Select purpose</option>
                <option value="Family Support">Family Support</option>
                <option value="Living Expenses">Living Expenses</option>
                <option value="Salary">Salary</option>
                <option value="Medical Expenses">Medical Expenses</option>
                <option value="Gift">Gift</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSubmitMG">
            Continue
          </button>
        </form>
      </div>
    </div>
  `;

  // Back button handler
  on('click', '#btnBackMG', () => navigate('/remittance', { animate: 'slide-left-fade' }));
  
  // Form submission handler
  on('submit', '#mgRemittanceForm', handleSubmitMG);
  
  // Reference Number formatting (add dash after every 2 digits)
  const refNumberInput = qs('#mgReferenceNumber');
  if (refNumberInput) {
    refNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digits
      
      if (value.length > 8) {
        value = value.slice(0, 8); // Limit to 8 digits
      }
      
      // Format with dashes after every 2 digits
      if (value.length > 2 && value.length <= 4) {
        value = value.slice(0, 2) + '-' + value.slice(2);
      } else if (value.length > 4 && value.length <= 6) {
        value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4);
      } else if (value.length > 6 && value.length <= 8) {
        value = value.slice(0, 2) + '-' + value.slice(2, 4) + '-' + value.slice(4, 6) + '-' + value.slice(6);
      }
      
      e.target.value = value;
    });
  }
  
  // Country flag handler for sender's country
  const senderCountrySelect = qs('#mgSenderCountry');
  if (senderCountrySelect) {
    senderCountrySelect.addEventListener('change', updateMGSenderCountryFlag);
  }
  
  function updateMGSenderCountryFlag() {
    const select = qs('#mgSenderCountry');
    const flagIcon = qs('#mgSenderCountryFlagIcon');
    if (!select || !flagIcon) return;
    
    const country = select.value;
    const flagSrc = getCountryFlagSrc(country);
    
    if (flagSrc) {
      flagIcon.src = flagSrc;
      flagIcon.style.display = '';
    } else {
      flagIcon.removeAttribute('src');
      flagIcon.style.display = 'none';
    }
  }
}

async function handleSubmitMG(e) {
  e.preventDefault();
  
  // Get all form values
  const referenceNumber = qs('#mgReferenceNumber')?.value.trim().replace(/-/g, ''); // Remove dashes for processing
  const senderName = qs('#mgSenderName')?.value.trim();
  const senderCountry = qs('#mgSenderCountry')?.value;
  const senderPhone = qs('#mgSenderPhone')?.value.trim();
  const receiverName = qs('#mgReceiverName')?.value.trim();
  const receiverAddress = qs('#mgReceiverAddress')?.value.trim();
  const expectedAmountRaw = qs('#mgExpectedAmount')?.value.replace(/[^\d.]/g, '');
  const currency = qs('#mgCurrency')?.value;
  const idType = qs('#mgIdType')?.value;
  const purpose = qs('#mgPurpose')?.value;

  // Validation
  if (referenceNumber.length !== 8) {
    showToast('Please enter a valid 8-digit reference number', 'error');
    return;
  }
  
  if (!senderName || !senderCountry || !senderPhone) {
    showToast('Please complete all sender information fields', 'error');
    return;
  }
  
  if (!receiverName || !receiverAddress) {
    showToast('Please complete all receiver information fields', 'error');
    return;
  }
  
  if (!expectedAmountRaw || !currency) {
    showToast('Please enter the expected amount', 'error');
    return;
  }
  
  if (!idType) {
    showToast('Please select a government issued ID type', 'error');
    return;
  }
  
  if (!purpose) {
    showToast('Please select the purpose of transaction', 'error');
    return;
  }

  const expectedAmount = Number(expectedAmountRaw);
  if (!expectedAmount || expectedAmount <= 0) {
    showToast('Enter a valid amount', 'error');
    return;
  }

  const btn = qs('#btnSubmitMG');
  if (!btn) return;

  btn.disabled = true;
  btn.textContent = 'Processing...';

  try {
    const payload = {
      referenceNumber,
      senderName,
      senderCountry,
      senderPhone,
      receiverName,
      receiverAddress,
      expectedAmount,
      currency,
      idType,
      purpose,
    };

    const res = await api('/api/remittance/moneygram/receive', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    sessionStorage.setItem('novapay_last_remittance_result', JSON.stringify({
      provider: 'moneygram',
      referenceId: referenceNumber,
      amount: `${currency} ${expectedAmount.toFixed(2)}`,
    }));

    navigate('/remittance/success', { animate: 'slide-right-fade' });
  } catch (err) {
    const message = err?.message || err?.status?.message || 'Unable to process MoneyGram remittance.';
    sessionStorage.setItem('novapay_last_remittance_error', JSON.stringify({
      provider: 'moneygram',
      message,
    }));
    navigate('/remittance/error', { animate: 'slide-right-fade' });
  } finally {
    btn.disabled = false;
    btn.textContent = 'Continue';
  }
}

function getCountryFlagSrc(countryRaw) {
  if (!countryRaw) return '';
  const normalized = String(countryRaw).trim().toLowerCase();

  if (normalized === 'jamaica') return JamaicaFlag;
  if (normalized === 'canada') return CanadaFlag;
  if (normalized === 'united states' || normalized === 'usa' || normalized === 'us') {
    return UnitedStatesFlag;
  }
  if (normalized === 'united kingdom' || normalized === 'uk' || normalized === 'great britain') {
    return UnitedKingdomFlag;
  }

  return '';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[m]));
}

const style = document.createElement('style');
style.textContent = `
  .input-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .currency-select {
    width: 80px;
    flex-shrink: 0;
  }
  
  .amount-input {
    flex: 1;
  }
  
  .section-title-sm {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--colorscharade-10);
  }
  
  .form-hint {
    font-size: 12px;
    color: var(--colorscharade-60);
    margin-top: 4px;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
