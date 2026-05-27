import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { API_ENDPOINTS, VALIDATION } from '../constants/api'

interface FormData {
  name: string;
  phone: string;
  email: string;
  objectType: string;
  area: string;
  budget: string;
  message: string;
  website: string; // Honeypot field for spam protection
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  objectType?: string;
  message?: string;
}

/**
 * ContactForm Component
 * Handles contact form submission with Telegram integration via Netlify Functions
 */
function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    objectType: '',
    area: '',
    budget: '',
    message: '',
    website: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasStartedFilling, setHasStartedFilling] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обов\'язковий'
    } else if (!VALIDATION.PHONE_PATTERN.test(formData.phone)) {
      newErrors.phone = 'Невірний формат телефону'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обов\'язковий'
    } else if (!VALIDATION.EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = 'Невірний формат email'
    }

    if (!formData.objectType) {
      newErrors.objectType = 'Оберіть тип об\'єкта'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Повідомлення обов\'язкове'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (!hasStartedFilling) {
      setHasStartedFilling(true);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    if (formData.website) {
      setSubmitSuccess(true);
      return;
    }
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await fetch(API_ENDPOINTS.SEND_TELEGRAM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', phone: '', email: '', objectType: '', area: '', budget: '', message: '', website: '' });
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error('Помилка при відправці');
      }
    } catch (err) {
      setSubmitError('Сталася помилка. Спробуйте ще раз або зателефонуйте нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-stone-900 text-white p-10 rounded-2xl text-center animate-fade-in shadow-2xl">
        <h3 className="text-3xl font-serif font-semibold mb-4">Дякуємо за довіру!</h3>
        <p className="text-stone-300 text-lg">Ми отримали ваш бриф і вже вивчаємо деталі. Зв'яжемося з вами найближчим часом.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Ім'я *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-stone-800 transition-all ${errors.name ? 'border-red-500' : 'border-stone-200'}`} placeholder="Олександр" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Телефон *</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-stone-800 transition-all ${errors.phone ? 'border-red-500' : 'border-stone-200'}`} placeholder="+380..." />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="objectType" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Тип об'єкта *</label>
          <select id="objectType" name="objectType" value={formData.objectType} onChange={handleChange} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800 outline-none">
            <option value="">Оберіть...</option>
            <option value="apartment">Квартира</option>
            <option value="house">Будинок / Котедж</option>
            <option value="commercial">Комерція</option>
            <option value="furniture">Тільки меблі</option>
          </select>
          {errors.objectType && <p className="mt-1 text-xs text-red-600">{errors.objectType}</p>}
        </div>

        <div>
          <label htmlFor="area" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Площа (м²)</label>
          <input type="number" id="area" name="area" value={formData.area} onChange={handleChange} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800" placeholder="Наприклад, 65" />
        </div>

        <div>
          <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Бюджет на реалізацію</label>
          <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800 outline-none">
            <option value="">Оберіть...</option>
            <option value="economy">Бюджетний</option>
            <option value="standard">Середній</option>
            <option value="premium">Преміум</option>
            <option value="undecided">Ще не визначено</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Ваші побажання *</label>
        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-stone-800 transition-all resize-none ${errors.message ? 'border-red-500' : 'border-stone-200'}`} placeholder="Розкажіть про ваш об'єкт..." />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      
      {/* Honeypot field (hidden from users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Назва вашого сайту (не заповнюйте)</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <FiSend className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? 'animate-pulse' : ''}`} />
        <span>{isSubmitting ? 'Відправка...' : 'Відправити повідомлення'}</span>
      </button>
    </form>
  )
}

export default ContactForm