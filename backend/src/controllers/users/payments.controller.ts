import { v4 as uuidv4 } from 'uuid'
import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts';

export const paymentsController = {
    async getPayments(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const db = dbService.readDB();
            const payments: any[] = db.payments || [];

            const userPayments = payments.filter(p => String(p.userId) === String(userId));

            res.json(userPayments);
        } catch (err) {
            console.error(`Failed to get user payments for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getPayment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const payments: any[] = db.payments || [];
            const payment = payments.find(p => String(p.id) === String(id));

            if (!payment) return res.status(404).json({ message: "Payment not found" });

            res.json(payment);
        } catch (err) {
            console.error(`Failed to get payment ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async addPayment(req: AuthenticatedRequest, res: Response) {
        try {
            const db = dbService.readDB();
            const payments: any[] = db.payments || [];

            const newPayment = {
                id: uuidv4(),
                userId: req.user?.id || req.user?.userId,
                ...req.body
            };

            payments.push(newPayment);
            db.payments = payments;
            dbService.writeDB(db);

            res.status(201).json(newPayment);
        } catch (err) {
            console.error('Failed to add payment:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updatePayment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const payments: any[] = db.payments || [];
            const index = payments.findIndex(p => String(p.id) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: 'Payment record not found' });
            }

            const currentPayment = payments[index];

            if (req.body.cardNumber) {
                const duplicateCard = payments.find(p =>
                    String(p.userId) === String(currentPayment.userId) &&
                    p.cardNumber === req.body.cardNumber &&
                    String(p.id) !== String(id)
                );

                if (duplicateCard) {
                    return res.status(400).json({
                        message: `This card number is already exist for this accounts.`,
                        errors: { email: `Limit reached. You can only have one of a kind account per card number.` }
                    });
                }
            }

            payments[index] = {
                ...currentPayment,
                ...req.body
            };

            db.payments = payments;
            dbService.writeDB(db);

            res.status(200).json(payments[index]);
        } catch (err) {
            console.error(`Failed to update payment ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deletePayment(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const payments: any[] = db.payments || [];
            const index = payments.findIndex(p => String(p.id) === String(id));

            if (index === -1) return res.status(404).json({ message: "Способ оплаты не найден" });

            const deletedPayment = payments[index];

            db.payments = payments.filter(p => String(p.id) !== String(id));
            dbService.writeDB(db);

            res.json(deletedPayment);
        } catch (err) {
            console.error(`Failed to delete payment ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default paymentsController;