import fs from "fs";
import {v4 as uuidv4} from "uuid";
import { dbService } from "../config/db.service.js";
import bcrypt from "bcryptjs";

export const usersController = {
    async getUsers (req, res) {
        try{
            const db = dbService.readDB()
            const cleanUsers = db.users.map(({ password, refreshTokens, ...u }) => u);
            res.json(cleanUsers);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    },
    async getUserById (req, res) {
        const db = dbService.readDB()
        const user = db.users.find(u => u.id === req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { password: _, refreshTokens: __, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    },
    async getAllCheckout (req, res) {
        try{
            const db = dbService.readDB()
            res.json(db.checkout);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async getCheckout (req, res) {
        try{
            const db = dbService.readDB()
            const checkout = db.checkout.filter(item => item.userId === req.params.userId);
            if (!checkout) return res.status(404).json({ message: "Checkout not found" });

            res.json(checkout || {});
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async addCheckout (req, res) {
        try{
            const db = dbService.readDB()
            const address = db.checkout.filter(u => u.address === req.body.address)
            if (address.length >= 1) {
                return res.status(400).json({ message: `This address is already exist for this accounts.`,
                    errors: { email: `Limit reached. You can only have one of a kind account per address.` }
                });
            }
            const newCheckout = {id:uuidv4(), userId: req.user.id, ...req.body, postalCode: Number(req.body.postalCode)};

            db.checkout.push(newCheckout)
            dbService.writeDB(db);
            res.status(201).json(newCheckout)
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async updateCheckout (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.checkout.findIndex(item => item.id === req.params.id);
            if (index === -1) return res.status(404).json({ error: 'Адрес не найден или у вас нет прав на его изменение' });

            db.checkout[index] = {...db.checkout[index], ...req.body, id: db.checkout[index].id};
            dbService.writeDB(db);
            res.status(200).json(db.checkout[index]);
        }catch(err){
            res.status(500).json({ error: err.message });
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

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            dbService.writeDB(db);
            return res.status(200).json({ message: 'Пароль успешно изменен' });
        }catch(err){
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
            dbService.writeDB(db);

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken', { path: '/api/refresh' });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = deletedUser;
            res.json({ message: "Пользователь и его данные удалены", user: userWithoutPassword });
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
}
