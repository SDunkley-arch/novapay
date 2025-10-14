// DOM utility functions

export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return root.querySelectorAll(selector);
}

export function on(root, selector, event, handler) {
  // Event delegation
  root.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target) {
      handler.call(target, e);
    }
  });
}

export function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'innerHTML') {
      element.innerHTML = value;
    } else if (key === 'textContent') {
      element.textContent = value;
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });
  
  // Append children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });
  
  return element;
}

export function showToast(message, type = 'info', duration = 3000) {
  // Remove existing toasts
  const existingToasts = qsa('.toast');
  existingToasts.forEach(toast => toast.remove());
  
  const toast = createElement('div', {
    className: `toast ${type}`,
    textContent: message
  });
  
  document.body.appendChild(toast);
  
  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, duration);
  
  return toast;
}

export function setLoading(element, loading = true) {
  if (loading) {
    element.classList.add('loading');
    element.disabled = true;
  } else {
    element.classList.remove('loading');
    element.disabled = false;
  }
}

export function fadeIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.display = 'block';
  
  let start = null;
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    element.style.opacity = Math.min(progress / duration, 1);
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

export function fadeOut(element, duration = 300) {
  let start = null;
  const initialOpacity = parseFloat(getComputedStyle(element).opacity);
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    element.style.opacity = initialOpacity * (1 - progress / duration);
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  }
  
  requestAnimationFrame(animate);
}

export function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

export function formatInputValue(input, formatter) {
  const cursorPosition = input.selectionStart;
  const oldValue = input.value;
  const newValue = formatter(oldValue);
  
  input.value = newValue;
  
  // Restore cursor position
  const lengthDiff = newValue.length - oldValue.length;
  input.setSelectionRange(cursorPosition + lengthDiff, cursorPosition + lengthDiff);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
