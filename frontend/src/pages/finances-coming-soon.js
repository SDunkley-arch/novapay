import { qs, on } from '../lib/dom.js';
import { goBack } from '../router.js';

export function renderFinances() {
  const app = qs('#app');

  app.innerHTML = `
    <div class="page-container">
      <header class="page-header-modern">
        <button class="back-button-modern" type="button" id="btnBackFinances">
          <span class="back-icon">←</span>
        </button>
        <div class="page-header-title">
          <h1>Finances</h1>
          <p>Coming Soon</p>
        </div>
      </header>

      <main class="page-body-modern">
        <div class="empty-state-centered">
          <h2>Finances</h2>
          <p>This feature is coming soon.</p>
        </div>
      </main>
    </div>
  `;

  on('click', '#btnBackFinances', () => {
    goBack();
  });
}
