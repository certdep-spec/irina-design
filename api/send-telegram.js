/**
 * api/send-telegram.js
 * Vercel serverless-адаптер: вся логика в shared/send-message.js.
 * Единый источник для GH Pages (через VITE_API_BASE) и same-origin на Vercel/Netlify.
 */
import {
  buildData,
  validate,
  checkRateLimit,
  processSubmission,
  corsHeaders,
} from '../shared/send-message.js';

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const cors = corsHeaders(origin);
  // Применяем CORS к каждому ответу.
  for (const [k, v] of Object.entries(cors)) res.setHeader(k, v);

  // Preflight для кросс-доменных запросов (GH Pages → API Vercel).
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientIp =
      req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    const data = buildData(req.body);
    if (!validate(data)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { telegramOk, dropped } = await processSubmission(data);

    if (telegramOk) {
      // Honeypot-ботам и реальным заявкам отдаём одинаковый успешный ответ.
      return res.status(200).json({ success: true, dropped: Boolean(dropped) });
    }
    // Честный сбой отправки — без утечки внутренних деталей наружу.
    return res.status(502).json({ error: 'Submission failed' });
  } catch {
    return res.status(500).json({ error: 'Internal error' });
  }
}
