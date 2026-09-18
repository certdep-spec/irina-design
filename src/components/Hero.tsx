import React from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../lib/asset";

/**
 * Main landing hero. Kept intentionally lightweight because it contains the LCP image.
 */
const Hero: React.FC = () => {
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

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto -mt-16">
        <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-stone-200 mb-5">
          Вінниця та область. Працюю також дистанційно по Україні
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
          Дизайн інтер'єру <span className="text-stone-300">та меблів</span>
        </h1>
        <p className="text-lg md:text-xl mb-4 font-light tracking-wide text-stone-100 max-w-3xl mx-auto">
          Створюю інтер’єри від першого планування до креслень, візуалізацій і меблів на замовлення.
        </p>
        <p className="text-sm md:text-base mb-9 text-stone-200 max-w-2xl mx-auto">
          Розкажіть, який у вас об'єкт і його площа. Я підкажу, з чого краще почати і скільки приблизно коштуватиме робота.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
        <p className="mt-5 text-xs md:text-sm text-stone-200">
          Для першої розмови достатньо площі та короткого опису задачі
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
