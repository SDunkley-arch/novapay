import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on mode (e.g., .env.android for android mode)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: '0.0.0.0',
      port: 8080, // 👈 Force frontend to always use port 8080
      proxy: {
        '/api': env.VITE_API_BASE || 'http://localhost:4000',
        '/auth': env.VITE_API_BASE || 'http://localhost:4000',
        '/wallet': env.VITE_API_BASE || 'http://localhost:4000',
        '/transfers': env.VITE_API_BASE || 'http://localhost:4000',
        '/bills': env.VITE_API_BASE || 'http://localhost:4000',
      },
    },
    // Ensure environment variables are available in the built app
    define: {
      'import.meta.env.VITE_API_BASE': JSON.stringify(env.VITE_API_BASE || 'http://localhost:4000'),
    },
  };
});