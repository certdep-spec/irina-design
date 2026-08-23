# План устранения замечаний и тестов работоспособности трёх зеркал

## Цель

Устранить замечания аудита (безопасность → паритет зеркал → маркетинг → гигиена кода) и построить автоматизированные тесты, гарантирующие одинаковую работу сайта на всех трёх зеркалах: **Vercel** `irina-design.vercel.app` (канонический домен для SEO), **Netlify** `irina-design.netlify.app`, **GH Pages** `certdep-spec.github.io/irina-design/`.

## Ключевые архитектурные решения

1. **Единый API-донор для GH Pages.** У GH Pages нет serverless, поэтому форма и авторизация админки с него будут слать на абсолютный URL API Vercel. Механика: `src/constants/api.ts` получает функцию `apiUrl(path)` — если задан `VITE_API_BASE`, используется он, иначе относительный путь (Vercel/Netlify/локально — same-origin). В CI job GH Pages передаётся `VITE_API_BASE=https://irina-design.vercel.app`. На функции Vercel добавляется CORS для origin `https://certdep-spec.github.io` (+ localhost для разработки).
2. **Серверная авторизация админки.** `VITE_ADMIN_PASSWORD` полностью убирается из клиента (пароль больше не попадает в бандл). Новый эндпоинт `POST /api/admin-auth` в трёх рантаймах (`api/send-admin-auth.js`, `netlify/functions/send-admin-auth.js`, маршрут в `api-server.mjs`): сверяет пароль с env `ADMIN_PASSWORD` (без префикса `VITE_`), с rate-limit. Клиент ставит флаг сессии только после `ok` от сервера. Опасное поведение «нет пароля = панель открыта» (`Admin.tsx:102`, `api-server.mjs:64-65`) меняется на «нет пароля = вход невозможен». Пароль `ADMIN_PASSWORD` задаётся в dashboard Vercel и Netlify (инструкция для владельца после реализации).
3. **Канонический домен остаётся Vercel** для canonical/sitemap/OG — все зеркала функционально идентичны, но SEO-сигнал указывает на один хост.

## Этап 0 — тестовая база (до любых фиксов)

