import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid } from '#db/query.ts';
import { clearCookieOptions } from '#config/auth.config';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf, getAuthUser,
    pickKeys, cleanText, normalizeEmail, rateLimit,
    stripUserSecrets, toPublicProfile, toPublicPayment,
    getUploadedFiles, assertImages, deleteUploadedFile,
} from '../db/security';

const DEFAULT_AVATAR = 'uploads/avatars/default-avatar.png';
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

const TEXT_LIMITS: Record<string, number> = {
    name: 100,
    surName: 100,
    companyName: 100,
    phone: 32,
    privatePhone: 32,
    publicPhone: 32,
};

// Поля, которые пользователь может менять сам (role, password, refreshTokens, googleId, avatarUrl — нельзя).
const USER_UPDATABLE = [...Object.keys(TEXT_LIMITS), 'email'] as const;

const emailTaken = () => new HttpError(400, 'This email is already in use.', { email: 'This email is already in use.' });

const viewOf = (user: Row, viewerId: string | undefined): Row =>
    sameId(user.id, viewerId) ? stripUserSecrets(user) : toPublicProfile(user);

const validateTextFields = (changes: Row): void => {
    for (const [field, max] of Object.entries(TEXT_LIMITS)) {
        if (!(field in changes)) continue;

        const value = changes[field] === null ? '' : cleanText(changes[field], max);
        if (value === null) {
            throw new HttpError(400, `Invalid ${field}.`, { [field]: `Invalid ${field}.` });
        }
        changes[field] = value;
    }
};

const findUser = async (id: string): Promise<Row | null> =>
    isUuid(id) ? unwrap(await supabase.from('users').select('*').eq('id', id).maybeSingle()) : null;

