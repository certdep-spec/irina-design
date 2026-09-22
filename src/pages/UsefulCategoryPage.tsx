import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { publishedUsefulArticles, usefulCategories, type UsefulCategoryId } from "../data/usefulArticles";

const SITE_URL = "https://irina-design.vercel.app";

const seoByCategory: Record<
  UsefulCategoryId,
  { title: string; description: string; intro: string }
> = {
  design: {
    title: "Дизайн і планування квартири — практичні поради | Вінниця",
    description:
      "Планування квартири, дизайн-проєкт, зонування, 3D-візуалізація та робочі креслення. Практичні поради дизайнера інтер'єру у Вінниці.",
    intro:
      "Тут зібрані матеріали про те, як продумати квартиру або будинок до початку ремонту: від першого плану й зонування до повного дизайн-проєкту та робочих креслень.",
  },
  repair: {
    title: "Ремонт квартири та бюджет — практичні поради | Вінниця",
    description:
      "Послідовність ремонту квартири, бюджет, строки, контроль робіт і типові помилки. Практичні матеріали перед початком ремонту.",
    intro:
      "Добірка про підготовку до ремонту, порядок робіт, бюджет і контроль. Мета — допомогти приймати рішення до того, як помилка перетвориться на переробку.",
  },
  kitchen: {
    title: "Планування кухні — ергономіка, меблі та помилки | Вінниця",
    description:
      "Як спланувати зручну кухню: розташування техніки, робочі зони, висоти, проходи, стільниці та типові помилки проєктування.",
    intro:
      "Практичні матеріали про кухню: планування, техніку, проходи, стільниці, підсвічування та меблі. Корисно читати до замовлення кухні й до розведення електрики.",
  },
  furniture: {
    title: "Меблі на замовлення — шафи, гардеробні та кухні | Вінниця",
    description:
      "Практичні поради про індивідуальні меблі: шафи, гардеробні, вбудовані кухні, матеріали, фурнітура та планування зберігання.",
    intro:
      "Тут зібрані матеріали про меблі, які проєктуються під конкретний простір: від наповнення шафи до вбудованої кухні та вибору матеріалів і фурнітури.",
  },
  lighting: {
    title: "Освітлення та електрика в квартирі — практичні поради",
    description:
      "Розетки, вимикачі, освітлення, сценарії світла та електрика в квартирі. Що варто передбачити до початку оздоблення.",
    intro:
      "Електрику й освітлення дорого переробляти після чистового оздоблення. У цьому розділі — практичні орієнтири по розетках, вимикачах і сценаріях світла.",
  },
  materials: {
    title: "Матеріали для інтер'єру — підлога, плитка, стіни та двері",
    description:
      "Як вибирати матеріали для інтер'єру: підлогове покриття, плитку, фарбу, двері, кольори й фактури з урахуванням практичності.",
    intro:
      "Матеріали мають працювати не лише на картинці. Тут — про практичний вибір підлоги, плитки, фарби, дверей, кольорів і поєднання фактур.",
  },
  styles: {
    title: "Стилі інтер'єру — сучасний, мінімалізм, Japandi та інші",
    description:
      "Як обрати стиль інтер'єру й не зробити його застарілим: сучасний стиль, мінімалізм, скандинавський, Japandi, неокласика.",
    intro:
      "Розділ про стилі без жорстких шаблонів: як зрозуміти, що вам справді підходить, і зібрати цілісний інтер'єр, який не набридне через рік.",
  },
  practice: {
    title: "Практичні поради дизайнера інтер'єру — від ідеї до реалізації",
    description:
      "Практика дизайнера інтер'єру: як приймаються рішення, підбираються матеріали й меблі, контролюється реалізація та авторський супровід.",
    intro:
      "Матеріали про робочий процес дизайнера: як приймаються рішення, як пов'язуються планування, матеріали, меблі й реалізація на об'єкті.",
  },
};

const UsefulCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: UsefulCategoryId }>();
  const category = usefulCategories.find(item => item.id === categoryId);

  const articles = categoryId ? publishedUsefulArticles.filter(article => article.category === categoryId) : [];

  if (!category || !categoryId || articles.length === 0) return <Navigate to="/useful" replace />;

  const seo = seoByCategory[categoryId];
  const canonical = `${SITE_URL}/useful/category/${categoryId}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Корисне", item: `${SITE_URL}/useful` },
      { "@type": "ListItem", position: 3, name: category.title, item: canonical },
    ],
  };
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    description: seo.description,
    url: canonical,
    inLanguage: "uk-UA",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/useful/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <main className="bg-white text-stone-800">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
      </Helmet>

      <header className="section-padding bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-stone-500 mb-8" aria-label="Навігація">
            <Link to="/" className="hover:text-stone-900">Головна</Link>
            <span>/</span>
            <Link to="/useful" className="hover:text-stone-900">Корисне</Link>
            <span>/</span>
            <span>{category.title}</span>
          </nav>
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500 mb-4">
            {articles.length} матеріалів
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight mb-6">
            {category.title}
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl">{seo.intro}</p>
        </div>
      </header>

      <section className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article, index) => (
              <article key={article.id} className="rounded-2xl border border-stone-200 bg-white p-6 md:p-7 flex flex-col">
                <span className="text-xs text-stone-400 mb-3">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="text-xl md:text-2xl font-serif font-semibold leading-snug mb-3">
                  <Link to={`/useful/${article.slug}`} className="hover:text-stone-600">
                    {article.title}
                  </Link>
                </h2>
                <p className="text-stone-600 leading-relaxed mb-5">{article.excerpt}</p>
                <Link
                  to={`/useful/${article.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-950"
                >
                  Читати матеріал <FiArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-900 text-white px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-5">
            Потрібна відповідь саме для вашого об'єкта?
          </h2>
          <p className="text-stone-300 text-lg mb-7">
            Напишіть площу, тип об'єкта і задачу. Я підкажу, з чого краще почати.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/contact#contact-form" className="bg-white text-stone-900 px-7 py-3">
              Обговорити проєкт
            </Link>
            <Link to="/useful" className="border border-stone-600 px-7 py-3 inline-flex items-center justify-center gap-2">
              <FiArrowLeft /> Усі теми
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UsefulCategoryPage;
