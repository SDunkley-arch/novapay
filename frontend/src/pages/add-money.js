// Add Money page component
import { qs, on, showToast } from '../lib/dom.js';
import { navigate, goBack } from '../router.js';
import { state, updateBalance, addTransaction } from '../state.js';
import { fmtCurrency } from '../utils/format.js';

export function renderAddMoney() {
  const app = qs('#app');
  
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Add Money</h1>
        <div></div>
      </div>
      
      <div class="mb-6">
        <div class="card">
          <h3 class="text-lg mb-4">Choose a method</h3>
          
          <div class="space-y-4">
            <div class="add-money-option" data-method="bank">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🏦</div>
                <div>
                  <h4 class="font-semibold">Bank Transfer</h4>
                  <p class="text-muted text-sm">Transfer from your bank account</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
            
            <div class="add-money-option" data-method="card">
              <div class="flex items-center gap-4">
                <div class="text-2xl">💳</div>
                <div>
                  <h4 class="font-semibold">Card Top-Up</h4>
                  <p class="text-muted text-sm">Add money using debit/credit card</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
            
            <div class="add-money-option" data-method="agent">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🏪</div>
                <div>
                  <h4 class="font-semibold">Cash Agent</h4>
                  <p class="text-muted text-sm">Visit a NovaPay agent location</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
            
            <div class="add-money-option" data-method="remittance">
              <div class="flex items-center gap-4">
                <div class="text-2xl">🌍</div>
                <div>
                  <h4 class="font-semibold">Remittance</h4>
                  <p class="text-muted text-sm">Receive money from abroad</p>
                </div>
              </div>
              <div class="text-muted">→</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bank Transfer Details (hidden by default) -->
      <div id="bankDetails" class="card hidden">
        <h3 class="text-lg mb-4">Bank Transfer Details</h3>
        
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-muted">Bank Name:</span>
            <span>National Commercial Bank</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-muted">Account Name:</span>
            <span>NovaPay Limited</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-muted">Account Number:</span>
            <span>123-456-789</span>
            <button class="btn-ghost text-sm" data-action="copy-account">Copy</button>
          </div>
          
          <div class="flex justify-between">
            <span class="text-muted">Reference:</span>
            <span id="walletId">NP${state.session.user.phone.replace(/\D/g, '').slice(-6)}</span>
            <button class="btn-ghost text-sm" data-action="copy-reference">Copy</button>
          </div>
        </div>
        
        <div class="mt-6">
          <button class="btn btn-secondary btn-full" data-action="share-details">
            Share Details
          </button>
        </div>
        
        <div class="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p class="text-sm text-yellow-800">
            💡 Use your wallet ID as the transfer reference so we can credit your account automatically.
          </p>
        </div>
      </div>
      
      <!-- Quick Amount Buttons -->
      <div class="card">
        <h3 class="text-lg mb-4">Quick Add</h3>
        <div class="grid grid-2 gap-4">
          <button class="btn btn-secondary" data-amount="5000">J$5,000</button>
          <button class="btn btn-secondary" data-amount="10000">J$10,000</button>
          <button class="btn btn-secondary" data-amount="20000">J$20,000</button>
          <button class="btn btn-secondary" data-amount="50000">J$50,000</button>
        </div>
      </div>
    </div>
  `;
  
  // Add styles for add-money-option
  const style = document.createElement('style');
  style.textContent = `
    .add-money-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 2px solid var(--border);
      border-radius: var(--radius);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .add-money-option:hover {
      border-color: var(--primary);
      background-color: rgba(124, 58, 237, 0.08);
    }
    
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
  `;
  document.head.appendChild(style);
  
  // Event listeners
  on(app, '.add-money-option', 'click', function () {
    const method = this.dataset.method;
    
    if (method === 'bank') {
      const bankDetails = qs('#bankDetails');
      bankDetails.classList.toggle('hidden');
    } else {
      showToast(`${method} option coming soon!`, 'info');
    }
  });
  
  on(app, '[data-action="copy-account"]', 'click', () => {
    navigator.clipboard.writeText('123-456-789');
    showToast('Account number copied!', 'success');
  });
  
  on(app, '[data-action="copy-reference"]', 'click', () => {
    const walletId = qs('#walletId').textContent;
    navigator.clipboard.writeText(walletId);
    showToast('Wallet ID copied!', 'success');
  });
  
  on(app, '[data-action="share-details"]', 'click', async () => {
    const walletId = qs('#walletId').textContent;
    const details = `NovaPay Bank Transfer Details:
Bank: National Commercial Bank
Account: NovaPay Limited
Account Number: 123-456-789
Reference: ${walletId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NovaPay Bank Details',
          text: details
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(details);
      showToast('Bank details copied to clipboard!', 'success');
    }
  });
  
  on(app, '[data-amount]', 'click', function () {
    const amount = parseInt(this.dataset.amount);
    
    // Simulate adding money
    this.textContent = 'Adding...';
    this.disabled = true;
    
    setTimeout(() => {
      updateBalance('JMD', amount);
      addTransaction({
        title: 'Bank Transfer',
        amount: amount,
        currency: 'JMD',
        type: 'TOP_UP'
      });
      
      showToast(`Added ${fmtCurrency(amount, 'JMD')} to your account!`, 'success');
      navigate('/dashboard');
    }, 1500);
  });
}
