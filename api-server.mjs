/**
 * api-server.mjs
 * Standalone dev API server (port 5174)
 * Handles: POST /api/portfolio.json, POST /api/photo-upload
 * Vite proxies /api → http://localhost:5174
 */

import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
try { require('dotenv').config({ path: '.env.local' }); } catch {} // eslint-disable-line

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5174;

const server = http.createServer(async (req, res) => {
  const url = req.url || '';
  const method = req.method;

  // CORS headers so browser doesn't block the proxy
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  console.log(`[API-SERVER] ${method} ${url}`);

  // --- GET /dev-api/portfolio ---
  if (method === 'GET' && url.startsWith('/dev-api/portfolio')) {
    try {
      const dataPath = path.resolve(__dirname, './public/api/portfolio.json');
      const content = await fs.readFile(dataPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(content);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // --- POST /dev-api/portfolio (save data) ---
  if (method === 'POST' && url.startsWith('/dev-api/portfolio')) {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        const body = Buffer.concat(chunks).toString();
        const dataPath = path.resolve(__dirname, './public/api/portfolio.json');
        await fs.writeFile(dataPath, body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // --- POST /dev-api/photo-upload ---
  if (method === 'POST' && url.includes('/dev-api/photo-upload')) {
    const queryPart = url.split('?')[1] || '';
    const searchParams = new URLSearchParams(queryPart);
    const filename = searchParams.get('filename') || 'unknown.jpg';
    const subfolder = searchParams.get('subfolder') || 'general';

    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        let buffer = Buffer.concat(chunks);

        // Extract binary data from multipart/form-data
        const contentType = req.headers['content-type'] || '';
        if (contentType.includes('multipart/form-data')) {
          const boundary = contentType.split('boundary=')[1];
          if (boundary) {
            const boundaryBuf = Buffer.from('\r\n\r\n');
            const startIdx = buffer.indexOf(boundaryBuf) + 4;
            const endMarker = Buffer.from('\r\n--' + boundary);
            const endIdx = buffer.indexOf(endMarker, startIdx);
            if (startIdx > 4 && endIdx > startIdx) {
              buffer = buffer.slice(startIdx, endIdx);
            }
          }
        }

        const { default: sharp } = await import('sharp');
        const targetDir = path.resolve(__dirname, `./public/archives/${subfolder}`);
        const baseName = filename.substring(0, filename.lastIndexOf('.'));
        await fs.mkdir(targetDir, { recursive: true });

        // Save primary WebP
        await sharp(buffer).webp({ quality: 80 }).toFile(path.join(targetDir, `${baseName}.webp`));

        // Save responsive sizes
        for (const size of [400, 800, 1200]) {
          await sharp(buffer)
            .resize({ width: size, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(path.join(targetDir, `${baseName}-${size}w.webp`));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          url: `/archives/${subfolder}/${baseName}.webp`
        }));
      } catch (err) {
        console.error('[API-SERVER] Upload error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // --- POST /api/send-telegram ---
  if (method === 'POST' && url.startsWith('/api/send-telegram')) {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', async () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString());

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
          message: sanitize(body.message),
        };

        if (!data.name || !data.phone || !data.message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Validation failed' }));
          return;
        }

        const translateType = (type) => {
          const types = { apartment: 'Квартира', house: 'Будинок', commercial: 'Комерція', furniture: 'Меблі' };
          return types[type] || type;
        };

        const translateBudget = (budget) => {
          const budgets = { economy: 'Бюджетний', standard: 'Середній', premium: 'Преміум', undecided: 'Не визначено' };
          return budgets[budget] || budget;
        };

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (token && chatId) {
          const text = `📬 Новий бриф із сайту!\n\n👤 Ім'я: ${data.name}\n📞 Тел: ${data.phone}\n📧 Email: ${data.email}\n\n🏠 Об'єкт: ${translateType(data.objectType)}\n📐 Площа: ${data.area || '—'} м²\n💰 Бюджет: ${translateBudget(data.budget)}\n\n📝 Завдання: ${data.message}`;

          const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text }),
          });

          if (response.ok) {
            console.log('[API-SERVER] Telegram sent successfully');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
            return;
          }
          console.error('[API-SERVER] Telegram send failed:', await response.text());
        } else {
          console.warn('[API-SERVER] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
        }

        // Fallback: return success anyway for local dev
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, note: 'Simulated (no Telegram configured)' }));
      } catch (e) {
        console.error('[API-SERVER] send-telegram error:', e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Unknown route
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: `Not found: ${method} ${url}` }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[API-SERVER] Running at http://127.0.0.1:${PORT}`);
});
