// Login page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, save } from '../state.js';
import { api, setToken } from '../api.js';


export function renderLogin() {
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
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue to NovaPay</p>
        </div>

        <!-- Form -->
        <form id="loginForm" class="auth-form">
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
                placeholder="Enter your password"
                required
              >
            </div>
          </div>

          <div class="form-footer">
            <label class="checkbox-wrapper">
              <input type="checkbox" id="rememberMe">
              <span class="checkbox-label">Remember me</span>
            </label>
            <a href="#" class="link-text" id="forgotPassword">Forgot password?</a>
          </div>
          
          <button type="submit" class="btn-primary-modern" data-testid="btnLogin">
            Sign In
          </button>
        </form>
        
        <!-- Footer -->
        <div class="auth-footer">
          <p class="auth-footer-text">
            Don't have an account? 
            <a href="#/register" class="link-primary">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners
  on('click', '[data-testid="btnBack"]', () => {
    navigate('/landing');
  });
  
  on('click', '#forgotPassword', (e) => {
    e.preventDefault();
    showToast('Password reset coming soon', 'info');
  });
  on('submit', '#loginForm', async (e) => {
    e.preventDefault();
  
    const email = qs('#email').value.trim();
    const password = qs('#password').value;
  
    if (!email) { showToast('Please enter your email address', 'error'); return; }
    if (!password) { showToast('Please enter your password', 'error'); return; }
  
    const btn = qs('[data-testid="btnLogin"]');
    btn.textContent = 'Signing In...';
    btn.disabled = true;
  
    try {
      // Call backend
      const out = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
  
      // Persist token for subsequent requests
      setToken(out.token);
  
      // Store a minimal session from API response
      state.session = {
        user: { email: out.user.email, id: out.user.id },
        kycTier: 'TIER_1'
      };
      save();
  
      showToast('Welcome back!', 'success');
      navigate('/dashboard');
    } catch (err) {
      // Enhanced error extraction and user-friendly messages
      const code = err?.error?.code || err?.message || 'LOGIN_FAILED';
      const msg =
        code === 'BAD_CRED' ? 'Invalid email or password'
        : code === 'NO_USER' ? 'Account not found'
        : code === 'NO_AUTH' ? 'Session expired, please log in again'
        : 'Unable to sign in';
      
      console.error('Login Error:', err);
      showToast(msg, 'error');
    } finally {
      btn.textContent = 'Sign In';
      btn.disabled = false;
    }
  });
  
  
 }
