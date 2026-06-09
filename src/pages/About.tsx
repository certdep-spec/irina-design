import { Helmet } from "react-helmet-async";
import { FiCheck } from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";

function About() {
  const [heroRef, heroVisible] = useScrollReveal();
  const [contentRef, contentVisible] = useScrollReveal();
  const [approachRef, approachVisible] = useScrollReveal();
  const [whyMeRef, whyMeVisible] = useScrollReveal();

  const skills = ["Archicad", "Enscape"];

  const workSteps = [
    {
      step: "01",
      title: "Обговорення",
      description: "Визначаємо ваші задачі, стиль і бюджет. Аналізуємо простір.",
    },
    {
      step: "02",
      title: "Планування",
      description: "Створюємо зручне та функціональне планування враховуючи побажання замовника.",
    },
    {
      step: "03",
      title: "Візуалізація",
      description: "Ви бачите майбутній інтер’єр ще до початку ремонту.",
    },
    {
      step: "04",
      title: "Документація",
      description: "Готуємо креслення, які зрозумілі виконавцям робіт.",
    },
    {
      step: "05",
      title: "Реалізація",
      description: "Супроводжую проєкт та допомагаю уникнути помилок.",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Про мене — Дизайнер інтер'єру Ірина</title>
        <meta
          name="description"
          content="Ірина — дизайнер інтер'єру та меблів у Вінниці. Створюю продумані простори, які виглядають стильно та зручні у повсякденному житті."
        />
      </Helmet>

      {/* HERO */}
      <section
        ref={heroRef}
        className={`bg-stone-100 py-20 px-6 ${heroVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Дизайнер інтер’єру та меблів
          </h1>
          <p className="text-xl text-stone-600">
            Створюю продумані простори, які виглядають стильно та зручні у повсякденному житті
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section
        ref={contentRef}
        className={`section-padding ${contentVisible ? "reveal-visible" : "reveal-hidden"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <div className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-xl shadow-lg">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/Paint/ira-portrait-800w.webp 800w, /Paint/ira-portrait.webp 1200w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <img
                    src="/Paint/ira-portrait.webp"
                    alt="Ірина — професійний дизайнер інтер'єру та меблів у Вінниці"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-stone-200 rounded-xl -z-10 hidden lg:block"></div>
            </div>

            {/* TEXT */}
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-6 text-stone-800">
                Ірина — дизайнер інтер’єру та меблів
              </h2>

              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Я спеціалізуюся на створенні комплексних рішень: від планування простору до
                  розробки індивідуальних меблів. Це дозволяє зробити інтер’єр не лише красивим, а й
                  максимально зручним у використанні.
                </p>

                <p>
                  Маю досвід роботи з приміщеннями різного призначення та масштабу, співпрацювала з
                  клієнтами в Україні та за кордоном.
                </p>

                <p>
                  Для мене дизайн — це комфорт, продуманість і гармонія у повсякденному житті. Я
                  створюю інтер’єри, які поєднують естетику, функціональність і реалістичний підхід
                  до реалізації.
                </p>

                <p>Працюю у Вінниці та дистанційно.</p>
              </div>

              {/* SKILLS */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-stone-800">Інструменти в роботі:</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-stone-100 text-stone-700 text-sm rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PROCESS */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-semibold text-center mb-12 text-stone-800">
              Як проходить робота
            </h2>

            <div
              ref={approachRef}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${approachVisible ? "reveal-visible" : "reveal-hidden"}`}
            >
              {workSteps.map((item, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-white border border-stone-200 rounded-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-5xl font-serif font-bold text-stone-100 absolute top-4 right-4">
                    {item.step}
                  </span>

                  <h3 className="text-xl font-semibold mb-3 text-stone-800 relative z-10">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* VALUE BLOCK */}
          <div
            ref={whyMeRef}
            className={`bg-stone-50 p-8 md:p-12 rounded-lg border border-stone-200 ${whyMeVisible ? "reveal-visible" : "reveal-hidden"}`}
          >
            <h2 className="text-3xl font-serif font-semibold text-center mb-8 text-stone-800">
              Що ви отримуєте
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Інтер’єр, який реально можна реалізувати",
                "Продумане планування без “мертвих зон”",
                "Індивідуальні меблі під ваш простір",
                "Контроль бюджету без зайвих витрат",
                "Підтримку на всіх етапах ремонту",
                "Рішення, адаптовані під ваш спосіб життя",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FiCheck className="text-green-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-stone-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
