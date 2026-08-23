/// <reference types="vitest/globals" />

// Серверные .js-адаптеры (поза src/) импортируются тестами; объявляем как any,
// чтобы tsc не падал (vitest транслирует их через esbuild независимо от tsc).
declare module "../shared/send-message.js" {
  export const buildData: any;
  export const validate: any;
  export const sanitize: any;
  export const honeypotDrop: any;
  export const checkRateLimit: any;
  export const checkAdminRateLimit: any;
  export const adminAuth: any;
  export const processSubmission: any;
  export const TEST_MODE: any;
}
declare module "*/api/send-telegram.js" {
  const value: any;
  export default value;
}
declare module "*/api/admin-auth.js" {
  const value: any;
  export default value;
}
