/**
 * api/admin-auth.js
 * Vercel serverless-адаптер для серверной авторизации админки.
 * Пароль сверяется с env ADMIN_PASSWORD (без префикса VITE_ — не в бандле).
 */
import { adminAuth, checkAdminRateLimit, corsHeaders, issueAdminToken } from '../shared/send-message.js';

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const cors = corsHeaders(origin);
  for (const [k, v] of Object.entries(cors)) res.setHeader(k, v);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp =
    req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  if (!checkAdminRateLimit(clientIp)) {
    return res.status(429).json({ error: 'Too many attempts' });
  }

  const password = (req.body && req.body.password) || '';
  const { configured, ok } = adminAuth(password);

  if (!configured) {
    // Пароль на сервере не задан — вход невозможен (опасное поведение
    // "нет пароля = панель открыта" устранено).
    return res.status(401).json({ error: 'Auth not configured' });
  }
  if (!ok) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  // Сервер выпускает короткоживущий токен сессии — клиент хранит его,
  // а не пароль. Токен используется для авторизации записи в dev-режиме.
  return res.status(200).json({ success: true, token: issueAdminToken() });
}
