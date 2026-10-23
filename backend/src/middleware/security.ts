import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { type NextFunction, type Request, type Response } from 'express';
import { ACCESS_SECRET, CARD_FINGERPRINT_KEY } from '#config/auth.config';
import { UPLOADS_ROOT, UPLOADS_BASE } from '#middleware/upload.config';

export type Row = Record<string, any>;

export class HttpError extends Error {
    status: number;
    errors?: Record<string, string>;

    constructor(status: number, message: string, errors?: Record<string, string>) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
}

type Handler = (req: Request, res: Response) => unknown | Promise<unknown>;

export const handle = (label: string, fn: Handler) =>
    async (req: Request, res: Response): Promise<void> => {
        try {
            await fn(req, res);
        } catch (err) {
            removeUploadedFiles(getUploadedFiles(req));
            if (res.headersSent) return;

            if (err instanceof HttpError) {
                res.status(err.status).json(
                    err.errors ? { message: err.message, errors: err.errors } : { message: err.message }
                );
                return;
            }

            console.error(`${label}:`, err);
            res.status(500).json({ error: 'Internal server error', message: 'Internal server error' });
        }
    };

export interface AuthUser {
    id: string;
    role?: string;
    email?: string;
}

const extractToken = (req: Request): string | null => {
    const header = req.headers.authorization;
    if (typeof header === 'string' && header.startsWith('Bearer ')) {
        return header.slice(7).trim() || null;
    }
    const cookie = req.cookies?.accessToken;
    return typeof cookie === 'string' && cookie ? cookie : null;
};

export const getAuthUser = (req: Request): AuthUser | null => {
    const anyReq = req as Request & { user?: Row };

    const existingId = anyReq.user?.userId ?? anyReq.user?.id;
    if (existingId) {
        return { id: String(existingId), role: anyReq.user?.role, email: anyReq.user?.email };
    }

    const token = extractToken(req);
    if (!token) return null;

    try {
        const payload = jwt.verify(token, ACCESS_SECRET, { algorithms: ['HS256'] }) as jwt.JwtPayload;
        if (!payload.userId) return null;

        const user: AuthUser = { id: String(payload.userId), role: payload.role, email: payload.email };
        anyReq.user = { ...payload, id: user.id, userId: user.id };
        return user;
    } catch {
        return null;
    }
};

export const requireUser = (req: Request): AuthUser => {
    const user = getAuthUser(req);
    if (!user) throw new HttpError(401, 'Unauthorized');
    return user;
};

export const sameId = (a: unknown, b: unknown): boolean =>
    a !== undefined && a !== null && b !== undefined && b !== null && String(a) === String(b);

export const requireSelf = (req: Request, targetUserId: string): AuthUser => {
    const user = requireUser(req);
    if (!sameId(user.id, targetUserId)) throw new HttpError(403, 'Forbidden');
    return user;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!getAuthUser(req)) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    next();
};

const buckets = new Map<string, { count: number; resetAt: number }>();

const purge = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(key);
    }
}, 60_000);
purge.unref();

const liveBucket = (key: string) => {
    const bucket = buckets.get(key);
    if (!bucket) return null;
    if (bucket.resetAt <= Date.now()) {
        buckets.delete(key);
        return null;
    }
    return bucket;
};

export const clientKey = (req: Request): string => req.ip ?? req.socket.remoteAddress ?? 'unknown';

export const assertNotLimited = (key: string, max: number): void => {
    const bucket = liveBucket(key);
    if (bucket && bucket.count >= max) {
        throw new HttpError(429, 'Too many attempts. Please try again later.');
    }
};

export const recordHit = (key: string, windowMs: number): void => {
    const bucket = liveBucket(key);
    if (bucket) bucket.count += 1;
    else buckets.set(key, { count: 1, resetAt: Date.now() + windowMs });
};

export const clearHits = (key: string): void => {
    buckets.delete(key);
};

export const rateLimit = (key: string, max: number, windowMs: number): void => {
    assertNotLimited(key, max);
    recordHit(key, windowMs);
};

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

export const omitKeys = (body: unknown, denied: readonly string[]): Row => {
    if (!isPlainObject(body)) return {};
    const out: Row = {};
    for (const [key, value] of Object.entries(body)) {
        if (FORBIDDEN_KEYS.has(key) || denied.includes(key)) continue;
        out[key] = value;
    }
    return out;
};

export const pickKeys = (source: unknown, allowed: readonly string[]): Row => {
    if (!isPlainObject(source)) return {};
    const out: Row = {};
    for (const key of allowed) {
        if (key in source) out[key] = source[key];
    }
    return out;
};

export const SERVER_OWNED_FIELDS = [
    'id', 'userId', 'created_at', 'createdAt', 'date_created_at', 'time_created_at',
] as const;

export const USER_PROTECTED_FIELDS = [
    ...SERVER_OWNED_FIELDS, 'role', 'password', 'refreshTokens', 'googleId', 'avatarUrl',
] as const;

export const param = (req: Request, name: string): string => {
    const value = req.params[name];
    const single = Array.isArray(value) ? value[0] : value;
    return typeof single === 'string' ? single : '';
};

