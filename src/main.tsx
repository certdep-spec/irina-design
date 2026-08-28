import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");

(function () {
  const redirect = sessionStorage.getItem("redirect");
  if (redirect) {
    sessionStorage.removeItem("redirect");
    history.replaceState(null, "", basename + "/" + redirect.replace(/^\//, ""));
  }
})();

const root = document.getElementById("root") as HTMLElement;
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// The prerenderer resolves lazy Suspense boundaries differently from the browser,
// so hydrating that markup can produce a mismatch. Clear the SEO snapshot before
// mounting to guarantee one interactive tree (and no duplicate links/listeners).
root.replaceChildren();
createRoot(root).render(app);
