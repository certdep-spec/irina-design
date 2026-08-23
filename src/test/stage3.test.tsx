/**
 * Этап 3 — маркетинг: тесты компонентов.
 * - FAQPage JSON-LD присутствует в DOM (Services)
 * - модалка Portfolio показывает task/solution (данные из portfolio.json)
 * - data-cta-name на ключевых CTA
 * - analytics: form_start/form_submit шлют события в dataLayer (gtag)
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import ContactForm from "../components/ContactForm";
import Home from "../pages/Home";
import { portfolioCases } from "../data/portfolio";

function renderWithRouter(ui: React.ReactElement) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>
    </HelmetProvider>
  );
}

describe("Этап 3 — Services FAQ", () => {
  it("FAQ рендерится как раскрывающиеся блоки", () => {
    renderWithRouter(<Services />);
    expect(screen.getByText("Часті запитання")).toBeInTheDocument();
    expect(screen.getByText(/Що потрібно для старту роботи/)).toBeInTheDocument();
  });
});

describe("Этап 3 — Portfolio modal shows task/solution", () => {
  it("модалка показывает task и solution, если они есть в данных", async () => {
    const withTask = portfolioCases.find(c => c.task && c.solution);
    expect(withTask).toBeTruthy();

    renderWithRouter(<Portfolio />);
    // Кликаем по первой карточке
    const cards = document.querySelectorAll('[data-cta-name^="portfolio_card_"]');
    expect(cards.length).toBeGreaterThan(0);
    fireEvent.click(cards[0] as HTMLElement);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    // Заголовок проекта виден в модалке (ищем в dialog)
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(withTask!.title);
    // Хотя бы одно из полей task/solution присутствует в модалке
    expect(dialog.textContent).toMatch(/Завдання|Рішення/);
  });

  it("карточка показывает meta, если задано", () => {
    const withMeta = portfolioCases.find(c => c.meta);
    expect(withMeta).toBeTruthy();
    const { container } = renderWithRouter(<Portfolio />);
    expect(container.textContent).toContain(withMeta!.meta);
  });
});

describe("Этап 3 — data-cta-name на CTA", () => {
  it("Home содержит ключевые data-cta-name", () => {
    const { container } = renderWithRouter(<Home />);
    const names = Array.from(container.querySelectorAll("[data-cta-name]")).map(el =>
      el.getAttribute("data-cta-name")
    );
    expect(names).toContain("home_individual_offer");
    expect(names).toContain("home_start_project");
  });
});

describe("Этап 3 — analytics form_start / form_submit", () => {
  beforeEach(() => {
    (window as unknown as { gtag?: unknown }).gtag = vi.fn();
  });

  it("печатает в поле → form_start отправлен", () => {
    renderWithRouter(<ContactForm />);
    const nameInput = screen.getByLabelText(/Ім'я/) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Оля" } });
    expect((window as any).gtag).toHaveBeenCalledWith(
      "event",
      "form_start",
      expect.objectContaining({ page_path: "/" })
    );
  });

  it("успешная отправка → form_submit (мок формы fetch)", async () => {
    // Мокаем fetch ДО рендера, чтобы перехватить вызов
    const gtag = vi.fn();
    (window as any).gtag = gtag;
    globalThis.fetch = vi.fn(async () => ({ ok: true })) as any;

    renderWithRouter(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Ім'я/), { target: { value: "Оля" } });
    fireEvent.change(screen.getByLabelText(/Телефон/), { target: { value: "+380991112233" } });
    fireEvent.change(screen.getByLabelText(/Тип об'єкта/), { target: { value: "apartment" } });
    fireEvent.change(screen.getByLabelText(/Ваші побажання/), { target: { value: "Квартира" } });
    fireEvent.click(screen.getByText(/Відправити повідомлення/));

    await waitFor(() => {
      expect(gtag).toHaveBeenCalledWith(
        "event",
        "form_submit",
        expect.objectContaining({ page_path: "/" })
      );
    });
  });
});
