import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const ordersController = {
    async getOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId);

            res.json(orders || {});
        }catch (err){
            console.error(`Failed to get the current orders:`, err);
            res.status(500).json({error: err.message})
        }
    },

    async getFilteredOrders (req, res) {
        try{
            const db = dbService.readDB()
            const orders = db.orders.filter(item => item.userId === req.params.userId &&
                item.status !== 'Delivered' && item.status !== 'Cancelled');

            res.json(orders || {});
        }catch (err){
            console.error(`Failed to get the all orders:`, err);
            res.status(500).json({error: err.message})
        }
    },

    async addOrder (req, res) {
        try{
            const db = dbService.readDB()
            const newOrderItems = {id:uuidv4(), userId: req.user.id, ...req.body}

            db.orders.push(newOrderItems)
            dbService.writeDB(db);
            res.status(201).json({message: 'Product added to orderItems'})
        }catch(err){
            console.log(`Failed to create the order: ${newOrderItems}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateOrder (req, res) {
        try{
            const db = dbService.readDB()

            const index = db.orders.findIndex(o => o.id === req.params.id)
            if (index !== -1) db.orders[index] = { ...db.orders[index], ...req.body };

            dbService.writeDB(db);
            res.json(db.orders[index] || []);
        }catch(err){
            console.log(`Failed to update the order item: ${index}`, err)
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
        }catch(err){
            console.log(`Failed to delete the order: ${orderIndex}`, err)
            res.status(500).json({error: err.message})
        }
    }
}
