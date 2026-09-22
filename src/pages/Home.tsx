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
        <title>Дизайн інтер'єру у Вінниці та меблі на замовлення | Ірина</title>
        <link rel="canonical" href="https://irina-design.vercel.app/" />
        <meta
          name="description"
          content="Дизайн інтер'єру у Вінниці для квартир і будинків: планування, 3D-візуалізації, робочі креслення та меблі на замовлення. Працюю також дистанційно."
        />
        <meta property="og:url" content="https://irina-design.vercel.app/" />
        <meta property="og:title" content="Дизайн інтер'єру у Вінниці та меблі на замовлення | Ірина" />
        <meta
          property="og:description"
          content="Дизайн інтер'єру у Вінниці для квартир і будинків: планування, 3D-візуалізації, робочі креслення та меблі на замовлення. Працюю також дистанційно."
        />
        <meta name="twitter:title" content="Дизайн інтер'єру у Вінниці та меблі на замовлення | Ірина" />
        <meta
          name="twitter:description"
          content="Дизайн інтер'єру у Вінниці для квартир і будинків: планування, 3D-візуалізації, робочі креслення та меблі на замовлення. Працюю також дистанційно."
        />
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
            Рішення з урахуванням вашого бюджету
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
            Спочатку — зручне планування, потім — красивий інтер'єр
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            Дизайн інтер'єру для мене починається не з декору, а з того, як ви будете користуватися
            простором щодня. Тому спочатку продумую планування, меблі й технічні рішення, а вже потім
            збираю все в цілісний інтер'єр.
          </p>
          <Link
            to="/about"
            className="text-stone-800 font-medium border-b-2 border-stone-800 hover:text-stone-600 hover:border-stone-600 transition-all"
          >
            Більше про мій підхід
          </Link>
        </div>
      </Reveal>

      {/* Mid-page CTA Section */}
      <section className="bg-stone-200 py-16 px-6 border-y border-stone-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-stone-800">
            Не знаєте, з чого почати?
          </h2>
          <p className="text-stone-600 text-lg mb-8 max-w-2xl mx-auto">
            Надішліть план або просто напишіть площу й що хочете змінити — цього достатньо для першої розмови.
          </p>
          <Link
            to="/contact#contact-form"
            data-cta-name="home_individual_offer"
            className="btn-primary inline-flex items-center justify-center min-w-[240px] shadow-lg hover:-translate-y-1 transition-all"
          >
            Розповісти про об'єкт
          </Link>
        </div>
      </section>

      {/* Services Highlights */}
      <Reveal as="section" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
            Що можна замовити
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Планування",
                desc: "Кілька варіантів планування з меблями, проходами та можливим переплануванням — до початку ремонту.",
              },
              {
                title: "Повний проєкт",
                desc: "Планування, 3D-візуалізації та комплект робочих креслень, за якими можна вести ремонт.",
              },
              {
                title: "Авторський супровід",
                desc: "Під час ремонту допомагаю звіряти рішення з проєктом і розбирати питання, які виникають на об'єкті.",
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
            Проєкти інтер'єрів і меблів
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
                src={assetUrl("/archives/comercial/к001.webp")}
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

      {/* Useful guides — internal links for users and search engines */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500 mb-3">
              Перед ремонтом
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800 mb-4">
              З чого варто почати, якщо ви тільки плануєте інтер'єр
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Найчастіше питання виникають ще до вибору кольорів і декору: як спланувати квартиру,
              скільки закласти на проєкт, де не помилитися з кухнею та коли продумувати електрику.
              Я зібрала ці теми в окремі практичні матеріали.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                to: "/useful/category/design",
                title: "Планування квартири",
                text: "Зонування, меблі, проходи, перепланування і склад дизайн-проєкту.",
              },
              {
                to: "/useful/category/repair",
                title: "Ремонт і бюджет",
                text: "Послідовність робіт, витрати, контроль і типові помилки до старту ремонту.",
              },
              {
                to: "/useful/category/kitchen",
                title: "Планування кухні",
                text: "Ергономіка, техніка, робочі зони, розетки та меблі.",
              },
              {
                to: "/useful/category/lighting",
                title: "Електрика й освітлення",
                text: "Розетки, вимикачі, сценарії світла та прив'язки до меблів до початку оздоблення.",
              },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-2xl border border-stone-200 p-6 md:p-7 hover:border-stone-400 transition-colors"
              >
                <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4">{item.text}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-800">
                  Читати матеріали <FiArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="section-padding bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Є план квартири або тільки задум?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Надішліть площу, план або короткий опис задачі. Я підкажу, який формат роботи підійде саме для вашого об'єкта.
          </p>
          <Link
            to="/contact#contact-form"
            data-cta-name="home_start_project"
            className="bg-white text-stone-900 px-10 py-4 rounded-sm hover:bg-stone-100 transition-all duration-300 font-bold tracking-wide inline-block shadow-lg"
          >
            Обговорити проєкт
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
