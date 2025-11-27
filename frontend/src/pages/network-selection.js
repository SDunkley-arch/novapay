// Network Selection page component
import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';
import FlowLtdLogo from '../../assets/FlowLtd.png';
import DigicelLogo from '../../assets/Digicel.png';

export function renderNetworkSelection() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackNetworkSelection">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Select a Network</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="form-field">
          <h3 class="section-title-sm">Choose Your Network Provider</h3>
          <p class="form-hint" style="margin-bottom: 20px;">
            Select the network provider you would like to top up.
          </p>
        </div>

        <div class="network-providers">
          <div class="network-provider-card" data-network="flow">
            <div class="network-provider-logo">
              <img src="${FlowLtdLogo}" alt="Flow Ltd" class="network-logo-img" />
            </div>
            <div class="network-provider-info">
              <h4 class="network-provider-name">Flow Ltd</h4>
              <p class="network-provider-desc">Mobile and data services</p>
            </div>
          </div>

          <div class="network-provider-card" data-network="digicel">
            <div class="network-provider-logo">
              <img src="${DigicelLogo}" alt="Digicel" class="network-logo-img" />
            </div>
            <div class="network-provider-info">
              <h4 class="network-provider-name">Digicel</h4>
              <p class="network-provider-desc">Mobile and data services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  on('click', '#btnBackNetworkSelection', () => navigate('/dashboard', { animate: 'slide-left-fade' }));

  const cards = app.querySelectorAll('.network-provider-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const network = card.dataset.network;
      navigate(`/network-details/${network}`, { animate: 'slide-right-fade' });
    });
  });
}

// Add styles for the Network Selection page
const style = document.createElement('style');
style.textContent = `
  .network-providers {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .network-provider-card {
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
  
  .network-provider-card:after {
    content: "→";
    position: absolute;
    right: 16px;
    color: var(--colorscharade-60);
    font-size: 18px;
  }
  
  .network-provider-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(84, 58, 248, 0.15);
  }
  
  .network-provider-card:active {
    transform: translateY(0);
  }
  
  .network-provider-logo {
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
  
  .network-logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .network-provider-info {
    flex: 1;
  }
  
  .network-provider-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .network-provider-desc {
    font-size: 13px;
    color: var(--colorscharade-60);
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
