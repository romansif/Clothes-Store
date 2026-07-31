import {dbService} from "../../config/db.service.js";
import { v4 as uuidv4 } from "uuid";

export const addUsersController = {
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
    async addCheckoutPayments (req, res) {
        try{
            const db = dbService.readDB()
            const newPayment = {id:uuidv4(), userId: req.user.id, ...req.body};

            db.checkoutPayments.push(newPayment)
            dbService.writeDB(db);
            res.status(201).json(newPayment)
        }catch(err){
            console.log(`Failed to add the user payment: ${newPayment}`, err)
            res.status(500).json({error: err.message})
        }
    },
}