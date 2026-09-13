import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:4173";

test.describe("Mirror smoke tests", () => {
  test.beforeEach(async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", err => errors.push(err.message));
    page.on("console", msg => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    test.info().errors = errors;
  });

  test("Home: H1, логотип, 6 ссылок навигации", async ({ page }) => {
    await page.goto(BASE_URL + "/");
    await expect(page.locator("h1")).toContainText("Дизайн інтер'єру");
    await expect(page.locator("header").getByText("Ірина · Interior Design").first()).toBeVisible();
    const navLinks = page
      .locator("nav a, header a")
      .filter({ hasText: /головна|портфоліо|послуги|про мене|корисне|контакти/i });
    await expect(navLinks).toHaveCount(6);
  });

  test("Все 6 основных маршрутов: свой h1 и per-page title/canonical", async ({ page }) => {
    const routes = [
      { path: "/", h1: /дизайн інтер'?єру/i },
      { path: "/about", h1: /дизайнер інтер'?єру та меблів/i },
      { path: "/portfolio", h1: /інтер'?єрні та меблеві рішення/i },
      { path: "/services", h1: /послуги та вартість/i },
      { path: "/useful", h1: /корисне про дизайн інтер’єру/i },
      { path: "/contact", h1: /контакти/i },
    ];

    for (const route of routes) {
      await page.goto(BASE_URL + route.path);
      await expect(page.locator("h1")).toContainText(route.h1);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
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

  test("Корисне: пошук, категорії та опубліковані матеріали", async ({ page }) => {
    await page.goto(BASE_URL + "/useful");
    await expect(page.locator("h1")).toContainText("Корисне про дизайн інтер’єру");
    await expect(page.getByRole("searchbox", { name: "Пошук корисних матеріалів" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Дизайн і планування" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Читати: Що таке дизайн-проєкт/ })).toBeVisible();

    await page.getByRole("searchbox", { name: "Пошук корисних матеріалів" }).fill("розет");
    await expect(
      page.getByRole("heading", { name: /Скільки розеток потрібно у квартирі/ })
    ).toBeVisible();
  });

  test("Опублікована стаття: контент, canonical, JSON-LD і CTA", async ({ page }) => {
    const path = "/useful/skilky-rozetok-potribno-u-kvartyri";
    await page.goto(BASE_URL + path);
    await expect(page.getByText("Щось пішло не так")).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("Скільки розеток потрібно у квартирі");
    await expect(page.getByRole("heading", { name: "Постійна техніка" })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://irina-design.vercel.app${path}`
    );
    expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThanOrEqual(2);
    await expect(page.locator('[data-cta-name="article_to_contact"]')).toBeVisible();
  });

  test("Портфолио: фильтры, модалка и ссылки на отдельные кейсы", async ({ page }) => {
    await page.goto(BASE_URL + "/portfolio");
    await expect(page.locator('button:has-text("Всі проєкти")')).toBeVisible();
    await expect(page.locator('button:has-text("Інтер\'єр")')).toBeVisible();
    await expect(page.locator('button:has-text("Меблі")')).toBeVisible();

    const firstCase = page.locator('[data-cta-name^="portfolio_card_"]').first();
    await firstCase.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('[role="dialog"] h2')).toBeVisible();
    await page.keyboard.press("Escape");

    const caseLink = page.locator('[data-cta-name="portfolio_case_link_i1"]');
    await expect(caseLink).toHaveAttribute("href", "/portfolio/zhytlovyi-interier-120-m2");
  });

  test("Окрема сторінка кейсу: H1, canonical, галерея та CTA", async ({ page }) => {
    const path = "/portfolio/zhytlovyi-interier-120-m2";
    await page.goto(BASE_URL + path);
    await expect(page.locator("h1")).toContainText("Житловий інтер'єр");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://irina-design.vercel.app${path}`
    );
    await expect(page.getByRole("heading", { name: "Галерея проєкту" })).toBeVisible();
    await expect(page.locator('[data-cta-name="case_i1_estimate"]')).toBeVisible();
  });

  test("Услуги: 4 формата, FAQ и калькулятор", async ({ page }) => {
    await page.goto(BASE_URL + "/services");
    const prices = page.locator("text=/від \\d+|за запитом/");
    await expect(prices).toHaveCount(4);
    await expect(page.locator("text=Часті запитання")).toBeVisible();
    await expect(page.locator("text=Скільки часу займає")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Скільки може коштувати ваш проєкт" })).toBeVisible();
  });

  test("Контакты: форма, tel:-ссылка, карта и калькулятор", async ({ page }) => {
    await page.goto(BASE_URL + "/contact");
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
    const map = page.locator('iframe[src*="maps"], .map-container, [data-map]');
    await expect(map.first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Скільки може коштувати ваш проєкт" })).toBeVisible();
  });

  test("Пустой сабмит формы → обязательные ошибки без требования сообщения", async ({ page }) => {
    await page.goto(BASE_URL + "/contact");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Ім'я обов'язкове")).toBeVisible();
    await expect(page.locator("text=Телефон обов'язковий")).toBeVisible();
    await expect(page.locator("text=Оберіть тип об'єкта")).toBeVisible();
    await expect(page.locator("text=Повідомлення обов'язкове")).toHaveCount(0);
  });

  test("404: HTTP 404 со страницей; GH Pages → SPA-фолбэк на главную", async ({ page }) => {
    const response = await page.goto(BASE_URL + "/nonexistent-page-12345");
    if (BASE_URL.includes("github.io")) {
      await expect(page).toHaveURL(BASE_URL + "/");
      await expect(page.locator("h1")).toContainText("Дизайн інтер'єру");
    } else if (BASE_URL.includes("localhost")) {
      expect(response?.status()).toBe(200);
      await expect(page.locator("#root")).toBeVisible();
    } else {
      expect(response?.status()).toBe(404);
      await expect(page.locator("text=404")).toBeVisible();
    }
  });

  test("Статика: sitemap містить щонайменше 100 статей, 5 кейсів і robots", async ({ page }) => {
    const favicon = await page.request.get(BASE_URL + "/favicon.svg");
    expect(favicon.status()).toBe(200);

    const sitemap = await page.request.get(BASE_URL + "/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const sitemapText = await sitemap.text();
    const urls = (sitemapText.match(/<url>/g) || []).length;
    expect(urls).toBe(112);
    expect(sitemapText).toContain("/useful/skilky-rozetok-potribno-u-kvartyri");
    expect(sitemapText).toContain("/useful/vid-idei-do-hotovoho-interieru");
    expect(sitemapText).toContain("/portfolio/zhytlovyi-interier-120-m2");

    const robots = await page.request.get(BASE_URL + "/robots.txt");
    expect(robots.status()).toBe(200);
  });

  test("Усі опубліковані статті мають статичний HTML, H1 та canonical", async ({ page }) => {
    const sitemap = await page.request.get(BASE_URL + "/sitemap.xml");
    const sitemapText = await sitemap.text();
    const articlePaths = [...sitemapText.matchAll(/<loc>[^<]+(\/useful\/[^<]+)<\/loc>/g)].map(
      match => match[1]
    );
    expect(articlePaths.length).toBeGreaterThanOrEqual(100);

    for (const path of articlePaths) {
      const response = await page.request.get(BASE_URL + path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(html, path).toMatch(/<h1[\s>]/i);
      expect(html, path).toContain(`<link data-rh="true" rel="canonical"`);
      expect(html, path).not.toContain("Щось пішло не так");
    }
  });

  test("Усі 5 кейсів мають статичний HTML, H1 та canonical", async ({ page }) => {
    const paths = [
      "/portfolio/zhytlovyi-interier-120-m2",
      "/portfolio/komertsiinyi-prostir-kafe-85-m2",
      "/portfolio/dyzain-kukhni",
      "/portfolio/harderobna-systema",
      "/portfolio/indyvidualni-mebli",
    ];
    for (const path of paths) {
      const response = await page.request.get(BASE_URL + path);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(html, path).toMatch(/<h1[\s>]/i);
      expect(html, path).toContain(`<link data-rh="true" rel="canonical"`);
    }
  });

  test("Мобильный вид 390×844: гамбургер, плавающие CTA", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + "/");
    await expect(
      page.locator('button[aria-label*="меню"], button[aria-label*="menu"], button:has(svg)')
    ).toBeVisible();
    await expect(page.locator('[data-cta-name="floating_telegram"]')).toBeVisible();
  });

  test("Нет JS-ошибок на любой странице", async ({ page }) => {
    const routes = [
      "/",
      "/about",
      "/portfolio",
      "/portfolio/zhytlovyi-interier-120-m2",
      "/services",
      "/useful",
      "/useful/skilky-rozetok-potribno-u-kvartyri",
      "/contact",
    ];
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