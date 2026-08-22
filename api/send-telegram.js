/**
 * api/send-telegram.js
 * Vercel serverless-адаптер: вся логика в shared/send-message.js.
 */
import { buildData, validate, checkRateLimit, processSubmission } from '../shared/send-message.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    const data = buildData(req.body);
    if (!validate(data)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { telegramOk, errors } = await processSubmission(data);

    if (telegramOk) {
      return res.status(200).json({ message: 'Success', errors: errors.length ? errors : undefined });
    }
    return res.status(502).json({ error: 'Failed to send', details: errors });
  } catch (error) {
    return res.status(500).json({ error: 'Internal error' });
  }
}
