export function safeBack() {
  // simple placeholder navigation logic
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/';
  }
}
