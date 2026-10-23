import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { OAuth2Client } from 'google-auth-library';
import { type Request, type Response } from 'express';
import { dbService } from '../../db/db.config.ts';
import { type JwtCustomPayload, type TokenPayload } from '../../interfaces.ts';
import {
    ACCESS_SECRET, REFRESH_SECRET, ACCESS_TTL_MS, REFRESH_TTL_MS,
    accessCookieOptions, refreshCookieOptions, clearCookieOptions,
} from '#config/auth.config';
import {
    type Row, HttpError, handle, clientKey, rateLimit, assertNotLimited, recordHit, clearHits,
    cleanText, isPlainObject, normalizeEmail, sameEmail, stripUserSecrets,
} from '#lib/security';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const ROLES = ['Buyer', 'Seller'] as const;
type Role = typeof ROLES[number];
const isRole = (value: unknown): value is Role =>
    typeof value === 'string' && (ROLES as readonly string[]).includes(value);

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72; // bcrypt ignores everything past 72 bytes
const MAX_SESSIONS_PER_USER = 5;
const LOGIN_MAX_FAILURES = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// Both fields are flagged in every failure, so the response does not reveal which emails are registered.
const INVALID_CREDENTIALS = { email: 'Invalid email or password', password: 'Invalid email or password' };

// Compared against when the account does not exist, so response time does not reveal it.
const DUMMY_HASH = bcrypt.hashSync('timing-equalizer', 10);

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

const signAccessToken = (user: Row) =>
    jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        ACCESS_SECRET,
        { algorithm: 'HS256', expiresIn: Math.floor(ACCESS_TTL_MS / 1000) },
    );

const signRefreshToken = (user: Row) =>
    jwt.sign(
        { userId: user.id, jti: crypto.randomUUID() },
        REFRESH_SECRET,
        { algorithm: 'HS256', expiresIn: Math.floor(REFRESH_TTL_MS / 1000) },
    );

/** Creates a token pair and records only the hash of the refresh token on the user. */
const rotateSession = (user: Row, replacedRefreshToken?: string) => {
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const replaced = replacedRefreshToken ? hashToken(replacedRefreshToken) : null;
    const kept: string[] = (Array.isArray(user.refreshTokens) ? user.refreshTokens : [])
        .filter((hash: string) => hash !== replaced);

    user.refreshTokens = [...kept, hashToken(refreshToken)].slice(-MAX_SESSIONS_PER_USER);
    return { accessToken, refreshToken };
};

const setSessionCookies = (res: Response, tokens: { accessToken: string; refreshToken: string }) => {
    res.cookie('accessToken', tokens.accessToken, accessCookieOptions);
    res.cookie('refreshToken', tokens.refreshToken, refreshCookieOptions);
};

const clearSessionCookies = (res: Response) => {
    res.clearCookie('accessToken', clearCookieOptions);
    res.clearCookie('refreshToken', clearCookieOptions);
};

const readRefreshCookie = (req: Request): string | null => {
    const token = req.cookies?.refreshToken;
    return typeof token === 'string' && token ? token : null;
};

