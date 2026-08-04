import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const cartController = {
    async getCart (req, res){
        try{
            const db = dbService.readDB()
            const cart = db.cart.filter(item => item.userId === req.params.userId);

            res.json(cart || {});
        }catch (err){
            console.log(`Failed to get the cart list: ${cart}`, err);
            res.status(500).json({error: err.message})
        }
    },

    async addToCart (req, res) {
        try{
            const db = dbService.readDB()

            const product = db.products.find(p => p.id === req.body.productId)
            if(!product) return res.status(400).json({message: 'Product not found'})
            const newCartItem = {id:uuidv4(), userId: req.user.id, ...req.body}

            db.cart.push(newCartItem)
            dbService.writeDB(db);
            res.status(201).json({message: 'Product added to cart'})
        }catch(err){
            console.log(`Failed to add the product to the cart: ${newCartItem}`, err)
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
            console.log(`Failed to update the cart item: ${index}`, err)
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
            console.log(`Failed to delete the product at cart: ${index}`, err)
            res.status(500).json({error: err.message})
        }
    }
}