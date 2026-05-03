import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Hero Component
 * Main landing section with call-to-action and SEO improvements
 */
const Hero: React.FC = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/Paint/hero-main.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/15"></div>
      </div>

      {/* Content */}
      <div 
        ref={ref}
        className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto -mt-24 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 leading-tight">
          Дизайн інтер'єру та меблів <span className="text-stone-300">у Вінниці</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 font-light tracking-wide text-stone-100 max-w-2xl mx-auto">
          Продумані рішення, які економлять ваш бюджет і виглядають так само добре в реальності, як і на візуалізації
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/portfolio" className="btn-primary min-h-[52px] flex items-center justify-center">
            Переглянути проєкти
          </Link>
          <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-stone-900 min-h-[52px] flex items-center justify-center">
            Безкоштовна консультація
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