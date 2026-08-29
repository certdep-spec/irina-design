const BRAND_SUFFIX = " | Ірина";
const DESCRIPTION_SUFFIX = " Практичні поради дизайнерки інтер’єру з Вінниці.";

const compactSeoTitles: Record<number, string> = {
  6: "Етапи роботи над дизайн-проєктом інтер’єру",
  21: "Як спланувати дитячу кімнату на виріст",
  71: "Як дизайнер створює індивідуальні меблі",
  80: "Матеріали для дорогого інтер’єру без зайвих витрат",
  90: "Тренди дизайну інтер’єру 2026 року",
  100: "Від ідеї до готового інтер’єру: етапи реалізації",
};

export const getArticleSeoTitle = (id: number, title: string) => {
  const compactTitle = compactSeoTitles[id] ?? title;
  return compactTitle.length + BRAND_SUFFIX.length <= 65
    ? `${compactTitle}${BRAND_SUFFIX}`
    : compactTitle;
};

export const getArticleSeoDescription = (excerpt: string) => {
  if (excerpt.length >= 130) return excerpt.slice(0, 158).trim();
  const expanded = `${excerpt.replace(/[.!?]?$/, ".")}${DESCRIPTION_SUFFIX}`;
  if (expanded.length <= 158) return expanded;
  const shortened = expanded.slice(0, 157);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, Math.max(lastSpace, 130)).replace(/[,:;.!?]+$/, "")}…`;
};
