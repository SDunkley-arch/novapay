import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { api } from '../api.js';
import { state } from '../state.js';
import JamaicaFlag from '../../assets/Jamaica.png';
import CanadaFlag from '../../assets/Canada.png';
import UnitedStatesFlag from '../../assets/United States.png';
import UnitedKingdomFlag from '../../assets/United Kingdom.png';

export function renderRemittanceWUPage() {
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
        <button class="icon-btn" id="btnBackWU">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Western Union</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <form id="wuRemittanceForm" class="auth-form">
          <!-- MTCN Field -->
          <div class="form-field">
            <label class="form-label" for="mtcn">MTCN (Money Transfer Control Number)</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <input
                type="text"
                id="mtcn"
                class="form-input-modern"
                placeholder="XXX-XXX-XXXX"
                maxlength="12"
              />
            </div>
            <p class="form-hint">Enter the 10-digit MTCN provided by the sender</p>
          </div>

          <!-- Sender Section -->
          <div class="form-field">
            <h3 class="section-title-sm">Sender Information</h3>
          </div>

          <div class="form-field">
            <label class="form-label" for="senderName">Sender's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="senderName"
                class="form-input-modern"
                placeholder="Full legal name"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="senderCountry">Sender's Country</label>
            <div class="input-wrapper">
              <img
                id="senderCountryFlagIcon"
                class="input-icon country-flag-icon"
                alt="Country flag"
              />
              <select id="senderCountry" class="form-input-modern">
                <option value="">Select country</option>
                <option value="Jamaica">Jamaica</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="senderPhone">Sender's Phone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.27l4.52 1.13a1 1 0 0 1 .75 1z"></path>
              </svg>
              <input
                type="tel"
                id="senderPhone"
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
            <label class="form-label" for="receiverName">Receiver's Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="receiverName"
                class="form-input-modern"
                placeholder="Full legal name"
                value="${escapeHtml(fullName)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="receiverAddress">Receiver's Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="receiverAddress"
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
            <label class="form-label" for="expectedAmount">Expected Amount</label>
            <div class="input-group">
              <select id="currency" class="form-input-modern currency-select">
                <option value="USD">USD</option>
                <option value="JMD">JMD</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
              <input
                type="text"
                id="expectedAmount"
                class="form-input-modern amount-input"
                placeholder="0.00"
                inputmode="decimal"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="idType">Government Issued ID</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <circle cx="9" cy="10" r="2"></circle>
                <path d="M15 8h2"></path>
                <path d="M15 12h2"></path>
                <path d="M7 16h10"></path>
              </svg>
              <select id="idType" class="form-input-modern">
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
            <label class="form-label" for="purpose">Purpose of Transaction</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
              <select id="purpose" class="form-input-modern">
                <option value="">Select purpose</option>
                <option value="Family Support">Family Support</option>
                <option value="Living Expenses">Living Expenses</option>
                <option value="Salary">Salary</option>
                <option value="Medical Expenses">Medical Expenses</option>
                <option value="Gift">Gift</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSubmitWU">
            Continue
          </button>
        </form>
      </div>
    </div>
  `;

  // Back button handler
  on('click', '#btnBackWU', () => navigate('/remittance', { animate: 'slide-left-fade' }));
  
  // Form submission handler
  on('submit', '#wuRemittanceForm', handleSubmit);
  
  // MTCN formatting (add dash after every 3 digits)
  const mtcnInput = qs('#mtcn');
  if (mtcnInput) {
    mtcnInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-digits
      
      if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
      }
      
      // Format with dashes after every 3 digits
      if (value.length > 3 && value.length <= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      } else if (value.length > 6 && value.length <= 10) {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
      }
      
      e.target.value = value;
    });
  }
  
  // Country flag handler for sender's country
  const senderCountrySelect = qs('#senderCountry');
  if (senderCountrySelect) {
    senderCountrySelect.addEventListener('change', updateSenderCountryFlag);
  }
  
  function updateSenderCountryFlag() {
    const select = qs('#senderCountry');
    const flagIcon = qs('#senderCountryFlagIcon');
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

async function handleSubmit(e) {
  e.preventDefault();
  
  // Get all form values
  const mtcn = qs('#mtcn')?.value.trim().replace(/-/g, ''); // Remove dashes for processing
  const senderName = qs('#senderName')?.value.trim();
  const senderCountry = qs('#senderCountry')?.value;
  const senderPhone = qs('#senderPhone')?.value.trim();
  const receiverName = qs('#receiverName')?.value.trim();
  const receiverAddress = qs('#receiverAddress')?.value.trim();
  const expectedAmountRaw = qs('#expectedAmount')?.value.replace(/[^\d.]/g, '');
  const currency = qs('#currency')?.value;
  const idType = qs('#idType')?.value;
  const purpose = qs('#purpose')?.value;

  // Validation
  if (mtcn.length !== 10) {
    showToast('Please enter a valid 10-digit MTCN', 'error');
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

  const btn = qs('#btnSubmitWU');
  if (!btn) return;

  btn.disabled = true;
  btn.textContent = 'Processing...';

  try {
    const payload = {
      mtcn: mtcn,
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

    const res = await api('/api/remittance/western-union/receive', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    sessionStorage.setItem('novapay_last_remittance_result', JSON.stringify({
      provider: 'western-union',
      referenceId: mtcn,
      amount: `${currency} ${expectedAmount.toFixed(2)}`,
    }));

    navigate('/remittance/success', { animate: 'slide-right-fade' });
  } catch (err) {
    const message = err?.message || err?.status?.message || 'Unable to process Western Union remittance.';
    sessionStorage.setItem('novapay_last_remittance_error', JSON.stringify({
      provider: 'western-union',
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
