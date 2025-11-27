import { qs, on, showToast } from '../lib/dom.js';
import { goBack } from '../router.js';

let currentStream = null;

export function renderScanQR() {
  const app = qs('#app');

  app.innerHTML = `
    <div class="page-container">
      <header class="page-header-modern">
        <button class="back-button-modern" type="button" id="btnBackScanQR">
          <span class="back-icon">←</span>
        </button>
        <div class="page-header-title">
          <h1>Scan QR Code</h1>
          <p>Point your camera at a NovaPay QR code</p>
        </div>
      </header>

      <main class="page-body-modern">
        <div class="qr-scan-wrapper">
          <video id="qrVideo" class="qr-video" autoplay playsinline></video>
          <div class="qr-scan-frame"></div>
        </div>
        <p class="qr-scan-hint">We need access to your camera to scan QR codes.</p>
      </main>
    </div>
  `;

  on('click', '#btnBackScanQR', () => {
    stopCamera();
    goBack();
  });

  startCamera();
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
    console.error('[ScanQR] Failed to access camera', err);
    showToast('Unable to access camera. Please check permissions.', 'error');
  }
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => track.stop());
    currentStream = null;
  }
}
