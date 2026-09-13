/**
 * Централізована GA4-аналітика.
 * Події: page_view, scroll_depth, cta_click, contact_click, form_start, form_submit, cost_estimate.
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

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (window.__analyticsScrollDepths) return;
  window.__analyticsScrollDepths = new Set<number>();

  const handleScroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    if (!pageHeight) return;
    const scrollPercent = Math.round(((window.scrollY + window.innerHeight) / pageHeight) * 100);
    [25, 50, 75, 100].forEach(milestone => {
      const seen = window.__analyticsScrollDepths!;
      if (scrollPercent >= milestone && !seen.has(milestone)) {
        seen.add(milestone);
        trackEvent("scroll_depth", { depth_percent: milestone, page_path: location.pathname });
      }
    });
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  const handleGlobalClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const ctaElement = target.closest("[data-cta-name]");
    if (ctaElement) {
      trackEvent("cta_click", {
        cta_name: ctaElement.getAttribute("data-cta-name") || "",
        page_path: location.pathname,
      });
    }

    const link = target.closest("a") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    let contactType = "";
    if (href.startsWith("tel:")) contactType = "phone";
    else if (href.startsWith("mailto:")) contactType = "email";
    else if (/t\.me|telegram/i.test(href)) contactType = "telegram";
    else if (/viber/i.test(href)) contactType = "viber";
    else if (/instagram/i.test(href)) contactType = "instagram";

    if (contactType) {
      trackEvent("contact_click", {
        contact_type: contactType,
        page_path: location.pathname,
      });
    }
  };
  window.addEventListener("click", handleGlobalClick);
}

export function trackPageView(path: string): void {
  window.__analyticsScrollDepths?.clear();
  trackEvent("page_view", { page_path: path });
}

export function trackFormStart(pagePath: string): void {
  trackEvent("form_start", { page_path: pagePath });
}

export function trackFormSubmit(pagePath: string): void {
  trackEvent("form_submit", { page_path: pagePath });
}

export { trackEvent };
