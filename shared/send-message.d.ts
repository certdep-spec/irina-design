export declare const ALLOWED_ORIGINS: string[];
export declare const corsHeaders: (origin: string | undefined) => Record<string, string>;
export declare const TEST_MODE: boolean;
export declare const translateType: (type: string) => string;
export declare const translateBudget: (budget: string) => string;
export declare const formatEmailHtml: (data: any) => string;
export declare const sanitize: (input: any) => string;
export declare const buildData: (body: any) => {
  name: string;
  phone: string;
  email: string;
  objectType: string;
  area: string;
  budget: string;
  message: string;
  website: string;
};
export declare const validate: (data: any) => boolean;
export declare const honeypotDrop: (data: any) => boolean;
export declare const checkRateLimit: (clientIp: string) => boolean;
export declare const checkAdminRateLimit: (clientIp: string) => boolean;
export declare const sendEmail: (data: any) => Promise<void>;
export declare const sendTelegram: (data: any) => Promise<boolean>;
export declare const processSubmission: (
  data: any
) => Promise<{ telegramOk: boolean; dropped: boolean; errors: string[] }>;
export declare const adminAuth: (password: string) => { configured: boolean; ok: boolean };
export declare const issueAdminToken: () => string;
export declare const adminTokenValid: (token: string) => boolean;
