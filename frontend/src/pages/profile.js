// Profile page component
import { qs, on, showToast } from '../lib/dom.js';
import { safeBack } from '../lib/nav.js';
import { navigate } from '../router.js';
import { state, logout } from '../state.js';

export function renderProfile() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Profile</h1>
        <div></div>
      </div>
      
      <!-- User Info -->
      <div class="card mb-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="text-4xl">👤</div>
          <div>
            <h3 class="text-lg font-semibold">${state.session.user.name}</h3>
            <p class="text-muted">${state.session.user.email}</p>
            <p class="text-muted text-sm">${state.session.user.phone}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${
            state.session.kycTier === 'TIER_2' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }">
            ${state.session.kycTier === 'TIER_2' ? 'Verified' : 'Basic Account'}
          </span>
        </div>
      </div>
      
      <!-- KYC Section -->
      ${state.session.kycTier !== 'TIER_2' ? `
        <div class="card mb-6">
          <h3 class="text-lg mb-4">Complete Your Verification</h3>
          <p class="text-muted mb-4">
            Unlock higher limits and more features by completing your identity verification.
          </p>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center gap-3">
              <div class="text-success">✅</div>
              <span class="text-sm">Phone number verified</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-success">✅</div>
              <span class="text-sm">Email address verified</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-muted">⏳</div>
              <span class="text-sm text-muted">Government ID verification</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-muted">⏳</div>
              <span class="text-sm text-muted">Address verification</span>
            </div>
          </div>
          
          <button class="btn btn-primary btn-full" id="completeKyc">
            Complete Verification
          </button>
        </div>
      ` : ''}
      
      <!-- Account Settings -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Account Settings</h3>
        
        <div class="space-y-4">
          <button class="profile-action" id="enableBiometric">
            <div class="flex items-center gap-4">
              <div class="text-2xl">👆</div>
              <div>
                <h4 class="font-semibold">Enable Biometric</h4>
                <p class="text-muted text-sm">Use fingerprint or face unlock</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="changePin">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔢</div>
              <div>
                <h4 class="font-semibold">Change PIN</h4>
                <p class="text-muted text-sm">Update your transaction PIN</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="notifications">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔔</div>
              <div>
                <h4 class="font-semibold">Notifications</h4>
                <p class="text-muted text-sm">Manage your notification preferences</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="privacy">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🔒</div>
              <div>
                <h4 class="font-semibold">Privacy & Security</h4>
                <p class="text-muted text-sm">Manage your privacy settings</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Support -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Support</h3>
        
        <div class="space-y-4">
          <button class="profile-action" id="helpCenter">
            <div class="flex items-center gap-4">
              <div class="text-2xl">❓</div>
              <div>
                <h4 class="font-semibold">Help Center</h4>
                <p class="text-muted text-sm">Get answers to common questions</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="contactSupport">
            <div class="flex items-center gap-4">
              <div class="text-2xl">💬</div>
              <div>
                <h4 class="font-semibold">Contact Support</h4>
                <p class="text-muted text-sm">Chat with our support team</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="feedback">
            <div class="flex items-center gap-4">
              <div class="text-2xl">📝</div>
              <div>
                <h4 class="font-semibold">Send Feedback</h4>
                <p class="text-muted text-sm">Help us improve NovaPay</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Legal -->
      <div class="card mb-6">
        <h3 class="text-lg mb-4">Legal</h3>
        
        <div class="space-y-4">
          <button class="profile-action" id="terms">
            <div class="flex items-center gap-4">
              <div class="text-2xl">📄</div>
              <div>
                <h4 class="font-semibold">Terms of Service</h4>
                <p class="text-muted text-sm">Read our terms and conditions</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
          
          <button class="profile-action" id="privacy-policy">
            <div class="flex items-center gap-4">
              <div class="text-2xl">🛡️</div>
              <div>
                <h4 class="font-semibold">Privacy Policy</h4>
                <p class="text-muted text-sm">How we protect your data</p>
              </div>
            </div>
            <div class="text-muted">→</div>
          </button>
        </div>
      </div>
      
      <!-- Logout -->
      <div class="card">
        <button class="btn btn-secondary btn-full" data-testid="btnLogout">
          🚪 Sign Out
        </button>
        
        <div class="text-center mt-4">
          <p class="text-xs text-muted">
            NovaPay v1.0.0 • Made with ❤️ in Jamaica
          </p>
        </div>
      </div>
    </div>
  `;
  
  setupProfileListeners();
}

function setupProfileListeners() {
  const app = qs('#app');
  
  // Header back
  on(app, '[data-action="nav-back"]', 'click', () => safeBack('/dashboard'));
  
  // Complete KYC
  on(app, '#completeKyc', 'click', () => {
    showToast('KYC verification process coming soon!', 'info');
  });
  
  // Enable Biometric
  on(app, '#enableBiometric', 'click', () => {
    showToast('Biometric authentication coming soon!', 'info');
  });
  
  // Change PIN
  on(app, '#changePin', 'click', () => {
    showToast('Change PIN feature coming soon!', 'info');
  });
  
  // Notifications
  on(app, '#notifications', 'click', () => {
    showToast('Notification settings coming soon!', 'info');
  });
  
  // Privacy & Security
  on(app, '#privacy', 'click', () => {
    showToast('Privacy settings coming soon!', 'info');
  });
  
  // Help Center
  on(app, '#helpCenter', 'click', () => {
    showToast('Help Center coming soon!', 'info');
  });
  
  // Contact Support
  on(app, '#contactSupport', 'click', () => {
    showToast('Support chat coming soon!', 'info');
  });
  
  // Send Feedback
  on(app, '#feedback', 'click', () => {
    showToast('Feedback form coming soon!', 'info');
  });
  
  // Terms of Service
  on(app, '#terms', 'click', () => {
    showToast('Terms of Service coming soon!', 'info');
  });
  
  // Privacy Policy
  on(app, '#privacy-policy', 'click', () => {
    showToast('Privacy Policy coming soon!', 'info');
  });
  
  // Logout
  on(app, '[data-testid="btnLogout"]', 'click', () => {
    if (confirm('Are you sure you want to sign out?')) {
      logout();
      showToast('Signed out successfully', 'success');
      navigate('/landing');
    }
  });
}

// Add styles for profile actions
const style = document.createElement('style');
style.textContent = `
  .profile-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: transparent;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    color: var(--text);
  }
  
  .profile-action:hover {
    border-color: var(--accent);
    background-color: rgba(79, 209, 197, 0.05);
  }
  
  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }
  
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  
  .bg-green-100 {
    background-color: rgba(16, 185, 129, 0.1);
  }
  
  .text-green-800 {
    color: #065f46;
  }
  
  .bg-yellow-100 {
    background-color: rgba(245, 158, 11, 0.1);
  }
  
  .text-yellow-800 {
    color: #92400e;
  }
`;
document.head.appendChild(style);
