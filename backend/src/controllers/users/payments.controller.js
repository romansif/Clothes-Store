import { v4 as uuidv4 } from "uuid";
import { dbService } from "#config/db.service.js";

export const paymentsController = {
    async getPayments (req, res) {
        try{
            const db = dbService.readDB()
            const payments = db.payments.filter(item => item.userId === req.params.userId);
            if (!payments) return res.status(404).json({ message: "Payments not found" });

            res.json(payments || []);
        }catch(err){
            console.log(`Failed to get the user payments: ${payments}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async getPayment (req, res) {
        try{
            const db = dbService.readDB()
            const payment = db.payments.find(p => p.id === req.params.id);
            if (!payment) return res.status(404).json({ message: "Payment not found" });

            res.json(payment || {});
        }catch(err){
            console.log(`Failed to get the user payment: ${payment}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async addPayment (req, res) {
        try{
            const db = dbService.readDB()
            const newPayment = {id:uuidv4(), userId: req.user.id, ...req.body};

            db.payments.push(newPayment)
            dbService.writeDB(db);
            res.status(201).json(newPayment);
        }catch(err){
            console.log(`Failed to add the user payment: ${newPayment}`, err)
            res.status(500).json({error: err.message})
        }
    },

    async updatePayment (req, res) {
        try{
            const db = dbService.readDB();

            const index = db.payments.findIndex(item => item.id === req.params.id);
            if (index === -1) {
                return res.status(404).json({ message: 'Payment record not found' })
            }

            const currentPayment = db.payments[index];
            if (req.body.cardNumber) {
                const isCardDuplicate = db.payments.some(item =>
                    item.userId === currentPayment.userId &&
                    item.cardNumber === currentPayment.cardNumber&&
                    item.id !== currentPayment.id
                )
                if(isCardDuplicate){
                    return res.status(400).json({ message: `This card number is already exist for this accounts.`,
                        errors: { email: `Limit reached. You can only have one of a kind account per card number.` }
                    });
                }
            }
            db.payments[index] = {...db.payments[index], ...req.body, id: db.payments[index].id};

            dbService.writeDB(db);
            res.status(200).json(db.payments[index]);
        }catch(err){
            console.log(`Failed to update the user payment: ${index}`, err)
            res.status(500).json({ error: err.message });
        }
    },

    async deletePayment (req, res) {
        try{
            const db = dbService.readDB();

            const paymentIndex = db.payments.findIndex(p => p.id === req.params.id);
            if (paymentIndex === -1) return res.status(404).json({ message: "Адресс не найден" });
            const [deleteCheckout] = db.payments.splice(paymentIndex, 1);

            dbService.writeDB(db);
            res.json(deleteCheckout);
        }catch(err){
            console.log(`Failed to delete the user payment: ${paymentIndex}`, err)
            res.status(500).json({error: err.message})
        }
    }
}
