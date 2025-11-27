// Shared BillerCard component for biller listings
// Usage: createBillerCard(biller, { onClick }) => HTMLElement

export function createBillerCard(biller, { onClick } = {}) {
  const card = document.createElement('div');
  card.className = 'biller-card';
  card.dataset.billerId = biller.id;

  card.innerHTML = `
    <div class="biller-card-main">
      <div class="biller-card-icon">${biller.icon || ''}</div>
      <div class="biller-card-info">
        <div class="biller-card-name">${biller.name}</div>
        ${biller.category ? `<div class="biller-card-category">${biller.category}</div>` : ''}
      </div>
    </div>
    <div class="biller-card-chevron">→</div>
  `;

  if (typeof onClick === 'function') {
    card.addEventListener('click', () => onClick(biller));
  }

  return card;
}

// Basic styles injected once
if (!document.getElementById('biller-card-styles')) {
  const style = document.createElement('style');
  style.id = 'biller-card-styles';
  style.textContent = `
    .biller-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.9rem 1rem;
      border-radius: var(--radius, 0.75rem);
      border: 1px solid var(--border, #262626);
      background: rgba(15, 23, 42, 0.85);
      cursor: pointer;
      transition: all 0.15s ease;
      margin-bottom: 0.5rem;
      gap: 0.75rem;
    }

    .biller-card:hover {
      border-color: var(--primary, #7c3aed);
      background: rgba(124, 58, 237, 0.08);
      transform: translateY(-1px);
    }

    .biller-card-main {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .biller-card-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      background: rgba(15, 23, 42, 0.9);
    }

    .biller-card-info {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .biller-card-name {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .biller-card-category {
      font-size: 0.8rem;
      color: #9ca3af;
    }

    .biller-card-chevron {
      color: #6b7280;
      font-size: 1.1rem;
    }
  `;
  document.head.appendChild(style);
}
