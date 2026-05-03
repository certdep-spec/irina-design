import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin'
import path from 'path'

export default defineConfig({
  plugins: [react(), imagemin({
      webp: { quality: 80 }
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:8888',
        bypass: (req) => {
          if (req.url?.includes('/.netlify/functions/')) {
            return null
          }
          return req.url
        }
      }
    }
  }
})