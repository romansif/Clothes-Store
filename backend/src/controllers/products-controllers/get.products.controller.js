import { dbService } from "../../config/db.service.js";

export const productsGetController = {
    async getAllProducts (req, res) {
        try{
            const db = dbService.readDB();
            res.json(db.products);
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async getProductsById (req, res) {
        try{
            const db = dbService.readDB();
            const product = db.products.find(p => p.id === req.params.id)
            res.json(product || {});
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async getCart (req, res){
        try{
            const db = dbService.readDB()
            const cart = db.cart.filter(item => item.userId === req.params.userId);
            res.json(cart || {});
        }catch (err){
            console.error(`Не удалось получить данные по корзине: ${cart}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getFavorites (req, res) {
        try{
            const db = dbService.readDB()
            const favorite = db.favorites.filter(item => item.userId === req.params.userId);
            res.json(favorite || {});
        }catch (err){
            console.error(`Не удалось получить данные по избранному: ${favorite}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId);
            res.json(orders || {});
        }catch (err){
            console.error(`Не удалось получить данные по сем заказам: ${orders}`, err);
            res.status(500).json({error: err.message})
        }
    },
    async getFilteredOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId && item.status !== 'Delivered');
            res.json(orders || {});
        }catch (err){
            console.error(`Не удалось получить данные по сем заказам: ${orders}`, err);
            res.status(500).json({error: err.message})
        }
    }
}
