/**
 * Юнит-тесты существующей логики shared/send-message.js.
 * Фиксируют поведение ДО и ПОСЛЕ рефакторинга безопасности.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  buildData,
  validate,
  sanitize,
  honeypotDrop,
  checkRateLimit,
  checkAdminRateLimit,
  adminAuth,
  processSubmission,
  TEST_MODE,
} from '../../shared/send-message.js';

describe('shared/send-message — sanitize', () => {
  it('удаляет < >', () => {
    expect(sanitize('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });

  it('обрезает до 1000 символов', () => {
    const long = 'a'.repeat(1500);
    expect(sanitize(long)).toHaveLength(1000);
  });

  it('trim-ит пробелы по краям', () => {
    expect(sanitize('  привіт  ')).toBe('привіт');
  });

  it('ненулевой ввод сохраняет содержимое без тегов', () => {
    expect(sanitize('  Ім\'я <b>  ')).toBe("Ім'я b");
  });
});

describe('shared/send-message — buildData/validate', () => {
  it('нормализует тело запроса', () => {
    const data = buildData({ name: 'Оля', phone: '+380', message: 'тест' });
    expect(data.name).toBe('Оля');
    expect(data.email).toBe('');
    expect(data.website).toBe('');
  });

  it('validate требует name, phone, message', () => {
    expect(validate(buildData({ name: 'Оля', phone: '1', message: 'х' }))).toBe(true);
    expect(validate(buildData({ name: '', phone: '1', message: 'х' }))).toBe(false);
    expect(validate(buildData({ name: 'Оля', phone: '', message: 'х' }))).toBe(false);
    expect(validate(buildData({ name: 'Оля', phone: '1', message: '' }))).toBe(false);
  });

  it('не падает на не-объекте', () => {
    const data = buildData('garbage' as unknown as object);
    expect(data.name).toBe('');
  });
});

describe('shared/send-message — honeypot (server-side)', () => {
  it('дропает заявку, если website заполнено', () => {
    expect(honeypotDrop(buildData({ name: 'a', phone: 'b', message: 'c', website: 'bot@spam' }))).toBe(true);
  });

  it('пропускает заявку, если website пустое', () => {
    expect(honeypotDrop(buildData({ name: 'a', phone: 'b', message: 'c', website: '' }))).toBe(false);
  });
});

describe('shared/send-message — rate-limit', () => {
  beforeEach(() => {
    // каждый тест — чистый лог
    // @ts-expect-error сброс in-memory map
    globalThis.requestLog = new Map();
  });

  it('разрешает до 5 запросов в минуту с одного IP', () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit('1.2.3.4')).toBe(true);
    }
    expect(checkRateLimit('1.2.3.4')).toBe(false);
  });

  it('разделяет разные IP', () => {
    for (let i = 0; i < 5; i++) expect(checkRateLimit('1.1.1.1')).toBe(true);
    expect(checkRateLimit('9.9.9.9')).toBe(true);
  });

  it('admin rate-limit независим от submit', () => {
    for (let i = 0; i < 5; i++) expect(checkRateLimit('5.5.5.5')).toBe(true);
    expect(checkRateLimit('5.5.5.5')).toBe(false);
    expect(checkAdminRateLimit('5.5.5.5')).toBe(true);
  });
});

describe('shared/send-message — adminAuth', () => {
  const real = process.env.ADMIN_PASSWORD;
  afterEach(() => {
    if (real === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = real;
  });

  it('возвращает configured:false если пароль не задан (вход невозможен)', () => {
    delete process.env.ADMIN_PASSWORD;
    expect(adminAuth('anything')).toEqual({ configured: false, ok: false });
  });

  it('верный пароль → ok:true', () => {
    process.env.ADMIN_PASSWORD = 'secret123';
    expect(adminAuth('secret123')).toEqual({ configured: true, ok: true });
  });

  it('неверный пароль → ok:false', () => {
    process.env.ADMIN_PASSWORD = 'secret123';
    expect(adminAuth('wrong')).toEqual({ configured: true, ok: false });
  });

  it('пустой пароль при заданном → ok:false', () => {
    process.env.ADMIN_PASSWORD = 'secret123';
    expect(adminAuth('')).toEqual({ configured: true, ok: false });
  });
});

describe('shared/send-message — processSubmission (honeypot)', () => {
  const realTestMode = process.env.TEST_MODE;
  beforeEach(() => {
    process.env.TEST_MODE = '1';
  });
  afterEach(() => {
    if (realTestMode === undefined) delete process.env.TEST_MODE;
    else process.env.TEST_MODE = realTestMode;
  });

  it('honeypot возвращает success без реальной отправки', async () => {
    const data = buildData({ name: 'a', phone: 'b', message: 'c', website: 'x' });
    const result = await processSubmission(data);
    expect(result.dropped).toBe(true);
    expect(result.telegramOk).toBe(true);
  });
});

describe('TEST_MODE', () => {
  it('экспортируется как boolean', () => {
    expect(typeof TEST_MODE).toBe('boolean');
  });
});
