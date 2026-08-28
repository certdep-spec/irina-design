import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";
import Sitemap from "vite-plugin-sitemap";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://irina-design.vercel.app";

export default defineConfig(() => ({
  base: process.env.BASE_PATH || "/",
  plugins: [
    react(),
    ViteImageOptimizer({ webp: { quality: 80 } }),
    visualizer({ filename: "stats.html", open: false, gzipSize: true }),
    Sitemap({
      hostname: SITE_URL,
      dynamicRoutes: [
        "/about",
        "/portfolio",
        "/services",
        "/useful",
        "/useful/shcho-take-dyzain-proiekt-interieru",
        "/useful/skilky-koshtuie-dyzain-interieru-u-vinnytsi",
        "/useful/z-choho-pochaty-remont-kvartyry",
        "/useful/avtorskyi-nahliad-shcho-tse-i-navishcho",
        "/contact",
      ],
      exclude: ["/404", "/google5b6109d09ed90c5a"],
    }),
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
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