const authController = {
    register: handle('Failed to register the new user', async (req, res) => {
        rateLimit(`register:${clientKey(req)}`, 20, 60 * 60 * 1000);

        const body = isPlainObject(req.body) ? req.body : {};
        const { role, password } = body;

        if (!isRole(role)) {
            throw new HttpError(400, 'Invalid account role.');
        }

        const email = normalizeEmail(body.email);
        if (!email) {
            throw new HttpError(400, 'Invalid email address.', { email: 'Enter a valid email address.' });
        }

        if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            throw new HttpError(400, 'Invalid password.', {
                password: `Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters long.`,
            });
        }

        const name = cleanText(body.name, 100);
        if (!name) {
            throw new HttpError(400, 'Name is required.', { name: 'Name is required.' });
        }

        const surName = body.surName === undefined || body.surName === null ? '' : cleanText(body.surName, 100);
        if (surName === null) {
            throw new HttpError(400, 'Invalid surname.', { surName: 'Surname is too long.' });
        }

        const phone = body.phone === undefined || body.phone === null ? '' : cleanText(body.phone, 32);
        if (phone === null) {
            throw new HttpError(400, 'Invalid phone number.', { phone: 'Phone number is invalid.' });
        }

        const db = dbService.readDB();
        const users: Row[] = db.users || [];

        const candidates = users.filter(u => sameEmail(u.email, email));

        if (candidates.length >= 2) {
            throw new HttpError(400, `This email is already registered for both Buyer and Seller accounts.`, {
                email: `Limit reached. You can only have one Buyer and one Seller account per email.`,
            });
        }

        if (candidates.some(u => u.role === role)) {
            throw new HttpError(400, `An account with this email already exists as a ${role}.`, {
                email: `This email is already taken by a ${role} account.`,
            });
        }

        const newUser: Row = {
            id: uuidv4(),
            role,
            name,
            surName,
            phone,
            email,
            password: await bcrypt.hash(password, 10),
            avatarUrl: 'uploads/avatars/default-avatar.png',
            created_at: new Date().toISOString(),
            refreshTokens: [],
        };

        const tokens = rotateSession(newUser);

        users.push(newUser);
        db.users = users;
        dbService.writeDB(db);

        setSessionCookies(res, tokens);
        res.status(201).json({ ...stripUserSecrets(newUser), accessToken: tokens.accessToken });
    }),

    login: handle('Failed to login', async (req, res) => {
        const body = isPlainObject(req.body) ? req.body : {};
        const { password, role } = body;
        const email = normalizeEmail(body.email);

        if (!email || typeof password !== 'string' || !password || password.length > 200 || !isRole(role)) {
            throw new HttpError(400, 'Email, password and role are required.');
        }

        const limitKey = `login:${clientKey(req)}:${email}`;
        assertNotLimited(limitKey, LOGIN_MAX_FAILURES);

        const db = dbService.readDB();
        const users: Row[] = db.users || [];
        const user = users.find(u => sameEmail(u.email, email) && u.role === role);

        // Same work and same answer whether the account exists, has no password, or the password is wrong.
        const hash = user && typeof user.password === 'string' && user.password ? user.password : DUMMY_HASH;
        const passwordMatches = await bcrypt.compare(password, hash);

        if (!user || hash === DUMMY_HASH) {
            recordHit(limitKey, LOGIN_WINDOW_MS);
            throw new HttpError(400, 'Invalid email or password', INVALID_CREDENTIALS);
        }

        if (!passwordMatches) {
            recordHit(limitKey, LOGIN_WINDOW_MS);
            throw new HttpError(400, 'Invalid email or password', INVALID_CREDENTIALS);
        }

        clearHits(limitKey);

        const tokens = rotateSession(user);
        dbService.writeDB(db);

        setSessionCookies(res, tokens);
        res.json({ ...stripUserSecrets(user), accessToken: tokens.accessToken });
    }),

    google: handle('Failed to login with Google', async (req, res) => {
        rateLimit(`google:${clientKey(req)}`, 30, 15 * 60 * 1000);

        const body = isPlainObject(req.body) ? req.body : {};
        const { credential } = body;

        if (typeof credential !== 'string' || !credential) {
            throw new HttpError(400, 'Google credential is required');
        }

        const role: Role = isRole(body.role) ? body.role : 'Buyer';

        let payload: TokenPayload | undefined;
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            payload = ticket.getPayload() as unknown as TokenPayload | undefined;
        } catch {
            throw new HttpError(401, 'Invalid Google token');
        }

        if (!payload) {
            throw new HttpError(400, 'Invalid Google token payload');
        }

        const { sub, given_name, family_name, name, picture, email_verified } = payload;
        const email = normalizeEmail(payload.email);

        if (!email) {
            throw new HttpError(400, 'Invalid Google token payload');
        }

        if (!email_verified) {
            throw new HttpError(401, 'Email is not verified');
        }

        const db = dbService.readDB();
        const users: Row[] = db.users || [];

        let user = users.find(u => sameEmail(u.email, email) && u.role === role);

        if (user && user.googleId && user.googleId !== sub) {
            throw new HttpError(401, 'This account is linked to a different Google profile');
        }

        if (!user) {
            user = {
                id: uuidv4(),
                email,
                role,
                name: given_name || name || email.split('@')[0],
                surName: family_name || '',
                avatarUrl: picture || '',
                privatePhone: '',
                googleId: sub,
                created_at: new Date().toISOString(),
                password: '',
                refreshTokens: [],
            };
            users.push(user);
        }

        user.googleId = user.googleId || sub;

        const tokens = rotateSession(user);
        db.users = users;
        dbService.writeDB(db);

        setSessionCookies(res, tokens);
        res.json({ ...stripUserSecrets(user), accessToken: tokens.accessToken });
    }),

    sendSmsCode: async (_req: Request, res: Response) => {
        res.status(501).json({ message: 'SMS sending is not supported in local file mode' });
    },

    verifySmsCode: async (_req: Request, res: Response) => {
        res.status(501).json({ message: 'SMS verification is not supported in local file mode' });
    },

    logout: handle('Failed to logout', async (req, res) => {
        const refreshToken = readRefreshCookie(req);

        // Revoke the session server-side, not just in the browser.
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, REFRESH_SECRET, { algorithms: ['HS256'] }) as JwtCustomPayload;
                const db = dbService.readDB();
                const user = (db.users || []).find((u: Row) => String(u.id) === String(decoded.userId));

                if (user && Array.isArray(user.refreshTokens)) {
                    const hash = hashToken(refreshToken);
                    user.refreshTokens = user.refreshTokens.filter((h: string) => h !== hash);
                    dbService.writeDB(db);
                }
            } catch {
                /* expired or invalid token: nothing to revoke */
            }
        }

        clearSessionCookies(res);
        res.json({ success: true, message: 'Successfully logged out of the system' });
    }),

    refresh: handle('Failed to refresh', async (req, res) => {
        const refreshToken = readRefreshCookie(req);

        if (!refreshToken) {
            throw new HttpError(403, 'Refresh token missing');
        }

        let decoded: JwtCustomPayload;
        try {
            decoded = jwt.verify(refreshToken, REFRESH_SECRET, { algorithms: ['HS256'] }) as JwtCustomPayload;
        } catch {
            throw new HttpError(403, 'Refresh token expired');
        }

        const db = dbService.readDB();
        const users: Row[] = db.users || [];
        const user = users.find(u => String(u.id) === String(decoded.userId));

        const hash = hashToken(refreshToken);
        const known = !!user && Array.isArray(user.refreshTokens) && user.refreshTokens.includes(hash);

        if (!user || !known) {
            // A correctly signed token that is not on record was already used or revoked:
            // treat it as theft and end every session of that account.
            if (user) {
                user.refreshTokens = [];
                dbService.writeDB(db);
            }
            clearSessionCookies(res);
            throw new HttpError(403, 'Токен недействителен или отозван');
        }

        const tokens = rotateSession(user, refreshToken);
        dbService.writeDB(db);

        setSessionCookies(res, tokens);
        res.json({ success: true, accessToken: tokens.accessToken });
    }),
};

export default authController;