export const cleanText = (value: unknown, max: number): string | null => {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed.length <= max ? trimmed : null;
};

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export const normalizeEmail = (value: unknown): string | null => {
    if (typeof value !== 'string') return null;
    const email = value.trim().toLowerCase();
    return email.length <= 254 && EMAIL_RE.test(email) ? email : null;
};

export const sameEmail = (stored: unknown, normalized: string): boolean =>
    typeof stored === 'string' && stored.trim().toLowerCase() === normalized;

export const parseJsonField = (raw: unknown): Row | null => {
    if (typeof raw !== 'string') return null;
    try {
        const parsed: unknown = JSON.parse(raw);
        return isPlainObject(parsed) ? parsed : null;
    } catch {
        return null;
    }
};

const timeOf = (value: unknown): number => {
    const t = new Date(value as string).getTime();
    return Number.isNaN(t) ? 0 : t;
};

export const byNewest = (a: Row, b: Row): number => timeOf(b.created_at) - timeOf(a.created_at);

export const stripUserSecrets = (user: Row): Row => {
    const { password: _password, refreshTokens: _refreshTokens, ...safe } = user;
    return safe;
};

export const toPublicProfile = (user: Row): Row =>
    pickKeys(user, ['id', 'role', 'name', 'surName', 'avatarUrl', 'created_at']);

const SENSITIVE_CARD_FIELDS = ['cvv', 'cvc', 'cvv2', 'securityCode', 'cardFingerprint'] as const;
export const PAYMENT_PROTECTED_FIELDS = [...SERVER_OWNED_FIELDS, ...SENSITIVE_CARD_FIELDS] as const;

export const cardDigits = (value: unknown): string =>
    typeof value === 'string' || typeof value === 'number' ? String(value).replace(/\D/g, '') : '';

export const isValidCardNumber = (value: unknown): boolean => {
    const digits = cardDigits(value);
    return digits.length >= 12 && digits.length <= 19;
};

export const maskCard = (value: unknown): string => {
    const digits = cardDigits(value);
    if (digits.length >= 12) return `**** **** **** ${digits.slice(-4)}`;
    return typeof value === 'string' && value.includes('*') ? value : '';
};

export const cardFingerprint = (value: unknown): string | null => {
    const digits = cardDigits(value);
    if (digits.length < 12) return null;
    return crypto.createHmac('sha256', CARD_FINGERPRINT_KEY).update(digits).digest('hex');
};

export const storedFingerprint = (payment: Row): string | null =>
    payment.cardFingerprint ?? cardFingerprint(payment.cardNumber);

export const toPublicPayment = (payment: Row): Row => {
    const { cvv: _a, cvc: _b, cvv2: _c, securityCode: _d, cardFingerprint: _e, ...rest } = payment;
    return 'cardNumber' in rest ? { ...rest, cardNumber: maskCard(rest.cardNumber) } : rest;
};

type UploadedFile = Express.Multer.File;

export const getUploadedFiles = (req: Request): UploadedFile[] => {
    const out: UploadedFile[] = [];
    if (req.file) out.push(req.file);

    const files = req.files;
    if (Array.isArray(files)) {
        out.push(...files);
    } else if (files && typeof files === 'object') {
        for (const list of Object.values(files)) out.push(...list);
    }
    return out;
};

const ascii = (buf: Buffer, start: number, end: number) => buf.subarray(start, end).toString('ascii');

const IMAGE_SIGNATURES: Array<(head: Buffer) => boolean> = [
    (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,                                  // JPEG
    (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), // PNG
    (b) => ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP',                          // WebP
    (b) => ascii(b, 0, 6) === 'GIF87a' || ascii(b, 0, 6) === 'GIF89a',                       // GIF
    (b) => ascii(b, 4, 8) === 'ftyp' && ascii(b, 8, 12) === 'avif',                          // AVIF
];

const readHead = (file: UploadedFile): Buffer | null => {
    if (file.buffer) return file.buffer.subarray(0, 16);
    if (!file.path) return null;

    let fd: number | null = null;
    try {
        fd = fs.openSync(file.path, 'r');
        const head = Buffer.alloc(16);
        fs.readSync(fd, head, 0, 16, 0);
        return head;
    } catch {
        return null;
    } finally {
        if (fd !== null) fs.closeSync(fd);
    }
};


export const isImageFile = (file: UploadedFile): boolean => {
    const head = readHead(file);
    return head !== null && IMAGE_SIGNATURES.some((matches) => matches(head));
};

export const removeUploadedFiles = (files: UploadedFile[]): void => {
    for (const file of files) {
        if (!file.path) continue;
        try {
            fs.unlinkSync(file.path);
        } catch {

        }
    }
};

export const assertImages = (files: UploadedFile[]): void => {
    if (!files.every(isImageFile)) {
        throw new HttpError(400, 'Only JPEG, PNG, WebP, GIF or AVIF images are allowed.');
    }
};


export const deleteUploadedFile = (relativePath: unknown): void => {
    if (typeof relativePath !== 'string' || !relativePath) return;

    const absolute = path.resolve(UPLOADS_BASE, relativePath);
    if (!absolute.startsWith(UPLOADS_ROOT + path.sep)) return;

    try {
        fs.unlinkSync(absolute);
    } catch {

    }
};