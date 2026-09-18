import { Link, useLocation } from "react-router-dom";
import { publishedUsefulArticles, type UsefulCategoryId } from "../data/usefulArticles";

type ConversionConfig = { href: string; label: string; title: string; text: string };

const caseByCategory: Record<UsefulCategoryId, ConversionConfig> = {
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


const intentOverrides: Record<string, ConversionConfig> = {
  "skilky-koshtuie-dyzain-interieru-u-vinnytsi": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися житловий проєкт",
    title: "Хочете порахувати вартість для свого об'єкта?",
    text: "Надішліть площу та тип приміщення. Я зорієнтую по формату роботи й вартості саме для вашої задачі.",
  },
  "yak-formuietsia-tsina-dyzain-proiektu": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Потрібен точніший розрахунок, ніж ціна за м²?",
    text: "Напишіть площу й що хочете отримати від проєкту. Так простіше зрозуміти реальний обсяг роботи.",
  },
  "navishcho-potriben-dyzainer-interieru-pered-remontom": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Ще не почали ремонт?",
    text: "Це найзручніший момент перевірити планування, електрику, меблі й ключові рішення до виходу бригади.",
  },
  "dyzain-proiekt-chy-samostiinyi-remont": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися повний проєкт",
    title: "Не впевнені, чи потрібен повний дизайн-проєкт?",
    text: "Можна коротко описати об'єкт і задачу. Я підкажу, де достатньо планування, а де креслення й візуалізації справді потрібні.",
  },
  "planuvannia-chy-povnyi-dyzain-proiekt": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися повний проєкт",
    title: "Потрібно вибрати між плануванням і повним проєктом?",
    text: "Напишіть площу, стан об'єкта і що плануєте змінювати. Цього достатньо, щоб зорієнтуватися по формату.",
  },
  "yak-pravylno-splanuvaty-kvartyru-pered-remontom": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися планування в проєкті",
    title: "Є план квартири від забудовника?",
    text: "Можемо перевірити його до ремонту: проходи, меблі, зберігання, кухню та прив'язки до інженерії.",
  },
  "typovi-pomylky-planuvannia-kvartyry": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися житловий кейс",
    title: "Хочете перевірити своє планування до ремонту?",
    text: "Надішліть план і коротко опишіть склад сім'ї та основні побажання. Так можна побачити слабкі місця ще до будівельних робіт.",
  },
  "skilky-koshtuie-remont-kvartyry-u-vinnytsi": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Рахуєте бюджет ремонту?",
    text: "Дизайн-проєкт не замінює кошторис, але допомагає заздалегідь визначити рішення, які найбільше впливають на витрати.",
  },
  "yak-sklasty-biudzhet-remontu-kvartyry": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Хочете пов'язати бюджет із конкретними рішеннями?",
    text: "Можемо спочатку визначити планування, матеріали та меблі, а вже потім перевіряти, що вкладається у ваш бюджет.",
  },
  "yak-ne-vyity-za-mezhi-biudzhetu-remontu": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Потрібно зменшити кількість несподіваних витрат?",
    text: "Чим більше рішень зафіксовано до старту робіт, тим менше дорогих змін доводиться робити вже на об'єкті.",
  },
  "yak-pravylno-splanuvaty-kukhniu": {
    href: "/portfolio/dyzain-kukhni",
    label: "Подивитися проєкт кухні",
    title: "Є розміри майбутньої кухні?",
    text: "Надішліть їх разом із побажаннями по техніці та зберіганню. Можемо окремо розібрати планування кухні.",
  },
  "typovi-pomylky-proiektuvannia-kukhni": {
    href: "/portfolio/dyzain-kukhni",
    label: "Подивитися проєкт кухні",
    title: "Хочете перевірити кухню до замовлення меблів?",
    text: "Краще перевірити техніку, проходи, відкривання фасадів, розетки й робочі зони до запуску меблів у виробництво.",
  },
  "yak-sproiektuvaty-zruchnu-vbudovanu-kukhniu": {
    href: "/portfolio/dyzain-kukhni",
    label: "Подивитися кухні",
    title: "Плануєте вбудовану кухню?",
    text: "Можемо спроєктувати її під ваше приміщення, техніку, звички й реальні місця зберігання.",
  },
  "mebli-na-zamovlennia-chy-hotovi": {
    href: "/portfolio/indyvidualni-mebli",
    label: "Подивитися меблі на замовлення",
    title: "Не впевнені, чи потрібні меблі на замовлення?",
    text: "Покажіть план або фото місця. Я підкажу, де індивідуальне рішення справді дає перевагу, а де можна обійтися готовими меблями.",
  },
  "koly-varto-zamovliaty-indyvidualni-mebli": {
    href: "/portfolio/indyvidualni-mebli",
    label: "Подивитися меблі на замовлення",
    title: "Є нестандартне місце під меблі?",
    text: "Надішліть розміри або план. Можемо окремо продумати конструкцію, наповнення і те, як меблі працюватимуть у кімнаті.",
  },
  "yak-pravylno-sproiektuvaty-shafu": {
    href: "/portfolio/harderobna-systema",
    label: "Подивитися систему зберігання",
    title: "Потрібно спроєктувати шафу або гардеробну?",
    text: "Можемо почати з речей, які потрібно зберігати, і реальних розмірів ніші — так наповнення виходить набагато практичнішим.",
  },
  "yak-splanuvaty-harderobnu-systemu": {
    href: "/portfolio/harderobna-systema",
    label: "Подивитися гардеробну",
    title: "Плануєте гардеробну систему?",
    text: "Надішліть розміри приміщення або ніші. Я допоможу розкласти зберігання так, щоб кожна зона мала зрозуміле призначення.",
  },
  "avtorskyi-nahliad-shcho-tse-i-navishcho": {
    href: "/portfolio/zhytlovyi-interier-120-m2",
    label: "Подивитися приклад проєкту",
    title: "Потрібен супровід під час реалізації?",
    text: "Можемо обговорити, на якому етапі зараз об'єкт і які питання потрібно контролювати під час ремонту.",
  },
};

export default function ArticleConversionBar() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const slug = pathParts[pathParts.length - 1];
  const article = publishedUsefulArticles.find(item => item.slug === slug);
  const config = (slug && intentOverrides[slug]) || caseByCategory[article?.category ?? "design"];

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