Новые dev-зависимости: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test`. Конфиги `vitest.config.ts` (jsdom) и `playwright.config.ts` (webServer: build → `vite preview` + `api-server.mjs` с `TEST_MODE=1`, при котором сервер не шлёт в Telegram/SMTP, а логирует и возвращает success — для E2E-проверки формы без реальных заявок).

Скрипты: `test` = vitest run, `test:e2e` = playwright test.

Юнит-тесты существующей логики (фиксируют поведение до рефакторинга): `shared/send-message` (валидация, санитизация `<>`, обрезка 1000 символов, rate-limit), ContactForm (обязательные поля, honeypot скрыт).

## Этап 1 — безопасность

1. Admin auth (решение 2): правка `Admin.tsx` (логин → POST `/api/admin-auth`), три новых серверных обработчика, удаление `VITE_ADMIN_PASSWORD` из `.env.local` и кода.
2. Honeypot на сервере: `shared/send-message.js` — заполненное поле `website` → тихий success без отправки (сейчас проверяется только на клиенте, `ContactForm.tsx:88-91`).
3. Без утечки внутренних ошибок: `api/send-telegram.js:28` не возвращает `details` наружу; `api-server.mjs:240-242` — честный статус при неудаче Telegram.
4. CORS + OPTIONS preflight на обеих serverless-функциях (нужно для GH Pages).

Тесты: admin-auth (верный/неверный пароль, 401 при отсутствии env, rate-limit), honeypot (прямой POST с `website` → 200 и ноль вызовов Telegram — мок), preflight.

## Этап 2 — паритет трёх зеркал

1. `apiUrl()` + `VITE_API_BASE` в CI для GH Pages (решение 1).
2. Реальный favicon: `public/favicon.svg` (монограмма в стиле бренда), link в `index.html` через `%BASE_URL%`; убрать битую ссылку `/vite.svg`.
3. `og:image` → jpg 1200×630 (конвертация hero через sharp), замена webp-ссылки в OG.
4. Пререндер-видимость: через `import.meta.env.SSR` задать `initial={false}` у framer-motion в `Reveal.tsx`/`Hero.tsx` — убрать `opacity:0` из статического HTML (сейчас `dist/portfolio/index.html:35`), контент виден до гидратизации.
5. E2E-проверка GH Pages с базовым путём `/irina-design/` (prerender-маршруты уже префиксируются — коммит 5ddc92f).

## Этап 3 — маркетинг (по выбору владельца)

1. **GA4-трекинг конверсий**: вынести GA-логику из `App.tsx` в `src/lib/analytics.ts`; события `form_start` (первое взаимодействие — оживить мёртвый `hasStartedFilling`) и `form_submit` (успешная отправка); `data-cta-name` на 4 нетрекаемых CTA (`Home.tsx:101,280`, `Services.tsx:207`, submit).
2. **Кейсы с описаниями**: модалка `Portfolio.tsx` показывает `meta`, `task`, `solution` (данные уже в `portfolio.json`, сейчас мертвы); карточка — строку `meta` («120 м² • мінімалізм»).
3. **FAQ + цифры доверия**: блок цифр рядом с hero (плейсхолдеры «10+ років / 40+ проєктів», помечены в коде для замены владельцем); FAQ из 5–6 вопросов на Services (сроки, что нужно для старта, этапы оплаты, дистанционная работа, область) + JSON-LD FAQPage.
4. **Единый бренд «Ірина · Interior Design»**: логотип Header, футер, title-строки, name в JSON-LD. WhatsApp и OLX не трогаем (по решению владельца).

Тесты: analytics (dataLayer push), наличие FAQPage в DOM, модалка показывает task/solution, атрибуты `data-cta-name`.

## Этап 4 — гигиена кода и CI

1. **Один источник портфолио**: источник — `src/data/portfolio.json`; копия в `public/api/portfolio.json` генерируется на build и убирается из git; `api-server` пишет в `src/data`.
2. **Мёртвый код**: удалить `src/data/services.ts`, `src/types.ts` (тип `Project`), зависимости `@sentry/browser`, `@sentry/react`, `vite-plugin-imagemin`, `imagemin-webp`, скрипт `optimize`, `stats.html` из git + в `.gitignore`; дубликат `PortfolioCase` в `Admin.tsx:7-17` → импорт из `src/data/portfolio.ts`.
3. **CI rework** (`ci.yml`): job `quality` (lint строгий — убрать `|| true` на строках 22/49/79; `tsc --noEmit`; vitest) → job `build` с локальным Playwright против preview → деплой-джобы (Netlify/Vercel из артефакта dist-root; GH Pages из dist-ghpages с `BASE_PATH` + `VITE_API_BASE`). Одна сборка на зеркало вместо трёх одинаковых.
4. **Workflow `mirror-smoke.yml`**: запуск вручную + еженедельно — Playwright против трёх прод-URL.

## Итоговый набор тестов

**Юнит (Vitest):** send-message (валидация/санитизация/honeypot/rate-limit) · admin-auth · ContactForm (валидация + события GA) · модалка кейса · analytics helper.

**E2E (Playwright), один и тот же набор для local / vercel / netlify / ghpages:**

1. Главная: H1, логотип «Ірина · Interior Design», 5 ссылок навигации
2. Все 5 маршрутов: свой h1 и per-page title/canonical
3. Портфолио: фильтры, кейс открывается, в модалке описание + фото
4. Услуги: 4 тарифа с ценами; блок FAQ присутствует
5. Контакты: форма, tel:-ссылка, карта
6. Пустой сабмит формы → ошибки валидации, без отправки
7. 404: Vercel/Netlify → HTTP 404 со страницей; GH Pages → SPA-фолбэк ведёт на главную (задокументированная особенность платформы)
8. Статика: favicon 200, sitemap.xml 200 с 5 URL, robots.txt 200
9. Мобильный вид 390×844: гамбургер, плавающие CTA
10. Только локально: сабмит формы → success (TEST_MODE); POST с honeypot → ok без отправки; POST без полей → 400
11. Коллектор pageerror — нет JS-ошибок ни на одной странице

**Критерий готовности:** `npm run lint && npx tsc --noEmit && npm test && npm run build && npm run test:e2e` зелёные локально; после деплоя mirror-smoke зелёный на всех трёх зеркалах.

## Вне скоупа (отдельные задачи позже)

CSP с nonce · framer-motion вне критического пути (−100 КБ из главного чанка) · srcset в `Image.tsx` · отдельные страницы кейсов / блог / калькулятор · IndexNow · замена плейсхолдеров цифр на реальные данные владельца.

## Порядок выполнения

Этап 0 → 1 → 2 → 3 → 4, коммит после каждого этапа; после пуша — контрольный прогон mirror-smoke на всех трёх зеркалах.
