import { Link } from "react-router-dom";
import { portfolioCases } from "../data/portfolio";

export default function PortfolioCaseLinks() {
  return (
    <section className="px-6 md:px-12 pb-20 bg-stone-50" aria-labelledby="case-links-title">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-3">Детальні кейси</p>
          <h2 id="case-links-title" className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-3">
            Подивитися проєкти окремо
          </h2>
          <p className="text-stone-600">
            У кожного проєкту є окрема сторінка з описом задачі, рішенням і повною галереєю.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolioCases.map(item => (
            <Link
              key={item.id}
              to={`/portfolio/${item.slug}`}
              data-cta-name={`portfolio_case_link_${item.id}`}
              className="group bg-white border border-stone-200 rounded-xl p-5 hover:shadow-md transition"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-stone-400 mb-2">
                {item.category === "interior" ? "Інтер'єр" : "Меблі"}
              </p>
              <h3 className="text-xl font-serif font-semibold text-stone-900 group-hover:text-stone-600 transition">
                {item.title}
              </h3>
              {item.meta && <p className="text-sm text-stone-500 mt-2">{item.meta}</p>}
              <span className="inline-block mt-4 text-sm font-medium text-stone-800">Відкрити кейс →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
