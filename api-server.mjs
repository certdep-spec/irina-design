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
import { buildData, validate, checkRateLimit, processSubmission } from './shared/send-message.js';
const require = createRequire(import.meta.url);
try { require('dotenv').config({ path: '.env.local' }); } catch {} // eslint-disable-line

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5174;

/** Лимит загрузки одного файла — 15 МБ (фото с камеры обычно < 10 МБ). */
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

/**
 * Безопасное имя файла для сохранения: только [a-zA-Z0-9._-],
 * без путей и служебных имён. Возвращает null для недопустимых значений.
 */
const sanitizeUploadName = input => {
  if (typeof input !== 'string') return null;
  // Пути (и/или обратный слэш) недопустимы — отклоняем, а не тихо режем
  if (/[\\/]/.test(input)) return null;
  const cleaned = input.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
  if (!cleaned || /^\.+$/.test(cleaned)) return null;
  return cleaned;
};

/** Безопасное имя подпапки: только [a-zA-Z0-9_-], без путей и служебных имён. */
const sanitizeSubfolder = input => {
  if (typeof input !== 'string') return null;
  // Пути и обход директорий недопустимы
  if (/[\\/]/.test(input) || input.includes('..')) return null;
  const cleaned = input.replace(/[^a-zA-Z0-9_-]/g, '').replace(/^-+|-+$/g, '');
  return cleaned || null;
};

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

  // Admin write-protection: mutating /dev-api endpoints require the password
  // from .env.local (VITE_ADMIN_PASSWORD). If it's not set, writes stay open
  // for local development.
  const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD;
  const isAdminRequest = (req) =>
    !ADMIN_PASSWORD || req.headers['x-admin-password'] === ADMIN_PASSWORD;

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
    if (!isAdminRequest(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
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
    if (!isAdminRequest(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    const queryPart = url.split('?')[1] || '';
    const searchParams = new URLSearchParams(queryPart);
    const filename = sanitizeUploadName(searchParams.get('filename'));
    const subfolder = sanitizeSubfolder(searchParams.get('subfolder'));

    if (!filename || !subfolder) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid filename or subfolder' }));
      return;
    }

    // Быстрый отказ по Content-Length, если он есть
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    if (contentLength > MAX_UPLOAD_BYTES) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'File too large (max 15 MB)' }));
      return;
    }

    const chunks = [];
    let total = 0;
    let tooLarge = false;
    req.on('data', chunk => {
      total += chunk.length;
      if (total > MAX_UPLOAD_BYTES && !tooLarge) {
        tooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File too large (max 15 MB)' }));
        req.destroy();
      } else if (!tooLarge) {
        chunks.push(chunk);
      }
    });
    req.on('end', async () => {
      if (tooLarge) return;
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
        if (!baseName || /^\.+$/.test(baseName)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid filename' }));
          return;
        }
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
        const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');

        const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '127.0.0.1';
        if (!checkRateLimit(clientIp)) {
          res.writeHead(429, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Too many requests' }));
          return;
        }

        const data = buildData(body);
        if (!validate(data)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Validation failed' }));
          return;
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (token && chatId) {
          const { telegramOk, errors } = await processSubmission(data);
          if (telegramOk) {
            console.log('[API-SERVER] Telegram sent successfully');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
            return;
          }
          console.error('[API-SERVER] Telegram send failed:', errors);
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
