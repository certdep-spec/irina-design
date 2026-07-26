import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import { FiBox, FiHome } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

/**
 * Home Page
 * Landing page with hero, trust block, intro, services preview, and portfolio preview
 */
const Home: React.FC = () => {
  // Refs for scroll reveal
  const [introRef, introVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [workRef, workVisible] = useScrollReveal();

  return (
    <div>
      <Helmet>
        <title>Дизайн інтер'єру та меблів у Вінниці | Студія Ірини</title>
        <meta
          name="description"
          content="Створюємо простір мрії — від технічного планування до повного дизайн-проєкту меблів та інтер'єру у Вінниці."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Дизайн інтер'єру та меблів Ірини",
              "image": "https://irina-design.netlify.app/Paint/1image1.webp",
              "description": "Професійний дизайн інтер'єру та меблів у Вінниці. Створюємо простори, в яких хочеться жити.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Вінниця",
                "addressCountry": "UA"
              },
              "telephone": "+380964599885",
              "email": "irina26408@gmail.com",
              "url": "https://irina-design.netlify.app",
              "priceRange": "$$$"
            }
          `}
        </script>
      </Helmet>

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
            Раціональне використання бюджету
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">✔</span>
            Супровід від ідеї до реалізації
          </div>
        </div>
      </section>

      {/* Brief Intro */}
      <section
        ref={introRef}
        className={`section-padding bg-stone-50 ${introVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-stone-800">
            Професійний підхід до кожного квадратного метра
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            Дизайн інтер'єру — це продумана ергономіка, технічна грамотність і зважені рішення, які
            допомагають уникнути помилок. Ми створюємо простір, у якому кожен елемент гармонійно
            займає своє місце.
          </p>
          <Link
            to="/about"
            className="text-stone-800 font-medium border-b-2 border-stone-800 hover:text-stone-600 hover:border-stone-600 transition-all"
          >
            Більше про наші принципи роботи
          </Link>
        </div>
      </section>

      {/* Mid-page CTA Section */}
      <section className="bg-stone-200 py-16 px-6 border-y border-stone-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-stone-800">
            Отримайте індивідуальну пропозицію
          </h2>
          <Link
            to="/contact#contact-form"
            className="btn-primary inline-flex items-center justify-center min-w-[240px] shadow-lg hover:-translate-y-1 transition-all"
          >
            Обговорити ваш проєкт
          </Link>
        </div>
      </section>

      {/* Services Highlights */}
      <section
        ref={servicesRef}
        className={`section-padding ${servicesVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
            Рішення під ваші задачі
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Планування",
                desc: "Розробка ідеальної ергономіки та перепланування приміщення для тих, хто робить ремонт самостійно.",
              },
              {
                title: "Повний проєкт",
                desc: "Фотореалістична візуалізація та повний пакет креслень.",
              },
              {
                title: "Авторський супровід",
                desc: "Комплектація меблями та контроль за точним виконанням робіт.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-100"
              >
                <h3 className="text-xl font-serif font-semibold mb-3 text-stone-800">
                  {service.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section
        ref={workRef}
        className={`section-padding bg-stone-50 ${workVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
            Реалізовані рішення та візуалізації
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Напрям 1: Дизайн інтер'єру */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-stone-100 group-hover:bg-stone-800 group-hover:text-white transition-colors rounded-full flex items-center justify-center mb-6">
                <FiHome size={32} />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-800">
                Дизайн інтер'єру
              </h3>
              <ul className="space-y-3 text-stone-600 mb-8 font-light">
                <li>• Житлові квартири та будинки</li>
                <li>• Комерційні приміщення та офіси</li>
                <li>• Робочі креслення та 3D візуалізація</li>
                <li>• Авторський нагляд за виконанням</li>
              </ul>
              <Link
                to="/portfolio?filter=interior"
                className="btn-secondary w-full block text-center min-h-[48px] pt-3"
              >
                Переглянути інтер'єри
              </Link>
            </div>
            {/* Напрям 2: Проєктування меблів */}
            <div className="bg-white p-8 rounded-xl border border-stone-200 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-stone-100 group-hover:bg-stone-800 group-hover:text-white transition-colors rounded-full flex items-center justify-center mb-6">
                <FiBox size={32} />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4 text-stone-800">
                Проєктування меблів
              </h3>
              <ul className="space-y-3 text-stone-600 mb-8 font-light">
                <li>• Кухні за індивідуальними розмірами</li>
                <li>• Системи зберігання та гардеробні</li>
                <li>• Технічна документація для виробництва</li>
                <li>• Підбір якісних матеріалів та фурнітури</li>
              </ul>
              <Link
                to="/portfolio?filter=furniture"
                className="btn-secondary w-full block text-center min-h-[48px] pt-3"
              >
                Дивитись проєкти меблів
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Відгуки */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
            Відгуки наших клієнтів
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Світлана",
                role: "Власниця квартири у Вінниці",
                text: "Ірина розробила повний проєкт нашої трикімнатної квартири. Найбільше сподобалось, що будівельники не мали жодного питання до креслень. Все чітко і зрозуміло.",
              },
              {
                name: "Олександр",
                role: "Приватний підприємець",
                text: "Замовляли проєкт офісу. Результат перевершив очікування — простір став не тільки стильним, а й дуже функціональним для команди.",
              },
              {
                name: "Тетяна",
                role: "Клієнт (дизайн кухні)",
                text: "Проєкт кухні був продуманий до міліметра. Вдалося розмістити всю техніку, про яку я мріяла, навіть у невеликому приміщенні.",
              },
            ].map((t, i) => (
              <div key={i} className="p-8 bg-stone-50 rounded-xl border border-stone-100 italic">
                <p className="text-stone-600 mb-6 font-light">"{t.text}"</p>
                <div className="not-italic">
                  <p className="font-semibold text-stone-800">{t.name}</p>
                  <p className="text-xs text-stone-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="section-padding bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Створимо ваш ідеальний інтер'єр разом
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Готові почати трансформацію вашого простору? Напишіть нам для першої консультації.
          </p>
          <Link
            to="/contact#contact-form"
            className="bg-white text-stone-900 px-10 py-4 rounded-sm hover:bg-stone-100 transition-all duration-300 font-bold tracking-wide inline-block shadow-lg"
          >
            Почати розробку проєкту
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
