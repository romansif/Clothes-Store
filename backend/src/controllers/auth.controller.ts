import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { OAuth2Client } from 'google-auth-library';
import { type Request, type Response } from 'express';
import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid } from '#db/query.ts';
import { type JwtCustomPayload, type TokenPayload } from '../interfaces.ts';
import {
    ACCESS_SECRET, REFRESH_SECRET, ACCESS_TTL_MS, REFRESH_TTL_MS,
    accessCookieOptions, refreshCookieOptions, clearCookieOptions,
} from '#config/auth.config';
import {
    type Row, HttpError, handle, clientKey, rateLimit, assertNotLimited, recordHit, clearHits,
    cleanText, isPlainObject, normalizeEmail, stripUserSecrets,
} from '#db/security';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const ROLES = ['Buyer', 'Seller'] as const;
type Role = typeof ROLES[number];
const isRole = (value: unknown): value is Role =>
    typeof value === 'string' && (ROLES as readonly string[]).includes(value);

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;
const MAX_SESSIONS_PER_USER = 5;
const LOGIN_MAX_FAILURES = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

const INVALID_CREDENTIALS = { email: 'Invalid email or password', password: 'Invalid email or password' };

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

// Меняет user.refreshTokens в памяти; в базу это нужно записать через saveSessions().
const rotateSession = (user: Row, replacedRefreshToken?: string) => {
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const replaced = replacedRefreshToken ? hashToken(replacedRefreshToken) : null;
    const kept: string[] = (Array.isArray(user.refreshTokens) ? user.refreshTokens : [])
        .filter((hash: string) => hash !== replaced);

    user.refreshTokens = [...kept, hashToken(refreshToken)].slice(-MAX_SESSIONS_PER_USER);
    return { accessToken, refreshToken };
};

const saveSessions = async (user: Row): Promise<void> => {
    unwrap(await supabase.from('users').update({ refreshTokens: user.refreshTokens }).eq('id', user.id));
};

const findUserByEmailRole = async (email: string, role: Role): Promise<Row | null> =>
    unwrap(await supabase.from('users').select('*').eq('email', email).eq('role', role).maybeSingle());

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

        const candidates: Row[] = unwrap(await supabase.from('users').select('id, role').eq('email', email));

        if (candidates.length >= 2) {
            throw new HttpError(400, `This email is already registered for both Buyer and Seller accounts.`, {
                email: `Limit reached. You can only have one Buyer and one Seller account per email.`,
            });
        }

        const alreadyTaken = () => new HttpError(400, `An account with this email already exists as a ${role}.`, {
            email: `This email is already taken by a ${role} account.`,
        });

        if (candidates.some(u => u.role === role)) {
            throw alreadyTaken();
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

        // unique (email, role) в базе ловит гонку двух одновременных регистраций
        unwrapOrConflict(await supabase.from('users').insert(newUser), alreadyTaken());

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

        const user = await findUserByEmailRole(email, role);

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
        await saveSessions(user);

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

        let user = await findUserByEmailRole(email, role);

        if (user && user.googleId && user.googleId !== sub) {
            throw new HttpError(401, 'This account is linked to a different Google profile');
        }

        let tokens: { accessToken: string; refreshToken: string };

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
            tokens = rotateSession(user);

            unwrapOrConflict(
                await supabase.from('users').insert(user),
                new HttpError(409, 'Account is being created, please try again'),
            );
        } else {
            user.googleId = user.googleId || sub;
            tokens = rotateSession(user);

            unwrap(
                await supabase.from('users')
                    .update({ googleId: user.googleId, refreshTokens: user.refreshTokens })
                    .eq('id', user.id),
            );
        }

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

        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, REFRESH_SECRET, { algorithms: ['HS256'] }) as JwtCustomPayload;

                if (isUuid(decoded.userId)) {
                    const user = unwrap(
                        await supabase.from('users').select('id, refreshTokens').eq('id', decoded.userId).maybeSingle(),
                    );

                    if (user && Array.isArray(user.refreshTokens)) {
                        const hash = hashToken(refreshToken);
                        user.refreshTokens = user.refreshTokens.filter((h: string) => h !== hash);
                        await saveSessions(user);
                    }
                }
            } catch {
                // просроченный или битый токен: куки всё равно очищаем ниже
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

        const user = isUuid(decoded.userId)
            ? unwrap(await supabase.from('users').select('*').eq('id', decoded.userId).maybeSingle())
            : null;

        const hash = hashToken(refreshToken);
        const known = !!user && Array.isArray(user.refreshTokens) && user.refreshTokens.includes(hash);

        if (!user || !known) {
            // токен не из списка выданных: возможна кража, отзываем все сессии пользователя
            if (user) {
                user.refreshTokens = [];
                await saveSessions(user);
            }
            clearSessionCookies(res);
            throw new HttpError(403, 'Токен недействителен или отозван');
        }

        const tokens = rotateSession(user, refreshToken);
        await saveSessions(user);

        setSessionCookies(res, tokens);
        res.json({ success: true, accessToken: tokens.accessToken });
    }),
};

export default authController;