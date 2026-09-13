import { Link } from "react-router-dom";

export default function ArticleConversionBar() {
  return (
    <section className="px-6 md:px-12 pb-16 md:pb-20 bg-white" aria-label="Наступний крок">
      <div className="max-w-3xl mx-auto rounded-2xl border border-stone-200 bg-stone-50 p-7 md:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-3">Якщо плануєте ремонт</p>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-900 mb-3">
          Можемо розібрати ваш об'єкт окремо
        </h2>
        <p className="text-stone-600 leading-relaxed mb-6">
          Напишіть площу, тип об'єкта і що саме потрібно вирішити. Я підкажу, чи достатньо планування, чи краще робити повний дизайн-проєкт.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/services"
            data-cta-name="article_to_services"
            className="btn-secondary min-h-[48px] inline-flex items-center justify-center"
          >
            Подивитися послуги
          </Link>
          <Link
            to="/portfolio/i1"
            data-cta-name="article_to_case"
            className="btn-secondary min-h-[48px] inline-flex items-center justify-center"
          >
            Подивитися приклад проєкту
          </Link>
          <Link
            to="/contact#contact-form"
            data-cta-name="article_to_contact"
            className="btn-primary min-h-[48px] inline-flex items-center justify-center"
          >
            Обговорити мій об'єкт
          </Link>
        </div>
      </div>
    </section>
  );
}
