// Viewport height fix for mobile browsers
// This script helps ensure the app takes up the full height of the screen
// without being affected by browser UI elements like address bars

export function initViewportFix() {
  // Set CSS variable for app height
  const setAppHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  // Initial setup
  setAppHeight();

  // Update on resize and orientation change
  window.addEventListener('resize', setAppHeight);
  window.addEventListener('orientationchange', setAppHeight);

  // Special handling for mobile browsers
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Some mobile browsers need a small delay after orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(setAppHeight, 100);
    });
    
    // For iOS Safari, which may have issues with vh units
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Additional fix for iOS Safari
      window.addEventListener('scroll', () => {
        if (document.activeElement.tagName === 'INPUT') {
          document.activeElement.scrollIntoView();
        }
      });
    }
  }
}
