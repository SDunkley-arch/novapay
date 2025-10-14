// Login page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, save } from '../state.js';
import { api, setToken } from '../api.js';


export function renderLogin() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-testid="btnBack">←</button>
        <h1 class="page-title">Sign In</h1>
        <div></div>
      </div>
      
      <div class="card-lg">
        <form id="loginForm">
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              class="form-input" 
              placeholder="Enter your email"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              class="form-input" 
              placeholder="Enter your password"
              required
            >
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" data-testid="btnLogin">
            Sign In
          </button>
        </form>
        
        <div class="text-center mt-6">
          <p class="text-muted text-sm">
            Don't have an account? 
            <a href="#/register" class="text-accent">Create one</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners
  // Header back (history-aware)
  on(app, '[data-testid="btnBack"]', 'click', () => {
    if (history.length > 1) {
      history.back();
    } else {
      navigate('/dashboard');
    }
  });
  on(app, '#loginForm', 'submit', async (e) => {
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
      // Show server error codes if present
      const code = err?.error?.code || 'LOGIN_FAILED';
      const msg =
        code === 'BAD_CRED' ? 'Invalid email or password'
        : code === 'NO_USER' ? 'Account not found'
        : 'Unable to sign in';
      showToast(msg, 'error');
    } finally {
      btn.textContent = 'Sign In';
      btn.disabled = false;
    }
  });
  
  
 }
