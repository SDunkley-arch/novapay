// Notifications page component
import { qs, on, showToast } from '../lib/dom.js';
import { goBack } from '../router.js';
import { state, save } from '../state.js';
import ToggleOn from '../../assets/ToggleOn.png';
import ToggleOff from '../../assets/ToggleOff.png';
import NoNotifications from '../../assets/NoNotifications.png';

export function renderNotifications() {
  const app = qs('#app');

  const enabled = !!state?.preferences?.notificationsEnabled;
  const hasNotifications = Array.isArray(state.notifications) && state.notifications.length > 0;
  const emptyStateHtml = !hasNotifications
    ? `
        <div class="notifications-empty-state">
          <img src="${NoNotifications}" alt="No notifications" class="notifications-empty-img" />
        </div>
      `
    : '';
  const notificationsListHtml = hasNotifications
    ? `
        <div class="notifications-list">
          ${state.notifications
            .map((n) => {
              const title = n.title || 'NovaPay';
              const time = formatNotificationTime(n.createdAt);
              const message = n.message || '';
              const isUnread = !n.isRead;
              const dotClass = isUnread
                ? 'notification-status-dot notification-status-dot-unread'
                : 'notification-status-dot';

              return `
                <div class="notification-card">
                  <div class="notification-main">
                    <div class="notification-icon">
                      <span class="notification-icon-letter">N</span>
                    </div>
                    <div class="notification-content">
                      <div class="notification-header-row">
                        <div class="notification-title">${escapeHtml(title)}</div>
                        <div class="notification-time">${time}</div>
                      </div>
                      <div class="notification-text">${escapeHtml(message)}</div>
                    </div>
                  </div>
                  <span class="${dotClass}"></span>
                </div>
              `;
            })
            .join('')}
        </div>
      `
    : '';

  app.innerHTML = `
    <div class="page-container">
      <div class="page-header-modern">
        <button class="icon-btn" id="btnBack">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="page-title-modern">Notifications</h1>
        <div class="icon-btn-placeholder"></div>
      </div>

      <div class="settings-content">
        <div class="settings-group">
          <h3 class="settings-group-title">Preferences</h3>
          <div class="settings-list">
            <button class="settings-item" id="btnToggleNotifications">
              <div class="settings-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div class="settings-item-content">
                <div class="settings-item-title">Turn on notifications?</div>
                <div class="settings-item-desc">Receive alerts about your account activity</div>
              </div>
              <img src="${enabled ? ToggleOn : ToggleOff}" alt="Notifications toggle" class="np-toggle-img" id="notificationsToggleImg" />
            </button>
          </div>
        </div>
      </div>
      ${notificationsListHtml || emptyStateHtml}

      <div class="notifications-footer">
        <button class="btn-primary-modern" id="btnMarkAllRead" type="button">
          Mark all as read
        </button>
      </div>
    </div>
  `;

  const root = document.querySelector('#app');

  on(root, '#btnBack', 'click', () => goBack());

  on(root, '#btnToggleNotifications', 'click', () => {
    const current = !!state?.preferences?.notificationsEnabled;
    const next = !current;
    if (!state.preferences) state.preferences = {};
    state.preferences.notificationsEnabled = next;
    save();

    const img = document.getElementById('notificationsToggleImg');
    if (img) {
      img.src = next ? ToggleOn : ToggleOff;
    }

    showToast(`Notifications ${next ? 'enabled' : 'disabled'}`, 'success');
  });

  on(root, '#btnMarkAllRead', 'click', () => {
    const hasNotificationsToRead = Array.isArray(state.notifications) && state.notifications.length > 0;

    if (!hasNotificationsToRead) {
      showToast('No notifications to mark as read', 'info');
      return;
    }

    state.notifications = [];
    save();
    showToast('All notifications marked as read', 'success');
    renderNotifications();
  });
}

function formatNotificationTime(iso) {
  try {
    const date = iso ? new Date(iso) : new Date();
    return date
      .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      .toLowerCase();
  } catch {
    return '';
  }
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return ch;
    }
  });
}
