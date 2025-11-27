import { qs, on, showToast } from '../lib/dom.js';
import { navigate } from '../router.js';
import { state } from '../state.js';

export function renderChangeProfilePicture() {
  const app = qs('#app');

  const name = state?.session?.user?.name || 'User';
  const initials = name.substring(0, 2).toUpperCase();
  const email = state?.session?.user?.email || '';

  const existingAvatar = (() => {
    try {
      return localStorage.getItem('novapay_profile_picture');
    } catch {
      return null;
    }
  })();

  const avatarHtml = existingAvatar
    ? '<img src="' + existingAvatar + '" alt="' + name + '" class="settings-avatar-img" />'
    : initials;

  let selectedImageDataUrl = existingAvatar || null;

  app.innerHTML = `
    <div class="page-container">
      <header class="page-header-modern">
        <button type="button" class="icon-btn" id="btnBackProfilePhoto" aria-label="Back to dashboard">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 class="page-title-modern">Change Profile Picture</h1>
        <div class="icon-btn-placeholder"></div>
      </header>

      <main class="settings-content">
        <section class="settings-profile" style="padding-top: 16px;">
          <div class="settings-avatar">
            ${avatarHtml}
          </div>
          <p class="settings-email">Hi ${name.split(' ')[0]}!</p>
        </section>

        <section class="settings-group">
          <div class="settings-group-title">Profile photo</div>
          <div class="settings-list">
            <div class="settings-item">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 7h4l2-3h4l2 3h4v13H4z"></path>
                  <circle cx="12" cy="13" r="3.5"></circle>
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Upload new photo</div>
                <div class="settings-item-desc">Choose an image from your device</div>
              </div>
              <input id="profilePhotoInput" type="file" accept="image/*" style="display:none;" />
              <button type="button" class="btn-outline-sm" id="btnPickPhoto">Browse</button>
            </div>
          </div>
        </section>

        <section class="settings-group">
          <button type="button" class="btn-primary-modern" id="btnSavePhoto" disabled>
            Save profile picture
          </button>
        </section>
      </main>
    </div>
  `;

  on('click', '#btnBackProfilePhoto', () => {
    navigate('/dashboard', { animate: 'slide-left-fade' });
  });

  on('click', '#btnPickPhoto', () => {
    const input = qs('#profilePhotoInput');
    if (input) input.click();
  });

  on('change', '#profilePhotoInput', (event) => {
    const file = event.target.files && event.target.files[0];
    const saveBtn = qs('#btnSavePhoto');
    if (!file) {
      selectedImageDataUrl = existingAvatar || null;
      if (saveBtn) saveBtn.disabled = !selectedImageDataUrl;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      selectedImageDataUrl = reader.result;
      const avatarEl = qs('.settings-avatar');
      if (avatarEl && selectedImageDataUrl) {
        avatarEl.innerHTML =
          '<img src="' + selectedImageDataUrl + '" alt="' + name + '" class="settings-avatar-img" />';
      }
      if (saveBtn) saveBtn.disabled = false;
      if (showToast) {
        showToast('Preview updated. Tap Save profile picture to apply.', 'success');
      }
    };

    reader.onerror = () => {
      if (showToast) {
        showToast('Could not read that image. Please try another file.', 'error');
      }
      selectedImageDataUrl = existingAvatar || null;
      if (saveBtn) saveBtn.disabled = !selectedImageDataUrl;
    };

    reader.readAsDataURL(file);
  });

  on('click', '#btnSavePhoto', () => {
    if (!selectedImageDataUrl) {
      if (showToast) {
        showToast('Please choose a photo first.', 'info');
      }
      return;
    }

    try {
      localStorage.setItem('novapay_profile_picture', selectedImageDataUrl);
      if (showToast) {
        showToast('Profile picture updated.', 'success');
      }
    } catch (e) {
      console.error('[ChangeProfilePicture] Failed to save image', e);
      if (showToast) {
        showToast('Could not save image on this device.', 'error');
      }
      return;
    }

    navigate('/dashboard', { animate: 'slide-left-fade' });
  });
}
