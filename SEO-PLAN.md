# SEO plan for irina-design

## Goal
Increase qualified organic traffic and convert it into enquiries for interior design services.

## Phase 1 — Repository and release hygiene
- [x] Sync `conversion-improvements` with current `main`.
- [x] Preserve the latest Irina portrait from `main`.
- [x] Preserve Google Search Console verification file.
- [x] Remove the duplicated manual article list from sitemap generation.
- [x] Derive prerender routes from the generated sitemap instead of a second manual article list.
- [x] Preserve prerendered public HTML on Vercel and Netlify instead of rewriting public routes to the SPA shell.
- [x] Add regression tests for hosting SEO routes and portfolio data parity.
- [x] CI: lint, TypeScript, unit tests, build and Playwright smoke tests passed.
- [x] Review Vercel Preview.
- [x] Merge PR #1 into `main` after checks passed.

## Phase 2 — Technical SEO on production
- [ ] Verify `robots.txt` returns 200 and points to production sitemap.
- [ ] Verify `sitemap.xml` returns 200 and contains all published articles and portfolio cases.
- [ ] Check canonical tags on Home, Services, Portfolio, 5 cases and a sample of articles.
- [ ] Check prerendered HTML contains H1 and indexable text without requiring client JavaScript.
- [ ] Verify unknown URLs return a real HTTP 404.
- [ ] Check that `/admin` remains noindex.
- [ ] Validate structured data with Google Rich Results / Schema.org tools.
- [ ] Check mobile performance and Core Web Vitals after release.

## Phase 3 — Google Search Console
- [x] Verification file added to repository.
- [ ] Confirm property ownership in Search Console.
- [ ] Submit `https://irina-design.vercel.app/sitemap.xml`.
- [ ] Review Indexed / Crawled currently not indexed / Discovered currently not indexed.
- [ ] Inspect 10–20 highest-value URLs manually.
- [ ] Record baseline impressions, clicks and queries.

## Phase 4 — Commercial SEO and conversion
- [x] Strengthen homepage value proposition and lead CTA.
- [x] Simplify contact form.
- [x] Add cost estimator.
- [x] Improve Services page and remove unsupported trust claims.
- [x] Add article conversion links and CTA.
- [x] Add separate SEO case pages for existing portfolio projects.
- [x] Review the highest commercial-intent articles and strengthen 18 of them with intent-specific links to the relevant service, case and contact action.
- [ ] Add more factual detail to portfolio cases as verified project information becomes available.
- [ ] Review contact and CTA analytics after enough traffic accumulates.

## Phase 5 — Local SEO
- [x] Add ProfessionalService/local service-area structured data.
- [ ] Audit Google Business Profile.
- [x] Make business name, phone, service area and social links consistent in site content/schema.
- [ ] Update external citations that still point to the old Netlify URL.
- [ ] Add real project photos and service descriptions.
- [ ] Build a process for genuine client reviews.
- [x] Strengthen Home/Services metadata, service schema and local service-area signals for high-intent Vinnytsia searches.

## Phase 6 — Authority and backlinks
- [x] Identify relevant local/industry directories and document existing citations/targets in `LOCAL-SEO-AUDIT.md`.
- [ ] Acquire relevant editorial/local links rather than bulk low-quality links.
- [ ] Look for unlinked brand mentions and project features.

## Phase 7 — Ongoing measurement
- [x] Track CTA, contact actions, form events, cost estimate and scroll depth.
- [ ] Review Search Console weekly.
- [ ] Review leads/conversion paths monthly.
- [ ] Refresh pages losing impressions before producing large volumes of new content.
