export function renderEditProfile() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" onclick="window.history.back()">←</button>
        <h1>Edit Profile</h1>
      </div>
      <p class="text-muted">Profile editing coming soon...</p>
    </div>
  `;
}