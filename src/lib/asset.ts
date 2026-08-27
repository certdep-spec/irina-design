/**
 * Резолвит путь к статическому ассету относительно BASE_URL.
 *
 * На Vercel/Netlify BASE_URL = "/" → "/Paint/hero.webp" остаётся как есть.
 * На GH Pages BASE_URL = "/irina-design/" → "/Paint/hero.webp" → "/irina-design/Paint/hero.webp".
 *
 * Используется везде, где картинки захардкожены в JSX (Hero, Home, About).
 * Компонент <Image> уже резолвит сам через BASE_URL — эту утилиту туда не трогаем.
 */
const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export const assetUrl = (path: string): string =>
  `${base}${path.startsWith("/") ? path : `/${path}`}`;
