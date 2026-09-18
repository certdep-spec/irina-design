import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { Reveal } from "../components/Reveal";
import { assetUrl } from "../lib/asset";

function About() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://irina-design.vercel.app/about#iryna",
    name: "Ірина",
    jobTitle: "Дизайнер інтер'єру та меблів",
    image: "https://irina-design.vercel.app/Paint/ira-portrait.webp",
    url: "https://irina-design.vercel.app/about",
    knowsAbout: ["Дизайн інтер'єру", "Планування", "3D-візуалізація", "Дизайн меблів"],
    sameAs: [
      "https://www.facebook.com/profile.php?id=100063828644118",
      "https://www.instagram.com/nova_art_design/",
    ],
  };

  const skills = ["Archicad", "Enscape"];

  const workSteps = [
    {
      step: "01",
      title: "Обговорення",
      description: "Знайомлюся з об'єктом, вашими побажаннями, звичками та бюджетом.",
    },
    {
      step: "02",
      title: "Планування",
      description: "Шукаємо зручне розташування зон, меблів і проходів.",
    },
    {
      step: "03",
      title: "Візуалізація",
      description: "Показую, як виглядатиме інтер'єр до початку ремонту.",
    },
    {
      step: "04",
      title: "Документація",
      description: "Готую креслення та інші матеріали, потрібні для реалізації проєкту.",
    },
    {
      step: "05",
      title: "Реалізація",
      description: "За потреби супроводжую проєкт і допомагаю уточнювати рішення під час ремонту.",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Про мене — Дизайнер інтер'єру Ірина</title>
        <link rel="canonical" href="https://irina-design.vercel.app/about" />
        <meta
          name="description"
          content="Ірина — дизайнер інтер'єру та меблів у Вінниці. Планування, візуалізації, креслення та індивідуальні меблі для квартир і будинків."
        />
        <meta property="og:url" content="https://irina-design.vercel.app/about" />
        <meta property="og:title" content="Про мене — Дизайнер інтер'єру Ірина" />
        <meta
          property="og:description"
          content="Дизайн інтер'єру та меблів у Вінниці й дистанційно: від планування до креслень і реалізації."
        />
        <meta name="twitter:title" content="Про мене — Дизайнер інтер'єру Ірина" />
        <meta
          name="twitter:description"
          content="Дизайн інтер'єру та меблів у Вінниці й дистанційно: від планування до креслень і реалізації."
        />
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      </Helmet>

      <Reveal as="section" className="bg-stone-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Дизайнер інтер'єру та меблів
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Я Ірина. Проєктую інтер'єри та меблі так, щоб ще до ремонту було зрозуміло, як простір виглядатиме і як ним буде зручно користуватися.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <div className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-xl shadow-lg">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${assetUrl("/Paint/ira-portrait-800w.webp")} 800w, ${assetUrl("/Paint/ira-portrait.webp")} 1200w`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <img
                    src={assetUrl("/Paint/ira-portrait.webp")}
                    alt="Ірина — дизайнер інтер'єру та меблів у Вінниці"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-stone-200 rounded-xl -z-10 hidden lg:block"></div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-semibold mb-6 text-stone-800">
                Про мою роботу
              </h2>

              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Працюю з інтер'єрами комплексно: починаю з планування, продумую вигляд приміщень, готую креслення і, коли це потрібно, проєктую меблі під конкретний простір.
                </p>

                <p>
                  Маю досвід роботи з приміщеннями різного призначення та масштабу, співпрацювала з клієнтами в Україні та за кордоном.
                </p>

                <p>
                  Мені важливо, щоб проєкт можна було реалізувати, а рішення були зручними саме для людей, які житимуть або працюватимуть у цьому просторі.
                </p>

                <p>Працюю у Вінниці та дистанційно.</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-stone-800">Інструменти в роботі</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-stone-100 text-stone-700 text-sm rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/portfolio"
                  data-cta-name="about_portfolio"
                  className="btn-secondary inline-flex items-center justify-center min-h-[48px]"
                >
                  Подивитися проєкти
                </Link>
                <Link
                  to="/contact#contact-form"
                  data-cta-name="about_contact"
                  className="btn-primary inline-flex items-center justify-center min-h-[48px]"
                >
                  Обговорити мій об'єкт
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-serif font-semibold text-center mb-12 text-stone-800">
              Як проходить робота
            </h2>

            <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workSteps.map(item => (
                <div
                  key={item.step}
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
            </Reveal>
          </div>

          <Reveal className="bg-stone-50 p-8 md:p-12 rounded-lg border border-stone-200">
            <h2 className="text-3xl font-serif font-semibold text-center mb-8 text-stone-800">
              Що входить у підхід до проєкту
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Планування під щоденні сценарії та потреби замовника",
                "Візуалізації, щоб погодити вигляд інтер'єру до ремонту",
                "Креслення та прив'язки для реалізації",
                "Меблі, спроєктовані під розміри приміщення",
                "Урахування бюджету під час вибору рішень",
                "Супровід під час ремонту, якщо він потрібен",
              ].map(item => (
                <div key={item} className="flex items-start space-x-3">
                  <FiCheck className="text-stone-700 mt-1 flex-shrink-0" size={20} />
                  <span className="text-stone-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}

export default About;
