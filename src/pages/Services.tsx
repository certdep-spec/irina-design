import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FiHome, FiBox, FiMonitor } from 'react-icons/fi'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Services() {
  const [heroRef, heroVisible] = useScrollReveal()
  const [listRef, listVisible] = useScrollReveal()
  const [howRef, howVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  const services = [
    {
      icon: FiMonitor,
      title: 'Планувальне рішення',
      description: 'Ідеальний варіант для тих, хто знає, який стиль хоче, але потребує професійної ергономіки та розстановки стін.',
      result: [
        'Функціональне зонування кожного сантиметра',
        'Технічно правильні плани демонтажу та монтажу стін',
        'Основа для вашого подальшого ремонту'
      ],
      price: 'від 250 грн/м²',
      features: [
        'Обмірний план об\'єкта',
        '3-4 варіанти перепланування',
        'Підсумковий план з розмірами меблів',
        'Консультація щодо зонування'
      ],
      badge: 'Швидкий старт'
    },
    {
      icon: FiHome,
      title: 'Повний дизайн-проєкт',
      description: 'Комплексна розробка інтер\'єру з 3D-візуалізацією та всіма технічними кресленнями для будівельників.',
      result: [
        'Ви бачите майбутній дім у фотореалістичній якості',
        'Будівельники працюють за чіткими кресленнями без питань',
        'Повна специфікація матеріалів (ви знаєте, де і що купити)'
      ],
      price: 'від 750 грн/м²',
      features: [
        '3D-візуалізація всіх приміщень',
        'Повний пакет технічної документації',
        'Схема електрики, сантехніки, освітлення',
        'Розгортки стін та розкладка плитки',
        'Відомість оздоблювальних матеріалів'
      ],
      badge: 'Популярний вибір',
      isPopular: true
    },
    {
      icon: FiMonitor,
      title: 'Преміум супровід',
      description: 'Для тих, хто цінує свій час. Ми беремо на себе не тільки дизайн, а й контроль за його точною реалізацією.',
      result: [
        'Об\'єкт виглядає точно як на візуалізації',
        'Ви звільнені від спілкування з майстрами та постачальниками',
        'Економія бюджету завдяки партнерським знижкам'
      ],
      price: 'за запитом',
      features: [
        'Все, що входить у повний проєкт',
        'Регулярні виїзди на об\'єкт (авторський нагляд)',
        'Комплектація об\'єкта меблями та декором',
        'Перевірка відповідності робіт кресленням',
        'Коригування проєкту в ході будівництва'
      ],
      badge: 'Під ключ'
    },
    {
      icon: FiBox,
      title: 'Дизайн меблів та кухонь',
      description: 'Вузькоспеціалізована розробка корпусних меблів. Ідеально для тих, кому потрібен тільки проект меблів.',
      result: [
        'Меблі, які ідеально стають у ніші',
        'Ергономічне наповнення шаф та кухні',
        'Готова документація для меблевого виробництва'
      ],
      price: 'від 2500 грн/проєкт',
      features: [
        'Детальна 3D-модель меблів',
        'Креслення для меблевика з усіма розмірами',
        'Підбір матеріалів (ДСП, фасади, фурнітура)',
        'Розміщення розеток під кухонну техніку'
      ]
    }
  ]

  return (
    <div>
      <Helmet>
        <title>Послуги та ціни — Дизайнер інтер'єру Ірина</title>
        <meta name="description" content="Ціни на дизайн інтер'єру у Вінниці. Від планування до повного дизайн-проєкту та авторського нагляду. Підберемо рішення під ваш бюджет." />
      </Helmet>

      {/* HERO */}
      <section 
        ref={heroRef}
        className={`bg-stone-50 py-20 px-6 border-b border-stone-200 ${heroVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Скільки коштує дизайн інтер’єру?
          </h1>
          <p className="text-xl text-stone-600">
            Ми розробили різні формати роботи, щоб ви могли обрати оптимальний варіант: від швидкого планування до повного супроводу.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section 
        ref={listRef}
        className={`section-padding ${listVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-xl relative overflow-hidden ${service.isPopular ? 'border-stone-800 ring-1 ring-stone-800' : 'border-stone-100'}`}
              >
                {service.badge && (
                  <div className={`absolute top-4 right-[-35px] rotate-45 px-10 py-1 text-[10px] font-bold uppercase tracking-widest ${service.isPopular ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'}`}>
                    {service.badge}
                  </div>
                )}

                <div className="flex items-start mb-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-6 ${service.isPopular ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-800'}`}>
                    <service.icon size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-1 text-stone-800">
                      {service.title}
                    </h3>
                    <p className={`font-bold text-lg ${service.isPopular ? 'text-stone-800' : 'text-stone-500'}`}>
                      {service.price}
                    </p>
                  </div>
                </div>

                <p className="text-stone-600 mb-8 leading-relaxed min-h-[60px]">
                  {service.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">Що входить у вартість:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-stone-700">
                          <span className="text-stone-300 mr-3">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-stone-50">
                     <h4 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">Результат для вас:</h4>
                     <ul className="space-y-2">
                       {service.result.map((item, i) => (
                         <li key={i} className="text-xs text-stone-600 flex items-start gap-2">
                           <span className="text-stone-800">✔</span> 
                           <span>{item}</span>
                         </li>
                       ))}
                     </ul>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* HOW IT WORKS */}
          <div 
            ref={howRef}
            className={`mt-24 bg-stone-50 p-8 md:p-14 rounded-2xl border border-stone-200 ${howVisible ? 'reveal-visible' : 'reveal-hidden'}`}
          >
            <h2 className="text-3xl font-serif font-semibold text-center mb-12 text-stone-800">
              Як проходить робота
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
              {[
                { step: 1, title: 'Обговорення', desc: 'Визначаємо задачі, стиль і бюджет' },
                { step: 2, title: 'Планування', desc: 'Створюємо зручне рішення' },
                { step: 3, title: 'Візуалізація', desc: 'Ви бачите результат заздалегідь' },
                { step: 4, title: 'Реалізація', desc: 'Передаємо проєкт і супроводжуємо' }
              ].map((item) => (
                <div key={item.step} className="text-center relative z-10">
                  <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold shadow-md">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div 
            ref={ctaRef}
            className={`mt-20 text-center ${ctaVisible ? 'reveal-visible' : 'reveal-hidden'}`}
          >
            <h2 className="text-3xl font-serif font-semibold mb-4 text-stone-800">
              Готові обговорити ваш проєкт?
            </h2>
            <p className="text-stone-600 mb-8 text-lg">
              Напишіть — підкажу оптимальне рішення під ваш бюджет
            </p>

            <Link to="/contact#contact-form" className="btn-primary inline-flex items-center justify-center min-w-[240px] shadow-lg hover:-translate-y-1 transition-all">
              Отримати консультацію
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Services
