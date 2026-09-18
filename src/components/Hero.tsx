import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assetUrl } from "../lib/asset";

/**
 * Hero Component
 * Main landing section focused on a clear local offer and conversion.
 * Uses responsive WebP images for performance (640w/1024w/1920w).
 */
const Hero: React.FC = () => {
  // На сервере (пререндер) не прячем контент под opacity:0 —
  // иначе статический HTML героя невидим до гидрации.
  const SSR = import.meta.env.SSR;
  const appear = (delay: number) =>
    SSR
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring" as const, bounce: 0, duration: 0.6, delay },
        };
  const appearSlow = SSR
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { type: "spring" as const, bounce: 0, duration: 0.8, delay: 0.2 },
      };

  return (
    <section className="relative h-screen-dvh min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <picture>
          <source
            type="image/webp"
            srcSet={`${assetUrl("/Paint/hero-main-640w.webp")} 640w, ${assetUrl("/Paint/hero-main-1024w.webp")} 1024w, ${assetUrl("/Paint/hero-main-1920w.webp")} 1920w`}
            sizes="100vw"
          />
          <img
            src={assetUrl("/Paint/hero-main.webp")}
            alt="Сучасний дизайн інтер'єру у Вінниці"
            className="w-full h-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50"></div>
      </div>

      <motion.div
        {...appearSlow}
        className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto -mt-16"
      >
        <motion.p
          {...appear(0.2)}
          className="text-xs md:text-sm uppercase tracking-[0.24em] text-stone-200 mb-5"
        >
          Вінниця та область. Працюю також дистанційно по Україні
        </motion.p>
        <motion.h1
          {...appear(0.3)}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight"
        >
          Дизайн інтер'єру <span className="text-stone-300">та меблів</span>
        </motion.h1>
        <motion.p
          {...appear(0.5)}
          className="text-lg md:text-xl mb-4 font-light tracking-wide text-stone-100 max-w-3xl mx-auto"
        >
          Створюю інтер’єри від першого планування до креслень, візуалізацій і меблів на замовлення.
        </motion.p>
        <motion.p
          {...appear(0.58)}
          className="text-sm md:text-base mb-9 text-stone-200 max-w-2xl mx-auto"
        >
          Розкажіть, який у вас об'єкт і його площа. Я підкажу, з чого краще почати і скільки приблизно коштуватиме робота.
        </motion.p>
        <motion.div {...appear(0.7)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact#contact-form"
            data-cta-name="hero_estimate"
            className="btn-primary min-h-[52px] flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            Дізнатися вартість
          </Link>
          <Link
            to="/portfolio"
            data-cta-name="hero_portfolio"
            className="btn-secondary border-white text-white hover:bg-white hover:text-stone-900 min-h-[52px] flex items-center justify-center"
          >
            Переглянути проєкти
          </Link>
        </motion.div>
        <motion.p {...appear(0.85)} className="mt-5 text-xs md:text-sm text-stone-200">
          Для першої розмови достатньо площі та короткого опису задачі
        </motion.p>
      </motion.div>

      <motion.div
        {...(SSR
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.2, duration: 0.6 },
            })}
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
