// vite.config.ts
import { defineConfig } from "file:///E:/!/interior-designer-portfolio1/node_modules/vite/dist/node/index.js";
import react from "file:///E:/!/interior-designer-portfolio1/node_modules/@vitejs/plugin-react/dist/index.js";
import { ViteImageOptimizer } from "file:///E:/!/interior-designer-portfolio1/node_modules/vite-plugin-image-optimizer/dist/index.js";
import { visualizer } from "file:///E:/!/interior-designer-portfolio1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import Sitemap from "file:///E:/!/interior-designer-portfolio1/node_modules/vite-plugin-sitemap/dist/index.js";
import { fileURLToPath } from "url";
import path from "path";
var __vite_injected_original_import_meta_url = "file:///E:/!/interior-designer-portfolio1/vite.config.ts";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var vite_config_default = defineConfig(({ mode }) => ({
  base: process.env.GITHUB_ACTIONS ? "/irina-design/" : "/",
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: { quality: 80 }
    }),
    visualizer({
      filename: "stats.html",
      open: false,
      gzipSize: true
    }),
    Sitemap({
      hostname: "https://irina-design.netlify.app",
      dynamicRoutes: ["/about", "/portfolio", "/services", "/contact"]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    proxy: {
      // /dev-api → standalone API server on port 5174 (avoids collision with public/api/ folder)
      "/dev-api": {
        target: "http://127.0.0.1:5174",
        changeOrigin: true
      },
      "/.netlify": {
        target: "http://localhost:8888",
        bypass: (req) => {
          if (req.url?.includes("/.netlify/functions/")) {
            return null;
          }
          return req.url;
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFwhXFxcXGludGVyaW9yLWRlc2lnbmVyLXBvcnRmb2xpbzFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXCFcXFxcaW50ZXJpb3ItZGVzaWduZXItcG9ydGZvbGlvMVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovIS9pbnRlcmlvci1kZXNpZ25lci1wb3J0Zm9saW8xL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXInXHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCBTaXRlbWFwIGZyb20gJ3ZpdGUtcGx1Z2luLXNpdGVtYXAnXHJcblxyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgYmFzZTogcHJvY2Vzcy5lbnYuR0lUSFVCX0FDVElPTlMgPyAnL2lyaW5hLWRlc2lnbi8nIDogJy8nLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xyXG4gICAgICB3ZWJwOiB7IHF1YWxpdHk6IDgwIH1cclxuICAgIH0pLFxyXG4gICAgdmlzdWFsaXplcih7XHJcbiAgICAgIGZpbGVuYW1lOiAnc3RhdHMuaHRtbCcsXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICBnemlwU2l6ZTogdHJ1ZVxyXG4gICAgfSksXHJcbiAgICBTaXRlbWFwKHtcclxuICAgICAgaG9zdG5hbWU6ICdodHRwczovL2lyaW5hLWRlc2lnbi5uZXRsaWZ5LmFwcCcsXHJcbiAgICAgIGR5bmFtaWNSb3V0ZXM6IFsnL2Fib3V0JywgJy9wb3J0Zm9saW8nLCAnL3NlcnZpY2VzJywgJy9jb250YWN0J11cclxuICAgIH0pLFxyXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxyXG5cclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6ICcxMjcuMC4wLjEnLFxyXG4gICAgcG9ydDogNTE3MyxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIC8vIC9kZXYtYXBpIFx1MjE5MiBzdGFuZGFsb25lIEFQSSBzZXJ2ZXIgb24gcG9ydCA1MTc0IChhdm9pZHMgY29sbGlzaW9uIHdpdGggcHVibGljL2FwaS8gZm9sZGVyKVxyXG4gICAgICAnL2Rldi1hcGknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMTo1MTc0JyxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgICcvLm5ldGxpZnknOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4ODg4JyxcclxuICAgICAgICBieXBhc3M6IChyZXEpID0+IHtcclxuICAgICAgICAgIGlmIChyZXEudXJsPy5pbmNsdWRlcygnLy5uZXRsaWZ5L2Z1bmN0aW9ucy8nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlcS51cmxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pKSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxvQkFBb0I7QUFDeFQsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sYUFBYTtBQUVwQixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFVBQVU7QUFQOEosSUFBTSwyQ0FBMkM7QUFTaE8sSUFBTSxZQUFZLEtBQUssUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFFN0QsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxNQUFNLFFBQVEsSUFBSSxpQkFBaUIsbUJBQW1CO0FBQUEsRUFDdEQsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sbUJBQW1CO0FBQUEsTUFDakIsTUFBTSxFQUFFLFNBQVMsR0FBRztBQUFBLElBQ3RCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLGVBQWUsQ0FBQyxVQUFVLGNBQWMsYUFBYSxVQUFVO0FBQUEsSUFDakUsQ0FBQztBQUFBLEVBQ0gsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUVoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxXQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsWUFBWTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxhQUFhO0FBQUEsUUFDWCxRQUFRO0FBQUEsUUFDUixRQUFRLENBQUMsUUFBUTtBQUNmLGNBQUksSUFBSSxLQUFLLFNBQVMsc0JBQXNCLEdBQUc7QUFDN0MsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU8sSUFBSTtBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
