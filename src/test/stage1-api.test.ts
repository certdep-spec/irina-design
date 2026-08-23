/**
 * Этап 1 — тесты серверных адаптеров (Vercel) без запуска live-сервера.
 * Проверяют CORS/OPTIONS preflight, honeypot (ноль вызовов Telegram) и
 * серверную авторизацию админки.
 *
 * Отправка в Telegram/SMTP отключена через TEST_MODE=1 (читается внутри
 * sendTelegram на момент вызова), поэтому используется РЕАЛЬНЫЙ код пути
 * processSubmission без сети.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

// Fake Vercel-style response: поддерживает .status().json().end()
function makeRes() {
  const headers: Record<string, string> = {};
  let statusCode = 200;
  let body: unknown = null;
  const res: any = {
    setHeader: (k: string, v: string) => {
      headers[k] = v;
      return res;
    },
    status: (c: number) => {
      statusCode = c;
      return res;
    },
    json: (b: unknown) => {
      body = b;
      return res;
    },
    end: () => res,
    _final: () => ({ statusCode, headers, body }),
  };
  return res;
}

import sendTelegramHandler from '../../api/send-telegram.js';
import adminAuthHandler from '../../api/admin-auth.js';

describe('Этап 1 — send-telegram: CORS + preflight', () => {
  it('OPTIONS возвращает 204 и CORS-заголовки', async () => {
    const res = makeRes();
    await sendTelegramHandler(
      { method: 'OPTIONS', headers: { origin: 'https://certdep-spec.github.io' } } as any,
      res as any
    );
    const out = res._final();
    expect(out.statusCode).toBe(204);
    expect(out.headers['Access-Control-Allow-Origin']).toBe('https://certdep-spec.github.io');
  });

  it('неизвестный origin не получает свой origin в CORS (блок кросс-домена)', async () => {
    const res = makeRes();
    await sendTelegramHandler(
      { method: 'OPTIONS', headers: { origin: 'https://evil.example.com' } } as any,
      res as any
    );
    const out = res._final();
    expect(out.headers['Access-Control-Allow-Origin']).toBe('null');
  });
});

describe('Этап 1 — send-telegram: honeypot', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  const real = { ...process.env };
  beforeEach(() => {
    // Реальный sendTelegram читает токен/chat_id и делает fetch на момент
    // вызова — задаём их и глущим fetch, чтобы путь были детерминированным
    // и без сети.
    process.env.TELEGRAM_BOT_TOKEN = 'fake-token';
    process.env.TELEGRAM_CHAT_ID = 'fake-chat';
    fetchMock = vi.fn(async () => ({ ok: true } as Response));
    // @ts-expect-error подмена global fetch в jsdom
    globalThis.fetch = fetchMock;
  });
  afterEach(() => {
    process.env = { ...real };
  });

  it('POST с заполненным website → 200 и dropped:true (бот отброшен)', async () => {
    const res = makeRes();
    await sendTelegramHandler(
      {
        method: 'POST',
        headers: { 'x-forwarded-for': '1.1.1.1' },
        body: { name: 'А', phone: '1', message: 'х', website: 'bot' },
      } as any,
      res as any
    );
    const out = res._final();
    expect(out.statusCode).toBe(200);
    expect((out.body as any).success).toBe(true);
    expect((out.body as any).dropped).toBe(true);
    // Honeypot → Telegram НЕ вызывается.
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('POST без honeypot → 200 (реальная заявка дошла до Telegram)', async () => {
    const res = makeRes();
    await sendTelegramHandler(
      {
        method: 'POST',
        headers: { 'x-forwarded-for': '2.2.2.2' },
        body: { name: 'А', phone: '1', message: 'х' },
      } as any,
      res as any
    );
    expect(res._final().statusCode).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('валидация не прошла → 400 и Telegram не вызван', async () => {
    const res = makeRes();
    await sendTelegramHandler(
      {
        method: 'POST',
        headers: { 'x-forwarded-for': '3.3.3.3' },
        body: { name: '', phone: '', message: '' },
      } as any,
      res as any
    );
    expect(res._final().statusCode).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('Этап 1 — admin-auth', () => {
  const real = process.env.ADMIN_PASSWORD;
  afterEach(() => {
    if (real === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = real;
  });

  it('OPTIONS preflight отдает CORS', async () => {
    const res = makeRes();
    await adminAuthHandler(
      { method: 'OPTIONS', headers: { origin: 'https://certdep-spec.github.io' } } as any,
      res as any
    );
    expect(res._final().statusCode).toBe(204);
    expect(res._final().headers['Access-Control-Allow-Origin']).toBe('https://certdep-spec.github.io');
  });

  it('пароль не задан → 401 Auth not configured (вход невозможен)', async () => {
    delete process.env.ADMIN_PASSWORD;
    const res = makeRes();
    await adminAuthHandler(
      { method: 'POST', headers: {}, body: { password: 'whatever' } } as any,
      res as any
    );
    expect(res._final().statusCode).toBe(401);
  });

  it('верный пароль → 200 + токен', async () => {
    process.env.ADMIN_PASSWORD = 'topsecret';
    const res = makeRes();
    await adminAuthHandler(
      { method: 'POST', headers: {}, body: { password: 'topsecret' } } as any,
      res as any
    );
    const out = res._final();
    expect(out.statusCode).toBe(200);
    expect(typeof (out.body as any).token).toBe('string');
  });

  it('неверный пароль → 401 Invalid password', async () => {
    process.env.ADMIN_PASSWORD = 'topsecret';
    const res = makeRes();
    await adminAuthHandler(
      { method: 'POST', headers: {}, body: { password: 'nope' } } as any,
      res as any
    );
    expect(res._final().statusCode).toBe(401);
  });
});
