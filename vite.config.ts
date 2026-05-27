import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { visualizer } from 'rollup-plugin-visualizer'
import Sitemap from 'vite-plugin-sitemap'

import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  base: process.env.GITHUB_ACTIONS ? '/irina-design/' : '/',
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: { quality: 80 }
    }),
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true
    }),
    Sitemap({
      hostname: 'https://irina-design.netlify.app',
      dynamicRoutes: ['/about', '/portfolio', '/services', '/contact']
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      // /dev-api → standalone API server on port 5174 (avoids collision with public/api/ folder)
      '/dev-api': {
        target: 'http://127.0.0.1:5174',
        changeOrigin: true,
      },
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
}))