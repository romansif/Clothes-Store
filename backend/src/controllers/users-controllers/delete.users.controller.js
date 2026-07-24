import { dbService } from "../../config/db.service.js";

export const deleteUsersController = {
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
            res.status(500).json({error: err.message})
        }
    },
    async deleteCheckoutAddress (req, res) {
        try{
            const db = dbService.readDB();

            const addressIndex = db.checkoutAddresses.findIndex(c => c.id === req.params.id);
            if (addressIndex === -1) return res.status(404).json({ message: "Адресс не найден" });
            const [deleteCheckout] = db.checkoutAddresses.splice(addressIndex, 1);

            dbService.writeDB(db);
            res.json(deleteCheckout);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async deleteCheckoutPayment (req, res) {
        try{
            const db = dbService.readDB();

            const paymentIndex = db.checkoutPayments.findIndex(p => p.id === req.params.id);
            if (paymentIndex === -1) return res.status(404).json({ message: "Адресс не найден" });
            const [deleteCheckout] = db.checkoutPayments.splice(paymentIndex, 1);

            dbService.writeDB(db);
            res.json(deleteCheckout);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
}