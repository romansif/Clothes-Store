import { dbService } from "../../config/db.service.js";

export const getUsersController = {
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
        try{
            const db = dbService.readDB()
            const user = db.users.find(u => u.id === req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            const { password: _, refreshTokens: __, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        }catch(err){
            res.status(500).json({error: err.message});
        }
    },
    async getAllCheckout (req, res) {
        try{
            const db = dbService.readDB()
            res.json(db.checkoutAddresses, db.checkoutPayments);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async getCheckoutAddresses (req, res) {
        try{
            const db = dbService.readDB()
            const addresses = db.checkoutAddresses.filter(item => item.userId === req.params.userId);
            if (!addresses) return res.status(404).json({ message: "Addresses not found" });

            res.json(addresses || []);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async getCheckoutAddress (req, res) {
        try{
            const db = dbService.readDB()
            const address = db.checkoutAddresses.find(a => a.id === req.params.id);
            if (!address) return res.status(404).json({ message: "Address not found" });

            res.json(address || {});
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async getCheckoutPayments (req, res) {
        try{
            const db = dbService.readDB()
            const payments = db.checkoutPayments.filter(item => item.userId === req.params.userId);
            if (!payments) return res.status(404).json({ message: "Payments not found" });

            res.json(payments || []);
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
    async getCheckoutPayment (req, res) {
        try{
            const db = dbService.readDB()
            const payment = db.checkoutPayments.find(p => p.id === req.params.id);
            if (!payment) return res.status(404).json({ message: "Payment not found" });

            res.json(payment || {});
        }catch(err){
            res.status(500).json({error: err.message})
        }
    },
}