import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:4173";

test.describe("Mirror smoke tests", () => {
  test.beforeEach(async ({ page }) => {
    // Собираем JS-ошибки
    const errors: string[] = [];
    page.on("pageerror", err => errors.push(err.message));
    page.on("console", msg => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    test.info().errors = errors;
  });

  test("Home: H1, логотип, 5 ссылок навигации", async ({ page }) => {
    await page.goto(BASE_URL + "/");
    await expect(page.locator("h1")).toContainText("Інтер'єрні та меблеві рішення");
    await expect(page.locator("text=Ірина · Interior Design")).toBeVisible();
    const navLinks = page
      .locator("nav a, header a")
      .filter({ hasText: /головна|портфоліо|послуги|про мене|контакти/i });
    await expect(navLinks).toHaveCount(5);
  });

  test("Все 5 маршрутов: свой h1 и per-page title/canonical", async ({ page }) => {
    const routes = [
      { path: "/", h1: /інтер'?єрні/i },
      { path: "/about", h1: /про мене/i },
      { path: "/portfolio", h1: /портфоліо/i },
      { path: "/services", h1: /послуги/i },
      { path: "/contact", h1: /контакти/i },
    ];

    for (const route of routes) {
      await page.goto(BASE_URL + route.path);
      await expect(page.locator("h1")).toContainText(route.h1);
      const title = await page.title();
      expect(title).toContain("Ірина");
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute(
        "href",
        new RegExp(
          route.path === "/"
            ? "irina-design\\.vercel\\.app/?$"
            : `irina-design\\.vercel\\.app${route.path}`
        )
      );
    }
  });

  test("Портфолио: фильтры, кейс открывается, в модалке описание + фото", async ({ page }) => {
    await page.goto(BASE_URL + "/portfolio");

    // Фильтры
    await expect(page.locator('button:has-text("Всі проєкти")')).toBeVisible();
    await expect(page.locator('button:has-text("Інтер\'єр")')).toBeVisible();
    await expect(page.locator('button:has-text("Меблі")')).toBeVisible();

    // Кликаем по первому кейсу
    const firstCase = page.locator('[data-cta-name^="portfolio_card_"]').first();
    await firstCase.click();

    // Модалка открылась
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('[role="dialog"] h2')).toBeVisible();
    await expect(page.locator('[role="dialog"] img')).toBeVisible();
  });

  test("Услуги: 4 тарифа с ценами; блок FAQ присутствует", async ({ page }) => {
    await page.goto(BASE_URL + "/services");

    // 4 тарифа
    const prices = page.locator("text=/від \\d+|за запитом/");
    await expect(prices).toHaveCount(4);

    // FAQ
    await expect(page.locator("text=Часті запитання")).toBeVisible();
    await expect(page.locator("text=Скільки часу займає")).toBeVisible();
  });

  test("Контакты: форма, tel:-ссылка, карта", async ({ page }) => {
    await page.goto(BASE_URL + "/contact");

    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
    // Карта (iframe или div с картой)
    const map = page.locator('iframe[src*="maps"], .map-container, [data-map]');
    await expect(map.first()).toBeVisible();
  });

  test("Пустой сабмит формы → ошибки валидации, без отправки", async ({ page }) => {
    await page.goto(BASE_URL + "/contact");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Ім'я обов'язкове")).toBeVisible();
    await expect(page.locator("text=Телефон обов'язковий")).toBeVisible();
    await expect(page.locator("text=Оберіть тип об'єкта")).toBeVisible();
    await expect(page.locator("text=Повідомлення обов'язкове")).toBeVisible();
  });

  test("404: HTTP 404 со страницей; GH Pages → SPA-фолбэк на главную", async ({ page }) => {
    const response = await page.goto(BASE_URL + "/nonexistent-page-12345");
    if (BASE_URL.includes("github.io")) {
      // GH Pages SPA fallback
      await expect(page).toHaveURL(BASE_URL + "/");
      await expect(page.locator("h1")).toContainText("Інтер'єрні");
    } else {
      expect(response?.status()).toBe(404);
      await expect(page.locator("text=404")).toBeVisible();
    }
  });

  test("Статика: favicon 200, sitemap.xml 200 с 5 URL, robots.txt 200", async ({ page }) => {
    const favicon = await page.request.get(BASE_URL + "/favicon.svg");
    expect(favicon.status()).toBe(200);

    const sitemap = await page.request.get(BASE_URL + "/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapText = await sitemap.text();
    const urls = (sitemapText.match(/<url>/g) || []).length;
    expect(urls).toBeGreaterThanOrEqual(5);

    const robots = await page.request.get(BASE_URL + "/robots.txt");
    expect(robots.status()).toBe(200);
  });

  test("Мобильный вид 390×844: гамбургер, плавающие CTA", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + "/");

    // Гамбургер
    await expect(
      page.locator('button[aria-label*="меню"], button[aria-label*="menu"], button:has(svg)')
    ).toBeVisible();

    // Плавающие CTA
    await expect(page.locator("[data-cta-name]")).toBeVisible();
  });

  test("Нет JS-ошибок на любой странице", async ({ page }) => {
    const routes = ["/", "/about", "/portfolio", "/services", "/contact"];
    for (const route of routes) {
      await page.goto(BASE_URL + route);
      const errors = test.info().errors || [];
      const criticalErrors = errors.filter(
        e =>
          !e.includes("favicon") &&
          !e.includes("Failed to load resource") &&
          !e.includes("IntersectionObserver")
      );
      expect(criticalErrors).toHaveLength(0);
    }
  });
});
