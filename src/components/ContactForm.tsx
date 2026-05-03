import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { API_ENDPOINTS, VALIDATION } from '../constants/api'

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
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
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове"
    } else if (formData.name.length > VALIDATION.MAX_NAME_LENGTH) {
      newErrors.name = "Ім'я занадто довге"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обов\'язковий'
    } else if (!VALIDATION.PHONE_PATTERN.test(formData.phone)) {
      newErrors.phone = 'Невірний формат телефону'
    } else if (formData.phone.length > VALIDATION.MAX_PHONE_LENGTH) {
      newErrors.phone = 'Телефон занадто довгий'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обов\'язковий'
    } else if (!VALIDATION.EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = 'Невірний формат email'
    } else if (formData.email.length > VALIDATION.MAX_EMAIL_LENGTH) {
      newErrors.email = 'Email занадто довгий'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Повідомлення обов\'язкове'
    } else if (formData.message.length > VALIDATION.MAX_MESSAGE_LENGTH) {
      newErrors.message = 'Повідомлення занадто довге'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitError(null)
    console.log('Submitting form to:', API_ENDPOINTS.SEND_TELEGRAM);
    
    try {
      const response = await fetch(API_ENDPOINTS.SEND_TELEGRAM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: '', phone: '', email: '', message: '' })
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        let errorMessage = 'Помилка при відправці';
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitError('Сталася помилка при відправці повідомлення. Спробуйте ще раз або зателефонуйте нам.')
    } finally {
      // Diagnostic check: detailed error reporting is enabled
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-sm text-center animate-fade-in">
        <h3 className="text-2xl font-serif font-semibold text-green-800 mb-3">
          Дякуємо за звернення!
        </h3>
        <p className="text-green-700">
          Ми отримали ваше повідомлення та зв'яжемося з вами найближчим часом.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-sm text-sm text-red-700">
          {submitError}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
          Ім'я *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all ${
            errors.name ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="Ваше ім'я"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
          Телефон *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all ${
            errors.phone ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="+380 (XX) XXX-XX-XX"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all ${
            errors.email ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
          Повідомлення *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none ${
            errors.message ? 'border-red-500' : 'border-stone-300'
          }`}
          placeholder="Розкажіть про ваш проєкт..."
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
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