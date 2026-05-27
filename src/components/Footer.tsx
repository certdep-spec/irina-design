import { FiExternalLink, FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram } from 'react-icons/fi'

/**
 * Footer Component
 * Contains contact info, social links, and copyright
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-4">
              INTERIOR.DESIGN
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Створюємо унікальні інтер'єри та меблі у Вінниці, які відображають вашу індивідуальність та стиль життя.
            </p>
             <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100063828644118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="Facebook"
                  aria-label="Facebook - переглянути профіль"
                >
                  <FiFacebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/nova_art_design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="Instagram"
                  aria-label="Instagram - переглянути профіль"
                >
                  <FiInstagram size={20} />
                </a>
                <a
                  href="https://www.olx.ua/d/uk/obyavlenie/dizayn-nterru-ta-meblv-ID8JTWR.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="OLX"
                  aria-label="OLX - переглянути оголошення"
                >
                  <FiExternalLink size={20} />
                </a>
              </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Контакти</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <FiMapPin className="text-stone-500 flex-shrink-0" />
                <span>м. Вінниця, Україна</span>
              </li>
               <li className="flex items-center space-x-3">
                  <FiPhone className="text-stone-500 flex-shrink-0" />
                  <a href="tel:+380964599885" className="hover:text-white transition-colors">
                    096 459 98 85 <span className="text-xs text-stone-400 ml-2">(Viber, WhatsApp, Telegram)</span>
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <FiMail className="text-stone-500 flex-shrink-0" />
                  <a href="mailto:irina26408@gmail.com" className="hover:text-white transition-colors">
                    irina26408@gmail.com
                  </a>
                </li>
             </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Графік роботи</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Пн - Пт: 9:00 - 18:00</li>
              <li>Сб: 10:00 - 15:00</li>
              <li>Нд: вихідний</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {currentYear} Interior Design Vinnytsia. Всі права захищено.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer