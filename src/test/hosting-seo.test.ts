import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

describe("SEO hosting routes", () => {
  it("Vercel does not replace prerendered public pages with the SPA shell", () => {
    const config = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
    const publicRoutes = ["/about", "/portfolio", "/services", "/contact", "/useful"];
    const rewrites = config.rewrites ?? [];

    for (const route of publicRoutes) {
      expect(
        rewrites.some(
          (item: { source?: string; destination?: string }) =>
            item.source === route && item.destination === "/index.html"
        )
      ).toBe(false);
    }
  });

  it("Netlify redirects keep prerendered public pages intact", () => {
    const redirects = readFileSync(path.join(root, "public", "_redirects"), "utf8");
    for (const route of ["/about", "/portfolio", "/services", "/contact", "/useful"]) {
      expect(redirects).not.toMatch(new RegExp(`^${route}\\s+/index\\.html\\s+200$`, "m"));
    }
  });

  it("Unknown Netlify paths still return a real 404", () => {
    const redirects = readFileSync(path.join(root, "public", "_redirects"), "utf8");
    expect(redirects).toMatch(/^\/\*\s+\/404\.html\s+404$/m);
  });
});
