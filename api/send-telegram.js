export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    const sanitize = (input) => {
      if (typeof input !== 'string') return '';
      return input.replace(/[<>&"']/g, '').trim().slice(0, 500);
    };

    const data = {
      name: sanitize(body.name),
      phone: sanitize(body.phone),
      email: sanitize(body.email),
      objectType: sanitize(body.objectType),
      area: sanitize(body.area),
      budget: sanitize(body.budget),
      message: sanitize(body.message),
    };

    if (!data.name || !data.phone || !data.email || !data.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram settings missing' });
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
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Telegram API error', details: err });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
