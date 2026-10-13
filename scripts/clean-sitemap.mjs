import fs from "node:fs";
import path from "node:path";

const sitemapPath = path.resolve(process.cwd(), "dist", "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  throw new Error("dist/sitemap.xml not found");
}

const SITE_ORIGIN = "https://certdep-spec.github.io";
const SITE_PATH = "/irina-design";
const original = fs.readFileSync(sitemapPath, "utf8");

// vite-plugin-sitemap treats hostname as an origin and drops any path in it.
// GitHub Pages serves this project below /irina-design/, so every sitemap URL
// must include that repository path or Google is sent to unrelated root URLs.
const withGitHubPagesBasePath = original.replace(/<loc>([^<]+)<\/loc>/g, (match, rawUrl) => {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return match;
  }

  if (
    url.origin === SITE_ORIGIN &&
    url.pathname !== SITE_PATH &&
    !url.pathname.startsWith(`${SITE_PATH}/`)
  ) {
    url.pathname = `${SITE_PATH}${url.pathname === "/" ? "/" : url.pathname}`;
  }

  return `<loc>${url.toString()}</loc>`;
});

const cleaned = withGitHubPagesBasePath
  .replace(/<lastmod>[^<]*<\/lastmod>/g, "")
  .replace(/<changefreq>[^<]*<\/changefreq>/g, "")
  .replace(/<priority>[^<]*<\/priority>/g, "");

fs.writeFileSync(sitemapPath, cleaned);
console.log("✓ normalized GitHub Pages /irina-design/ paths and removed synthetic sitemap metadata");
