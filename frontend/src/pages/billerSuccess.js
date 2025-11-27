// Biller payment success page: /more/billers/:id/success
import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';

function fmtCurrency(amountCents, currency = 'JMD') {
  const value = (Number(amountCents || 0) / 100).toFixed(2);
  return `${currency} $${value}`;
}

export function renderBillerSuccessPage() {
  const app = qs('#app');
  if (!app) return;

  const raw = sessionStorage.getItem('novapay_last_biller_tx');
  const draft = raw ? JSON.parse(raw) : null;

  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Payment Success</h1>
        <div></div>
      </div>

      <div class="card text-center">
        <div class="success-icon mb-4">✅</div>
        <h2 class="text-xl font-semibold mb-2">Bill Paid Successfully</h2>
        <p class="text-muted mb-4">
          ${draft ? `Your payment to ${draft.billerName} was completed.` : 'Your bill payment was completed.'}
        </p>

        ${draft ? `
          <div class="mb-4 text-left">
            <div class="flex justify-between mb-1">
              <span class="text-muted">Biller</span>
              <span>${draft.billerName}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-muted">Account</span>
              <span>${draft.account}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-muted">Amount</span>
              <span>${fmtCurrency(draft.amount)}</span>
            </div>
          </div>
        ` : ''}

        <div class="flex flex-col gap-3 mt-4">
          <button class="btn btn-primary" data-action="go-dashboard">Back to Dashboard</button>
          <button class="btn btn-secondary" data-action="pay-another">Pay Another Bill</button>
        </div>
      </div>
    </div>
  `;

  on('click', '[data-action="nav-back"]', () => navigate('/dashboard'));
  on('click', '[data-action="go-dashboard"]', () => navigate('/dashboard'));
  on('click', '[data-action="pay-another"]', () => navigate('/more/billers'));
}
