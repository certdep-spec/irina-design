/**
 * API Constants
 * Centralized API endpoint definitions
 */

export const API_ENDPOINTS = {
  SEND_TELEGRAM: '/.netlify/functions/send-telegram',
} as const;

/**
 * Form validation constants
 */
export const VALIDATION = {
  MAX_NAME_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,
  MAX_EMAIL_LENGTH: 100,
  MAX_MESSAGE_LENGTH: 1000,
  PHONE_PATTERN: /^[\d\s\-\+\(\)]+$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
