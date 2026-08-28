// Build-time prerenderer: renders every public route to static HTML
// (content + per-page title/canonical/description/OG/JSON-LD) so crawlers
// that don't execute JS see the real page instead of an empty SPA shell.
//
// Usage (after `vite build` and `vite build --ssr`):
//   node scripts/prerender.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

// Public routes only. /admin is intentionally excluded: it's noindex and
// its login screen touches sessionStorage, which doesn't exist in Node.
const ROUTES = ["/", "/about", "/portfolio", "/services", "/useful", "/contact"];

const ROOT_DIV = '<div id="root"></div>';

async function main() {
  const ssrCandidates = ["ssr-entry.mjs", "ssr-entry.js", "ssr-entry.cjs"].map((f) =>
    path.join(ssrDir, f)
  );
  const ssrFile = ssrCandidates.find((f) => fs.existsSync(f));
  if (!ssrFile) {
    console.error("✗ SSR bundle not found in dist-ssr/. Did `vite build --ssr` run?");
    process.exit(1);
  }

  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("✗ dist/index.html not found. Did `vite build` run?");
    process.exit(1);
  }

  const { renderRoute } = await import(pathToFileURL(ssrFile).href);
  const template = fs.readFileSync(templatePath, "utf8");
  const base = (process.env.BASE_PATH || "").replace(/\/+$/, "");

  for (const route of ROUTES) {
    const { html, helmet } = await renderRoute(base + route);
    if (!html.trim()) {
      throw new Error(`Prerender of "${route}" produced empty HTML`);
    }

    let outHtml = template.replace(ROOT_DIV, () => `<div id="root">${html}</div>`);

    const titleTag = helmet.match(/<title[^>]*>[\s\S]*?<\/title>/i);
    if (titleTag) {
      outHtml = outHtml.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "");
    }
    const helmetRest =
      (titleTag ? titleTag[0] + "\n" : "") +
      helmet.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "").trim();
    if (helmetRest) {
      outHtml = outHtml.replace("</head>", () => helmetRest + "\n</head>");
    }

    if (route === "/") {
      fs.writeFileSync(templatePath, outHtml);
    } else {
      const dir = path.join(distDir, route.replace(/^\//, ""));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), outHtml);
    }

    const title = titleTag?.[0]?.replace(/<\/?title[^>]*>/gi, "").trim() || "(no title)";
    console.log(
      `✓ prerendered ${route}  [${title}]  html=${html.length}B total=${outHtml.length}B`
    );
  }

  console.log(`\nPrerendering complete: ${ROUTES.length} pages written to dist/.`);
}

main().catch((err) => {
  console.error("\n✗ Prerender failed:", err);
  process.exit(1);
});
