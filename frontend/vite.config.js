import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000',
      '/auth': 'http://localhost:4000',
      '/wallet': 'http://localhost:4000',
      '/transfers': 'http://localhost:4000',
      '/bills': 'http://localhost:4000'
    }
  }
})
