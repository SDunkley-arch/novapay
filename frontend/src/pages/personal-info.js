export function renderPersonalInfo() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" onclick="window.history.back()">←</button>
        <h1>Personal Information</h1>
      </div>
      <p class="text-muted">View & update personal information here...</p>
    </div>
  `;
}