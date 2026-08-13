import fs from "fs";
import bcrypt from "bcryptjs";
import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const usersController = {
    async getUsers(_req: Request, res: Response) {
        try {
            const { data: users, error } = await supabase
                .from('users')
                .select('id, role, name, surName, privatePhone, companyName, publicPhone, email, avatarUrl, dateCreatedAccount, userId');

            if (error) throw error;

            res.json(users || []);
        } catch (err) {
            console.error('Failed to get the users:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (error) throw error;
            if (!user) return res.status(404).json({ message: "User not found" });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (err) {
            console.error(`Failed to get the user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getAllCheckout(_req: Request, res: Response) {
        try {
            const [addressesRes, paymentsRes] = await Promise.all([
                supabase.from('checkoutAddresses').select('*'),
                supabase.from('checkoutPayments').select('*')
            ]);

            if (addressesRes.error) throw addressesRes.error;
            if (paymentsRes.error) throw paymentsRes.error;

            res.json({
                addresses: addressesRes.data || [],
                payments: paymentsRes.data || []
            });
        } catch (err) {
            console.error('Failed to get user checkouts:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { data: updatedUser, error } = await supabase
                .from('users')
                .update(req.body)
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!updatedUser) return res.status(404).json({ message: "User not found" });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = updatedUser;
            res.json(userWithoutPassword);
        } catch (err) {
            console.error(`Failed to update the user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
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

            const { data: user, error: fetchError } = await supabase
                .from('users')
                .select('id, password')
                .eq('id', id)
                .maybeSingle();

            if (fetchError) throw fetchError;
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Неверный текущий пароль' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const { error: updateError } = await supabase
                .from('users')
                .update({ password: hashedPassword })
                .eq('id', id);

            if (updateError) throw updateError;

            return res.status(200).json({ message: 'Пароль успешно изменен' });
        } catch (err) {
            console.error(`Failed to update password for user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateUserAvatar(req: AuthenticatedRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!req.file) {
                return res.status(400).json({ message: 'Файл аватарки обязателен' });
            }

            const { data: user, error: fetchError } = await supabase
                .from('users')
                .select('avatarUrl')
                .eq('id', id)
                .maybeSingle();

            if (fetchError) throw fetchError;
            if (!user) return res.status(404).json({ message: "User not found" });

            const oldAvatar = user.avatarUrl;
            if (oldAvatar && oldAvatar !== 'uploads/avatars/default-avatar.png') {
                if (fs.existsSync(oldAvatar)) {
                    fs.unlinkSync(oldAvatar);
                }
            }

            const newAvatar = `uploads/avatars/${req.file.filename}`;

            const { error: updateError } = await supabase
                .from('users')
                .update({ avatarUrl: newAvatar, ...req.body })
                .eq('id', id);

            if (updateError) throw updateError;

            res.json({
                message: 'Avatar updated successfully',
                avatarUrl: newAvatar
            });
        } catch (err) {
            console.error(`Failed to update avatar for user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
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

            const { data: deletedUser, error: deleteError } = await supabase
                .from('users')
                .delete()
                .eq('id', id)
                .select()
                .maybeSingle();

            if (deleteError) throw deleteError;
            if (!deletedUser) return res.status(404).json({ message: "Пользователь не найден" });

            await Promise.all([
                supabase.from('products').delete().eq('userId', id),
                supabase.from('cart').delete().eq('userId', id),
                supabase.from('favorites').delete().eq('userId', id),
                supabase.from('orders').delete().eq('userId', id),
                supabase.from('checkoutAddresses').delete().eq('userId', id),
                supabase.from('checkoutPayments').delete().eq('userId', id),
            ]);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', { path: '/' });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = deletedUser;
            res.json({ message: "Пользователь и его данные удалены", user: userWithoutPassword });
        } catch (err) {
            console.error(`Failed to delete user ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};