import fs from "fs";
import { dbService } from "../../config/db.service.js";
import bcrypt from "bcryptjs";

export const updateUsersController = {
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
    async updateCheckoutPayment (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.checkoutPayments.findIndex(item => item.id === req.params.id);
            if (index === -1) {
                return res.status(404).json({ message: 'Payment record not found' })
            }

            const currentPayment = db.checkoutPayments[index];
            if (req.body.cardNumber) {
                const isCardDuplicate = db.checkoutPayments.some(item =>
                    item.userId === currentPayment.userId &&
                    item.cardNumber === currentPayment.cardNumber&&
                    item.id !== currentPayment.id
                )
                if(isCardDuplicate){
                    return res.status(400).json({ message: `This card number is already exist for this accounts.`,
                        errors: { email: `Limit reached. You can only have one of a kind account per card number.` }
                    });
                }
            }
            db.checkoutPayments[index] = {...db.checkoutPayments[index], ...req.body, id: db.checkoutPayments[index].id};

            dbService.writeDB(db);
            res.status(200).json(db.checkoutPayments[index]);
        }catch(err){
            res.status(500).json({ error: err.message });
        }
    },
}
