// Shared BillerList component using BillerCard
// Usage: renderBillerList(container, billers, { onSelect })

import { createBillerCard } from './BillerCard.js';

export function renderBillerList(container, billers, { onSelect } = {}) {
  if (!container) return;

  container.innerHTML = '';

  billers.forEach((biller) => {
    const card = createBillerCard(biller, {
      onClick: onSelect,
    });
    container.appendChild(card);
  });
}
