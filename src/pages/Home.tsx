import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import { FiBox, FiHome, FiCheck, FiArrowRight, FiMonitor } from "react-icons/fi";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../lib/asset";

/**
 * Home Page
 * Landing page with hero, trust block, intro, services preview, and portfolio preview
 */
const Home: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Дизайн інтер'єру та меблів у Вінниці | Студія Ірини</title>
        <link rel="canonical" href="https://irina-design.vercel.app/" />
        <meta
          name="description"
          content="Створюємо простір мрії — від технічного планування до повного дизайн-проєкту меблів та інтер'єру у Вінниці."
        />
        <meta property="og:url" content="https://irina-design.vercel.app/" />
        <meta property="og:title" content="Дизайн інтер'єру та меблів у Вінниці | Студія Ірини" />
        <meta
          property="og:description"
          content="Створюємо простір мрії — від технічного планування до повного дизайн-проєкту меблів та інтер'єру у Вінниці."
        />
        <meta name="twitter:title" content="Дизайн інтер'єру та меблів у Вінниці | Студія Ірини" />
        <meta
          name="twitter:description"
          content="Створюємо простір мрії — від технічного планування до повного дизайн-проєкту меблів та інтер'єру у Вінниці."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Ірина · Interior Design",
              "image": "https://irina-design.vercel.app/Paint/og-image.jpg",
              "description": "Професійний дизайн інтер'єру та меблів у Вінниці. Створюємо простори, в яких хочеться жити.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Вінниця",
                "addressCountry": "UA"
              },
              "telephone": "+380964599885",
              "email": "irina26408@gmail.com",
              "url": "https://irina-design.vercel.app",
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
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">
              <FiCheck size={16} />
            </span>
            Реалістичні 3D-візуалізації
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">
              <FiCheck size={16} />
            </span>
            Раціональне використання бюджету
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-100 bg-stone-800 p-2 rounded-full">
              <FiCheck size={16} />
            </span>
            Супровід від ідеї до реалізації
          </div>
        </div>
      </section>

      {/* Brief Intro */}
      <Reveal as="section" className="section-padding bg-stone-50">
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
      </Reveal>

      {/* Mid-page CTA Section */}
      <section className="bg-stone-200 py-16 px-6 border-y border-stone-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-stone-800">
            Отримайте індивідуальну пропозицію
          </h2>
          <Link
            to="/contact#contact-form"
            data-cta-name="home_individual_offer"
            className="btn-primary inline-flex items-center justify-center min-w-[240px] shadow-lg hover:-translate-y-1 transition-all"
          >
            Обговорити ваш проєкт
          </Link>
        </div>
      </section>

      {/* Services Highlights */}
      <Reveal as="section" className="section-padding">
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
      </Reveal>

      {/* Portfolio Preview — bento grid */}
      <Reveal as="section" className="section-padding bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
            Реалізовані рішення та візуалізації
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[220px]">
            {/* Big card: Дизайн інтер'єру */}
            <Link
              to="/portfolio?filter=interior"
              data-cta-name="home_bento_interior"
              className="relative overflow-hidden rounded-2xl group min-h-[280px] md:min-h-0 md:col-span-2 md:row-span-2"
            >
              <img
                src={assetUrl("/archives/living/001.webp")}
                alt="Дизайн інтер'єру — житлові простори"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/25 to-stone-900/10"></div>
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  <FiHome className="text-white" size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white mb-3">
                  Дизайн інтер'єру
                </h3>
                <p className="text-stone-200 text-sm md:text-base font-light mb-6 max-w-md leading-relaxed">
                  Житлові квартири та будинки, комерційні приміщення, робочі креслення та
                  3D-візуалізація, авторський нагляд.
                </p>
                <span className="inline-flex items-center gap-2 text-white font-medium border-b-2 border-white/60 pb-1 w-fit group-hover:border-white transition-colors">
                  Переглянути інтер'єри <FiArrowRight size={18} />
                </span>
              </div>
            </Link>

            {/* Small card: Проєктування меблів */}
            <Link
              to="/portfolio?filter=furniture"
              data-cta-name="home_bento_furniture"
              className="relative overflow-hidden rounded-2xl group min-h-[220px]"
            >
              <img
                src={assetUrl("/archives/kitchen/001.webp")}
                alt="Проєктування меблів — кухні та системи зберігання"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-stone-900/5"></div>
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <FiBox className="text-white" size={22} />
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-2">
                  Проєктування меблів
                </h3>
                <span className="inline-flex items-center gap-2 text-stone-200 text-sm font-medium group-hover:text-white transition-colors">
                  Дивитись проєкти <FiArrowRight size={16} />
                </span>
              </div>
            </Link>

            {/* Small card: Авторський супровід */}
            <Link
              to="/services"
              data-cta-name="home_bento_support"
              className="relative overflow-hidden rounded-2xl group min-h-[220px]"
            >
              <img
                src={assetUrl("/archives/comercial/001.webp")}
                alt="Авторський супровід проєкту"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-stone-900/5"></div>
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                  <FiMonitor className="text-white" size={22} />
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-2">
                  Авторський супровід
                </h3>
                <span className="inline-flex items-center gap-2 text-stone-200 text-sm font-medium group-hover:text-white transition-colors">
                  Контроль реалізації <FiArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Reveal>

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
            data-cta-name="home_start_project"
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
