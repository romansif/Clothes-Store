import fs from "fs";
import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts';

export const usersController = {
    async getUsers(_req: Request, res: Response) {
        try {
            const db = dbService.readDB();
            const users: any[] = db.users || [];

            const sanitizedUsers = users.map(user => {
                const { password: _, refreshTokens: __, ...rest } = user;
                return rest;
            });

            res.json(sanitizedUsers);
        } catch (err) {
            console.error('Failed to get the users:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const users: any[] = db.users || [];
            const user = users.find(u => u.id === id);

            if (!user) return res.status(404).json({ message: "User not found" });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (err) {
            console.error(`Failed to get the user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getAllCheckout(_req: Request, res: Response) {
        try {
            const db = dbService.readDB();

            res.json({
                addresses: db.addresses || [],
                payments: db.payments || []
            });
        } catch (err) {
            console.error('Failed to get user checkouts:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const users: any[] = db.users || [];
            const index = users.findIndex(u => u.id === id);

            if (index === -1) return res.status(404).json({ message: "User not found" });

            users[index] = {
                ...users[index],
                ...req.body
            };

            db.users = users;
            dbService.writeDB(db);

            const { password: _, refreshTokens: __, ...userWithoutPassword } = users[index];
            res.json(userWithoutPassword);
        } catch (err) {
            console.error(`Failed to update the user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateUserPassword(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Заполните все поля' });
            }

            const db = dbService.readDB();
            const users: any[] = db.users || [];
            const user = users.find(u => u.id === id);

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Неверный текущий пароль' });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            dbService.writeDB(db);

            return res.status(200).json({ message: 'Пароль успешно изменен' });
        } catch (err) {
            console.error(`Failed to update password for user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateUserAvatar(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!req.file) {
                return res.status(400).json({ message: 'Файл аватарки обязателен' });
            }

            const db = dbService.readDB();
            const users: any[] = db.users || [];
            const user = users.find(u => u.id === id);

            if (!user) return res.status(404).json({ message: "User not found" });

            const oldAvatar = user.avatarUrl;
            if (oldAvatar && oldAvatar !== 'uploads/avatars/default-avatar.png') {
                if (fs.existsSync(oldAvatar)) {
                    fs.unlinkSync(oldAvatar);
                }
            }

            const newAvatar = `uploads/avatars/${req.file.filename}`;

            user.avatarUrl = newAvatar;

            Object.assign(user, req.body);

            dbService.writeDB(db);

            res.json({
                message: 'Avatar updated successfully',
                avatarUrl: newAvatar
            });
        } catch (err) {
            console.error(`Failed to update avatar for user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deleteUser(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            const currentUserId = req.user?.userId || req.user?.id;
            if (currentUserId !== id) {
                return res.status(403).json({ message: "Нет прав на удаление чужого аккаунта" });
            }

            const db = dbService.readDB();
            const users: any[] = db.users || [];
            const index = users.findIndex(u => u.id === id);

            if (index === -1) return res.status(404).json({ message: "Пользователь не найден" });

            const deletedUser = users[index];


            db.users = users.filter((u: any) => u.id !== id);

            if (db.products) db.products = db.products.filter((p: any) => p.userId !== id);
            if (db.cart) db.cart = db.cart.filter((c: any) => c.userId !== id);
            if (db.favorites) db.favorites = db.favorites.filter((f: any) => f.userId !== id);
            if (db.addresses) db.addresses = db.addresses.filter((a: any) => a.userId !== id);
            if (db.shipping) db.shipping = db.shipping.filter((a: any) => a.userId !== id);
            if (db.payments) db.payments = db.payments.filter((p: any) => p.userId !== id);
            if (db.orders) db.orders = db.orders.filter((o: any) => o.userId !== id);

            dbService.writeDB(db);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', { path: '/' });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = deletedUser;
            res.json({ message: "Пользователь и его данные удалены", user: userWithoutPassword });
        } catch (err) {
            console.error(`Failed to delete user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default usersController;