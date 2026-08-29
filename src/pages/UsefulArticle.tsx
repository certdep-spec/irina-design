import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { getUsefulCategory, publishedUsefulArticles, usefulArticles } from "../data/usefulArticles";
import { usefulArticleContent } from "../data/usefulArticleContent";
import { getArticleSeoDescription, getArticleSeoTitle } from "../lib/articleSeo";

const SITE_URL = "https://irina-design.vercel.app";

const UsefulArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = usefulArticles.find(item => item.slug === slug && item.published);

  if (!article) {
    return (
      <section className="section-padding bg-stone-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mb-4">
            Матеріал не знайдено
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
            Ця стаття ще не опублікована
          </h1>
          <p className="text-stone-600 text-lg mb-8">
            Поверніться до каталогу — там уже можна знайти доступні матеріали та теми, які
            готуються.
          </p>
          <Link to="/useful" className="btn-primary inline-flex items-center gap-2">
            <FiArrowLeft /> До розділу «Корисне»
          </Link>
        </div>
      </section>
    );
  }

  const category = getUsefulCategory(article.category);
  const content = usefulArticleContent[article.id];
  const canonical = `${SITE_URL}/useful/${article.slug}`;
  const seoTitle = getArticleSeoTitle(article.id, article.title);
  const seoDescription = getArticleSeoDescription(article.excerpt);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: seoDescription,
    datePublished: article.updatedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Person", name: "Ірина" },
    publisher: { "@type": "Organization", name: "Студія Ірини" },
    mainEntityOfPage: canonical,
    inLanguage: "uk-UA",
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Корисне", item: `${SITE_URL}/useful` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical },
    ],
  };
  const faqLd = content?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map(item => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;
  const relatedArticles = publishedUsefulArticles
    .filter(item => item.id !== article.id && item.category === article.category)
    .slice(0, 3);

  return (
    <article className="bg-white text-stone-800">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={seoDescription} />
        {article.cover && <meta property="og:image" content={`${SITE_URL}${article.cover}`} />}
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={seoDescription} />
        {article.cover && <meta name="twitter:image" content={`${SITE_URL}${article.cover}`} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Helmet>

      <header className="section-padding bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          <nav
            className="flex flex-wrap items-center gap-2 text-sm text-stone-500 mb-8"
            aria-label="Навігація по статті"
          >
            <Link to="/" className="hover:text-stone-900">
              Головна
            </Link>
            <span>/</span>
            <Link to="/useful" className="hover:text-stone-900">
              Корисне
            </Link>
            <span>/</span>
            <span>{category?.title}</span>
          </nav>
          <p className="text-xs uppercase tracking-[0.26em] text-stone-500 mb-5">
            {category?.title}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight mb-7">
            {article.title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </div>
      </header>

      <div className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-3xl mx-auto space-y-12 text-[17px] md:text-lg leading-8 text-stone-700">
          {content ? (
            <>
              <section>
                {content.intro.map(paragraph => (
                  <p key={paragraph} className="mt-5 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </section>
              <section className="rounded-2xl bg-stone-50 border border-stone-200 p-7 md:p-9">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-900 mb-5">
                  {content.summaryTitle}
                </h2>
                {content.summary.map(paragraph => (
                  <p key={paragraph} className="mt-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </section>
              {content.sections.map(section => (
                <section key={section.title}>
                  {section.title && (
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                      {section.title}
                    </h2>
                  )}
                  {section.paragraphs?.map(paragraph => (
                    <p key={paragraph} className="mt-5 first:mt-0">
                      {paragraph}
                    </p>
                  ))}
                  {section.points && (
                    <div className="grid gap-3 mt-6">
                      {section.points.map(point => (
                        <div key={point} className="flex gap-3">
                          <FiCheck className="mt-1.5 shrink-0" aria-hidden="true" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.note && (
                    <aside className="mt-7 border-l-2 border-stone-800 pl-6 py-1 text-stone-800 font-medium">
                      {section.note}
                    </aside>
                  )}
                </section>
              ))}
              <section className="border-t border-stone-200 pt-10">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  {content.checklistTitle}
                </h2>
                <div className="grid gap-3">
                  {content.checklist.map(item => (
                    <div key={item} className="flex gap-3 rounded-xl bg-stone-50 p-4">
                      <FiCheck className="mt-1.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
              {content.faq && content.faq.length > 0 && (
                <section className="border-t border-stone-200 pt-10">
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-7">
                    Часті запитання
                  </h2>
                  <div className="space-y-7">
                    {content.faq.map(item => (
                      <div key={item.question}>
                        <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                          {item.question}
                        </h3>
                        <p>{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
              <section>
                <p>
                  Дизайн-проєкт інтер’єру — це не набір красивих картинок. Це послідовний план
                  майбутнього простору, який допомагає до початку ремонту визначити планування,
                  зовнішній вигляд, матеріали, меблі, освітлення та технічні рішення. Його головне
                  завдання — зробити результат зрозумілим ще до того, як будівельники почнуть
                  роботи.
                </p>
                <p className="mt-5">
                  Чим більше рішень прийнято на етапі проєктування, тим менше імпровізації
                  залишається на будівельному майданчику. Це особливо важливо для електрики,
                  сантехніки, меблів на замовлення та вузлів, які після оздоблення складно або
                  дорого переробляти.
                </p>
              </section>
              <section className="rounded-2xl bg-stone-50 border border-stone-200 p-7 md:p-9">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-900 mb-5">
                  Коротко: що дає дизайн-проєкт
                </h2>
                <div className="space-y-3">
                  {[
                    "зрозуміле планування з урахуванням реального способу життя сім’ї",
                    "візуальне уявлення про майбутній інтер’єр до ремонту",
                    "креслення для будівельників та суміжних підрядників",
                    "заздалегідь визначені матеріали, сантехніка, світло й меблі",
                    "менше випадкових покупок, переробок та непередбачених витрат",
                  ].map(item => (
                    <div key={item} className="flex gap-3">
                      <FiCheck className="mt-1.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  1. Обміри та вихідні дані
                </h2>
                <p>
                  Робота починається не з кольору стін, а з реального приміщення. Потрібні точні
                  розміри, висоти, положення вікон і дверей, стояків, вентиляції, електричного вводу
                  та інших технічних точок. На цьому ж етапі важливо зібрати побажання: хто житиме у
                  квартирі, які є звички, скільки потрібно місць зберігання, де працюють,
                  відпочивають, готують і приймають гостей.
                </p>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  2. Планувальне рішення
                </h2>
                <p>
                  Планування визначає, наскільки інтер’єр буде зручним щодня. Дизайнер розташовує
                  меблі, проходи, функціональні зони та обладнання так, щоб вони працювали разом.
                  Часто саме на цьому етапі стає зрозуміло, чи потрібне перепланування, де краще
                  зробити гардеробну, як розмістити кухню або чи вистачає місця для повноцінного
                  робочого столу.
                </p>
                <p className="mt-5">
                  Хороше планування не намагається заповнити кожен метр меблями. Воно залишає
                  достатні проходи й передбачає реальні сценарії: відкривання фасадів, користування
                  технікою, прибирання та переміщення кількох людей одночасно.
                </p>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  3. 3D-візуалізація
                </h2>
                <p>
                  Після затвердження планування можна переходити до вигляду інтер’єру. Візуалізації
                  показують пропорції, кольори, матеріали, меблі, світильники та загальну атмосферу.
                  Вони потрібні не лише для краси: з їх допомогою простіше оцінити поєднання
                  елементів і виправити те, що на кресленні було неочевидним.
                </p>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  4. Робочі креслення
                </h2>
                <p>
                  Візуалізація відповідає на питання «як виглядатиме», а креслення — «як це
                  зробити». Комплект залежить від проєкту, але зазвичай містить плани демонтажу та
                  монтажу, розміщення меблів, підлог і стель, освітлення, вимикачів, розеток,
                  сантехніки, розгортки стін та інші необхідні схеми.
                </p>
                <p className="mt-5">
                  Саме креслення дозволяють прив’язати розетку до конкретної тумби, вивід води — до
                  конкретної сантехніки, а світильник — до меблевої композиції. Без цього багато
                  рішень будівельники змушені приймати самостійно вже під час ремонту.
                </p>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  5. Матеріали, меблі та обладнання
                </h2>
                <p>
                  Реальний інтер’єр складається з конкретних позицій, а не абстрактних «світлої
                  плитки» чи «дерев’яної підлоги». Тому проєкт пов’язують із матеріалами,
                  сантехнікою, світильниками, технікою та меблями, які можна придбати або
                  виготовити. Це дає змогу перевірити бюджет і не втратити задум під час реалізації.
                </p>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  Чого дизайн-проєкт не робить автоматично
                </h2>
                <p>
                  Проєкт не замінює якісну роботу будівельників і не гарантує, що під час ремонту
                  взагалі не виникне запитань. У реальному об’єкті можуть відкриватися приховані
                  конструкції, змінюватися асортимент матеріалів або з’являтися технічні обмеження.
                  Але хороший проєкт різко зменшує кількість таких невизначених рішень і дає основу,
                  від якої можна відштовхуватися.
                </p>
              </section>
              <section>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  Коли дизайн-проєкт особливо корисний
                </h2>
                <p>
                  Найбільшу користь він дає там, де багато взаємопов’язаних рішень: у новій квартирі
                  без оздоблення, під час капітального ремонту, при переплануванні, великій
                  кількості меблів на замовлення або коли важливо заздалегідь контролювати витрати.
                  Чим складніший простір, тим дорожче зазвичай обходиться рішення «розберемося по
                  ходу».
                </p>
              </section>
              <section className="border-t border-stone-200 pt-10">
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-6">
                  Перед початком ремонту перевірте
                </h2>
                <div className="grid gap-3">
                  {[
                    "чи затверджене фінальне планування меблів і проходів",
                    "чи узгоджені точки води, каналізації, розетки та вимикачі",
                    "чи відповідають креслення вибраній сантехніці, техніці та меблям",
                    "чи визначені ключові оздоблювальні матеріали",
                    "чи зрозумілі складні вузли та індивідуальні меблі",
                    "чи співвідноситься задум із реальним бюджетом",
                  ].map(item => (
                    <div key={item} className="flex gap-3 rounded-xl bg-stone-50 p-4">
                      <FiCheck className="mt-1.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section className="px-6 md:px-12 py-14 bg-stone-50 border-t border-stone-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8">Читайте також</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedArticles.map(item => (
                <Link
                  key={item.id}
                  to={`/useful/${item.slug}`}
                  className="rounded-xl border border-stone-200 bg-white p-5 hover:border-stone-400 transition"
                >
                  <span className="text-xs uppercase tracking-wider text-stone-400">
                    {category?.title}
                  </span>
                  <h3 className="font-serif text-lg font-semibold leading-snug mt-3">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-stone-900 text-white px-6 md:px-12 py-16 md:py-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mb-3">
              Наступний крок
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              {content?.ctaTitle ?? "Потрібен дизайн-проєкт саме для вашої квартири чи будинку?"}
            </h2>
            <p className="text-stone-300">
              {content?.ctaText ??
                "Можна почати з короткого обговорення планування, задач та формату роботи."}
            </p>
          </div>
          <Link
            to="/contact#contact-form"
            className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-3 shrink-0"
          >
            Обговорити проєкт <FiArrowRight />
          </Link>
        </div>
      </section>
    </article>
  );
};

export default UsefulArticle;
