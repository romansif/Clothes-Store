import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const shippingController = {
    async addShipping (req, res) {
        try{
            const db = dbService.readDB()
            const newShipping = {id:uuidv4(), userId: req.user.id, ...req.body};

            db.shipping.push(newShipping)
            dbService.writeDB(db);
            res.status(201).json(newShipping);
        }catch(err){
            console.log(`Failed to add the user payment: ${newShipping}`, err)
            res.status(500).json({error: err.message})
        }
    },
}