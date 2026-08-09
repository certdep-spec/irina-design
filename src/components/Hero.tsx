import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Hero Component
 * Main landing section with call-to-action and SEO improvements
 * Uses responsive WebP images for performance (640w/1024w/1920w)
 */
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen-dvh min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image — responsive WebP with fallback */}
      <div className="absolute inset-0">
        <picture>
          <source
            type="image/webp"
            srcSet="/Paint/hero-main-640w.webp 640w, /Paint/hero-main-1024w.webp 1024w, /Paint/hero-main-1920w.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/Paint/hero-main.webp"
            alt="Сучасний дизайн інтер'єру — студія у Вінниці"
            className="w-full h-full object-cover"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto -mt-24"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight"
        >
          Дизайн інтер'єру <span className="text-stone-300">та меблів</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl mb-10 font-light tracking-wide text-stone-100 max-w-2xl mx-auto"
        >
          Створюємо інтер'єри та меблі, що відображають ваш стиль життя. Раціональне інвестування в
          комфорт без переробок.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact#contact-form"
            data-cta-name="hero_consultation"
            className="btn-primary min-h-[52px] flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            Безкоштовна консультація
          </Link>
          <Link
            to="/portfolio"
            data-cta-name="hero_portfolio"
            className="btn-secondary border-white text-white hover:bg-white hover:text-stone-900 min-h-[52px] flex items-center justify-center"
          >
            Переглянути проєкти
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
