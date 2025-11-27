import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import popupImage from '../../assets/Popup.png';

export function renderForgotPassword() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="password-recovery-wrapper">
      <div class="auth-container" id="forgotRecoveryBase">
        <div class="auth-header">
          <button class="icon-btn" data-testid="btnBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        <div class="auth-content">
          <div class="auth-brand">
            <div class="auth-logo">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="url(#gradient-forgot)"/>
                <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="gradient-forgot" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stop-color="#543AF8"/>
                    <stop offset="100%" stop-color="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 class="auth-title">Password Recovery</h1>
            <p class="auth-subtitle">Hello There. You forget your password?</p>
          </div>

          <form id="forgotPasswordForm" class="auth-form">
            <div class="form-field">
              <label class="form-label" for="forgotEmail">Email</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  id="forgotEmail"
                  class="form-input-modern"
                  placeholder="Email"
                  required
                >
              </div>
            </div>

            <button type="submit" class="btn-primary-modern" data-testid="btnForgotPasswordContinue">
              Continue
            </button>
          </form>
        </div>
      </div>

      <div class="password-recovery-sheet" id="forgotRecoverySheet" style="display: none;">
        <div class="password-recovery-sheet-card">
          <div class="password-recovery-sheet-icon">
            <img src="${popupImage}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnForgotPopupDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `;

  on('click', '[data-testid="btnBack"]', () => {
    navigate('/login', { animate: 'slide-left-fade' });
  });

  on('submit', '#forgotPasswordForm', async (e) => {
    e.preventDefault();

    const emailInput = qs('#forgotEmail');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }

    sessionStorage.setItem('novapay_password_recovery_email', email);

    const btn = qs('[data-testid="btnForgotPasswordContinue"]');
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }

    try {
      showToast('If an account exists for this email, we will send reset instructions.', 'info');
    } finally {
      if (btn) {
        btn.textContent = 'Continue';
        btn.disabled = false;
      }
    }

    const base = qs('#forgotRecoveryBase');
    const sheet = qs('#forgotRecoverySheet');

    if (base) {
      base.classList.add('password-recovery-base');
    }
    if (sheet) {
      sheet.style.display = 'flex';
    }
  });

  on('click', '#btnForgotPopupDone', () => {
    const base = qs('#forgotRecoveryBase');
    const sheet = qs('#forgotRecoverySheet');

    if (base) {
      base.classList.remove('password-recovery-base');
    }
    if (sheet) {
      sheet.style.display = 'none';
    }

    sessionStorage.removeItem('novapay_password_recovery_email');
    navigate('/login', { animate: 'slide-left-fade' });
  });
}
