/**
 * netlify/functions/send-telegram.js
 * Netlify function-адаптер: вся логика в shared/send-message.js.
 */
import { buildData, validate, checkRateLimit, processSubmission } from '../../shared/send-message.js';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const handler = async event => {
  try {
    if (event.httpMethod !== 'POST') {
      return json(405, { error: 'Method not allowed' });
    }

    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return json(429, { error: 'Too many requests' });
    }

    const body = JSON.parse(event.body || '{}');
    const data = buildData(body);
    if (!validate(data)) {
      return json(400, { error: 'Validation failed' });
    }

    const { telegramOk, errors } = await processSubmission(data);

    if (telegramOk) {
      return json(200, { message: 'Success', errors: errors.length ? errors : undefined });
    }
    return json(502, { error: 'Failed to send', details: errors });
  } catch (error) {
    return json(500, { error: 'Internal error' });
  }
};
