// Landing page component
import React from 'react';
import { createRoot } from 'react-dom/client';
import { qs } from '../lib/dom.js';
import { navigate } from '../router.js';
import LandingScreen from './landing.jsx';

export function renderLanding() {
  const app = qs('#app');
  if (!app) return;

  // Ensure #app is never empty so the main.js failsafe does not trigger
  // Create a dedicated inner container for the React root with full-screen styles
  if (!app.querySelector('#landing-react-root')) {
    app.innerHTML = '<div id="landing-react-root" style="width:100%;height:100%;margin:0;padding:0;overflow:hidden;position:absolute;top:0;left:0;right:0;bottom:0;"></div>';
  }

  const mountNode = app.querySelector('#landing-react-root');
  if (!mountNode) return;

  const handleSignIn = () => navigate('/login');
  const handleRegister = () => navigate('/register');

  const root = createRoot(mountNode);
  root.render(
    React.createElement(LandingScreen, {
      onSignIn: handleSignIn,
      onRegister: handleRegister,
    })
  );
}
