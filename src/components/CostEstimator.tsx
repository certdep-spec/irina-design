import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

type ServiceType = "planning" | "full" | "furniture";

const serviceOptions: Record<ServiceType, { label: string; rate?: number; fixed?: number }> = {
  planning: { label: "Планувальне рішення", rate: 250 },
  full: { label: "Повний дизайн-проєкт", rate: 750 },
  furniture: { label: "Дизайн меблів", fixed: 2500 },
};

export default function CostEstimator() {
  const [service, setService] = useState<ServiceType>("full");
  const [area, setArea] = useState("60");

  const estimate = useMemo(() => {
    const option = serviceOptions[service];
    if (option.fixed) return option.fixed;
    const areaNumber = Number(area);
    if (!Number.isFinite(areaNumber) || areaNumber <= 0 || !option.rate) return null;
    return Math.round(areaNumber * option.rate);
  }, [service, area]);

  const handleEstimate = () => {
    trackEvent("cost_estimate", {
      service_type: service,
      area_m2: service === "furniture" ? undefined : Number(area) || undefined,
      estimate_uah: estimate || undefined,
      page_path: window.location.pathname,
    });
  };

  return (
    <section className="px-6 md:px-12 py-16 bg-stone-50 border-t border-stone-200" aria-labelledby="cost-estimator-title">
      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-stone-400 mb-3">Орієнтир за вартістю</p>
          <h2 id="cost-estimator-title" className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-4">
            Скільки може коштувати ваш проєкт
          </h2>
          <p className="text-stone-600 leading-relaxed max-w-2xl">
            Оберіть послугу та вкажіть площу. Калькулятор покаже орієнтир за базовими цінами зі сторінки послуг. Точну суму я зможу назвати після короткого обговорення об'єкта.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="estimate-service">
            Послуга
          </label>
          <select
            id="estimate-service"
            value={service}
            onChange={event => setService(event.target.value as ServiceType)}
            onBlur={handleEstimate}
            className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white focus:ring-2 focus:ring-stone-800 outline-none"
          >
            <option value="planning">Планувальне рішення</option>
            <option value="full">Повний дизайн-проєкт</option>
            <option value="furniture">Дизайн меблів</option>
          </select>

          {service !== "furniture" && (
            <div className="mt-5">
              <label className="block text-sm font-medium text-stone-700 mb-2" htmlFor="estimate-area">
                Площа, м²
              </label>
              <input
                id="estimate-area"
                type="number"
                min="1"
                inputMode="numeric"
                value={area}
                onChange={event => setArea(event.target.value)}
                onBlur={handleEstimate}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-800 outline-none"
              />
            </div>
          )}

          <div className="mt-6 rounded-xl bg-stone-900 text-white p-5">
            <p className="text-sm text-stone-300">Орієнтовно від</p>
            <p className="text-3xl font-serif font-semibold mt-1">
              {estimate ? `${estimate.toLocaleString("uk-UA")} грн` : "вкажіть площу"}
            </p>
            <p className="text-xs text-stone-400 mt-2">
              Це попередній розрахунок, а не остаточна кошторисна пропозиція.
            </p>
          </div>

          <Link
            to="/contact#contact-form"
            data-cta-name="cost_estimator_contact"
            className="btn-primary mt-6 w-full min-h-[50px] inline-flex items-center justify-center"
          >
            Уточнити вартість мого проєкту
          </Link>
        </div>
      </div>
    </section>
  );
}
