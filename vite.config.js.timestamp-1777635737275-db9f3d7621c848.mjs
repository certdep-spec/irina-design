// vite.config.js
import { defineConfig } from "file:///C:/Site/interior-designer-portfolio/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Site/interior-designer-portfolio/node_modules/@vitejs/plugin-react/dist/index.js";
import imagemin from "file:///C:/Site/interior-designer-portfolio/node_modules/vite-plugin-imagemin/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), imagemin({
    webp: { quality: 80 }
  })],
  server: {
    proxy: {
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
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxTaXRlXFxcXGludGVyaW9yLWRlc2lnbmVyLXBvcnRmb2xpb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcU2l0ZVxcXFxpbnRlcmlvci1kZXNpZ25lci1wb3J0Zm9saW9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1NpdGUvaW50ZXJpb3ItZGVzaWduZXItcG9ydGZvbGlvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBpbWFnZW1pbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGltYWdlbWluKHtcbiAgICAgIHdlYnA6IHsgcXVhbGl0eTogODAgfVxuICAgIH0pXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvLm5ldGxpZnknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODg4OCcsXG4gICAgICAgIGJ5cGFzczogKHJlcSkgPT4ge1xuICAgICAgICAgIGlmIChyZXEudXJsPy5pbmNsdWRlcygnLy5uZXRsaWZ5L2Z1bmN0aW9ucy8nKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcS51cmxcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsb0JBQW9CO0FBQzlULE9BQU8sV0FBVztBQUNsQixPQUFPLGNBQWM7QUFFckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTO0FBQUEsSUFDeEIsTUFBTSxFQUFFLFNBQVMsR0FBRztBQUFBLEVBQ3RCLENBQUMsQ0FBQztBQUFBLEVBQ0osUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsYUFBYTtBQUFBLFFBQ1gsUUFBUTtBQUFBLFFBQ1IsUUFBUSxDQUFDLFFBQVE7QUFDZixjQUFJLElBQUksS0FBSyxTQUFTLHNCQUFzQixHQUFHO0FBQzdDLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPLElBQUk7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
