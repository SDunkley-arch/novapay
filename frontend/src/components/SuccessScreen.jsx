import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';

export function renderRemittanceSuccessScreen() {
  const app = qs('#app');
  if (!app) return;

  const raw = sessionStorage.getItem('novapay_last_remittance_result');
  const data = raw ? JSON.parse(raw) : null;

  const ref = data?.referenceId ? String(data.referenceId) : null;

  app.innerHTML = `
    <div class="container page page-center">
      <div class="card text-center">
        <div class="text-6xl mb-4">✅</div>
        <h2 class="text-xl font-semibold mb-2">Transfer Submitted</h2>
        <p class="text-muted mb-4">Your remittance request has been successfully submitted.</p>
        ${ref ? `
          <div class="p-4 bg-accent-light rounded-lg mb-4">
            <p class="text-sm text-blue-800 mb-1">Reference ID</p>
            <p class="font-mono text-base">${ref}</p>
          </div>
        ` : ''}
        <button class="btn btn-primary btn-full" id="btnRemitSuccessBack">Back to Remittance</button>
      </div>
    </div>
  `;

  on('click', '#btnRemitSuccessBack', () => {
    navigate('/remittance', { animate: 'slide-left-fade' });
  });
}
