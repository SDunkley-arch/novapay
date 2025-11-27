// Register page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, save } from '../state.js';
import { api, setToken } from '../api.js';

export function renderRegister() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="auth-container">
      <!-- Header -->
      <div class="auth-header">
        <button class="icon-btn" data-testid="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="auth-content">
        <!-- Logo & Title -->
        <div class="auth-brand">
          <div class="auth-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="url(#gradient)"/>
              <path d="M24 14v20M14 24h20" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stop-color="#543AF8"/>
                  <stop offset="100%" stop-color="#9333EA"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join NovaPay and start managing your money</p>
        </div>

        <!-- Form -->
        <form id="registerForm" class="auth-form">
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
                placeholder="John"
                required
              >
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
                placeholder="Doe"
                required
              >
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
                placeholder="your@email.com"
                required
              >
            </div>
          </div>
          
          <div class="form-field">
            <label class="form-label" for="phone">Phone Number</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input 
                type="tel" 
                id="phone" 
                class="form-input-modern" 
                placeholder="876-555-0123"
                required
              >
            </div>
          </div>
          
          <div class="form-field">
            <label class="form-label" for="password">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input 
                type="password" 
                id="password" 
                class="form-input-modern" 
                placeholder="Create a strong password"
                required
              >
            </div>
            <p class="form-hint">At least 6 characters</p>
          </div>

          <label class="checkbox-wrapper terms-checkbox">
            <input type="checkbox" id="agreeTerms" required>
            <span class="checkbox-icon"></span>
            <span class="checkbox-label">I agree to the <a href="#" class="link-text">Terms & Conditions</a></span>
          </label>
          
          <button type="submit" class="btn-primary-modern" data-testid="btnRegister">
            Create Account
          </button>
        </form>
        
        <!-- Footer -->
        <div class="auth-footer">
          <p class="auth-footer-text">
            Already have an account? 
            <a href="#/login" class="link-primary">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners
  on('click', '[data-testid="btnBack"]', () => {
    navigate('/landing');
  });
  
  on('submit', '#registerForm', async (e) => {
    e.preventDefault();
    
    const firstName = qs('#firstName').value.trim();
    const lastName = qs('#lastName').value.trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const email = qs('#email').value.trim();
    const phone = qs('#phone').value.trim();
    const password = qs('#password').value;
    const agreeTerms = !!qs('#agreeTerms') && qs('#agreeTerms').checked;
    
    if (!firstName || !lastName || !email || !phone || !password || !agreeTerms) {
      showToast('Please fill in all fields and agree to the Terms & Conditions', 'error');
      return;
    }
    
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    const registerBtn = qs('[data-testid="btnRegister"]');
    registerBtn.textContent = 'Creating Account...';
    registerBtn.disabled = true;
    
    // Check network connectivity before attempting registration
    if (!navigator.onLine) {
      showToast('No internet connection. Please check your network settings.', 'error');
      registerBtn.textContent = 'Create Account';
      registerBtn.disabled = false;
      return;
    }

    try {
      // Call backend registration endpoint
      const out = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
          name: fullName,
          email, 
          phone, 
          password 
        })
      });
      
      // Persist token for subsequent requests
      setToken(out.token);
      
      // Store session from API response
      state.session = {
        user: { 
          email: out.user.email, 
          id: out.user.id,
          name: out.user.name || fullName,
          phone: out.user.phone || phone
        },
        kycTier: 'TIER_1'
      };
      
      save();
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      // Enhanced error extraction and user-friendly messages
      const code = err?.error?.code || err?.message || 'REGISTER_FAILED';
      let msg = 'Unable to create account. Please try again.';
      
      // Handle specific error codes
      if (code === 'EXISTS') {
        msg = 'An account with this email already exists';
      } else if (code === 'BAD_INPUT') {
        msg = 'Please check your information and try again';
      } else if (code === 'INVALID_EMAIL') {
        msg = 'Please enter a valid email address';
      } else if (code === 'WEAK_PASSWORD') {
        msg = 'Password is too weak';
      } else if (code === 'NETWORK_ERROR') {
        msg = 'Network connection issue. Please check your internet connection.';
      } else if (code === 'TypeError' || err.name === 'TypeError') {
        msg = 'Network connection issue. Please check your internet connection.';
      }
      
      // Log detailed error information
      console.error('Registration Error:', {
        code,
        message: err.message,
        stack: err.stack,
        error: err
      });
      
      showToast(msg, 'error');
    } finally {
      registerBtn.textContent = 'Create Account';
      registerBtn.disabled = false;
    }
  });
  
  // Format phone number as user types
  on('input', '#phone', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 3) {
      value = value.replace(/(\d{3})(\d{0,3})(\d{0,4})/, (match, p1, p2, p3) => {
        let formatted = p1;
        if (p2) formatted += '-' + p2;
        if (p3) formatted += '-' + p3;
        return formatted;
      });
    }
    
    e.target.value = value;
  });
}
