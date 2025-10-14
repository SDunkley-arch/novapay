// Register page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state, save } from '../state.js';

export function renderRegister() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-testid="btnBack">←</button>
        <h1 class="page-title">Create Account</h1>
        <div></div>
      </div>
      
      <div class="card-lg">
        <form id="registerForm">
          <div class="form-group">
            <label class="form-label" for="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              class="form-input" 
              placeholder="Enter your full name"
              required
            >
          </div>
          
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
            <label class="form-label" for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              class="form-input" 
              placeholder="876-555-0123"
              required
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              class="form-input" 
              placeholder="Create a strong password"
              required
            >
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" data-testid="btnRegister">
            Create Account
          </button>
        </form>
        
        <div class="text-center mt-6">
          <p class="text-muted text-sm">
            Already have an account? 
            <a href="#/login" class="text-accent">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Event listeners
  on(app, '[data-testid="btnBack"]', 'click', () => {
    navigate('/landing');
  });
  
  on(app, '#registerForm', 'submit', (e) => {
    e.preventDefault();
    
    const fullName = qs('#fullName').value.trim();
    const email = qs('#email').value.trim();
    const phone = qs('#phone').value.trim();
    const password = qs('#password').value;
    
    if (!fullName || !email || !phone || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    
    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }
    
    // Simulate registration
    const registerBtn = qs('[data-testid="btnRegister"]');
    registerBtn.textContent = 'Creating Account...';
    registerBtn.disabled = true;
    
    setTimeout(() => {
      // Set session
      state.session = {
        user: {
          name: fullName,
          email: email,
          phone: phone
        },
        kycTier: 'TIER_1'
      };
      
      save();
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    }, 1500);
  });
  
  // Format phone number as user types
  on(app, '#phone', 'input', (e) => {
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
