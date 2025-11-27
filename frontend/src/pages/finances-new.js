import { qs, on, showToast } from '../lib/dom.js';
import { navigate, goBack } from '../router.js';
import { api } from '../api.js';
import { state } from '../state.js';
import homeIcon from '../../assets/Home.png';
import statisticsIcon from '../../assets/Statistics.png';
import cardsIcon from '../../assets/Cards.png';
import settingsIcon from '../../assets/Settings.png';

export function renderFinances() {
  const app = qs('#app');

  app.innerHTML = `
    <div class="finances-container">
      <header class="finances-header">
        <button class="btn-back" id="btnBackFinances" type="button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 class="finances-title">Finances</h1>
      </header>

      <div class="finances-content">
        <section class="finances-section">
          <h2 class="finances-section-title">Savings goals</h2>
          <p class="finances-section-subtitle">Set goals, track progress, and celebrate wins.</p>
          <div class="finances-goals-grid">
            <button class="finances-goal-card" id="btnNewGoal">
              <div class="finances-goal-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <div class="finances-goal-title">Create new goal</div>
              <div class="finances-goal-desc">Set up a new savings goal with automatic contributions.</div>
            </button>
          </div>
        </section>

        <section class="finances-section">
          <h2 class="finances-section-title">Smart savings features</h2>
          <p class="finances-section-subtitle">Automatic ways to grow your money.</p>
          <div class="finances-card">
            <div class="finances-toggle-row">
              <div>
                <div class="finances-toggle-label">Round-up spare change</div>
                <div class="finances-toggle-caption">Round each card purchase to the nearest JMD $50 and save the difference.</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="toggleRoundUp" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <p class="finances-card-footnote">Change is moved into your savings balance automatically.</p>
          </div>
        </section>

        <section class="finances-section">
          <h2 class="finances-section-title">Partner / Group savings</h2>
          <p class="finances-section-subtitle">Digital version of Jamaica's traditional partner draw system.</p>
          <div class="finances-partner-grid">
            <button class="finances-partner-card" data-partner-plan="Weekly hand">
              <div class="finances-partner-title">Weekly hand</div>
              <div class="finances-partner-desc">Contribute together, rotate payouts weekly, and see every hand in one place.</div>
              <div class="finances-partner-meta">Rotating payouts • Transparent tracking</div>
            </button>
            <button class="finances-partner-card" data-partner-plan="Month-end hand">
              <div class="finances-partner-title">Month-end hand</div>
              <div class="finances-partner-desc">Perfect for rent, school fees, or big-ticket goals with trusted groups.</div>
              <div class="finances-partner-meta">Fixed contributions • Shared schedule</div>
            </button>
          </div>
        </section>

        <section class="finances-section">
          <h2 class="finances-section-title">Budgeting & money management</h2>
          <p class="finances-section-subtitle">Smart budgets, alerts, and cashflow forecasting.</p>
          <div class="finances-card">
            <div class="finances-budget-row">
              <div>
                <div class="finances-budget-label">This month's budget</div>
                <div class="finances-budget-amount">$ 150,000 planned • $ 82,500 spent</div>
              </div>
              <button class="btn-outline-sm" id="btnViewBudgets">View details</button>
            </div>
            <div class="finances-progress finances-budget-progress">
              <div class="finances-progress-bar" style="width: 55%;"></div>
            </div>
            <ul class="finances-budget-bullets">
              <li>Income and expense categorization across wallets.</li>
              <li>Alerts when categories go over their limits.</li>
              <li>Cashflow forecasts to predict low-balance periods.</li>
            </ul>
          </div>
        </section>

        <section class="finances-section">
          <h2 class="finances-section-title">Essential bills</h2>
          <p class="finances-section-subtitle">Track the bills Jamaicans pay most often.</p>
          <div class="finances-bills-grid">
            <button class="finances-bill-chip" data-bill-provider="jps" data-bill-label="JPS">
              <span class="finances-bill-name">JPS</span>
              <span class="finances-bill-note">Electricity</span>
            </button>
            <button class="finances-bill-chip" data-bill-provider="nwc" data-bill-label="NWC">
              <span class="finances-bill-name">NWC</span>
              <span class="finances-bill-note">Water</span>
            </button>
            <button class="finances-bill-chip" data-bill-provider="flow" data-bill-label="FLOW / Digicel">
              <span class="finances-bill-name">FLOW / Digicel</span>
              <span class="finances-bill-note">Phone & internet</span>
            </button>
            <button class="finances-bill-chip" data-bill-provider="loans" data-bill-label="Loans">
              <span class="finances-bill-name">Loans</span>
              <span class="finances-bill-note">Credit cards & finance companies</span>
            </button>
          </div>
        </section>

        <section class="finances-section">
          <h2 class="finances-section-title">Financial education</h2>
          <div class="finances-education-list">
            <article class="finances-education-card">
              <div class="finances-education-title">How to save for back-to-school</div>
              <div class="finances-education-text">Break uniforms, books, and fees into monthly mini-goals and use a dedicated goal or partner hand just for school expenses.</div>
            </article>
            <article class="finances-education-card">
              <div class="finances-education-title">Building credit in Jamaica</div>
              <div class="finances-education-text">Pay loans and credit cards on time, keep balances low, and avoid bouncing standing orders to build a strong local credit profile.</div>
            </article>
            <article class="finances-education-card">
              <div class="finances-education-title">Understanding NHT, NIS, and taxes</div>
              <div class="finances-education-text">See how statutory deductions work so you can plan for housing, retirement, and take-home pay with fewer surprises.</div>
            </article>
          </div>
        </section>
      </div>

      <!-- Bottom Navigation -->
      <nav class="bottom-nav">
        <button class="nav-item nav-item-savings nav-item-active" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span>Savings</span>
        </button>

        <button class="nav-item nav-item-budget" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
          </div>
          <span>Budget</span>
        </button>

        <div class="nav-item nav-item-spacer" aria-hidden="true"></div>

        <button class="nav-item nav-item-bills" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <span>Bills</span>
        </button>

        <button class="nav-item nav-item-learn" type="button">
          <div class="nav-item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <span>Learn</span>
        </button>
      </nav>
      <div class="home-indicator" aria-hidden="true"></div>
    </div>
  `;

  // Back button handler already defined below

  on('change', '#toggleRoundUp', (event) => {
    const target = event.target;
    const enabled = !!(target && target.checked);
    showToast(`Round-up savings ${enabled ? 'enabled' : 'disabled'}`, 'success');
  });

  on('click', '#btnNewGoal', () => {
    showToast('Goal creation is coming soon in this build.', 'info');
  });

  on('click', '#btnViewBudgets', () => {
    showToast('Smart budgets and cashflow forecasts are coming soon.', 'info');
  });

  on('click', '[data-partner-plan]', (event) => {
    const target = event.currentTarget || event.target;
    const name = target && target.getAttribute('data-partner-plan');
    showToast(`Partner savings plan "${name || 'Partner savings'}" is coming soon.`, 'info');
  });

  on('click', '[data-bill-provider]', (event) => {
    const target = event.currentTarget || event.target;
    const label = target && target.getAttribute('data-bill-label');
    showToast(`${label || 'Bill'} reminders and tracking are coming soon.`, 'info');
  });

  // Bottom navigation event handlers
  on('click', '.nav-item-savings', () => {
    // Already on savings page (main finances page)
    // Reload or scroll to top if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  on('click', '.nav-item-budget', () => {
    showToast('Budget section coming soon', 'info');
    // Future implementation: navigate('/finances/budget');
  });

  on('click', '.nav-item-bills', () => {
    showToast('Bills section coming soon', 'info');
    // Future implementation: navigate('/finances/bills');
  });

  on('click', '.nav-item-learn', () => {
    showToast('Financial education section coming soon', 'info');
    // Future implementation: navigate('/finances/learn');
  });
  
  // Home button in header takes user back to dashboard
  on('click', '#btnBackFinances', () => {
    navigate('/dashboard');
  });
}
