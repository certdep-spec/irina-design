import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook } from "react-icons/fi";
import { FaTelegramPlane, FaViber } from "react-icons/fa";
import { Reveal } from "../components/Reveal";

/**
 * Contact Page
 * Contact form and contact information
 */
function Contact() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <Helmet>
        <title>Контакти — Дизайнер інтер'єру Ірина у Вінниці</title>
        <link rel="canonical" href="https://irina-design.vercel.app/contact" />
        <meta
          name="description"
          content="Контакти дизайнера інтер'єру Ірини у Вінниці. Напишіть про ваш об'єкт, площу та задачу, щоб обговорити формат роботи."
        />
        <meta property="og:url" content="https://irina-design.vercel.app/contact" />
        <meta property="og:title" content="Контакти — Дизайнер інтер'єру Ірина у Вінниці" />
        <meta
          property="og:description"
          content="Контакти дизайнера інтер'єру Ірини у Вінниці. Напишіть про ваш об'єкт, площу та задачу, щоб обговорити формат роботи."
        />
        <meta name="twitter:title" content="Контакти — Дизайнер інтер'єру Ірина у Вінниці" />
        <meta
          name="twitter:description"
          content="Контакти дизайнера інтер'єру Ірини у Вінниці. Напишіть про ваш об'єкт, площу та задачу, щоб обговорити формат роботи."
        />
      </Helmet>
      {/* Hero Section */}
      <Reveal as="section" className="bg-stone-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Контакти
          </h1>
          <p className="text-xl text-stone-600">Напишіть мені, якщо хочете обговорити свій проєкт</p>
        </div>
      </Reveal>

      {/* Contact Section */}
      <Reveal as="section" className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div id="contact-form" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-stone-800">
                Надішліть повідомлення
              </h2>
              <p className="text-stone-600 mb-8">
                Вкажіть тип об'єкта, площу та зручний спосіб зв'язку. Я перегляну заявку і напишу або зателефоную, щоб уточнити деталі.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-8 text-stone-800">
                Як зі мною зв'язатися
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-stone-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-stone-800">Географія роботи</h3>
                    <p className="text-stone-600">Вінниця та Вінницька область</p>
                    <p className="text-sm text-stone-500 mt-1">
                      Дистанційно працюю з проєктами по Україні
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-stone-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-stone-800">Телефон</h3>
                    <a
                      href="tel:+380964599885"
                      className="text-stone-600 hover:text-stone-800 transition-colors"
                    >
                      096 459 98 85
                    </a>
                    <p className="text-sm text-stone-500 mt-1">Viber, WhatsApp, Telegram</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-stone-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-stone-800">Email</h3>
                    <a
                      href="mailto:irina26408@gmail.com"
                      className="text-stone-600 hover:text-stone-800 transition-colors"
                    >
                      irina26408@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-10">
                <h3 className="font-semibold mb-4 text-stone-800">Соціальні мережі</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=100063828644118"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Facebook"
                  >
                    <FiFacebook size={20} className="text-stone-700" />
                  </a>
                  <a
                    href="https://www.instagram.com/nova_art_design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <FiInstagram size={20} className="text-stone-700" />
                  </a>
                  <a
                    href="https://t.me/+380964599885"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Telegram"
                  >
                    <FaTelegramPlane size={20} className="text-stone-700" />
                  </a>
                  <a
                    href="viber://chat?number=%2B380964599885"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Viber"
                  >
                    <FaViber size={20} className="text-stone-700" />
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-stone-100 border border-stone-200 p-6">
                <h3 className="font-semibold text-stone-800 mb-2">Як можна працювати</h3>
                <p className="text-stone-600 leading-relaxed">
                  У Вінниці та області можливі зустрічі й виїзди на об'єкт за домовленістю. Інші проєкти можна вести дистанційно.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default Contact;
