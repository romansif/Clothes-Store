import crypto from 'node:crypto';

export const isProduction = process.env.NODE_ENV === 'production';

const secretFromEnv = (name: string): string => {
    const value = process.env[name];
    if (value && value.length >= 32) return value;

    if (isProduction) {
        throw new Error(`${name} must be set to a random string of at least 32 characters`);
    }

    console.warn(
        `[auth] ${name} is missing or shorter than 32 characters. ` +
        `Using a random secret for this run, so sessions reset on every restart. Set it in .env.`
    );
    return crypto.randomBytes(48).toString('hex');
};


export const ACCESS_SECRET = secretFromEnv('JWT_ACCESS_SECRET');
export const REFRESH_SECRET = secretFromEnv('JWT_REFRESH_SECRET');

export const CARD_FINGERPRINT_KEY = process.env.CARD_FINGERPRINT_KEY || (() => {
    if (isProduction) throw new Error('CARD_FINGERPRINT_KEY must be set in production');
    return 'dev-only-card-fingerprint-key';
})();

export const ACCESS_TTL_MS = 60 * 60 * 1000;
export const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const baseCookie = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: isProduction,
    path: '/',
};

export const accessCookieOptions = { ...baseCookie, maxAge: ACCESS_TTL_MS };
export const refreshCookieOptions = { ...baseCookie, maxAge: REFRESH_TTL_MS };
export const clearCookieOptions = { ...baseCookie };
