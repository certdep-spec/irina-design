import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Hero Component
 * Main landing section with call-to-action and SEO improvements
 * Uses responsive WebP images for performance (640w/1024w/1920w)
 */
const Hero: React.FC = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
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
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Content */}
      <div 
        ref={ref}
        className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto -mt-24 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
          Естетика та ергономіка <span className="text-stone-300">вашого простору</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 font-light tracking-wide text-stone-100 max-w-2xl mx-auto">
          Створюємо інтер’єри та меблі, що відображають ваш стиль життя. Раціональне інвестування в комфорт без переробок.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero