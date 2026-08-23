/**
 * API Constants
 * Centralized API endpoint definitions.
 *
 * Зеркальный паритет (Vercel / Netlify / GH Pages):
 *   - Если задан VITE_API_BASE, все запросы идут на абсолютный URL
 *     (используется GH Pages, где нет serverless — API-донор это Vercel).
 *   - Иначе пути относительные (same-origin на Vercel/Netlify/локально).
 */

/** Базовый URL API. Пусто → относительные пути (same-origin). */
export const API_BASE: string = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '');

/**
 * Строит финальный URL эндпоинта:
 *   - с VITE_API_BASE → `${API_BASE}/api/...` (абсолютно)
 *   - без него        → `/api/...` (относительно текущего origin)
 */
export const apiUrl = (path: string): string => {
  const clean = path.replace(/^\/+/, '');
  if (API_BASE) return `${API_BASE}/${clean}`;
  return `/${clean}`;
};

export const API_ENDPOINTS = {
  SEND_TELEGRAM: '/api/send-telegram',
  ADMIN_AUTH: '/api/admin-auth',
} as const;

/**
 * Form validation constants
 */
export const VALIDATION = {
  MAX_NAME_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,
  MAX_EMAIL_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 1000,
  PHONE_PATTERN: /^[\d\s\-\+\(\)]+$/,
  EMAIL_PATTERN: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
} as const;
