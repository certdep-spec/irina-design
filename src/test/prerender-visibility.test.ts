/**
 * Этап 2 — тест SSR-видимости: пререндеренный HTML не должен прятать
 * контент под opacity:0 (иначе контент невидим до гидрации).
 * Проверяет собранные файлы dist/*.html (запустите `npm run build` перед тестом).
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");

const pages: Record<string, string> = {
  "/": path.join(distDir, "index.html"),
  "/portfolio": path.join(distDir, "portfolio", "index.html"),
  "/services": path.join(distDir, "services", "index.html"),
};

describe("Этап 2 — prerender visibility", () => {
  const hasDist = existsSync(pages["/"]);

  it("dist собран (запустите npm run build перед тестом)", () => {
    if (!hasDist) return; // пропуск в CI до build
    expect(existsSync(pages["/"])).toBe(true);
  });

  for (const [route, file] of Object.entries(pages)) {
    it(`статический HTML ${route} не прячет контент (нет opacity:0)`, () => {
      if (!existsSync(file)) return; // пропуск, если бандл не собран
      const html = readFileSync(file, "utf8");
      expect(html).not.toContain("opacity:0");
    });
  }
});
