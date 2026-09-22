import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
export default function Privacy() {
  return <main className="bg-white text-stone-800">
    <Helmet><title>Політика конфіденційності | Ірина</title><meta name="robots" content="noindex, follow" /></Helmet>
    <section className="px-6 md:px-12 py-16 md:py-24"><div className="max-w-3xl mx-auto prose prose-stone prose-lg max-w-none">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-400 mb-4">Конфіденційність</p>
      <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8">Політика конфіденційності</h1>
      <p>Ця сторінка пояснює, які дані можуть збиратися через сайт irina-design.vercel.app і для чого вони використовуються.</p>
      <h2>Дані з форми</h2><p>Коли ви надсилаєте заявку, сайт може отримати ім'я, номер телефону, email, тип об'єкта, площу, орієнтовний бюджет і текст повідомлення. Ці дані потрібні лише для відповіді на звернення та обговорення потенційного проєкту.</p>
      <p>Заявка може передаватися власниці сайту через технічний канал повідомлень, зокрема Telegram, щоб звернення не загубилося.</p>
      <h2>Аналітика</h2><p>На сайті використовується Google Analytics 4 для статистики відвідувань, переходів по кнопках, глибини прокрутки та відправлення форми. Google Analytics може використовувати cookie та інші технічні ідентифікатори відповідно до налаштувань браузера й сервісу.</p>
      <h2>Передача даних</h2><p>Контактні дані не публікуються і не продаються. Технічні постачальники, які забезпечують роботу сайту, форми та аналітики, можуть обробляти дані лише в межах своїх сервісів.</p>
      <h2>Зв'язок</h2><p>Якщо потрібно уточнити або видалити дані, надіслані через форму, напишіть на <a href="mailto:irina26408@gmail.com">irina26408@gmail.com</a>.</p>
      <p className="pt-6"><Link to="/contact" className="underline underline-offset-4">Повернутися до контактів</Link></p>
    </div></section>
  </main>;
}
