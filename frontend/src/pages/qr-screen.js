import { qs, on, showToast } from '../lib/dom.js';
import { navigate, goBack } from '../router.js';
import { state } from '../state.js';
import qrScanIcon from '../../assets/QR Scan.png';

// Track the active tab
let activeTab = 'scan'; // 'scan' or 'show'
let currentStream = null;

export function renderQRScreen() {
  const app = qs('#app');
  if (!app) return;

  // Get user info for the Show My QR tab
  const name = state?.session?.user?.name || 'User';
  const username = state?.session?.user?.username || '@user';

  app.innerHTML = `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBackQR">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="page-title-modern">Scan QR</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <!-- Tab Switcher -->
      <div class="qr-tab-switcher">
        <button class="qr-tab-btn ${activeTab === 'scan' ? 'active' : ''}" data-tab="scan">
          Scan QR
        </button>
        <button class="qr-tab-btn ${activeTab === 'show' ? 'active' : ''}" data-tab="show">
          Show my QR
        </button>
      </div>

      <!-- Tab Content -->
      <div class="qr-tab-content">
        ${activeTab === 'scan' ? renderScanTab() : renderShowTab(username)}
      </div>
    </div>
  `;

  // Back button handler
  on('click', '#btnBackQR', () => {
    stopCamera();
    goBack();
  });

  // Tab switcher handlers
  on('click', '.qr-tab-btn[data-tab="scan"]', () => {
    if (activeTab !== 'scan') {
      activeTab = 'scan';
      stopCamera();
      renderQRScreen();
    }
  });

  on('click', '.qr-tab-btn[data-tab="show"]', () => {
    if (activeTab !== 'show') {
      activeTab = 'show';
      stopCamera();
      renderQRScreen();
    }
  });

  // Action button handlers for Show My QR tab
  if (activeTab === 'show') {
    on('click', '#btnDownloadQR', () => {
      showToast('QR code downloaded to your device', 'success');
    });

    on('click', '#btnShareWhatsApp', () => {
      showToast('Opening WhatsApp to share your QR code', 'success');
    });

    on('click', '#btnShareOther', () => {
      showToast('Opening share options', 'success');
    });
  }

  // Start camera if on Scan tab
  if (activeTab === 'scan') {
    startCamera();
  }
}

function renderScanTab() {
  return `
    <div class="qr-scan-content">
      <div class="qr-camera-container">
        <video id="qrVideo" class="qr-video" autoplay playsinline></video>
        <div class="qr-scan-frame">
          <div class="qr-scan-corner qr-scan-corner-tl"></div>
          <div class="qr-scan-corner qr-scan-corner-tr"></div>
          <div class="qr-scan-corner qr-scan-corner-bl"></div>
          <div class="qr-scan-corner qr-scan-corner-br"></div>
          <div class="qr-scan-line"></div>
        </div>
      </div>
      <div class="qr-scan-instructions">
        <h3 class="qr-scan-title">Center QR Code</h3>
        <p class="qr-scan-subtitle">ensure the QR code is centered and can be seen clearly</p>
      </div>
    </div>
  `;
}

function renderShowTab(username) {
  // Generate a placeholder QR code URL (in a real app, this would be a unique QR for the user)
  const qrCodeUrl = qrScanIcon; // Placeholder, in a real app this would be a unique QR for the user

  return `
    <div class="qr-show-content">
      <div class="qr-user-info">
        <h3 class="qr-username">${username}</h3>
        <p class="qr-subtitle">Show to receive</p>
      </div>
      
      <div class="qr-code-container">
        <div class="qr-code-card">
          <img src="${qrCodeUrl}" alt="Your QR Code" class="qr-code-image">
        </div>
      </div>
      
      <div class="qr-actions">
        <button id="btnDownloadQR" class="qr-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          <span>Download</span>
        </button>
        
        <button id="btnShareWhatsApp" class="qr-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
          </svg>
          <span>WhatsApp</span>
        </button>
        
        <button id="btnShareOther" class="qr-action-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  `;
}

async function startCamera() {
  const videoEl = document.getElementById('qrVideo');
  if (!videoEl || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast('Camera not supported on this device.', 'error');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    });
    currentStream = stream;
    videoEl.srcObject = stream;
  } catch (err) {
    console.error('[QRScreen] Failed to access camera', err);
    showToast('Unable to access camera. Please check permissions.', 'error');
  }
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
    currentStream = null;
  }
}

// Add the QR Screen styles
const style = document.createElement('style');
style.textContent = `
  /* QR Screen Styles */
  .qr-tab-switcher {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 0 20px;
    margin-bottom: 24px;
  }
  
  .qr-tab-btn {
    flex: 1;
    padding: 12px 16px;
    background: transparent;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--colorscharade-60);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    text-align: center;
  }
  
  .qr-tab-btn.active {
    color: var(--colorssecondary-100);
  }
  
  .qr-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 25%;
    width: 50%;
    height: 3px;
    background: var(--colorssecondary-100);
    border-radius: 3px;
  }
  
  .qr-tab-content {
    padding: 0 20px;
  }
  
  /* Scan QR Tab */
  .qr-camera-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 24px;
    background: #000;
  }
  
  .qr-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .qr-scan-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 16px;
    box-shadow: 0 0 0 5000px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  
  .qr-scan-corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border-color: #000;
    border-style: solid;
    border-width: 4px;
  }
  
  .qr-scan-corner-tl {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
    border-top-left-radius: 16px;
  }
  
  .qr-scan-corner-tr {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
    border-top-right-radius: 16px;
  }
  
  .qr-scan-corner-bl {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
    border-bottom-left-radius: 16px;
  }
  
  .qr-scan-corner-br {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
    border-bottom-right-radius: 16px;
  }
  
  .qr-scan-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #543AF8, transparent);
    animation: scan-line 2s linear infinite;
  }
  
  @keyframes scan-line {
    0% {
      transform: translateY(-50px);
    }
    50% {
      transform: translateY(50px);
    }
    100% {
      transform: translateY(-50px);
    }
  }
  
  .qr-scan-instructions {
    text-align: center;
    padding: 0 20px;
  }
  
  .qr-scan-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--colorscharade-100);
    margin-bottom: 8px;
  }
  
  .qr-scan-subtitle {
    font-size: 14px;
    color: var(--colorscharade-60);
    line-height: 1.5;
  }
  
  /* Show My QR Tab */
  .qr-show-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
  
  .qr-user-info {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .qr-username {
    font-size: 20px;
    font-weight: 700;
    color: var(--colorscharade-100);
    margin-bottom: 4px;
  }
  
  .qr-subtitle {
    font-size: 14px;
    color: var(--colorscharade-60);
  }
  
  .qr-code-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }
  
  .qr-code-card {
    width: 240px;
    height: 240px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .qr-code-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .qr-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    width: 100%;
  }
  
  .qr-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    background: #FFFFFF;
    border: 1px solid var(--colorscharade-20);
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    color: var(--colorscharade-80);
    cursor: pointer;
    transition: all 0.2s ease;
    flex: 1;
    max-width: 100px;
  }
  
  .qr-action-btn:hover {
    background: var(--colorscharade-5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .qr-action-btn:active {
    transform: translateY(0);
  }
`;

if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
