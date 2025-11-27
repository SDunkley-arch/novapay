import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';
import popupImage from '../../assets/Popup.png';

export function renderCheckEmail() {
  const app = qs('#app');
  if (!app) return;

  const stored = sessionStorage.getItem('novapay_password_recovery_email') || '';
  const email = stored || 'your email';
  const safeEmail = escapeHtml(email);

  app.innerHTML = `
    <div class="password-recovery-wrapper">
      <div class="auth-container password-recovery-base">
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
                <rect width="48" height="48" rx="12" fill="url(#gradient-check-email)"/>
                <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="gradient-check-email" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stop-color="#543AF8"/>
                    <stop offset="100%" stop-color="#9333EA"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 class="auth-title">Password Recovery</h1>
            <p class="auth-subtitle">Hello There. You forget your password?</p>
          </div>

          <div class="form-field">
            <label class="form-label" for="confirmEmail">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="confirmEmail"
                class="form-input-modern"
                value="${safeEmail}"
                disabled
              >
            </div>
          </div>
        </div>
      </div>

      <div class="password-recovery-sheet">
        <div class="password-recovery-sheet-card">
          <div class="password-recovery-sheet-icon">
            <img src="${popupImage}" alt="Check your email" class="password-recovery-popup-img" />
          </div>
          <button class="btn-primary-modern" id="btnCheckEmailDone">
            Done
          </button>
        </div>
      </div>
    </div>
  `;

  on('click', '[data-testid="btnBack"]', () => {
    navigate('/forgot-password', { animate: 'slide-left-fade' });
  });

  on('click', '#btnCheckEmailDone', () => {
    sessionStorage.removeItem('novapay_password_recovery_email');
    navigate('/login', { animate: 'slide-left-fade' });
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => {
    if (ch === '&') return '&amp;';
    if (ch === '<') return '&lt;';
    if (ch === '>') return '&gt;';
    if (ch === '"') return '&quot;';
    return '&#39;';
  });
}
