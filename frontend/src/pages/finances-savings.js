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
  
  // Calculate savings percentage (20,000 / 100,000 = 20%)
  const totalSavings = 20000;
  const targetSavings = 100000;
  const savingsPercentage = Math.round((totalSavings / targetSavings) * 100);
  const progressWidth = `${savingsPercentage}%`;
  
  // Number of goals (for now hardcoded to 2)
  const numGoals = 2;

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
        <!-- My Savings Header Section -->
        <div class="savings-header">
          <h2 class="my-savings-title">My Savings</h2>
          <button class="new-goal-btn" id="btnNewGoal">New Goal</button>
        </div>

        <!-- Savings Goal Bar -->
        <div class="savings-goal-bar">
          <div class="savings-goal-info">
            <div class="savings-amount-container">
              <div class="savings-label">Total Savings</div>
              <div class="savings-amount">$${(totalSavings).toLocaleString()}</div>
            </div>
            <div class="savings-amount-container text-right">
              <div class="savings-label">Target Savings</div>
              <div class="savings-amount">$${(targetSavings).toLocaleString()}</div>
            </div>
          </div>
          <div class="savings-progress-container">
            <div class="savings-progress-bar" style="width: ${progressWidth}"></div>
            <div class="savings-progress-marker"></div>
          </div>
        </div>

        <!-- Savings Stats -->
        <div class="savings-stats">
          <div class="savings-stat-item">
            <div class="savings-stat-icon savings-rate-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <div class="savings-stat-value">${savingsPercentage}%</div>
            <div class="savings-stat-label">Saving Rate</div>
          </div>
          <div class="savings-stat-item">
            <div class="savings-stat-icon goals-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="savings-stat-value">${numGoals}</div>
            <div class="savings-stat-label">Goals</div>
          </div>
        </div>

        <!-- My Goals Section -->
        <div class="my-goals-section">
          <div class="my-goals-header">
            <h3 class="my-goals-title">My Goals</h3>
            <button class="select-btn" id="btnSelectGoals">
              Select
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
          
          <!-- Goal Cards -->
          <div class="goal-cards">
            <div class="goal-card">
              <div class="goal-progress-bar"></div>
              <!-- Goal content will be added dynamically -->
            </div>
            <div class="goal-card">
              <!-- Goal content will be added dynamically -->
            </div>
          </div>
        </div>
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

  // Event handlers
  on('click', '#btnBackFinances', () => {
    navigate('/dashboard');
  });

  on('click', '#btnNewGoal', () => {
    showToast('New goal creation coming soon', 'info');
  });

  on('click', '#btnSelectGoals', () => {
    showToast('Goal selection coming soon', 'info');
  });

  // Bottom navigation event handlers
  on('click', '.nav-item-savings', () => {
    // Already on savings page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  on('click', '.nav-item-budget', () => {
    showToast('Budget section coming soon', 'info');
  });

  on('click', '.nav-item-bills', () => {
    showToast('Bills section coming soon', 'info');
  });

  on('click', '.nav-item-learn', () => {
    showToast('Financial education section coming soon', 'info');
  });
}
