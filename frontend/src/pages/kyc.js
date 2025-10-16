// KYC (Know Your Customer) page component
import { qs, on, showToast } from '../lib/dom.js';
import { api } from '../api.js';
import { navigate, goBack } from '../router.js';
import { state } from '../state.js';

export function renderKYC() {
  const app = qs('#app');
  
  const currentTier = state?.session?.kycTier || 'TIER_1';
  
  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Verification</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <!-- Current Status -->
      <div class="kyc-status-card">
        <div class="kyc-status-badge ${getTierClass(currentTier)}">
          ${getTierIcon(currentTier)}
          <span>${getTierLabel(currentTier)}</span>
        </div>
        <h2 class="kyc-status-title">Your Verification Status</h2>
        <p class="kyc-status-desc">${getTierDescription(currentTier)}</p>
      </div>

      <!-- Verification Tiers -->
      <div class="kyc-tiers">
        <h3 class="section-title-sm">Verification Levels</h3>
        
        <!-- Tier 1 -->
        <div class="kyc-tier-card ${currentTier === 'TIER_1' ? 'active' : currentTier === 'TIER_2' || currentTier === 'TIER_3' ? 'completed' : ''}">
          <div class="kyc-tier-header">
            <div class="kyc-tier-icon tier-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="kyc-tier-info">
              <h4 class="kyc-tier-title">Basic Verification</h4>
              <p class="kyc-tier-limit">Up to $1,000/month</p>
            </div>
            ${currentTier === 'TIER_1' || currentTier === 'TIER_2' || currentTier === 'TIER_3' ? 
              '<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : 
              '<button class="kyc-tier-btn" data-tier="1">Start</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Email verification</li>
            <li>Phone number</li>
            <li>Basic profile information</li>
          </ul>
        </div>

        <!-- Tier 2 -->
        <div class="kyc-tier-card ${currentTier === 'TIER_2' ? 'active' : currentTier === 'TIER_3' ? 'completed' : ''}">
          <div class="kyc-tier-header">
            <div class="kyc-tier-icon tier-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div class="kyc-tier-info">
              <h4 class="kyc-tier-title">Standard Verification</h4>
              <p class="kyc-tier-limit">Up to $10,000/month</p>
            </div>
            ${currentTier === 'TIER_2' || currentTier === 'TIER_3' ? 
              '<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : 
              '<button class="kyc-tier-btn" data-tier="2">Upgrade</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Government-issued ID</li>
            <li>Proof of address</li>
            <li>Selfie verification</li>
          </ul>
        </div>

        <!-- Tier 3 -->
        <div class="kyc-tier-card ${currentTier === 'TIER_3' ? 'active' : ''}">
          <div class="kyc-tier-header">
            <div class="kyc-tier-icon tier-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div class="kyc-tier-info">
              <h4 class="kyc-tier-title">Premium Verification</h4>
              <p class="kyc-tier-limit">Unlimited transactions</p>
            </div>
            ${currentTier === 'TIER_3' ? 
              '<div class="kyc-check-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : 
              '<button class="kyc-tier-btn" data-tier="3">Upgrade</button>'}
          </div>
          <ul class="kyc-requirements">
            <li>Enhanced due diligence</li>
            <li>Source of funds verification</li>
            <li>Video call interview</li>
          </ul>
        </div>
      </div>

      <!-- Benefits -->
      <div class="kyc-benefits">
        <h3 class="section-title-sm">Why Verify?</h3>
        <div class="benefit-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h4 class="benefit-title">Enhanced Security</h4>
            <p class="benefit-desc">Protect your account with verified identity</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h4 class="benefit-title">Higher Limits</h4>
            <p class="benefit-desc">Increase your transaction limits</p>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
              </svg>
            </div>
            <h4 class="benefit-title">Premium Features</h4>
            <p class="benefit-desc">Access exclusive features and benefits</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  on('click', '#btnBack', () => goBack());
  
  document.querySelectorAll('[data-tier]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tier = e.target.dataset.tier;
      startVerification(tier);
    });
  });
}

function getTierClass(tier) {
  const classes = {
    'TIER_1': 'tier-basic',
    'TIER_2': 'tier-standard',
    'TIER_3': 'tier-premium'
  };
  return classes[tier] || 'tier-basic';
}

function getTierIcon(tier) {
  const icons = {
    'TIER_1': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    'TIER_2': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    'TIER_3': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>'
  };
  return icons[tier] || icons['TIER_1'];
}

function getTierLabel(tier) {
  const labels = {
    'TIER_1': 'Basic',
    'TIER_2': 'Standard',
    'TIER_3': 'Premium'
  };
  return labels[tier] || 'Basic';
}

function getTierDescription(tier) {
  const descriptions = {
    'TIER_1': 'You have basic verification. Upgrade to unlock higher limits and premium features.',
    'TIER_2': 'You have standard verification. Upgrade to premium for unlimited transactions.',
    'TIER_3': 'You have premium verification. Enjoy unlimited transactions and all features.'
  };
  return descriptions[tier] || 'Complete verification to unlock all features.';
}

function startVerification(tier) {
  showToast(`Starting Tier ${tier} verification process...`, 'info');
  // In a real app, this would navigate to a verification flow
  setTimeout(() => {
    showToast('Verification process will be available soon', 'info');
  }, 1000);
}
