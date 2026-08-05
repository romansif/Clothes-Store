import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const addressesController = {
    async getAddresses (req, res) {
        try{
            const db = dbService.readDB()
            const addresses = db.addresses.filter(item => item.userId === req.params.userId);
            if (!addresses) return res.status(404).json({ message: "Addresses not found" });

            return res.json(addresses || []);
        }catch(err){
            console.log(`Failed to get the user addresses: ${addresses}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getAddress (req, res) {
        try{
            const db = dbService.readDB()
            const address = db.addresses.find(a => a.id === req.params.id);
            if (!address) return res.status(404).json({ message: "Address not found" });

            return res.json(address || {});
        }catch(err){
            console.log(`Failed to delete the user address: ${address}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async addAddress (req, res) {
        try{
            const db = dbService.readDB()
            const address = db.addresses.filter(a => a.address === req.body.address)
            if (address.length >= 1) {
                return res.status(400).json({ message: `This address is already exist for this accounts.`,
                    errors: { email: `Limit reached. You can only have one of a kind account per address.` }
                });
            }
            const newAddress = {id:uuidv4(), userId: req.user.id, ...req.body, postalCode: Number(req.body.postalCode)};

            db.addresses.push(newAddress)
            dbService.writeDB(db);
            res.status(201).json(newAddress)
        }catch(err){
            console.log(`Failed to create the user address: ${newAddress}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updateAddress (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.addresses.findIndex(item => item.id === req.params.id);
            if (index === -1) {
                return res.status(404).json({ message: 'Payment record not found' })
            }
            db.addresses[index] = {...db.addresses[index], ...req.body, id: db.addresses[index].id};

            dbService.writeDB(db);
            res.status(200).json(db.addresses[index]);
        }catch(err){
            console.log(`Failed to update the user payment: ${index}`, err)
            res.status(500).json({ error: err.message });
        }
    },

    async deleteAddress (req, res) {
        try{
            const db = dbService.readDB();

            const addressIndex = db.addresses.findIndex(c => c.id === req.params.id);
            if (addressIndex === -1) return res.status(404).json({ message: "Адресс не найден" });
            const [deleteCheckout] = db.addresses.splice(addressIndex, 1);

            dbService.writeDB(db);
            res.json(deleteCheckout);
        }catch(err){
            console.log(`Failed to delete the user address: ${addressIndex}`, err)
            res.status(500).json({error: err.message})
        }
    }
}