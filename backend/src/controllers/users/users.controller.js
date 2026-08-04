import fs from "fs";
import bcrypt from "bcryptjs";
import { dbService } from "#config/db.service.js";

export const usersController = {
    async getUsers (req, res) {
        try{
            const db = dbService.readDB()
            const cleanUsers = db.users.map(({ password, refreshTokens, ...u }) => u);
            res.json(cleanUsers);
        }catch(err){
            console.log(`Failed to get the users: ${cleanUsers}`, err)
            res.status(500).json({error: err.message});
        }
    },

    async getUserById (req, res) {
        try{
            const db = dbService.readDB()
            const user = db.users.find(u => u.id === req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        }catch(err){
            console.log(`Failed to get the user: ${user}`, err)
            res.status(500).json({error: err.message});
        }
    },

    async getAllCheckout (req, res) {
        try{
            const db = dbService.readDB()
            res.json(db.checkoutAddresses, db.checkoutPayments);
        }catch(err){
            console.log(`Failed to get the user checkouts: ${db.checkoutPayments}-${db.checkoutAddresses}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateUser (req, res) {
        try{
            const db = dbService.readDB()
            const index = db.users.findIndex(u => u.id === req.params.id);
            if (index !== -1) db.users[index] = { ...db.users[index], ...req.body };
            dbService.writeDB(db);
            res.json(db.users[index] || {});
        }catch(err){
            console.log(`Failed to update the user: ${index}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateUserPassword  (req, res) {
        try{
            const db = dbService.readDB()

            const { oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Заполните все поля' });
            }

            const user = db.users.find(u => u.id === req.params.id);
            if(!user){
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if(!isPasswordValid){
                return res.status(400).json({ message: 'Неверный текущий пароль' });
            }

            user.password = await bcrypt.hash(newPassword, 10);

            dbService.writeDB(db);
            return res.status(200).json({ message: 'Пароль успешно изменен' });
        }catch(err){
            console.log(`Failed to update the user paswword: ${user}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateUserAvatar (req, res) {
        try{
            const db = dbService.readDB()
            const index = db.users.findIndex(u => u.id === req.params.id);
            if (index !== -1) db.users[index] = { ...db.users[index], ...req.body };
            const user = db.users[index];
            const oldAvatar = user.avatarUrl
            if (oldAvatar && oldAvatar !== 'uploads/avatars/default-avatar.png') {
                if (fs.existsSync(oldAvatar)) {
                    fs.unlinkSync(oldAvatar);
                }
            }
            const fileName = req.file.filename
            const newAvatar = `uploads/avatars/${fileName}`
            db.users[index].avatarUrl = newAvatar
            dbService.writeDB(db);
            res.json({
                message: 'Avatar updated successfully',
                avatarUrl: newAvatar
            });
        }catch(err){
            console.log(`Failed to update the user avatar: ${index}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async deleteUser (req, res) {
        try{
            const db = dbService.readDB();
            if (req.user.userId !== req.params.id) {
                return res.status(403).json({ message: "Нет прав на удаление чужого аккаунта" });
            }
            const userIndex = db.users.findIndex(u => u.id === req.params.id);
            if (userIndex === -1) return res.status(404).json({ message: "Пользователь не найден" });
            const [deletedUser] = db.users.splice(userIndex, 1);

            db.products = db.products.filter(p => p.userId !== req.params.id);
            db.cart = db.cart.filter(p => p.userId !== req.params.id);
            db.favorites = db.products.filter(p => p.userId !== req.params.id);
            db.orders = db.cart.filter(p => p.userId !== req.params.id);
            db.checkoutAddresses = db.cart.filter(p => p.userId !== req.params.id);
            db.checkoutPayments = db.cart.filter(p => p.userId !== req.params.id);

            dbService.writeDB(db);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', { path: '/api/refresh' });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = deletedUser;
            res.json({ message: "Пользователь и его данные удалены", user: userWithoutPassword });
        }catch(err){
            console.log(`Failed to delete the user: ${userIndex}`, err)
            res.status(500).json({error: err.message})
        }
    },
}