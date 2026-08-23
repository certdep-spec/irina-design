/**
 * netlify/functions/send-telegram.js
 * Netlify function-адаптер: вся логика в shared/send-message.js.
 */
import {
  buildData,
  validate,
  checkRateLimit,
  processSubmission,
  corsHeaders,
} from '../../shared/send-message.js';

const json = (statusCode, body, origin) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    ...corsHeaders(origin),
  },
  body: JSON.stringify(body),
});

export const handler = async event => {
  const origin = event.headers.origin;
  // Preflight для кросс-доменных запросов (GH Pages → API Netlify/Vercel).
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(origin) };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return json(405, { error: 'Method not allowed' }, origin);
    }

    const clientIp =
      event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return json(429, { error: 'Too many requests' }, origin);
    }

    const body = JSON.parse(event.body || '{}');
    const data = buildData(body);
    if (!validate(data)) {
      return json(400, { error: 'Validation failed' }, origin);
    }

    const { telegramOk, dropped } = await processSubmission(data);

    if (telegramOk) {
      return json(200, { success: true, dropped: Boolean(dropped) }, origin);
    }
    return json(502, { error: 'Submission failed' }, origin);
  } catch {
    return json(500, { error: 'Internal error' }, origin);
  }
};