export const usersController = {
    getUsers: handle('Failed to get the users', async (req, res) => {
        const viewer = getAuthUser(req);
        const users: Row[] = unwrap(await supabase.from('users').select('*'));

        res.json(users.map(user => viewOf(user, viewer?.id)));
    }),

    getUserById: handle('Failed to get the user', async (req, res) => {
        const id = param(req, 'id');
        const viewer = getAuthUser(req);

        const user = await findUser(id);

        if (!user) throw new HttpError(404, 'User not found');

        res.json(viewOf(user, viewer?.id));
    }),

    getAllCheckout: handle('Failed to get user checkouts', async (req, res) => {
        const target = param(req, 'id') || param(req, 'userId');
        const user = target ? requireSelf(req, target) : requireUser(req);

        const [addresses, payments] = await Promise.all([
            supabase.from('addresses').select('*').eq('userId', user.id).order('created_at', { ascending: true }),
            supabase.from('payments').select('*').eq('userId', user.id).order('created_at', { ascending: true }),
        ]);

        res.json({
            addresses: unwrap(addresses),
            payments: unwrap(payments).map(toPublicPayment),
        });
    }),

    updateUser: handle('Failed to update the user', async (req, res) => {
        const id = param(req, 'id');
        requireSelf(req, id);

        const current = await findUser(id);

        if (!current) throw new HttpError(404, 'User not found');

        const changes = pickKeys(req.body, USER_UPDATABLE);
        validateTextFields(changes);

        if ('email' in changes) {
            const email = normalizeEmail(changes.email);
            if (!email) {
                throw new HttpError(400, 'Invalid email address.', { email: 'Enter a valid email address.' });
            }

            const taken = unwrap(
                await supabase.from('users').select('id')
                    .eq('role', current.role)
                    .eq('email', email)
                    .neq('id', id)
                    .limit(1),
            );
            if (taken.length) throw emailTaken();

            changes.email = email;
        }

        const updated = Object.keys(changes).length
            ? unwrapOrConflict(
                await supabase.from('users').update(changes).eq('id', id).select().single(),
                emailTaken(),
            )
            : current;

        res.json(stripUserSecrets(updated));
    }),

    updateUserPassword: handle('Failed to update password', async (req, res) => {
        const id = param(req, 'id');
        requireSelf(req, id);
        rateLimit(`password:${id}`, 5, 15 * 60 * 1000);

        const body = (req.body ?? {}) as Row;
        const { oldPassword, newPassword } = body;

        if (typeof oldPassword !== 'string' || typeof newPassword !== 'string' || !oldPassword || !newPassword) {
            throw new HttpError(400, 'Заполните все поля');
        }

        if (newPassword.length < MIN_PASSWORD_LENGTH || newPassword.length > MAX_PASSWORD_LENGTH) {
            throw new HttpError(400, `Пароль должен содержать от ${MIN_PASSWORD_LENGTH} до ${MAX_PASSWORD_LENGTH} символов`);
        }

        const user = await findUser(id);

        if (!user) throw new HttpError(404, 'Пользователь не найден');

        const isPasswordValid = typeof user.password === 'string' && user.password
            ? await bcrypt.compare(oldPassword, user.password)
            : false;

        if (!isPasswordValid) throw new HttpError(400, 'Неверный текущий пароль');

        const currentRefresh = req.cookies?.refreshToken;
        const currentHash = typeof currentRefresh === 'string'
            ? crypto.createHash('sha256').update(currentRefresh).digest('hex')
            : null;

        // все остальные сессии разлогиниваются, текущая остаётся
        const refreshTokens = currentHash && Array.isArray(user.refreshTokens) && user.refreshTokens.includes(currentHash)
            ? [currentHash]
            : [];

        unwrap(
            await supabase.from('users')
                .update({ password: await bcrypt.hash(newPassword, 10), refreshTokens })
                .eq('id', id),
        );

        res.status(200).json({ message: 'Пароль успешно изменен' });
    }),

    updateUserAvatar: handle('Failed to update avatar', async (req, res) => {
        const id = param(req, 'id');
        requireSelf(req, id);

        if (!req.file) throw new HttpError(400, 'Файл аватарки обязателен');
        assertImages(getUploadedFiles(req));

        const user = await findUser(id);

        if (!user) throw new HttpError(404, 'User not found');

        const oldAvatar = user.avatarUrl;
        const newAvatar = `uploads/avatars/${req.file.filename}`;

        const extras = pickKeys(req.body, ['name', 'surName', 'phone', 'privatePhone']);
        validateTextFields(extras);

        unwrap(await supabase.from('users').update({ avatarUrl: newAvatar, ...extras }).eq('id', id));

        if (oldAvatar && oldAvatar !== DEFAULT_AVATAR && oldAvatar !== newAvatar) {
            deleteUploadedFile(oldAvatar);
        }

        res.json({
            message: 'Avatar updated successfully',
            avatarUrl: newAvatar,
        });
    }),

    deleteUser: handle('Failed to delete user', async (req, res) => {
        const id = param(req, 'id');

        const current = requireUser(req);
        if (!sameId(current.id, id)) {
            throw new HttpError(403, 'Нет прав на удаление чужого аккаунта');
        }

        // Все связанные строки (products, cart, favorites, addresses, shipping,
        // payments, orders, reviews) удалит сама база через ON DELETE CASCADE.
        const deletedUser = isUuid(id)
            ? unwrap(await supabase.from('users').delete().eq('id', id).select()).at(0)
            : null;

        if (!deletedUser) throw new HttpError(404, 'Пользователь не найден');

        if (deletedUser.avatarUrl && deletedUser.avatarUrl !== DEFAULT_AVATAR) {
            deleteUploadedFile(deletedUser.avatarUrl);
        }

        res.clearCookie('accessToken', clearCookieOptions);
        res.clearCookie('refreshToken', clearCookieOptions);

        res.json({ message: 'Пользователь и его данные удалены', user: stripUserSecrets(deletedUser) });
    }),
};

export default usersController;