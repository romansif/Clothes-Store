import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const addressesController = {
    async getCheckoutAddresses (req, res) {
        try{
            const db = dbService.readDB()
            const addresses = db.checkoutAddresses.filter(item => item.userId === req.params.userId);
            if (!addresses) return res.status(404).json({ message: "Addresses not found" });

            res.json(addresses || []);
        }catch(err){
            console.log(`Failed to get the user addresses: ${addresses}`, err)
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
            console.log(`Failed to delete the user address: ${address}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async addCheckoutAddress (req, res) {
        try{
            const db = dbService.readDB()
            const address = db.checkoutAddresses.filter(a => a.address === req.body.address)
            if (address.length >= 1) {
                return res.status(400).json({ message: `This address is already exist for this accounts.`,
                    errors: { email: `Limit reached. You can only have one of a kind account per address.` }
                });
            }
            const newAddress = {id:uuidv4(), userId: req.user.id, ...req.body, postalCode: Number(req.body.postalCode)};

            db.checkoutAddresses.push(newAddress)
            dbService.writeDB(db);
            res.status(201).json(newAddress)
        }catch(err){
            console.log(`Failed to create the user address: ${newAddress}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateCheckoutAddress (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.checkoutAddresses.findIndex(item => item.id === req.params.id);
            if (index === -1) {
                return res.status(404).json({ message: 'Payment record not found' })
            }
            db.checkoutAddresses[index] = {...db.checkoutAddresses[index], ...req.body, id: db.checkoutAddresses[index].id};

            dbService.writeDB(db);
            res.status(200).json(db.checkoutAddresses[index]);
        }catch(err){
            console.log(`Failed to update the user payment: ${index}`, err)
            res.status(500).json({ error: err.message });
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
            console.log(`Failed to delete the user address: ${addressIndex}`, err)
            res.status(500).json({error: err.message})
        }
    }
}