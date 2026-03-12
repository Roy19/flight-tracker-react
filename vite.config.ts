import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/opensky-auth': {
        target: 'https://auth.opensky-network.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opensky-auth/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['child_process', 'fs', 'path']
    }
  }
})
