import { Link } from 'react-router-dom'
import { FiHome, FiBox, FiMessageCircle, FiMonitor } from 'react-icons/fi'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Services() {
  const [heroRef, heroVisible] = useScrollReveal()
  const [listRef, listVisible] = useScrollReveal()
  const [howRef, howVisible] = useScrollReveal()
  const [ctaRef, ctaVisible] = useScrollReveal()

  const services = [
    {
      icon: FiHome,
      title: 'Повний дизайн-проєкт інтер\'єру',
      description: 'Ви отримуєте не просто дизайн, а чіткий план ремонту без помилок і зайвих витрат.',
      result: [
        'Ви бачите результат ще до початку ремонту',
        'Уникаєте переробок і перевитрат',
        'Отримуєте зрозумілі креслення для виконавців робіт'
      ],
      price: 'від 800 грн/м²',
      features: [
        'Заміри та виїзд на об\'єкт',
        '2–3 варіанти планування',
        '3D-візуалізація всіх приміщень',
        'Повний пакет креслень',
        'Підбір матеріалів і меблів',
        'Авторський нагляд (за потреби)'
      ]
    },
    {
      icon: FiBox,
      title: 'Дизайн меблів',
      description: 'Індивідуальні меблі, які ідеально підходять під ваш простір і не потребують доопрацювань.',
      result: [
        'Максимальне використання простору',
        'Зручність у повсякденному житті',
        'Готові креслення для виробника меблів'
      ],
      price: 'від 3000 грн/проєкт',
      features: [
        'Індивідуальний дизайн',
        '3D-модель меблів',
        'Креслення для виробника меблів',
        'Підбір фурнітури',
        'Консультація з виробником'
      ]
    },
    {
      icon: FiMessageCircle,
      title: 'Консультація',
      description: 'Швидкий спосіб отримати професійні рішення без повного дизайн-проєкту.',
      result: [
        'Чітке розуміння планування',
        'Рекомендації по стилю',
        'Поради щодо матеріалів'
      ],
      price: '1000 грн/год',
      features: [
        'Онлайн або офлайн зустріч',
        'Аналіз приміщення',
        'Рекомендації щодо планування',
        'Поради щодо стилю та кольорів',
        'Відповіді на всі запитання'
      ]
    },
    {
      icon: FiMonitor,
      title: '3D візуалізація',
      description: 'Дозволяє побачити майбутній інтер’єр і внести зміни до початку ремонту.',
      result: [
        'Розуміння кінцевого результату',
        'Можливість внести правки заздалегідь',
        'Впевненість у виборі'
      ],
      price: 'від 2000 грн/кімната',
      features: [
        'Фотореалістичні зображення',
        'Кілька ракурсів',
        '2 ітерації правок',
        'Висока якість',
        'Термін: 3–5 днів'
      ]
    }
  ]

  return (
    <div>

      {/* HERO */}
      <section 
        ref={heroRef}
        className={`bg-stone-100 py-20 px-6 ${heroVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Послуги дизайну інтер’єру та меблів
          </h1>
          <p className="text-xl text-stone-600">
            Продумані рішення, які допомагають уникнути помилок і заощадити бюджет під час ремонту
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section 
        ref={listRef}
        className={`section-padding ${listVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-stone-100 hover:shadow-lg transition-shadow">

                <div className="flex items-start mb-6">
                  <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mr-6">
                    <service.icon className="text-stone-700" size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-2 text-stone-800">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 font-medium">{service.price}</p>
                  </div>
                </div>

                <p className="text-stone-700 mb-6 font-medium leading-relaxed">
                  {service.description}
                </p>

                {/* RESULT BLOCK */}
                <div className="mb-6 bg-stone-50 p-6 rounded-lg border border-stone-200">
                  <h4 className="font-semibold text-stone-800 mb-3">Що ви отримуєте:</h4>
                  <ul className="space-y-3">
                    {service.result.map((item, i) => (
                      <li key={i} className="text-sm text-stone-700 flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✔</span> 
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FEATURES */}
                <ul className="space-y-3 pl-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-stone-400 rounded-full mt-1.5 mr-3"></span>
                      <span className="text-stone-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

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

              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold shadow-md">1</div>
                <h3 className="font-semibold text-stone-800 mb-2 text-lg">Обговорення</h3>
                <p className="text-sm text-stone-600">Визначаємо задачі, стиль і бюджет</p>
              </div>

              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold shadow-md">2</div>
                <h3 className="font-semibold text-stone-800 mb-2 text-lg">Планування</h3>
                <p className="text-sm text-stone-600">Створюємо зручне рішення</p>
              </div>

              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold shadow-md">3</div>
                <h3 className="font-semibold text-stone-800 mb-2 text-lg">Візуалізація</h3>
                <p className="text-sm text-stone-600">Ви бачите результат заздалегідь</p>
              </div>

              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-stone-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif font-bold shadow-md">4</div>
                <h3 className="font-semibold text-stone-800 mb-2 text-lg">Реалізація</h3>
                <p className="text-sm text-stone-600">Передаємо проєкт і супроводжуємо</p>
              </div>

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