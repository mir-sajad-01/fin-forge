import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: false,
    allowedHosts: [
      'sb-1ifzj8ovgcqu.vercel.run',
      'localhost',
      '127.0.0.1'
    ]
  }
})
