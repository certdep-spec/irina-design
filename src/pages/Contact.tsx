import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiMessageCircle } from 'react-icons/fi'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Contact Page
 * Contact form and contact information
 */
function Contact() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  const [heroRef, heroVisible] = useScrollReveal()
  const [contentRef, contentVisible] = useScrollReveal()
  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`bg-stone-100 py-20 px-6 ${heroVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-stone-800">
            Контакти
          </h1>
          <p className="text-xl text-stone-600">
            Зв'яжіться з нами для обговорення вашого проєкту
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contentRef}
        className={`section-padding ${contentVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div id="contact-form" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-stone-800">
                Надішліть повідомлення
              </h2>
              <p className="text-stone-600 mb-8">
                Заповніть форму, і ми зв'яжемося з вами протягом 24 годин для обговорення деталей вашого проєкту.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-serif font-semibold mb-8 text-stone-800">
                Контактна інформація
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-stone-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-stone-800">Адреса</h3>
                    <p className="text-stone-600">м. Вінниця, Україна</p>
                    <p className="text-sm text-stone-500 mt-1">Працюємо по всій Вінницькій області</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-stone-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-stone-800">Телефон</h3>
                    <a href="tel:+380964599885" className="text-stone-600 hover:text-stone-800 transition-colors">
                      096 459 98 85
                    </a>
                    <p className="text-sm text-stone-500 mt-1">Viber, WhatsApp, Telegram</p>
                    <p className="text-sm text-stone-500">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-stone-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-stone-800">Email</h3>
                    <a href="mailto:irina26408@gmail.com" className="text-stone-600 hover:text-stone-800 transition-colors">
                      irina26408@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-10">
                <h3 className="font-semibold mb-4 text-stone-800">Ми в соціальних мережах</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <FiInstagram size={20} className="text-stone-700" />
                  </a>
                  <a 
                    href="https://t.me/username" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Telegram"
                  >
                    <FiMessageCircle size={20} className="text-stone-700" />
                  </a>
                  <a 
                    href="https://viber.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors"
                    aria-label="Viber"
                  >
                    <FiMessageCircle size={20} className="text-stone-700" />
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-stone-200 h-64 rounded-sm overflow-hidden">
                {/* TODO: Replace with actual Google Maps embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82408.32707464616!2d28.46826275869139!3d49.23273753483889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4735f5e89c8b0c4d%3A0x7c4e6e0e0e0e0e0e!2sVinnytsia!5e0!3m2!1sen!2sua!4v1234567890123!5m2!1sen!2sua"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map Vinnytsia"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact