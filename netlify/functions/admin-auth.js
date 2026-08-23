/**
 * netlify/functions/admin-auth.js
 * Netlify function-адаптер для серверной авторизации админки.
 */
import { adminAuth, checkAdminRateLimit, corsHeaders, issueAdminToken } from '../../shared/send-message.js';

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
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(origin) };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return json(405, { error: 'Method not allowed' }, origin);
    }

    const clientIp =
      event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkAdminRateLimit(clientIp)) {
      return json(429, { error: 'Too many attempts' }, origin);
    }

    const body = JSON.parse(event.body || '{}');
    const { configured, ok } = adminAuth(body.password || '');
    if (!configured) {
      return json(401, { error: 'Auth not configured' }, origin);
    }
    if (!ok) {
      return json(401, { error: 'Invalid password' }, origin);
    }
    return json(200, { success: true, token: issueAdminToken() }, origin);
  } catch {
    return json(500, { error: 'Internal error' }, origin);
  }
};
