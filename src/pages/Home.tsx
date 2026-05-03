import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { FiBox, FiHome } from 'react-icons/fi'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { services } from '../data/services'

/**
 * Home Page
 * Landing page with hero, trust block, intro, services preview, and portfolio preview
 */
const Home: React.FC = () => {

  // Refs for scroll reveal
  const [introRef, introVisible] = useScrollReveal()
  const [servicesRef, servicesVisible] = useScrollReveal()
  const [workRef, workVisible] = useScrollReveal()

  return (
    <div>
      <Hero />

      {/* Trust Section - Блок довіри */}
      <section className="bg-stone-900 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center gap-6 text-stone-300 font-medium tracking-wide text-sm md:text-base">
          <div className="flex items-center gap-3">
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">✔</span> 
            Реалістичні 3D-візуалізації
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">✔</span> 
            Проєкти під реальний бюджет
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">✔</span> 
            Супровід до реалізації
          </div>
        </div>
      </section>

      {/* Brief Intro */}
      <section 
        ref={introRef}
        className={`section-padding bg-stone-50 ${introVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-stone-800">
            Створюємо інтер'єри у Вінниці, що надихають
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
             Допомагаємо створити простір мрії — від технічного планування до повного дизайн-проєкту меблів. Беремо на себе всі деталі, щоб ви отримали ідеальний результат без зайвого клопоту.
           </p>
          <Link to="/about" className="text-stone-800 font-medium border-b-2 border-stone-800 hover:text-stone-600 hover:border-stone-600 transition-all">
            Дізнатися більше про наш досвід
          </Link>
        </div>
      </section>

      {/* Mid-page CTA Section */}
      <section className="bg-stone-200 py-16 px-6 border-y border-stone-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-stone-800">
            Хочете такий самий інтер’єр?
          </h2>
          <Link 
            to="/contact#contact-form" 
            className="btn-primary inline-flex items-center justify-center min-w-[240px] shadow-lg hover:-translate-y-1 transition-all"
          >
            Залишити заявку
          </Link>
        </div>
      </section>

      {/* Services Highlights */}
      <section 
        ref={servicesRef}
        className={`section-padding ${servicesVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
            Наші переваги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-100">
                <h3 className="text-xl font-serif font-semibold mb-3 text-stone-800">{service.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section 
        ref={workRef}
        className={`section-padding bg-stone-50 ${workVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-center mb-12 text-stone-800">
            Напрями нашої діяльності
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Напрям 1: Дизайн меблів */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-stone-100 group-hover:bg-stone-800 group-hover:text-white transition-colors rounded-full flex items-center justify-center mb-6">
                <FiBox size={32} />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-800">
                Дизайн меблів
              </h3>
              <ul className="space-y-3 text-stone-600 mb-8 font-light">
                <li>• Кухонні меблі за індивідуальними розмірами</li>
                <li>• Оптимальне зонування гардеробних</li>
                <li>• Технічне проектування вбудованих меблів</li>
                <li>• Підбір матеріалів та фурнітури</li>
              </ul>
              <Link to="/portfolio?filter=furniture" className="btn-secondary w-full block text-center min-h-[48px] pt-3">
                Дивитись проєкти меблів
              </Link>
            </div>
            {/* Напрям 2: Дизайн інтер'єру */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-stone-100 group-hover:bg-stone-800 group-hover:text-white transition-colors rounded-full flex items-center justify-center mb-6">
                <FiHome size={32} />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-800">
                Дизайн інтер'єру
              </h3>
              <ul className="space-y-3 text-stone-600 mb-8 font-light">
                <li>• Житлові приміщення</li>
                <li>• Комерційні приміщення</li>
              </ul>
              <Link to="/portfolio?filter=interior" className="btn-secondary w-full block text-center min-h-[48px] pt-3">
                Переглянути інтер'єри
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="section-padding bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Бажаєте замовити дизайн інтер'єру?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Зв'яжіться з нами для обговорення ваших ідей. Перша консультація безкоштовна!
          </p>
          <Link to="/contact#contact-form" className="bg-white text-stone-900 px-10 py-4 rounded-sm hover:bg-stone-100 transition-all duration-300 font-bold tracking-wide inline-block shadow-lg">
            Почати розробку проєкту
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home