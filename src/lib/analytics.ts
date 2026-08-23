/**
 * src/lib/analytics.ts
 * Централизованная GA4-аналитика (вынесена из App.tsx).
 *
 * События:
 *  - page_view        — при SPA-навигации (вместо дубля начального gtag config)
 *  - scroll_depth      — на отметках 25/50/75/100% прокрутки
 *  - cta_click         — клики по элементам с data-cta-name
 *  - form_start        — первое взаимодействие с формой (оживлён hasStartedFilling)
 *  - form_submit       — успешная отправка брифа
 *
 * gtag загружается из index.html (gtag.js). Если его нет — вызовы тихо игнорируются.
 */

type GtagParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event" | "config" | "js", ...args: unknown[]) => void;
    __analyticsScrollDepths?: Set<number>;
  }
}

const trackEvent = (eventName: string, params: GtagParams = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

/** Инициализация глобальных слушателей (scroll_depth + cta_click). Один раз. */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (window.__analyticsScrollDepths) return; // уже инициализировано
  window.__analyticsScrollDepths = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );
    const milestones = [25, 50, 75, 100];
    milestones.forEach(milestone => {
      const seen = window.__analyticsScrollDepths!;
      if (scrollPercent >= milestone && !seen.has(milestone)) {
        seen.add(milestone);
        trackEvent("scroll_depth", { depth_percent: milestone, page_path: location.pathname });
      }
    });
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  const handleGlobalClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const ctaElement = target.closest("[data-cta-name]");
    if (ctaElement) {
      trackEvent("cta_click", {
        cta_name: ctaElement.getAttribute("data-cta-name") || "",
        page_path: location.pathname,
      });
    }
  };
  window.addEventListener("click", handleGlobalClick);
}

/** SPA-навигация: шлём page_view для нового пути (кроме первого, который уже учтён gtag config). */
export function trackPageView(path: string): void {
  trackEvent("page_view", { page_path: path });
}

/** Первое взаимодействие с формой брифа. */
export function trackFormStart(pagePath: string): void {
  trackEvent("form_start", { page_path: pagePath });
}

/** Успешная отправка брифа. */
export function trackFormSubmit(pagePath: string): void {
  trackEvent("form_submit", { page_path: pagePath });
}

export { trackEvent };
