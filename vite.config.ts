import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";
import Sitemap from "vite-plugin-sitemap";
import { fileURLToPath } from "url";
import path from "path";
import { publishedUsefulArticles } from "./src/data/usefulArticles";
import { portfolioCases } from "./src/data/portfolio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://irina-design.vercel.app";
const ARTICLE_ROUTES = publishedUsefulArticles.map(article => `/useful/${article.slug}`);
const CASE_ROUTES = portfolioCases.map(item => `/portfolio/${item.slug}`);

export default defineConfig(() => ({
  base: process.env.BASE_PATH || "/",
  plugins: [
    react(),
    ViteImageOptimizer({ webp: { quality: 80 } }),
    visualizer({ filename: "stats.html", open: false, gzipSize: true }),
    Sitemap({
      hostname: SITE_URL,
      dynamicRoutes: Array.from(
        new Set([
          ...ARTICLE_ROUTES,
          ...CASE_ROUTES,
          "/about",
          "/portfolio",
          "/services",
          "/useful",
          "/contact",
        ])
      ),
      exclude: ["/404", "/google5b6109d09ed90c5a", "/google546bec4c033b6257"],
    }),
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom"))
            return "react";
          if (id.includes("node_modules/react-icons")) return "icons";
        },
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: {
      "/dev-api": { target: "http://127.0.0.1:5174", changeOrigin: true },
      "/api": { target: "http://127.0.0.1:5174", changeOrigin: true },
      "/.netlify": {
        target: "http://localhost:8888",
        bypass: req => (req.url?.includes("/.netlify/functions/") ? null : req.url),
      },
    },
  },
}));