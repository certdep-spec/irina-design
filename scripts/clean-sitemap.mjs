import fs from "node:fs";
import path from "node:path";

const sitemapPath = path.resolve(process.cwd(), "dist", "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  throw new Error("dist/sitemap.xml not found");
}

const original = fs.readFileSync(sitemapPath, "utf8");
const cleaned = original
  .replace(/<lastmod>[^<]*<\/lastmod>/g, "")
  .replace(/<changefreq>[^<]*<\/changefreq>/g, "")
  .replace(/<priority>[^<]*<\/priority>/g, "");

fs.writeFileSync(sitemapPath, cleaned);
console.log("✓ removed synthetic lastmod/changefreq/priority from sitemap.xml");
