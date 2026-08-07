import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
const Home = lazy(() => import('./pages/Home'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Admin = lazy(() => import('./pages/Admin'))

// Minimal GA4 typing: gtag is loaded from index.html
declare global {
  interface Window {
    gtag?: (command: 'event' | 'config' | 'js', ...args: unknown[]) => void;
  }
}

type GtagEventParams = Record<string, string | number | undefined>;

const trackEvent = (eventName: string, params: GtagEventParams) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

function App() {
  const location = useLocation();
  // gtag('config') already fires page_view for the initial URL, so the first
  // effect run only records that path without re-sending it.
  const lastTrackedPath = useRef<string | null>(null);

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
    trackEvent('page_view', { page_path: path });
  }, [location.pathname, location.search]);

  useEffect(() => {
    // Scroll Depth Tracking for GA4
    const trackedDepths = new Set<number>();
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedDepths.has(milestone)) {
          trackedDepths.add(milestone);
          trackEvent('scroll_depth', {
            depth_percent: milestone,
            page_path: location.pathname,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Global CTA Click Tracking
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const ctaElement = target.closest('[data-cta-name]');
      if (ctaElement) {
        trackEvent('cta_click', {
          cta_name: ctaElement.getAttribute('data-cta-name') || '',
          page_path: location.pathname,
        });
      }
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]">Loading...</div>}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
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
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </ErrorBoundary>
  )
}

export default App