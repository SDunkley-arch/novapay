// NovaPay State Management
export const state = {
  session: null, // { user: {name, email, phone}, kycTier: 'TIER_1'|'TIER_2' }
  balances: { JMD: 125000, USD: 180 },
  txs: [
    { 
      id: 't1', 
      title: 'From John', 
      amount: +7500, 
      currency: 'JMD', 
      type: 'P2P_RECV', 
      ts: '2025-09-01' 
    },
    { 
      id: 't2', 
      title: 'JPS Bill', 
      amount: -8500, 
      currency: 'JMD', 
      type: 'BILL', 
      ts: '2025-09-02' 
    }
  ],
  notifications: [],
  savedBillers: [],
  card: { 
    hasCard: false, 
    masked: '•••• 1234', 
    expiry: '12/28', 
    frozen: false,
    linkedAccounts: [],
    savedCards: []
  }
};

// Storage keys
const STORAGE_KEYS = {
  SESSION: 'novapay_session',
  BALANCES: 'novapay_balances',
  TRANSACTIONS: 'novapay_transactions',
  NOTIFICATIONS: 'novapay_notifications',
  BILLERS: 'novapay_billers',
  CARD: 'novapay_card'
};

// Load state from localStorage
export function load() {
  try {
    const session = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        const rememberMe = parsed.rememberMe;
        const expiresAt = parsed.rememberMeExpiresAt;

        if (rememberMe === true && expiresAt && Date.now() > expiresAt) {
          // Remember-me session has expired; clear stored copy
          localStorage.removeItem(STORAGE_KEYS.SESSION);
        } else {
          state.session = parsed;
        }
      } catch (e) {
        console.error('Error parsing stored session:', e);
      }
    }

    const balances = localStorage.getItem(STORAGE_KEYS.BALANCES);
    if (balances) {
      state.balances = JSON.parse(balances);
    }

    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (transactions) {
      state.txs = JSON.parse(transactions);
    }

    const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (notifications) {
      state.notifications = JSON.parse(notifications);
    }

    const billers = localStorage.getItem(STORAGE_KEYS.BILLERS);
    if (billers) {
      state.savedBillers = JSON.parse(billers);
    }

    const card = localStorage.getItem(STORAGE_KEYS.CARD);
    if (card) {
      state.card = JSON.parse(card);
      if (!Array.isArray(state.card.savedCards)) {
        state.card.savedCards = [];
      }
    }
  } catch (error) {
    console.error('Error loading state:', error);
  }
}

// Save state to localStorage
export function save() {
  try {
    if (state.session) {
      const { rememberMe, rememberMeExpiresAt } = state.session;
      const now = Date.now();

      if (rememberMe === true) {
        if (!rememberMeExpiresAt || now < rememberMeExpiresAt) {
          localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(state.session));
        } else {
          localStorage.removeItem(STORAGE_KEYS.SESSION);
        }
      } else if (rememberMe === false) {
        // Explicitly non-persistent session (no remember-me)
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      } else {
        // Backwards compatibility: sessions without rememberMe flag are persisted as before
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(state.session));
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }

    localStorage.setItem(STORAGE_KEYS.BALANCES, JSON.stringify(state.balances));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(state.txs));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(state.notifications || []));
    localStorage.setItem(STORAGE_KEYS.BILLERS, JSON.stringify(state.savedBillers));
    localStorage.setItem(STORAGE_KEYS.CARD, JSON.stringify(state.card));
  } catch (error) {
    console.error('Error saving state:', error);
  }
}

// Clear all stored data
export function clearStorage() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Helper functions for state management
export function isLoggedIn() {
  return state.session !== null;
}

export function logout() {
  state.session = null;
  save();
}

export function addTransaction(tx) {
  const newTx = {
    id: 't' + Date.now(),
    ts: new Date().toISOString().split('T')[0],
    ...tx
  };
  state.txs.unshift(newTx);
  save();
  return newTx;
}

export function updateBalance(currency, amount) {
  if (state.balances[currency] !== undefined) {
    state.balances[currency] += amount;
    save();
  }
}

export function canAfford(amount, currency = 'JMD') {
  return state.balances[currency] >= amount;
}

export function addBiller(biller) {
  const exists = state.savedBillers.find(b => 
    b.name === biller.name && b.account === biller.account
  );
  
  if (!exists) {
    state.savedBillers.push({
      id: 'b' + Date.now(),
      ...biller
    });
    save();
  }
}

export function clearSession() {
  try {
    // Reset in-memory state
    state.session = null;
    state.balances = { JMD: 0, USD: 0 };
    state.txs = [];
    state.notifications = [];
    state.savedBillers = [];
    state.card = { hasCard: false, masked: '', expiry: '', frozen: false, linkedAccounts: [], savedCards: [] };

    // Clear all persistent data
    clearStorage();

    console.log('[NovaPay] Session cleared successfully');
  } catch (err) {
    console.error('[NovaPay] Failed to clear session:', err);
  }
}

// Initialize state on module load
load();
