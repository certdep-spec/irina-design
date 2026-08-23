import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import { initAnalytics, trackPageView } from "./lib/analytics";
const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));

function PageLoader() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-stone-400"
    >
      <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
      <p className="font-serif text-lg tracking-wide">Завантаження...</p>
    </div>
  );
}

function App() {
  const location = useLocation();

  // SPA navigation keeps the old scroll position, which makes a new page look
  // cut off / "not opened". Scroll to the top on every route change, except
  // when a hash anchor is present (the target page scrolls to it itself).
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  // gtag('config') already fires page_view for the initial URL, so the first
  // effect run only records that path without re-sending it.
  const lastTrackedPath = useRef<string | null>(null);

  // Инициализируем глобальные слушатели один раз (scroll_depth + cta_click).
  useEffect(() => {
    initAnalytics();
  }, []);

  // SPA route change → GA4 page_view (otherwise only '/' would ever be tracked)
  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    if (lastTrackedPath.current === null) {
      lastTrackedPath.current = path;
      return;
    }
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;
    // page_title is omitted on purpose: GA4 reads document.title at event time
    // (react-helmet-async updates it asynchronously, so passing it here could be stale)
    trackPageView(path);
  }, [location.pathname, location.search]);

  return (
    <ErrorBoundary>
      {/* Global social-sharing defaults, merged with per-page Helmet tags.
          Kept out of index.html so the prerendered static HTML has exactly
          one og:image / twitter:card per page. */}
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:image" content="https://irina-design.vercel.app/Paint/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://irina-design.vercel.app/Paint/og-image.jpg" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow overflow-x-clip">
          <Suspense fallback={<PageLoader />}>
            {/* No AnimatePresence here: its exit management hung when the page
                being left contained a scroll-linked motion value (the pinned
                portfolio gallery), freezing the app on a blank page. The key
                remount still plays the enter animation. */}
            <motion.div
              key={location.pathname}
              initial={import.meta.env.SSR ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </motion.div>
          </Suspense>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </ErrorBoundary>
  );
}

export default App;
