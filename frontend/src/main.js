// NovaPay Frontend - Vite Entry Point
import './style.css'
import { loadToken } from './api.js'
import { navigate } from './router.js'

console.log('[NovaPay] Vite frontend starting...')

// Load saved authentication token
loadToken()

// Initialize routing
if (!location.hash) {
  navigate('/login')
} else {
  window.dispatchEvent(new Event('hashchange'))
}

// Failsafe for when router doesn't render anything
setTimeout(() => {
  const mount = document.getElementById('app')
  if (mount && !mount.innerHTML.trim()) {
    mount.innerHTML = `
      <div style="padding:16px;color:#fff;background:#111;text-align:center;">
        <h2>🚀 NovaPay Loaded</h2>
        <p>Frontend is running! Check console for router logs.</p>
        <button onclick="location.reload()">Reload</button>
      </div>
    `
    console.warn('[NovaPay] Failsafe rendered: router did not paint any view.')
  }
}, 300)
