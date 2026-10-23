import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { dbService } from '../../db/db.config.ts';
import { clearCookieOptions } from '#config/auth.config';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf, getAuthUser,
    omitKeys, pickKeys, cleanText, normalizeEmail, sameEmail, rateLimit,
    stripUserSecrets, toPublicProfile, toPublicPayment, USER_PROTECTED_FIELDS,
    getUploadedFiles, assertImages, deleteUploadedFile,
} from '#lib/security';

const DEFAULT_AVATAR = 'uploads/avatars/default-avatar.png';
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

const TEXT_LIMITS: Record<string, number> = {
    name: 100,
    surName: 100,
    phone: 32,
    privatePhone: 32,
};

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

export const usersController = {
    getUsers: handle('Failed to get the users', async (req, res) => {
        const viewer = getAuthUser(req);
        const users: Row[] = dbService.readDB().users || [];

        res.json(users.map(user => viewOf(user, viewer?.id)));
    }),

    getUserById: handle('Failed to get the user', async (req, res) => {
        const id = param(req, 'id');
        const viewer = getAuthUser(req);

        const users: Row[] = dbService.readDB().users || [];
        const user = users.find(u => sameId(u.id, id));

        if (!user) throw new HttpError(404, 'User not found');

        res.json(viewOf(user, viewer?.id));
    }),

    getAllCheckout: handle('Failed to get user checkouts', async (req, res) => {
        const target = param(req, 'id') || param(req, 'userId');
        const user = target ? requireSelf(req, target) : requireUser(req);

        const db = dbService.readDB();

        res.json({
            addresses: (db.addresses || []).filter((a: Row) => sameId(a.userId, user.id)),
            payments: (db.payments || [])
                .filter((p: Row) => sameId(p.userId, user.id))
                .map(toPublicPayment),
        });
    }),

    updateUser: handle('Failed to update the user', async (req, res) => {
        const id = param(req, 'id');
        requireSelf(req, id);

        const db = dbService.readDB();
        const users: Row[] = db.users || [];
        const index = users.findIndex(u => sameId(u.id, id));

        if (index === -1) throw new HttpError(404, 'User not found');

        const changes = omitKeys(req.body, USER_PROTECTED_FIELDS);
        validateTextFields(changes);

        if ('email' in changes) {
            const email = normalizeEmail(changes.email);
            if (!email) {
                throw new HttpError(400, 'Invalid email address.', { email: 'Enter a valid email address.' });
            }

            const taken = users.some(u =>
                !sameId(u.id, id) && u.role === users[index]!.role && sameEmail(u.email, email)
            );
            if (taken) {
                throw new HttpError(400, 'This email is already in use.', { email: 'This email is already in use.' });
            }
            changes.email = email;
        }

        users[index] = { ...users[index], ...changes };

        db.users = users;
        dbService.writeDB(db);

        res.json(stripUserSecrets(users[index]!));
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

        const db = dbService.readDB();
        const users: Row[] = db.users || [];
        const user = users.find(u => sameId(u.id, id));

        if (!user) throw new HttpError(404, 'Пользователь не найден');

        const isPasswordValid = typeof user.password === 'string' && user.password
            ? await bcrypt.compare(oldPassword, user.password)
            : false;

        if (!isPasswordValid) throw new HttpError(400, 'Неверный текущий пароль');

        user.password = await bcrypt.hash(newPassword, 10);

        const currentRefresh = req.cookies?.refreshToken;
        const currentHash = typeof currentRefresh === 'string'
            ? crypto.createHash('sha256').update(currentRefresh).digest('hex')
            : null;
        user.refreshTokens = currentHash && Array.isArray(user.refreshTokens) && user.refreshTokens.includes(currentHash)
            ? [currentHash]
            : [];

        dbService.writeDB(db);

        res.status(200).json({ message: 'Пароль успешно изменен' });
    }),

    updateUserAvatar: handle('Failed to update avatar', async (req, res) => {
        const id = param(req, 'id');
        requireSelf(req, id);

        if (!req.file) throw new HttpError(400, 'Файл аватарки обязателен');
        assertImages(getUploadedFiles(req));

        const db = dbService.readDB();
        const users: Row[] = db.users || [];
        const user = users.find(u => sameId(u.id, id));

        if (!user) throw new HttpError(404, 'User not found');

        const oldAvatar = user.avatarUrl;
        const newAvatar = `uploads/avatars/${req.file.filename}`;

        user.avatarUrl = newAvatar;

        const extras = pickKeys(req.body, ['name', 'surName', 'phone', 'privatePhone']);
        validateTextFields(extras);
        Object.assign(user, extras);

        dbService.writeDB(db);

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

        const db = dbService.readDB();
        const users: Row[] = db.users || [];
        const deletedUser = users.find(u => sameId(u.id, id));

        if (!deletedUser) throw new HttpError(404, 'Пользователь не найден');

        db.users = users.filter(u => !sameId(u.id, id));

        for (const collection of ['products', 'cart', 'favorites', 'addresses', 'shipping', 'payments', 'orders', 'reviews']) {
            if (Array.isArray(db[collection])) {
                db[collection] = db[collection].filter((row: Row) => !sameId(row.userId, id));
            }
        }

        dbService.writeDB(db);

        if (deletedUser.avatarUrl && deletedUser.avatarUrl !== DEFAULT_AVATAR) {
            deleteUploadedFile(deletedUser.avatarUrl);
        }

        res.clearCookie('accessToken', clearCookieOptions);
        res.clearCookie('refreshToken', clearCookieOptions);

        res.json({ message: 'Пользователь и его данные удалены', user: stripUserSecrets(deletedUser) });
    }),
};

export default usersController;
