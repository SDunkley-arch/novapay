// Billers listing page: /more/billers
import { qs, on } from '../lib/dom.js';
import { navigate } from '../router.js';
import { renderBillerList } from '../components/billers/BillerList.js';

const BILLERS = [
  { id: 'jps', name: 'JPS', icon: '⚡', category: 'Electricity' },
  { id: 'nwc', name: 'NWC', icon: '💧', category: 'Water' },
  { id: 'flow', name: 'Flow', icon: '📱', category: 'Mobile' },
  { id: 'digicel', name: 'Digicel', icon: '📱', category: 'Mobile' },
  { id: 'lime', name: 'LIME', icon: '☎️', category: 'Internet' },
  { id: 'ncb', name: 'NCB', icon: '🏦', category: 'Credit Card' },
  { id: 'sagicor', name: 'Sagicor', icon: '🛡️', category: 'Insurance' },
  { id: 'guardian', name: 'Guardian Life', icon: '🛡️', category: 'Insurance' },
];

export function renderBillersPage() {
  const app = qs('#app');
  if (!app) return;

  app.innerHTML = `
    <div class="container page">
      <div class="page-header">
        <button class="back-btn" data-action="nav-back">←</button>
        <h1 class="page-title">Billers</h1>
        <div></div>
      </div>

      <div class="mb-4">
        <input
          type="text"
          id="billerSearch"
          class="form-input"
          placeholder="Search billers..."
        />
      </div>

      <div class="card">
        <h3 class="text-lg mb-4">All Billers</h3>
        <div id="billerList" class="biller-grid"></div>
      </div>
    </div>
  `;

  const listContainer = qs('#billerList');
  renderBillerList(listContainer, BILLERS, {
    onSelect: (biller) => {
      navigate(`/more/billers/${biller.id}`);
    },
  });

  // Back navigation
  on('click', '[data-action="nav-back"]', () => navigate('/dashboard'));

  // Search functionality (simple client filter)
  on('input', '#billerSearch', (e) => {
    const term = (e.target.value || '').toLowerCase();
    const filtered = BILLERS.filter((b) => {
      return (
        b.name.toLowerCase().includes(term) ||
        (b.category || '').toLowerCase().includes(term)
      );
    });

    renderBillerList(listContainer, filtered, {
      onSelect: (biller) => {
        navigate(`/more/billers/${biller.id}`);
      },
    });
  });
}
