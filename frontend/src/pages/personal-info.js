import { qs, on, showToast } from '../lib/dom.js';
import { goBack } from '../router.js';
import { state, save } from '../state.js';
import JamaicaFlag from '../../assets/Jamaica.png';
import CanadaFlag from '../../assets/Canada.png';
import UnitedStatesFlag from '../../assets/United States.png';
import UnitedKingdomFlag from '../../assets/United Kingdom.png';
import CaymanIslandsFlag from '../../assets/Cayman Islands.png';

export function renderPersonalInfo() {
  const app = qs('#app');

  const user = state?.session?.user || {};

  const fullName = user.name || '';
  const parts = fullName.split(' ').filter(Boolean);
  const derivedFirst = parts[0] || '';
  const derivedLast = parts.slice(1).join(' ');

  const firstName = user.firstName || derivedFirst;
  const lastName = user.lastName || derivedLast;
  const addressStreet = user.addressStreet || '';
  const addressCity = user.addressCity || '';
  const addressStateParish = user.addressStateParish || '';
  const addressCountry = user.addressCountry || '';

  const phone = user.phone || '';
  const email = user.email || '';

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackPersonal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Personal Information</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <form id="personalInfoForm" class="auth-form">
          <div class="form-field">
            <label class="form-label" for="firstName">First Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="firstName"
                class="form-input-modern"
                placeholder="First name"
                value="${escapeHtml(firstName)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="lastName">Last Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="lastName"
                class="form-input-modern"
                placeholder="Last name"
                value="${escapeHtml(lastName)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="addressStreet">Address</label>
            <div class="input-wrapper" style="margin-bottom: 8px;">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="addressStreet"
                class="form-input-modern"
                placeholder="Street"
                value="${escapeHtml(addressStreet)}"
              />
            </div>
          </div>

          <div class="form-field">
            <div class="input-wrapper" style="margin-bottom: 8px;">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="addressCity"
                class="form-input-modern"
                placeholder="City"
                value="${escapeHtml(addressCity)}"
              />
            </div>
          </div>

          <div class="form-field">
            <div class="input-wrapper" style="margin-bottom: 8px;">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <input
                type="text"
                id="addressStateParish"
                class="form-input-modern"
                placeholder="State / Parish"
                value="${escapeHtml(addressStateParish)}"
              />
            </div>
          </div>

          <div class="form-field">
            <div class="input-wrapper">
              <img
                id="countryFlagIcon"
                class="input-icon country-flag-icon"
                alt="Country flag"
              />
              <input
                type="text"
                id="addressCountry"
                class="form-input-modern"
                placeholder="Country"
                value="${escapeHtml(addressCountry)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="phone">Telephone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.36 6.36l2.2-2.2a1 1 0 0 1 .95-.27l4.52 1.13a1 1 0 0 1 .75 1z"></path>
              </svg>
              <input
                type="tel"
                id="phone"
                class="form-input-modern"
                placeholder="Phone number"
                value="${escapeHtml(phone)}"
              />
            </div>
          </div>

          <div class="form-field">
            <label class="form-label" for="email">Email Address</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="email"
                class="form-input-modern"
                placeholder="you@example.com"
                value="${escapeHtml(email)}"
              />
            </div>
          </div>

          <button type="submit" class="btn-primary-modern" id="btnSavePersonal">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  `;

  const root = document.querySelector('#app');

  on(root, '#btnBackPersonal', 'click', () => goBack());

  const applyCountryFlagIcon = () => {
    const input = qs('#addressCountry');
    const iconEl = qs('#countryFlagIcon');
    if (!input || !iconEl) return;
    const src = getCountryFlagSrc(input.value);
    if (src) {
      iconEl.src = src;
      iconEl.style.display = '';
    } else {
      iconEl.removeAttribute('src');
      iconEl.style.display = 'none';
    }
  };

  applyCountryFlagIcon();

  on(root, '#addressCountry', 'input', () => applyCountryFlagIcon());

  on(root, '#personalInfoForm', 'submit', (e) => {
    e.preventDefault();

    if (!state.session) {
      showToast('Please sign in again to update your information.', 'error');
      goBack();
      return;
    }

    const firstNameInput = qs('#firstName');
    const lastNameInput = qs('#lastName');
    const streetInput = qs('#addressStreet');
    const cityInput = qs('#addressCity');
    const stateParishInput = qs('#addressStateParish');
    const countryInput = qs('#addressCountry');

    const phoneInput = qs('#phone');
    const emailInput = qs('#email');

    const newFirstName = (firstNameInput?.value || '').trim();
    const newLastName = (lastNameInput?.value || '').trim();
    const newAddressStreet = (streetInput?.value || '').trim();
    const newAddressCity = (cityInput?.value || '').trim();
    const newAddressStateParish = (stateParishInput?.value || '').trim();
    const newAddressCountry = (countryInput?.value || '').trim();

    const newPhone = (phoneInput?.value || '').trim();
    const newEmail = (emailInput?.value || '').trim();

    const currentUser = state.session.user || {};

    const nameParts = [];
    if (newFirstName) nameParts.push(newFirstName);
    if (newLastName) nameParts.push(newLastName);
    const newFullName = nameParts.join(' ') || currentUser.name || '';

    const updatedUser = {
      ...currentUser,
      firstName: newFirstName,
      lastName: newLastName,
      addressStreet: newAddressStreet,
      addressCity: newAddressCity,
      addressStateParish: newAddressStateParish,
      addressCountry: newAddressCountry,

      phone: newPhone,
      email: newEmail || currentUser.email,
      name: newFullName,
    };

    state.session = {
      ...state.session,
      user: updatedUser,
    };

    save();
    showToast('Personal information updated.', 'success');
    goBack();
  });
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

  if (normalized === 'cayman islands' || normalized === 'cayman island') {
    return CaymanIslandsFlag;
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