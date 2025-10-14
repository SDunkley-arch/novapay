export function qs(selector) {
  return document.querySelector(selector);
}

export function on(event, selector, handler) {
  const element = document.querySelector(selector);
  if (element) element.addEventListener(event, handler);
}

export function showToast(msg) {
  alert(msg);
}
