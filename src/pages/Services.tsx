import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiHome, FiBox, FiMonitor, FiCheck } from "react-icons/fi";
import { Reveal } from "../components/Reveal";

function Services() {
  const services = [
    {
      icon: FiMonitor,
      title: "Планувальне рішення",
      description:
        "Підійде, якщо вам потрібно зручно організувати простір до початку ремонту: визначити зони, меблі, проходи й можливе перепланування.",
      result: [
        "Зрозуміле планування приміщень і меблів",
        "Плани демонтажу та монтажу, якщо потрібне перепланування",
        "Основа, з якою можна впевненіше переходити до ремонту",
      ],
      price: "від 250 грн/м²",
      features: [
        "Обмірний план об'єкта",
        "3-4 варіанти перепланування",
        "Підсумковий план з розмірами меблів",
        "Консультація щодо зонування",
      ],
      badge: "Швидкий старт",
    },
    {
      icon: FiHome,
      title: "Повний дизайн-проєкт",
      description:
        "Для тих, хто хоче заздалегідь побачити майбутній інтер'єр і отримати комплект креслень для ремонту.",
      result: [
        "Ви бачите інтер'єр до початку робіт",
        "Майстри отримують креслення з потрібними розмірами й прив'язками",
        "Матеріали та основні рішення зібрані в одному проєкті",
      ],
      price: "від 800 грн/м²",
      features: [
        "3D-візуалізація всіх приміщень",
        "Повний пакет технічної документації",
        "Схема електрики, сантехніки, освітлення",
        "Розгортки стін та розкладка плитки",
        "Відомість оздоблювальних матеріалів",
      ],
      badge: "Популярний вибір",
      isPopular: true,
    },
    {
      icon: FiMonitor,
      title: "Авторський супровід",
      description:
        "Під час ремонту допомагаю звіряти рішення на об'єкті з проєктом і відповідати на питання, які виникають у процесі робіт.",
      result: [
        "Менше рішень доводиться приймати вже під час ремонту",
        "Можна швидко уточнити деталі, якщо на об'єкті виникло питання",
        "Проєкт легше зберегти таким, яким його погодили",
      ],
      price: "за запитом",
      features: [
        "Супровід рішень із дизайн-проєкту",
        "Виїзди на об'єкт за домовленістю",
        "Перевірка відповідності робіт кресленням",
        "Уточнення та коригування рішень у процесі ремонту",
      ],
      badge: "Супровід",
    },
    {
      icon: FiBox,
      title: "Дизайн меблів та кухонь",
      description:
        "Окремий проєкт для кухні, шафи, гардеробної або інших корпусних меблів з урахуванням розмірів приміщення й техніки.",
      result: [
        "Меблі спроєктовані під конкретне приміщення",
        "Продумане внутрішнє наповнення",
        "Креслення, з якими можна звертатися до виробника меблів",
      ],
      price: "від 3000 грн/проєкт",
      features: [
        "Детальна 3D-модель меблів",
        "Креслення для меблевика з усіма розмірами",
        "Підбір матеріалів (ДСП, фасади, фурнітура)",
        "Розміщення розеток під кухонну техніку",
      ],
    },
  ];

  const faq = [
    {
      q: "Скільки часу займає розробка дизайн-проєкту?",
      a: "Термін залежить від площі, кількості приміщень і складу проєкту. Після короткого обговорення я зможу назвати орієнтовний строк саме для вашого об'єкта.",
    },
    {
      q: "Що потрібно для старту роботи?",
      a: "Для першої розмови достатньо плану або техпаспорта, приблизної площі та розуміння, що ви хочете змінити. Якщо обмірів немає, це можна вирішити окремо.",
    },
    {
      q: "Як відбувається оплата?",
      a: "Формат і етапи оплати погоджуємо до початку роботи. Вартість залежить від обраної послуги, площі та обсягу задач.",
    },
    {
      q: "Працюєте дистанційно?",
      a: "Так. Проєкти можна вести дистанційно по Україні. У Вінниці та області також можливі виїзди на об'єкт.",
    },
    {
      q: "Чи допомагаєте з реалізацією?",
      a: "Так. За потреби можна додати авторський супровід, щоб під час ремонту звіряти рішення з проєктом і швидко уточнювати деталі.",
    },
    {
      q: "З якими об'єктами ви працюєте?",
      a: "Квартири, будинки, окремі приміщення та індивідуальні меблі. Якщо ваш випадок нестандартний, напишіть, і я скажу, чи зможу допомогти.",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Послуги та ціни — Дизайнер інтер'єру Ірина</title>
        <link rel="canonical" href="https://irina-design.vercel.app/services" />
        <meta
          name="description"
          content="Дизайн інтер'єру у Вінниці: планування, повний дизайн-проєкт, авторський супровід і дизайн меблів. Ціни та склад послуг."
        />
        <meta property="og:url" content="https://irina-design.vercel.app/services" />
        <meta property="og:title" content="Послуги та ціни — Дизайнер інтер'єру Ірина" />
        <meta
          property="og:description"
          content="Планування, повний дизайн-проєкт, авторський супровід і дизайн меблів у Вінниці та дистанційно."
        />
        <meta name="twitter:title" content="Послуги та ціни — Дизайнер інтер'єру Ірина" />
        <meta
          name="twitter:description"
          content="Планування, повний дизайн-проєкт, авторський супровід і дизайн меблів у Вінниці та дистанційно."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": ${JSON.stringify(
                faq.map(item => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                }))
              )}
            }
          `}
        </script>
      </Helmet>

      <Reveal as="section" className="bg-stone-50 py-20 px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Послуги та вартість
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Можна почати з планування, замовити повний дизайн-проєкт або окремо розробити меблі. Якщо не знаєте, який формат потрібен, напишіть площу й коротко опишіть задачу.
          </p>
          <Link
            to="/contact#contact-form"
            data-cta-name="services_hero_estimate"
            className="btn-primary inline-flex items-center justify-center mt-8 min-w-[220px]"
          >
            Дізнатися вартість
          </Link>
        </div>
      </Reveal>

      <section className="bg-stone-900 text-stone-100 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {[
            { title: "Зрозумілий склад роботи", text: "До початку проєкту ви знаєте, що саме отримаєте на кожному етапі." },
            { title: "Рішення під ваш об'єкт", text: "Склад проєкту залежить від площі, задачі та того, на якому етапі зараз ремонт." },
            { title: "Можна почати з малого", text: "Не обов'язково одразу замовляти повний проєкт. Іноді достатньо планування або меблів." },
          ].map(item => (
            <div key={item.title} className="rounded-xl border border-white/10 p-5">
              <h2 className="font-serif text-xl font-semibold text-white mb-2">{item.title}</h2>
              <p className="text-sm text-stone-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Reveal as="section" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-xl relative overflow-hidden ${service.isPopular ? "border-stone-800 ring-1 ring-stone-800" : "border-stone-100"}`}
              >
                {service.badge && (
                  <div
                    className={`absolute top-4 right-[-35px] rotate-45 px-10 py-1 text-[10px] font-bold uppercase tracking-widest ${service.isPopular ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-600"}`}
                  >
                    {service.badge}
                  </div>
                )}

                <div className="flex items-start mb-6">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mr-6 ${service.isPopular ? "bg-stone-800 text-white" : "bg-stone-100 text-stone-800"}`}
                  >
                    <service.icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-1 text-stone-800">
                      {service.title}
                    </h3>
                    <p
                      className={`font-bold text-lg ${service.isPopular ? "text-stone-800" : "text-stone-500"}`}
                    >
                      {service.price}
                    </p>
                  </div>
                </div>

                <p className="text-stone-600 mb-8 leading-relaxed min-h-[60px]">
                  {service.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
                      Що входить
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-stone-700">
                          <span className="text-stone-300 mr-3">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-stone-100">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
                      Що ви отримаєте
                    </h4>
                    <ul className="space-y-2">
                      {service.result.map((item, i) => (
                        <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
                          <FiCheck className="text-stone-800 mt-0.5 flex-shrink-0" size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact#contact-form"
                    data-cta-name={`services_${index}_estimate`}
                    className={`inline-flex items-center justify-center w-full min-h-[48px] mt-2 ${service.isPopular ? "btn-primary" : "border border-stone-300 text-stone-800 hover:bg-stone-50 transition"}`}
                  >
                    Запитати про цю послугу
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Reveal className="mt-24 bg-stone-50 p-8 md:p-14 rounded-2xl border border-stone-200">
            <h2 className="text-3xl font-serif font-semibold text-center mb-12 text-stone-800">
              Як проходить робота
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
              {[
                { step: 1, title: "Знайомство", desc: "Обговорюємо об'єкт, задачі та побажання" },
                { step: 2, title: "Планування", desc: "Погоджуємо розташування зон і меблів" },
                { step: 3, title: "Дизайн", desc: "Опрацьовуємо вигляд інтер'єру та креслення" },
                { step: 4, title: "Реалізація", desc: "Передаю проєкт і за потреби супроводжую ремонт" },
              ].map(item => (
                <div key={item.step} className="text-center relative z-10">
                  <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold shadow-md">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="mt-24 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12 text-stone-800">
              Часті запитання
            </h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className="group border border-stone-200 rounded-xl bg-white overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-stone-800 font-medium">
                    {item.q}
                    <span className="ml-4 text-stone-400 group-open:rotate-45 transition-transform text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-stone-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-20 text-center">
            <h2 className="text-3xl font-serif font-semibold mb-4 text-stone-800">
              Не впевнені, з чого почати?
            </h2>
            <p className="text-stone-600 mb-8 text-lg max-w-2xl mx-auto">
              Напишіть тип об'єкта та площу. Я подивлюся задачу й підкажу, який формат роботи підійде.
            </p>

            <Link
              to="/contact#contact-form"
              data-cta-name="services_estimate"
              className="btn-primary inline-flex items-center justify-center min-w-[240px] shadow-lg hover:-translate-y-1 transition-all"
            >
              Дізнатися вартість
            </Link>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}

export default Services;