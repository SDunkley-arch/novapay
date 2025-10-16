import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
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
  };
});