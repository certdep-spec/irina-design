import { Link, useLocation } from "react-router-dom";
import { publishedUsefulArticles, type UsefulCategoryId } from "../data/usefulArticles";

const caseByCategory: Record<
  UsefulCategoryId,
  { href: string; label: string; title: string; text: string }
> = {
  design: {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися житловий проєкт",
    title: "Плануєте ремонт або новий інтер'єр?",
    text: "Напишіть площу й коротко опишіть задачу. Я підкажу, з чого краще почати: з планування чи з повного дизайн-проєкту.",
  },
  repair: {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Хочете менше рішень приймати вже під час ремонту?",
    text: "Можемо заздалегідь розібрати планування, креслення та ключові матеріали, щоб на об'єкті було менше імпровізації.",
  },
  kitchen: {
    href: "/portfolio/dyzain-kukhni",
    label: "Подивитися проєкт кухні",
    title: "Плануєте кухню?",
    text: "Надішліть розміри або площу приміщення і коротко опишіть, що для вас важливо. Я зорієнтую, який формат роботи підійде.",
  },
  furniture: {
    href: "/portfolio/indyvidualni-mebli",
    label: "Подивитися меблі на замовлення",
    title: "Потрібні меблі під конкретний простір?",
    text: "Можемо окремо розібрати кухню, шафу, гардеробну або інші меблі й прив'язати їх до планування кімнати.",
  },
  lighting: {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися житловий проєкт",
    title: "Електрику й світло краще продумати до ремонту",
    text: "Якщо вже є план квартири, можна перевірити розетки, вимикачі, освітлення та їх прив'язку до майбутніх меблів.",
  },
  materials: {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися матеріали в проєкті",
    title: "Складно зібрати матеріали в один інтер'єр?",
    text: "Можемо почати з планування й загальної концепції, а потім підібрати матеріали так, щоб вони працювали разом.",
  },
  styles: {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися реалізовану концепцію",
    title: "Подобається кілька стилів і важко вибрати?",
    text: "Не обов'язково починати з назви стилю. Спочатку можна визначити, який простір вам потрібен у житті, а вже потім зібрати його в цілісну концепцію.",
  },
  practice: {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Є питання по вашому об'єкту?",
    text: "Напишіть площу, тип об'єкта і що саме зараз потрібно вирішити. Я підкажу, який наступний крок буде доречним.",
  },
};

export default function ArticleConversionBar() {
  const location = useLocation();
  const slug = location.pathname.split("/").filter(Boolean).at(-1);
  const article = publishedUsefulArticles.find(item => item.slug === slug);
  const config = caseByCategory[article?.category ?? "design"];

  return (
    <section className="px-6 md:px-12 pb-16 md:pb-20 bg-white" aria-label="Наступний крок">
      <div className="max-w-3xl mx-auto rounded-2xl border border-stone-200 bg-stone-50 p-7 md:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-3">Якщо це про ваш ремонт</p>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-900 mb-3">
          {config.title}
        </h2>
        <p className="text-stone-600 leading-relaxed mb-6">{config.text}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/services"
            data-cta-name={`article_${article?.category ?? "design"}_to_services`}
            className="btn-secondary min-h-[48px] inline-flex items-center justify-center"
          >
            Послуги та вартість
          </Link>
          <Link
            to={config.href}
            data-cta-name={`article_${article?.category ?? "design"}_to_case`}
            className="btn-secondary min-h-[48px] inline-flex items-center justify-center"
          >
            {config.label}
          </Link>
          <Link
            to="/contact#contact-form"
            data-cta-name={`article_${article?.category ?? "design"}_to_contact`}
            className="btn-primary min-h-[48px] inline-flex items-center justify-center"
          >
            Обговорити мій об'єкт
          </Link>
        </div>
      </div>
    </section>
  );
}
