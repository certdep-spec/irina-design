export const handler = async (event) => {
  try {
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

    if (recentRequests.length >= 5) {
      return {
        statusCode: 429,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Too many requests' })
      };
    }
    recentRequests.push(now);
    requestLog.set(clientIp, recentRequests);

    const body = JSON.parse(event.body);

    const sanitize = (input) => {
      if (typeof input !== 'string') return '';
      return input.replace(/[<>]/g, '').trim().substring(0, 1000);
    };

    const data = {
      name: sanitize(body.name),
      phone: sanitize(body.phone),
      email: sanitize(body.email),
      objectType: sanitize(body.objectType),
      area: sanitize(body.area),
      budget: sanitize(body.budget),
      message: sanitize(body.message)
    };

    if (!data.name || !data.phone || !data.message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Validation failed' })
      };
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Telegram settings missing' })
      };
    }

    const translateType = (type) => {
      const types = { apartment: 'Квартира', house: 'Будинок', commercial: 'Комерція', furniture: 'Меблі' };
      return types[type] || type;
    };

    const translateBudget = (budget) => {
      const budgets = { economy: 'Бюджетний', standard: 'Середній', premium: 'Преміум', undecided: 'Не визначено' };
      return budgets[budget] || budget;
    };

    const text = `📬 Новий бриф із сайту!\n\n👤 Ім'я: ${data.name}\n📞 Тел: ${data.phone}\n📧 Email: ${data.email}\n\n🏠 Об'єкт: ${translateType(data.objectType)}\n📐 Площа: ${data.area || '—'} м²\n💰 Бюджет: ${translateBudget(data.budget)}\n\n📝 Завдання: ${data.message}`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text
      })
    });

    if (response.ok) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Success' })
      };
    }

    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Telegram error' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal error' })
    };
  }
};
