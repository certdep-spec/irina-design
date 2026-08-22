/**
 * shared/send-message.js
 * Единая логика отправки заявок (Telegram + email), санитизация и rate-limit.
 * Используется тремя адаптерами:
 *   - api/send-telegram.js                (Vercel serverless)
 *   - netlify/functions/send-telegram.js  (Netlify function)
 *   - api-server.mjs                      (локальный dev-сервер)
 *
 * Раньше эта логика была продублирована в трёх файлах — правки могли
 * разойтись. Теперь всё живёт здесь.
 */
import nodemailer from 'nodemailer';

const translateType = type => {
  const types = {
    apartment: 'Квартира',
    house: 'Будинок',
    commercial: 'Комерція',
    furniture: 'Меблі',
  };
  return types[type] || type;
};

const translateBudget = budget => {
  const budgets = {
    economy: 'Бюджетний',
    standard: 'Середній',
    premium: 'Преміум',
    undecided: 'Не визначено',
  };
  return budgets[budget] || budget;
};

const formatEmailHtml = data => {
  const objectTypeLabel = translateType(data.objectType);
  const budgetLabel = translateBudget(data.budget);
  return `
    <h2>📬 Новий бриф із сайту</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:arial,sans-serif">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ім'я</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Телефон</td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email || '—'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Об'єкт</td><td style="padding:8px;border:1px solid #ddd">${objectTypeLabel}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Площа</td><td style="padding:8px;border:1px solid #ddd">${data.area || '—'} м²</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Бюджет</td><td style="padding:8px;border:1px solid #ddd">${budgetLabel}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Повідомлення</td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>
    </table>
  `;
};

/** Санитизация строки: убираем <>, обрезаем до 1000 символов. */
const sanitize = input => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim().substring(0, 1000);
};

/** Нормализация тела запроса в безопасную структуру. */
const buildData = body => {
  const source = body && typeof body === 'object' ? body : {};
  return {
    name: sanitize(source.name),
    phone: sanitize(source.phone),
    email: sanitize(source.email),
    objectType: sanitize(source.objectType),
    area: sanitize(source.area),
    budget: sanitize(source.budget),
    message: sanitize(source.message),
  };
};

/** Проверка обязательных полей. */
const validate = data => Boolean(data.name && data.phone && data.message);

/**
 * Простейший rate-limit (in-memory): до 5 запросов в минуту с одного IP.
 * На serverless живёт в рамках одного инстанса — best effort, но останавливает
 * тупой спам с одного соединения.
 */
const checkRateLimit = clientIp => {
  const key = clientIp || 'unknown';
  const requestLog = globalThis.requestLog || (globalThis.requestLog = new Map());
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter(time => now - time < 60000);
  if (recent.length >= 5) return false;
  recent.push(now);
  requestLog.set(key, recent);
  return true;
};

const sendEmail = async data => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !SMTP_TO) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(SMTP_PORT || '587', 10),
    secure: (SMTP_PORT || '587') === '465',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Сайт дизайнера" <${SMTP_USER}>`,
    to: SMTP_TO,
    subject: `Новий бриф від ${data.name}`,
    html: formatEmailHtml(data),
  });
};

const sendTelegram = async data => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const text = `📬 Новий бриф із сайту!\n\n👤 Ім'я: ${data.name}\n📞 Тел: ${data.phone}\n📧 Email: ${data.email || '—'}\n\n🏠 Об'єкт: ${translateType(data.objectType)}\n📐 Площа: ${data.area || '—'} м²\n💰 Бюджет: ${translateBudget(data.budget)}\n\n📝 Завдання: ${data.message}`;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  return response.ok;
};

/** Отправка во все каналы; возвращает { telegramOk, errors }. */
const processSubmission = async data => {
  const errors = [];
  const [telegramOk] = await Promise.all([
    sendTelegram(data).catch(e => {
      errors.push(`Telegram: ${e.message}`);
      return false;
    }),
    sendEmail(data).catch(e => {
      errors.push(`Email: ${e.message}`);
    }),
  ]);
  return { telegramOk, errors };
};

export {
  translateType,
  translateBudget,
  formatEmailHtml,
  sanitize,
  buildData,
  validate,
  checkRateLimit,
  sendEmail,
  sendTelegram,
  processSubmission,
};
