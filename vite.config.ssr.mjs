// Minimal Vite config for the SSR build used by scripts/prerender.mjs.
// Kept separate from vite.config.ts so the heavy client plugins
// (image optimizer, visualizer, sitemap) don't run twice.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  build: {
    ssr: true,
    outDir: "dist-ssr",
    emptyOutDir: true,
  },
  ssr: {
    // react-icons ships an ESM build with a directory import (../lib) that
    // Node's ESM loader rejects at runtime; bundling it sidesteps the issue.
    noExternal: ["react-icons"],
  },
});
