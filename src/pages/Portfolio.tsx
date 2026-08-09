import { useState, useEffect, useRef, useCallback } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Helmet } from "react-helmet-async";
import { FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { portfolioCases as staticCases, type PortfolioCase } from "../data/portfolio";
import { Image } from "../components/Image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { Reveal } from "../components/Reveal";

function Portfolio() {
  const location = useLocation();
  const navigate = useNavigate();

  const getFilterFromURL = useCallback((): "all" | "interior" | "furniture" => {
    const params = new URLSearchParams(location.search);
    const filterParam = params.get("filter");
    if (filterParam === "interior" || filterParam === "furniture") {
      return filterParam;
    }
    return "all";
  }, [location.search]);

  const [cases] = useState<PortfolioCase[]>(staticCases);
  const [selectedItem, setSelectedItem] = useState<PortfolioCase | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Pinned horizontal gallery only on desktop without reduced-motion;
  // everywhere else we fall back to a regular grid.
  const [usePinned, setUsePinned] = useState(false);
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUsePinned(mqDesktop.matches && !mqReduced.matches);
    update();
    mqDesktop.addEventListener("change", update);
    mqReduced.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqReduced.removeEventListener("change", update);
    };
  }, []);

  const activeFilter = getFilterFromURL();

  const handleFilterChange = (filter: "all" | "interior" | "furniture") => {
    const params = new URLSearchParams(location.search);
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    navigate({ search: params.toString() }, { replace: true });
  };

  const filteredCases = cases.filter(item => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  // Modal: close on Escape, lock body scroll, focus the close button on open
  useEffect(() => {
    if (!selectedItem) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedItem]);

  // Pinned gallery: page-scroll driven horizontal travel.
  // Measured manually (not target-based useScroll) because the section mounts
  // after the first render, which breaks target offset measurement.
  const { scrollY } = useScroll();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinMetrics, setPinMetrics] = useState({ start: 0, range: 1 });
  const [trackTravel, setTrackTravel] = useState(0);
  useEffect(() => {
    if (!usePinned) return;
    const measure = () => {
      if (pinRef.current && trackRef.current) {
        const start = pinRef.current.getBoundingClientRect().top + window.scrollY;
        const range = Math.max(1, pinRef.current.offsetHeight - window.innerHeight);
        setPinMetrics({ start, range });
        setTrackTravel(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [usePinned, filteredCases.length]);
  const trackX = useTransform(
    scrollY,
    [pinMetrics.start, pinMetrics.start + pinMetrics.range],
    [0, -trackTravel]
  );

  const handleCardKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>, item: PortfolioCase) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedItem(item);
    }
  };

  const renderCard = (item: PortfolioCase, index: number, pinned: boolean) => (
    <motion.div
      key={item.id}
      layoutId={`card-${item.id}`}
      data-cta-name={`portfolio_card_${item.id}`}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${item.title} — відкрити проєкт`}
      onKeyDown={(e) => handleCardKeyDown(e, item)}
      onClick={() => setSelectedItem(item)}
      className={`bg-white rounded-xl overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group relative cursor-pointer flex flex-col h-full border border-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-800 focus-visible:ring-offset-2 ${
        pinned ? "w-[72vw] sm:w-[400px] lg:w-[460px] flex-shrink-0" : ""
      }`}
    >
      {/* Image Wrapper */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <Image
          baseSrc={item.coverImage}
          alt={item.title}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          className="transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px]">
          <span className="text-white font-medium px-6 py-3 border-2 border-white/80 rounded tracking-wide bg-black/20 hover:bg-white hover:text-stone-900 transition-colors">
            Детальніше
          </span>
        </div>

        {/* Category Badge on image */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-wider uppercase text-stone-700 rounded-sm shadow-sm z-10">
          {item.category === "interior" ? "Інтер'єр" : "Меблі"}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-semibold text-stone-800 group-hover:text-stone-600 transition-colors">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );

  const emptyState = (
    <div className="text-center py-20">
      <p className="text-stone-500 text-lg">Проєктів у цій категорії поки немає.</p>
    </div>
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      <Helmet>
        <title>Портфоліо — Дизайнер інтер'єру Ірина</title>
        <meta
          name="description"
          content="Портфоліо робіт дизайнера інтер'єру та меблів. Реалізовані проекти квартир, будинків, індивідуальні меблі."
        />
      </Helmet>
      {/* Hero Section */}
      <Reveal as="section" className="bg-white py-24 px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-8 text-stone-800">
            Інтер'єрні та меблеві рішення
          </h1>
          {/* Студійний акцент з підкресленням замість фону */}
          <p className="inline-block text-xl md:text-2xl text-stone-500 font-light pb-2 border-b-2 border-stone-300">
            Комплексні проєкти: від планування простору до індивідуального дизайну меблів
          </p>
        </div>
      </Reveal>

      {/* Intro Text & Filters */}
      <Reveal as="section" className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-stone-600 leading-relaxed mb-12">
            Кожен проєкт — це індивідуальне рішення, адаптоване під стиль життя клієнта, особливості
            простору та бюджет. Тут ви можете побачити приклади реалізованих ідей.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-100 active:scale-[0.96] ${activeFilter === "all" ? "bg-stone-800 text-white shadow-md" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"}`}
            >
              Всі проєкти
            </button>
            <button
              onClick={() => handleFilterChange("interior")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-100 active:scale-[0.96] ${activeFilter === "interior" ? "bg-stone-800 text-white shadow-md" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"}`}
            >
              Інтер'єр
            </button>
            <button
              onClick={() => handleFilterChange("furniture")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-100 active:scale-[0.96] ${activeFilter === "furniture" ? "bg-stone-800 text-white shadow-md" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"}`}
            >
              Меблі
            </button>
          </div>
        </div>
      </Reveal>

      {/* Portfolio Grid / Pinned Gallery */}
      {usePinned ? (
        <section className="pb-24 px-6">
          <div ref={pinRef} className="relative h-[350vh]">
            <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden">
              <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800">
                  Реалізовані рішення та візуалізації
                </h2>
              </div>
              <motion.div ref={trackRef} style={{ x: trackX }} className="flex gap-8 px-6 md:px-12 items-stretch">
                {filteredCases.map((item, index) => renderCard(item, index, true))}
              </motion.div>
            </div>
          </div>
          {filteredCases.length === 0 && emptyState}
        </section>
      ) : (
        <Reveal as="section" className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((item, index) => renderCard(item, index, false))}
            </div>
            {filteredCases.length === 0 && emptyState}
          </div>
        </Reveal>
      )}

      {/* Modal / Gallery */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl relative shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                ref={closeBtnRef}
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-800 transition-colors z-20 bg-stone-100 hover:bg-stone-200 rounded-full p-2"
                aria-label="Закрити"
              >
                <FiX size={24} />
              </button>

              {/* Modal Content */}
              <div className="p-8 md:p-14">
                <div className="mb-12 max-w-3xl">
                  <div className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-wider uppercase mb-4 rounded-sm">
                    {selectedItem.category === "interior" ? "Інтер'єрний проєкт" : "Дизайн меблів"}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-4 text-stone-800 leading-tight">
                    {selectedItem.title}
                  </h2>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedItem.gallery.map((img, index) => (
                    <div key={index} className="aspect-[4/3] overflow-hidden bg-stone-200 rounded-xl">
                      <Image
                        baseSrc={img}
                        alt={`${selectedItem.title} - photo ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Portfolio;
