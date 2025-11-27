// Bill payment confirmation page: /more/billers/:id/confirm
import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { canAfford, updateBalance, addTransaction, addBiller } from '../state.js';

function fmtCurrency(amountCents, currency = 'JMD') {
  const value = (Number(amountCents || 0) / 100).toFixed(2);
  return `${currency} $${value}`;
}

export function renderBillerConfirmPage() {
  const app = qs('#app');
  if (!app) return;

  const raw = sessionStorage.getItem('novapay_biller_draft');
  if (!raw) {
    app.innerHTML = `
      <div class="container page">
        <div class="page-header">
          <button class="back-btn" data-action="nav-back">←</button>
          <h1 class="page-title">Confirm Payment</h1>
          <div></div>
        </div>
        <div class="card">
          <p>No bill payment in progress.</p>
        </div>
      </div>
    `;
    on('click', '[data-action="nav-back"]', () => navigate('/more/billers'));
    return;
  }

  const draft = JSON.parse(raw);

  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Confirm Payment</h1>
        <div></div>
      </div>

      <div class="card">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-3xl">${draft.icon}</div>
          <div>
            <h3 class="text-lg font-semibold">${draft.billerName}</h3>
            <p class="text-muted">${draft.category}</p>
          </div>
        </div>

        <div class="mb-4">
          <div class="flex justify-between mb-2">
            <span class="text-muted">Account</span>
            <span>${draft.account}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-muted">Amount</span>
            <span>${fmtCurrency(draft.amount)}</span>
          </div>
        </div>

        <div class="alert alert-info mb-4">
          <p class="text-sm">Please confirm the details before submitting your payment.</p>
        </div>

        <div class="flex gap-4 mt-4">
          <button class="btn btn-secondary flex-1" data-action="edit-bill">
            Back
          </button>
          <button class="btn btn-primary flex-1" data-action="confirm-bill" data-testid="btnConfirmBill">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  `;

  on('click', '[data-action="nav-back"]', () => navigate(`/more/billers/${draft.billerId}`));
  on('click', '[data-action="edit-bill"]', () => navigate(`/more/billers/${draft.billerId}`));

  on('click', '[data-action="confirm-bill"]', () => {
    if (!canAfford(draft.amount)) {
      showToast('Insufficient balance. Please add money first.');
      return;
    }

    const btn = qs('[data-testid="btnConfirmBill"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Processing...';
    }

    setTimeout(() => {
      updateBalance('JMD', -draft.amount);

      addTransaction({
        title: `${draft.billerName} Bill`,
        amount: -draft.amount,
        currency: 'JMD',
        type: 'BILL',
      });

      addBiller({
        name: draft.billerName,
        icon: draft.icon,
        category: draft.category,
        account: draft.account,
      });

      sessionStorage.setItem('novapay_last_biller_tx', JSON.stringify(draft));
      sessionStorage.removeItem('novapay_biller_draft');

      navigate(`/more/billers/${draft.billerId}/success`);
    }, 1200);
  });
}
