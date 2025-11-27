// Bank Selection page component
import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';
import CIBCLogo from '../../assets/CIBC.png';
import JMMBLogo from '../../assets/JMMB_Bank.png';
import JNLogo from '../../assets/JN.png';
import JNCBLogo from '../../assets/JNCB.png';
import ScotiaLogo from '../../assets/Scotia.jpg';

export function renderBankSelection() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackBankSelection">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Select Bank</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Choose Your Bank</h3>
          <p class="form-hint" style="margin-bottom: 20px;">
            Select the bank you would like to transfer funds to.
          </p>
        </div>

        <div class="bank-providers">
          <div class="bank-provider-card" data-bank="first-caribbean">
            <div class="bank-provider-logo">
              <img src="${CIBCLogo}" alt="First Caribbean Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">First Caribbean Bank</h4>
              <p class="bank-provider-desc">CIBC First Caribbean</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jmmb">
            <div class="bank-provider-logo">
              <img src="${JMMBLogo}" alt="JMMB" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">JMMB</h4>
              <p class="bank-provider-desc">Jamaica Money Market Brokers</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="jamaica-national">
            <div class="bank-provider-logo">
              <img src="${JNLogo}" alt="Jamaica National Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Jamaica National Bank</h4>
              <p class="bank-provider-desc">JN Bank</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="ncb">
            <div class="bank-provider-logo">
              <img src="${JNCBLogo}" alt="National Commercial Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">National Commercial Bank</h4>
              <p class="bank-provider-desc">NCB Jamaica</p>
            </div>
          </div>

          <div class="bank-provider-card" data-bank="scotia">
            <div class="bank-provider-logo">
              <img src="${ScotiaLogo}" alt="Scotia Bank" class="bank-logo-img" />
            </div>
            <div class="bank-provider-info">
              <h4 class="bank-provider-name">Scotia Bank</h4>
              <p class="bank-provider-desc">Scotiabank Jamaica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  on('click', '#btnBackBankSelection', () => navigate('/withdraw', { animate: 'slide-left-fade' }));

  const cards = app.querySelectorAll('.bank-provider-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const bank = card.dataset.bank;
      navigate(`/bank-details/${bank}`, { animate: 'slide-right-fade' });
    });
  });
}

// Add styles for the Bank Selection page
const style = document.createElement('style');
style.textContent = `
  .bank-providers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .bank-provider-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .bank-provider-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .bank-provider-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .bank-provider-card:active {
    transform: translateY(0);
  }
  
  .bank-provider-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: #FFFFFF;
    overflow: hidden;
  }
  
  .bank-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .bank-provider-info {
    flex: 1;
  }
  
  .bank-provider-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .bank-provider-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
