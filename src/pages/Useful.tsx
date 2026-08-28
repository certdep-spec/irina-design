import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { Reveal } from "../components/Reveal";
import { Image } from "../components/Image";
import {
  publishedUsefulArticles,
  usefulArticles,
  usefulCategories,
  type UsefulCategoryId,
} from "../data/usefulArticles";

const SITE_URL = "https://irina-design.vercel.app";

const Useful: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<UsefulCategoryId | "all">("all");
  const [expandedCategories, setExpandedCategories] = useState<Set<UsefulCategoryId>>(new Set());
  const normalizedQuery = query.trim().toLocaleLowerCase("uk-UA");

  const filteredArticles = useMemo(
    () =>
      usefulArticles.filter(article => {
        const matchesCategory = activeCategory === "all" || article.category === activeCategory;
        const haystack = `${article.title} ${article.excerpt}`.toLocaleLowerCase("uk-UA");
        return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
      }),
    [activeCategory, normalizedQuery]
  );

  const featured = publishedUsefulArticles.slice(0, 4);

  const ArticleState: React.FC<{ article: (typeof usefulArticles)[number] }> = ({ article }) =>
    article.published ? (
      <Link
        to={`/useful/${article.slug}`}
        className="mt-auto pt-5 inline-flex items-center gap-2 text-sm text-stone-700 hover:text-stone-950"
      >
        Читати статтю <FiArrowRight size={15} />
      </Link>
    ) : (
      <span className="mt-auto pt-5 text-xs uppercase tracking-wider text-stone-400">
        Готується до публікації
      </span>
    );

  return (
    <div className="bg-white text-stone-800">
      <Helmet>
        <title>Корисне про дизайн інтер’єру | Поради дизайнера у Вінниці</title>
        <meta
          name="description"
          content="Практичні поради про дизайн інтер’єру, планування, ремонт, меблі, освітлення та матеріали. Без зайвої теорії — корисне перед ремонтом і під час реалізації."
        />
        <link rel="canonical" href={`${SITE_URL}/useful`} />
        <meta property="og:url" content={`${SITE_URL}/useful`} />
        <meta property="og:title" content="Корисне про дизайн інтер’єру" />
        <meta
          property="og:description"
          content="Практичні поради про планування, ремонт, меблі, освітлення та матеріали."
        />
      </Helmet>
      <section className="section-padding bg-stone-50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-stone-500 mb-5">
            База практичних знань
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight text-stone-800 mb-7">
            Корисне про дизайн інтер’єру
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
            Практичні поради про планування, ремонт, меблі, освітлення та матеріали. Без зайвої
            теорії — те, що допомагає приймати правильні рішення перед ремонтом та під час
            реалізації інтер’єру.
          </p>
          <div className="relative max-w-2xl mx-auto mt-10">
            <FiSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Що вас цікавить? Наприклад: кухня, розетки, бюджет..."
              aria-label="Пошук корисних матеріалів"
              className="w-full rounded-xl border border-stone-300 bg-white py-4 pl-14 pr-5 text-stone-800 placeholder:text-stone-400 shadow-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
            />
          </div>
        </div>
      </section>
      <section className="px-6 md:px-12 lg:px-24 py-12 border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full border text-sm transition ${activeCategory === "all" ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-300 hover:border-stone-500"}`}
          >
            Усі теми
          </button>
          {usefulCategories.map(category => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full border text-sm transition ${activeCategory === category.id ? "bg-stone-800 text-white border-stone-800" : "bg-white text-stone-600 border-stone-300 hover:border-stone-500"}`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </section>
      {!query && activeCategory === "all" && (
        <Reveal as="section" className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500 mb-3">
              Почати з цього
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800 mb-10">
              Питання, які виникають найчастіше
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {featured.map(article => (
                <article
                  key={article.id}
                  className="group min-h-[390px] rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden flex flex-col"
                >
                  <Link
                    to={`/useful/${article.slug}`}
                    className="block h-44 overflow-hidden"
                    aria-label={`Читати: ${article.title}`}
                  >
                    <Image
                      baseSrc={article.cover ?? ""}
                      alt=""
                      loading="lazy"
                      className="transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
                      {usefulCategories.find(category => category.id === article.category)?.title}
                    </span>
                    <h3 className="text-xl font-serif font-semibold leading-snug text-stone-800 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <ArticleState article={article} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      )}
      <section className="section-padding bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {query || activeCategory !== "all" ? (
            <>
              <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-500 mb-3">
                    Результат пошуку
                  </p>
                  <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                    Знайдено: {filteredArticles.length}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                  }}
                  className="text-sm text-stone-600 underline underline-offset-4 hover:text-stone-900"
                >
                  Скинути фільтри
                </button>
              </div>
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredArticles.map(article => (
                    <article
                      key={article.id}
                      className="rounded-xl border border-stone-200 bg-white p-6 min-h-[180px] flex flex-col shadow-sm"
                    >
                      <span className="text-xs text-stone-400 mb-3">
                        {String(article.id).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-serif font-semibold leading-snug">
                        {article.title}
                      </h3>
                      <ArticleState article={article} />
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
                  <h3 className="text-2xl font-serif font-semibold mb-3">Нічого не знайдено</h3>
                  <p className="text-stone-500">
                    Спробуйте інше слово: «кухня», «ремонт», «меблі», «освітлення» або «бюджет».
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-16">
              {usefulCategories.map(category => {
                const articles = usefulArticles.filter(article => article.category === category.id);
                const visibleArticles = expandedCategories.has(category.id)
                  ? articles
                  : articles.slice(0, 6);
                return (
                  <section key={category.id} id={category.id} className="scroll-mt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-400 mb-3">
                          {articles.length} матеріалів
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                          {category.title}
                        </h2>
                        <p className="text-stone-600 leading-relaxed">{category.description}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 rounded-2xl overflow-hidden">
                        {visibleArticles.map(article => (
                          <article
                            key={article.id}
                            className="bg-white p-6 md:p-7 min-h-[170px] flex gap-5"
                          >
                            <span className="shrink-0 text-xs text-stone-400 pt-1">
                              {String(article.id).padStart(2, "0")}
                            </span>
                            <div className="flex flex-col">
                              <h3 className="text-lg md:text-xl font-serif font-semibold leading-snug">
                                {article.title}
                              </h3>
                              <ArticleState article={article} />
                            </div>
                          </article>
                        ))}
                        {articles.length > 6 && (
                          <div className="bg-white p-6 md:p-7 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedCategories(current => {
                                  const next = new Set(current);
                                  next.has(category.id)
                                    ? next.delete(category.id)
                                    : next.add(category.id);
                                  return next;
                                })
                              }
                              className="text-sm font-medium underline underline-offset-4 text-stone-600 hover:text-stone-950"
                            >
                              {expandedCategories.has(category.id)
                                ? "Згорнути список"
                                : `Показати всі ${articles.length} тем`}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className="bg-stone-900 text-white px-6 md:px-12 lg:px-24 py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-400 mb-4">
            Потрібна відповідь саме для вашого простору?
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
            Плануєте ремонт і не знаєте, з чого почати?
          </h2>
          <p className="text-stone-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Обговоримо планування, задачі та формат роботи, який підійде саме вашому проєкту.
          </p>
          <Link
            to="/contact#contact-form"
            data-cta-name="useful_contact"
            className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-3 rounded-sm font-medium hover:bg-stone-100 transition"
          >
            Обговорити проєкт <FiArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Useful;
