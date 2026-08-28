// Build-time prerenderer: renders every public route to static HTML
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const ROUTES = ["/", "/about", "/portfolio", "/services", "/useful", "/useful/shcho-take-dyzain-proiekt-interieru", "/contact"];
const ROOT_DIV = '<div id="root"></div>';

async function main() {
  const ssrCandidates = ["ssr-entry.mjs", "ssr-entry.js", "ssr-entry.cjs"].map(f => path.join(ssrDir, f));
  const ssrFile = ssrCandidates.find(f => fs.existsSync(f));
  if (!ssrFile) throw new Error("SSR bundle not found in dist-ssr/");
  const templatePath = path.join(distDir, "index.html");
  if (!fs.existsSync(templatePath)) throw new Error("dist/index.html not found");
  const { renderRoute } = await import(pathToFileURL(ssrFile).href);
  const template = fs.readFileSync(templatePath, "utf8");
  const base = (process.env.BASE_PATH || "").replace(/\/+$/, "");
  for (const route of ROUTES) {
    const { html, helmet } = await renderRoute(base + route);
    if (!html.trim()) throw new Error(`Prerender of "${route}" produced empty HTML`);
    let outHtml = template.replace(ROOT_DIV, () => `<div id="root">${html}</div>`);
    const titleTag = helmet.match(/<title[^>]*>[\s\S]*?<\/title>/i);
    if (titleTag) outHtml = outHtml.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "");
    const helmetRest = (titleTag ? titleTag[0] + "\n" : "") + helmet.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "").trim();
    if (helmetRest) outHtml = outHtml.replace("</head>", () => helmetRest + "\n</head>");
    if (route === "/") fs.writeFileSync(templatePath, outHtml);
    else { const dir = path.join(distDir, route.replace(/^\//, "")); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, "index.html"), outHtml); }
    console.log(`✓ prerendered ${route}`);
  }
  console.log(`\nPrerendering complete: ${ROUTES.length} pages written to dist/.`);
}
main().catch(err => { console.error("\n✗ Prerender failed:", err); process.exit(1); });
