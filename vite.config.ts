import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Kept for direct dev use without netlify dev
      '/opensky-auth': {
        target: 'https://auth.opensky-network.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opensky-auth/, '')
      },
      // Routes /.netlify/functions/* to the netlify dev functions server
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['child_process', 'fs', 'path']
    }
  }
})
