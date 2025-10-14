// Utility functions for formatting

export function fmtCurrency(amount, currency = 'JMD') {
  const absAmount = Math.abs(amount);
  
  if (currency === 'JMD') {
    return `J$${absAmount.toLocaleString('en-JM', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    })}`;
  } else if (currency === 'USD') {
    return `$${absAmount.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  }
  
  return `${currency} ${absAmount.toLocaleString()}`;
}

export function fmtDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Today';
  } else if (diffDays === 2) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

export function fmtPhone(phone) {
  // Format phone number for display
  if (!phone) return '';
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as (876) 123-4567 for Jamaican numbers
  if (digits.length === 10 && digits.startsWith('876')) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 7) {
    // Local format: 123-4567
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  
  return phone;
}

export function fmtCardNumber(cardNumber) {
  // Format card number with spaces
  if (!cardNumber) return '';
  
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
}

export function maskCardNumber(cardNumber) {
  // Mask card number showing only last 4 digits
  if (!cardNumber) return '•••• ••••';
  
  const lastFour = cardNumber.slice(-4);
  return `•••• •••• •••• ${lastFour}`;
}

export function generateTransactionId() {
  return 't' + Date.now() + Math.random().toString(36).substr(2, 5);
}

export function fmtAmount(amount) {
  // Format amount for input display (no currency symbol)
  return Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

export function parseAmount(amountString) {
  // Parse amount string to number
  if (!amountString) return 0;
  
  // Remove commas and other formatting
  const cleaned = amountString.replace(/[,$\s]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}
