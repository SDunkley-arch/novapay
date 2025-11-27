import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.novapayja.app',
  appName: 'NovaPay Ja',
  // Built web assets for the app live in the monorepo frontend/dist folder
  webDir: 'frontend/dist',
  server: {
    // When using live dev server, point Android to the dev server on your LAN.
    // For a physical device on the same Wi‑Fi, this should be the host machine's IP.
    // Update this if your LAN IP or dev port changes.
    url: 'http://192.168.0.5:8080',
    androidScheme: 'http',
    cleartext: true,
  },
  android: {
    // Ensure the app uses the full screen
    backgroundColor: '#000000'
  },
  ios: {
    // Ensure the app uses the full screen
    backgroundColor: '#000000'
  },
  // Use plugins to configure additional settings
  plugins: {
    // Configure the web view to use edge-to-edge display
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
