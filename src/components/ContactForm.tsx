import { useMemo, useState } from "react";
import { FiSend } from "react-icons/fi";
import { API_ENDPOINTS, VALIDATION } from "../constants/api";
import { trackFormStart, trackFormSubmit } from "../lib/analytics";

interface FormData {
  name: string;
  phone: string;
  email: string;
  objectType: string;
  area: string;
  budget: string;
  message: string;
  website: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  objectType?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    objectType: "",
    area: "",
    budget: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasStartedFilling, setHasStartedFilling] = useState(false);

  const areaNumber = useMemo(() => {
    const value = Number(formData.area);
    return Number.isFinite(value) && value > 0 ? value : null;
  }, [formData.area]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Ім'я обов'язкове";

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!VALIDATION.PHONE_PATTERN.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
    }

    if (formData.email.trim() && !VALIDATION.EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.objectType) newErrors.objectType = "Оберіть тип об'єкта";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (!hasStartedFilling) {
      setHasStartedFilling(true);
      trackFormStart(window.location.pathname);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.website) {
      setSubmitSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const autoMessage = `Потрібен розрахунок вартості. Тип об'єкта: ${formData.objectType || "не вказано"}; площа: ${formData.area || "не вказана"} м²; бюджет: ${formData.budget || "не визначено"}.`;
    const payload = {
      ...formData,
      message: formData.message.trim() || autoMessage,
    };

    try {
      const response = await fetch(API_ENDPOINTS.SEND_TELEGRAM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        trackFormSubmit(window.location.pathname);
        setFormData({
          name: "",
          phone: "",
          email: "",
          objectType: "",
          area: "",
          budget: "",
          message: "",
          website: "",
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error("Помилка при відправці");
      }
    } catch {
      setSubmitError("Сталася помилка. Спробуйте ще раз або зателефонуйте нам.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-stone-900 text-white p-10 rounded-2xl text-center animate-fade-in shadow-2xl">
        <h3 className="text-3xl font-serif font-semibold mb-4">Дякуємо! Заявку отримано.</h3>
        <p className="text-stone-300 text-lg">
          Переглянемо площу та формат об'єкта і зв'яжемося з вами для уточнення задачі та вартості.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-100"
    >
      <div className="mb-2">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-2">Короткий бриф</p>
        <h3 className="text-2xl font-serif font-semibold text-stone-900">Отримати розрахунок</h3>
        <p className="text-stone-600 mt-2">
          Заповніть основні дані. Детальний опис не обов'язковий — уточнимо все під час контакту.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
            Ім'я *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-stone-800 transition-all ${errors.name ? "border-red-500" : "border-stone-200"}`}
            placeholder="Ваше ім'я"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
            className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-stone-800 transition-all ${errors.phone ? "border-red-500" : "border-stone-200"}`}
            placeholder="+380..."
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="objectType" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
            Тип об'єкта *
          </label>
          <select
            id="objectType"
            name="objectType"
            value={formData.objectType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800 outline-none"
          >
            <option value="">Оберіть...</option>
            <option value="apartment">Квартира</option>
            <option value="house">Будинок / котедж</option>
            <option value="commercial">Комерційне приміщення</option>
            <option value="furniture">Тільки меблі</option>
          </select>
          {errors.objectType && <p className="mt-1 text-xs text-red-600">{errors.objectType}</p>}
        </div>

        <div>
          <label htmlFor="area" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
            Площа, м²
          </label>
          <input
            type="number"
            min="1"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            inputMode="numeric"
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800"
            placeholder="Наприклад, 65"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
            Бюджет реалізації
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800 outline-none"
          >
            <option value="">Ще не визначено</option>
            <option value="economy">Раціональний</option>
            <option value="standard">Середній</option>
            <option value="premium">Преміум</option>
          </select>
        </div>
      </div>

      {areaNumber && formData.objectType !== "furniture" && (
        <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 text-sm text-stone-600">
          Площа <strong className="text-stone-900">{areaNumber} м²</strong> допоможе одразу зорієнтуватися у форматі та обсязі робіт. Точну вартість підтвердимо після короткого уточнення задачі.
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className={`w-full px-4 py-3 bg-stone-50 border rounded-lg focus:ring-2 focus:ring-stone-800 transition-all ${errors.email ? "border-red-500" : "border-stone-200"}`}
          placeholder="Необов'язково"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
          Що важливо врахувати?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800 transition-all resize-none"
          placeholder="Наприклад: новобудова, потрібне перепланування і кухня на замовлення. Можна залишити порожнім."
        />
      </div>

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

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm animate-fade-in">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        data-cta-name="contact_estimate_submit"
        disabled={isSubmitting}
        className="btn-primary w-full min-h-[52px] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <FiSend className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? "animate-pulse" : ""}`} />
        <span>{isSubmitting ? "Відправка..." : "Отримати розрахунок"}</span>
      </button>

      <p className="text-xs text-stone-500 text-center">
        Після заявки зв'яжемося, уточнимо задачу та запропонуємо відповідний формат роботи.
      </p>
    </form>
  );
}

export default ContactForm;
