import nodemailer from "nodemailer";

const translateType = type => {
  const types = {
    apartment: "Квартира",
    house: "Будинок",
    commercial: "Комерція",
    furniture: "Меблі",
  };
  return types[type] || type;
};

const translateBudget = budget => {
  const budgets = {
    economy: "Бюджетний",
    standard: "Середній",
    premium: "Преміум",
    undecided: "Не визначено",
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
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Об'єкт</td><td style="padding:8px;border:1px solid #ddd">${objectTypeLabel}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Площа</td><td style="padding:8px;border:1px solid #ddd">${data.area || "—"} м²</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Бюджет</td><td style="padding:8px;border:1px solid #ddd">${budgetLabel}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Повідомлення</td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>
    </table>
  `;
};

const sendEmail = async data => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !SMTP_TO) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port: parseInt(SMTP_PORT || "587"),
    secure: (SMTP_PORT || "587") === "465",
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

  const text = `📬 Новий бриф із сайту!\n\n👤 Ім'я: ${data.name}\n📞 Тел: ${data.phone}\n📧 Email: ${data.email}\n\n🏠 Об'єкт: ${translateType(data.objectType)}\n📐 Площа: ${data.area || "—"} м²\n💰 Бюджет: ${translateBudget(data.budget)}\n\n📝 Завдання: ${data.message}`;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  return response.ok;
};

export const handler = async event => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const clientIp = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
    const requestLog = globalThis.requestLog || (globalThis.requestLog = new Map());
    const now = Date.now();
    const userRequests = requestLog.get(clientIp) || [];
    const recentRequests = userRequests.filter(time => now - time < 60000);

    if (recentRequests.length >= 5) {
      return {
        statusCode: 429,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Too many requests" }),
      };
    }
    recentRequests.push(now);
    requestLog.set(clientIp, recentRequests);

    const body = JSON.parse(event.body);

    const sanitize = input => {
      if (typeof input !== "string") return "";
      return input.replace(/[<>]/g, "").trim().substring(0, 1000);
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

    if (!data.name || !data.phone || !data.message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Validation failed" }),
      };
    }

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

    if (telegramOk) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Success", errors: errors.length ? errors : undefined }),
      };
    }

    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to send", details: errors }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal error" }),
    };
  }
};
