import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';

export function renderRemittanceErrorScreen() {
  const app = qs('#app');
  if (!app) return;

  const raw = sessionStorage.getItem('novapay_last_remittance_error');
  const data = raw ? JSON.parse(raw) : null;

  const message = data?.message || 'Something went wrong while submitting your remittance.';

  app.innerHTML = `
    <div class="container page page-center">
      <div class="card text-center">
        <div class="text-6xl mb-4">❌</div>
        <h2 class="text-xl font-semibold mb-2">Transfer Failed</h2>
        <p class="text-error mb-4">${message}</p>
        <button class="btn btn-primary btn-full" id="btnRemitErrorRetry">Try Again</button>
      </div>
    </div>
  `;

  on('click', '#btnRemitErrorRetry', () => {
    const provider = data?.provider;
    if (provider === 'western-union') {
      navigate('/remittance/western-union', { animate: 'slide-left-fade' });
    } else if (provider === 'moneygram') {
      navigate('/remittance/moneygram', { animate: 'slide-left-fade' });
    } else {
      navigate('/remittance', { animate: 'slide-left-fade' });
    }
  });
}
