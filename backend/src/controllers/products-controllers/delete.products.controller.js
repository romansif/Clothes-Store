import { dbService } from "../../config/db.service.js";

export const deleteProductsController = {
    async deleteProduct (req, res) {
        try{
            const db = dbService.readDB();

            const productIndex = db.products.findIndex(p => p.id === req.params.id);
            if (productIndex === -1) return res.status(404).json({ message: "Product not found" });
            const [deletedProduct] = db.products.splice(productIndex, 1);

            dbService.writeDB(db);
            res.json(deletedProduct);
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async deleteCartItem (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.cart.findIndex(c => c.id === req.params.id);
            if (index === -1) return res.status(404).json({ message: "Cart Product not found" });
            const [deletedProduct] = db.cart.splice(index, 1);

            dbService.writeDB(db);
            res.json(deletedProduct);
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async deleteFavorite (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.favorites.findIndex(f => f.productId === req.params.id);
            if (index === -1) return res.status(404).json({ message: "Favorite Product not found" });
            const [deletedProduct] = db.favorites.splice(index, 1);

            dbService.writeDB(db);
            res.json(deletedProduct);
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
    async deleteOrderItems (req, res) {
        try{
            const db = dbService.readDB();

            const orderIndex = db.order.findIndex(p => p.id === req.params.id);
            if (orderIndex === -1) return res.status(404).json({ message: "Order Product not found" });
            const [deletedProduct] = db.products.splice(orderIndex, 1);

            dbService.writeDB(db);
            res.json(deletedProduct);
        }catch (err){
            res.status(500).json({error: err.message})
        }
    },
}