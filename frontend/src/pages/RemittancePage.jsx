import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';
import MGLogo from '../../assets/MG.png';
import WesternULogo from '../../assets/WesternU.png';

export function renderRemittancePage() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackRemittance">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Remittance</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Receive Money from Abroad</h3>
          <p class="form-hint" style="margin-bottom: 20px;">
            Choose a remittance partner to receive funds directly into your NovaPay wallet.
          </p>
        </div>

        <div class="remittance-providers">
          <div class="remittance-provider-card" data-provider="western-union">
            <div class="remittance-provider-logo remit-logo-wu">
              <img src="${WesternULogo}" alt="Western Union" class="wu-logo-img" />
            </div>
            <div class="remittance-provider-info">
              <h4 class="remittance-provider-name">Western Union</h4>
              <p class="remittance-provider-desc">Global money transfers</p>
            </div>
          </div>

          <div class="remittance-provider-card" data-provider="moneygram">
            <div class="remittance-provider-logo remit-logo-mg">
              <img src="${MGLogo}" alt="MoneyGram" class="mg-logo-img" />
            </div>
            <div class="remittance-provider-info">
              <h4 class="remittance-provider-name">MoneyGram</h4>
              <p class="remittance-provider-desc">Fast global payouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  on('click', '#btnBackRemittance', () => navigate('/dashboard', { animate: 'slide-left-fade' }));

  const cards = app.querySelectorAll('.remittance-provider-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const provider = card.dataset.provider;
      if (provider === 'western-union') {
        navigate('/remittance/western-union', { animate: 'slide-right-fade' });
      } else if (provider === 'moneygram') {
        navigate('/remittance/moneygram', { animate: 'slide-right-fade' });
      }
    });
  });
}

const style = document.createElement('style');
style.textContent = `
  .remittance-providers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .remittance-provider-card {
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
  
  .remittance-provider-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .remittance-provider-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .remittance-provider-card:active {
    transform: translateY(0);
  }
  
  .remittance-provider-logo {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .remit-logo-wu {
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .wu-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .remit-logo-mg {
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .mg-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .remittance-provider-info {
    flex: 1;
  }
  
  .remittance-provider-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .remittance-provider-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
