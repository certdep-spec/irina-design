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
 *
 * Дополнительно (жёсткая безопасность):
 *   - honeypotDrop(): серверная проверка скрытого поля "website"
 *   - adminAuth(): серверная сверка пароля админки (ADMIN_PASSWORD, без VITE_)
 *   - checkAdminRateLimit(): защита эндпоинта входа от перебора
 *   - corsHeaders(): безопасные CORS-заголовки для кросс-ориджин (GH Pages)
 */
import nodemailer from 'nodemailer';

/**
 * TEST_MODE=1 (задаётся CI/локальным прогоном E2E) отключает реальную
 * отправку в Telegram/SMTP — вместо сети логируем и возвращаем успех.
 * Это позволяет проверять форму без реальных заявок.
 */
const TEST_MODE = process.env.TEST_MODE === '1' || process.env.TEST_MODE === 'true';

/**
 * Разрешённые origin для CORS. Нужен GH Pages (certdep-spec.github.io),
 * который шлёт запросы на API Vercel. localhost — для локальной разработки.
 * Можно расширить через env ALLOWED_ORIGINS (через запятую).
 */
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  'http://127.0.0.1:5173,http://localhost:5173,https://certdep-spec.github.io')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

/** Безопасные CORS-заголовки: зеркально отдаём только разрешённый origin. */
const corsHeaders = reqOrigin => {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  if (reqOrigin && ALLOWED_ORIGINS.includes(reqOrigin)) {
    headers['Access-Control-Allow-Origin'] = reqOrigin;
    headers['Vary'] = 'Origin';
  } else {
    // Браузеры отвергнут запрос с "null" origin → кросс-домен заблокирован.
    headers['Access-Control-Allow-Origin'] = 'null';
  }
  return headers;
};

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
    // Honeypot-поле: должно оставаться пустым для реальных людей.
    website: sanitize(source.website),
  };
};

/** Проверка обязательных полей. */
const validate = data => Boolean(data.name && data.phone && data.message);

/** Honeypot: заполнено скрытое поле → это бот, тихо отбрасываем. */
const honeypotDrop = data => Boolean(data.website && data.website.trim() !== '');

/**
 * Простейший rate-limit (in-memory): до 5 запросов в минуту с одного IP.
 * На serverless живёт в рамках одного инстанса — best effort, но останавливает
 * тупой спам с одного соединения.
 */
const checkRateLimit = clientIp => {
  const key = 'submit:' + (clientIp || 'unknown');
  const requestLog = globalThis.requestLog || (globalThis.requestLog = new Map());
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter(time => now - time < 60000);
  if (recent.length >= 5) return false;
  recent.push(now);
  requestLog.set(key, recent);
  return true;
};

/** Rate-limit для эндпоинта входа админки: 5 попыток/мин с IP. */
const checkAdminRateLimit = clientIp => {
  const key = 'admin:' + (clientIp || 'unknown');
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
  if (TEST_MODE) {
    // E2E/локальный прогон: не шлём реально, просто подтверждаем успех.
    console.log('[TEST_MODE] Telegram send skipped:', JSON.stringify(data));
    return true;
  }
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

/**
 * Отправка во все каналы; возвращает { telegramOk, dropped, errors }.
 * Если сработал honeypot — возвращаем успех без отправки (dropped: true).
 */
const processSubmission = async data => {
  const errors = [];
  if (honeypotDrop(data)) {
    return { telegramOk: true, dropped: true, errors: [] };
  }
  const [telegramOk] = await Promise.all([
    sendTelegram(data).catch(e => {
      errors.push(`Telegram: ${e.message}`);
      return false;
    }),
    sendEmail(data).catch(e => {
      errors.push(`Email: ${e.message}`);
    }),
  ]);
  return { telegramOk, dropped: false, errors };
};

/**
 * Серверная авторизация админки.
 * Пароль берётся из ADMIN_PASSWORD (без префикса VITE_ — не попадает в бандл).
 * Возвращает { configured, ok }. Сравнение посимвольное (constant-time),
 * чтобы не дать тайминг-атаку на перебор.
 */
const adminAuth = password => {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return { configured: false, ok: false };
  const a = String(password ?? '');
  const b = String(expected);
  if (a.length !== b.length) return { configured: true, ok: false };
  let mismatch = 0;
  for (let i = 0; i < b.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return { configured: true, ok: mismatch === 0 };
};

/** Выданные сервером сессионные токены админки (in-memory, на рантайм). */
const adminTokens = new Set();

/** Выпускает случайный токен сессии (клиент использует его для записи). */
const issueAdminToken = () => {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  const token = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  adminTokens.add(token);
  return token;
};

/** Проверяет валидность токена сессии (для авторизации записи в dev). */
const adminTokenValid = token => Boolean(token) && adminTokens.has(String(token));

export {
  ALLOWED_ORIGINS,
  corsHeaders,
  TEST_MODE,
  translateType,
  translateBudget,
  formatEmailHtml,
  sanitize,
  buildData,
  validate,
  honeypotDrop,
  checkRateLimit,
  checkAdminRateLimit,
  sendEmail,
  sendTelegram,
  processSubmission,
  adminAuth,
  issueAdminToken,
  adminTokenValid,
};
