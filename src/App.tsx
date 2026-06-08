import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
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

function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll Depth Tracking for GA4
    let trackedDepths = new Set<number>();
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedDepths.has(milestone)) {
          trackedDepths.add(milestone);
          if ((window as any).gtag) {
            (window as any).gtag('event', 'scroll_depth', {
              'depth_percent': milestone,
              'page_path': location.pathname
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Global CTA Click Tracking
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const ctaElement = target.closest('[data-cta-name]');
      if (ctaElement && (window as any).gtag) {
        (window as any).gtag('event', 'cta_click', {
          'cta_name': ctaElement.getAttribute('data-cta-name'),
          'page_path': location.pathname
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>

          </Suspense>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </ErrorBoundary>
  )
}

export default App