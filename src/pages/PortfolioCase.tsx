import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Image } from "../components/Image";
import { portfolioCases } from "../data/portfolio";

function PortfolioCase() {
  const { id } = useParams();
  const item = portfolioCases.find(project => project.id === id);

  if (!item) return <Navigate to="/portfolio" replace />;

  const description =
    item.description ||
    [item.task, item.solution].filter(Boolean).join(" ") ||
    `${item.title}. Приклад роботи дизайнера інтер'єру та меблів Ірини.`;
  const canonical = `https://irina-design.vercel.app/portfolio/${item.id}`;

  return (
    <article className="bg-white min-h-screen">
      <Helmet>
        <title>{`${item.title} — портфоліо дизайнера інтер'єру Ірини`}</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${item.title} — портфоліо Ірини`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://irina-design.vercel.app${item.coverImage}`} />
      </Helmet>

      <header className="px-6 md:px-12 pt-12 md:pt-16 pb-10 bg-stone-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition mb-8"
          >
            <FiArrowLeft /> Повернутися до портфоліо
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-3">
            {item.category === "interior" ? "Інтер'єр" : "Дизайн меблів"}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-stone-900 leading-tight">
            {item.title}
          </h1>
          {item.meta && <p className="mt-4 text-lg text-stone-500">{item.meta}</p>}
        </div>
      </header>

      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          <div className="space-y-7">
            {item.task && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">Завдання</h2>
                <p className="text-stone-600 leading-relaxed">{item.task}</p>
              </div>
            )}
            {item.solution && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">Рішення</h2>
                <p className="text-stone-600 leading-relaxed">{item.solution}</p>
              </div>
            )}
            {item.description && !item.task && (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">Про проєкт</h2>
                <p className="text-stone-600 leading-relaxed">{item.description}</p>
              </div>
            )}
            <div className="rounded-2xl bg-stone-900 text-white p-7">
              <h2 className="font-serif text-2xl font-semibold mb-3">Плануєте свій проєкт?</h2>
              <p className="text-stone-300 mb-5">
                Напишіть тип об'єкта та площу. Я підкажу, з чого можна почати і скільки приблизно коштуватиме робота.
              </p>
              <Link
                to="/contact#contact-form"
                data-cta-name={`case_${item.id}_estimate`}
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-6 py-3"
              >
                Дізнатися вартість <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
            <Image
              baseSrc={item.coverImage}
              alt={item.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-8">
            Галерея проєкту
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.gallery.map((image, index) => (
              <div key={image} className="aspect-[4/3] overflow-hidden rounded-xl bg-stone-100">
                <Image
                  baseSrc={image}
                  alt={`${item.title}, зображення ${index + 1}`}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

export default PortfolioCase;
