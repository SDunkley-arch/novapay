// Settings page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate, goBack } from '../router.js';
import { state, clearSession } from '../state.js';

export function renderSettings() {
  const app = qs('#app');
  
  const user = state?.session?.user || {};
  const name = user.name || user.email?.split('@')[0] || 'User';
  const email = user.email || '';
  const initials = name.substring(0, 2).toUpperCase();
  const rawFirstName = name.split(' ')[0] || name;
  const greeting = `Hi, ${rawFirstName}!`;
  
  const existingAvatar = (() => {
    try {
      return localStorage.getItem('novapay_profile_picture');
    } catch {
      return null;
    }
  })();

  const avatarHtml = existingAvatar
    ? '<img src="' + existingAvatar + '" alt="' + name + '" class="settings-avatar-img" />'
    : initials;

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Settings</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <!-- Profile Section -->
      <div class="settings-profile">
        <div class="settings-avatar">${avatarHtml}</div>
        <h2 class="settings-name">${escapeHtml(greeting)}</h2>
        <p class="settings-email">${escapeHtml(email)}</p>
      </div>

      <!-- Settings Groups -->
      <div class="settings-content">
        <!-- Account Settings -->
        <div class="settings-group">
          <h3 class="settings-group-title">Account</h3>
          <div class="settings-list">
            <button class="settings-item" id="btnProfile">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Personal Information</div>
                <div class="settings-item-desc">Update your details</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnKYC">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Verification</div>
                <div class="settings-item-desc">Verify your identity</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnSecurity">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Security</div>
                <div class="settings-item-desc">Password and 2FA</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div class="settings-group">
          <h3 class="settings-group-title">Preferences</h3>
          <div class="settings-list">
            <div class="settings-item">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Notifications</div>
                <div class="settings-item-desc">Manage alerts</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="toggleNotifications" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="settings-item">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Dark Mode</div>
                <div class="settings-item-desc">Coming soon</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="toggleDarkMode" disabled>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <button class="settings-item" id="btnLanguage">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Language</div>
                <div class="settings-item-desc">English (US)</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Support -->
        <div class="settings-group">
          <h3 class="settings-group-title">Support</h3>
          <div class="settings-list">
            <button class="settings-item" id="btnHelp">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Help Center</div>
                <div class="settings-item-desc">FAQs and support</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnTerms">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Terms & Privacy</div>
                <div class="settings-item-desc">Legal information</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button class="settings-item" id="btnAbout">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">About NovaPay</div>
                <div class="settings-item-desc">Version 1.0.0</div>
              </div>
              <svg class="settings-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-group">
          <div class="settings-list">
            <button class="settings-item danger" id="btnLogout">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Log Out</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  const root = document.querySelector('#app');

  // Navigation & actions
  on(root, '#btnBack', 'click', () => goBack());
  on(root, '#btnProfile', 'click', () => navigate('/personal-info'));
  on(root, '#btnKYC', 'click', () => navigate('/kyc'));
  on(root, '#btnSecurity', 'click', () => showToast('Security settings coming soon', 'info'));
  on(root, '#btnLanguage', 'click', () => showToast('Language settings coming soon', 'info'));
  on(root, '#btnHelp', 'click', () => showToast('Help center coming soon', 'info'));
  on(root, '#btnTerms', 'click', () => showToast('Terms & Privacy coming soon', 'info'));
  on(root, '#btnAbout', 'click', () => showToast('NovaPay v1.0.0 - Modern Digital Wallet', 'info'));

  // Logout
  on(root, '#btnLogout', 'click', () => {
    if (confirm('Are you sure you want to log out?')) {
      clearSession();
      showToast('Logged out successfully', 'success');
      navigate('/login');
    }
  });

  // Toggle switches
  on(root, '#toggleNotifications', 'change', (e) => {
    const enabled = e.target.checked;
    showToast(`Notifications ${enabled ? 'enabled' : 'disabled'}`, 'success');
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}