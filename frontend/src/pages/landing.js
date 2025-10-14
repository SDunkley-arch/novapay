// Landing page component
import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';

export function renderLanding() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page-center">
      <div class="logo">NovaPay</div>
      
      <div class="mb-8">
        <h1 class="text-xl mb-4">Fast. Secure. Yours.</h1>
        <p class="text-muted text-center">
          Send money, pay bills, and manage your finances with Jamaica's most trusted digital wallet.
        </p>
      </div>
      
      <div class="w-full" style="max-width: 320px;">
        <button class="btn btn-primary btn-full mb-4" data-testid="btnSignIn">
          Sign In
        </button>
        
        <button class="btn btn-secondary btn-full mb-8" data-testid="btnCreateAccount">
          Create Account
        </button>
      </div>
      
      <div class="footer">
        <p class="text-xs">
          ⚡ Powered by NovaPay Engine · 🔒 Secured by Bank-Grade Encryption
        </p>
      </div>
    </div>
  `;
  
  // Event listeners
  on(app, '[data-testid="btnSignIn"]', 'click', () => {
    navigate('/login');
  });
  
  on(app, '[data-testid="btnCreateAccount"]', 'click', () => {
    navigate('/register');
  });
}
