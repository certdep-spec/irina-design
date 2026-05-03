export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  const requestLog = globalThis.requestLog || (globalThis.requestLog = new Map());
  const now = Date.now();
  const userRequests = requestLog.get(clientIp) || [];
  const recentRequests = userRequests.filter(time => now - time < 60000);

  if (recentRequests.length >= 3) {
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Too many requests' })
    };
  }
  recentRequests.push(now);
  requestLog.set(clientIp, recentRequests);

  console.log('--- Send Telegram Function Started ---');
  const body = JSON.parse(event.body);
  console.log('Request body parsed');

  const sanitize = (input) => {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').replace(/[\x00-\x1F\x7F]/g, '').trim().substring(0, 1000);
  };

  const data = {
    name: sanitize(body.name),
    phone: sanitize(body.phone),
    email: sanitize(body.email),
    message: sanitize(body.message)
  };

  console.log('Data sanitized:', { ...data, email: '***' });

  if (!data.name || data.name.length < 2 ||
    !data.phone || !/^[\d\s\-\+\(\)]+$/.test(data.phone) ||
    !data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    !data.message || data.message.length < 2) {
    console.error('Validation failed');
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Validation failed', details: data })
    };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('Environment check:', {
    hasToken: !!token,
    tokenLength: token?.length,
    hasChatId: !!chatId,
    chatIdLength: chatId?.length
  });

  if (!token || !chatId) {
    console.error('Environment variables missing');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Telegram settings missing in Netlify' })
    };
  }

  const text = `📬 Нова заявка!\nІм'я: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\nПовідомлення: ${data.message}`;

  console.log('Attempting to send to Telegram...');
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });

  const responseData = await response.json();

  if (response.ok) {
    console.log('Telegram response OK');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Success' })
    };
  }

  console.error('Telegram API error:', responseData);
  return {
    statusCode: 502,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: 'Telegram API returned error',
      details: responseData.description || 'Unknown error'
    })
  };

} catch (error) {
  console.error('Global Catch Error:', error.message);
  return {
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Internal server error', message: error.message })
  };
}
};
