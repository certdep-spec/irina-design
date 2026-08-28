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
const Useful = lazy(() => import("./pages/Useful"));
const UsefulArticle = lazy(() => import("./pages/UsefulArticle"));
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
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  const lastTrackedPath = useRef<string | null>(null);
  useEffect(() => {
    initAnalytics();
  }, []);
  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    if (lastTrackedPath.current === null) {
      lastTrackedPath.current = path;
      return;
    }
    if (lastTrackedPath.current === path) return;
    lastTrackedPath.current = path;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return (
    <ErrorBoundary>
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
                <Route path="/useful" element={<Useful />} />
                <Route path="/useful/:slug" element={<UsefulArticle />} />
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
