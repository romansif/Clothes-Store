import { dbService } from "../../config/db.service.js";

export const updateProductsController = {
    async updateProductItem (req, res) {
        try{
            const db = dbService.readDB()

            const index = db.products.findIndex(p => p.id === req.params.id);
            if (index !== -1) db.products[index] = { ...db.products[index], ...req.body };

            dbService.writeDB(db);
            return res.json(db.products[index] || []);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async updateCartItem (req, res) {
        try{
            const db = dbService.readDB()

            const index = db.cart.findIndex(c => c.id === req.params.id || c.productId === req.params.id)
            if (index !== -1) db.cart[index] = { ...db.cart[index], ...req.body };

            dbService.writeDB(db);
            res.json(db.cart[index] || []);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
}
