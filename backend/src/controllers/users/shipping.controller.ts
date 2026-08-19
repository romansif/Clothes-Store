import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts'; // Подставь свой путь к файлу конфигурации

export const shippingController = {
    async getShipping (req: Request, res: Response) {
        try {
            const { paymentId } = req.params;

            const db = dbService.readDB();
            const shippingList: any[] = db.shipping || [];

            // Фильтруем по paymentId, если он передан, иначе возвращаем весь список
            const filteredShipping = paymentId
                ? shippingList.filter(s => String(s.paymentId) === String(paymentId))
                : shippingList;

            return res.json(filteredShipping);
        } catch (err) {
            console.error(`Failed to get user shipping for payment ${req.params.paymentId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async addShipping(req: AuthenticatedRequest, res: Response) {
        try {
            const db = dbService.readDB();
            const shippingList: any[] = db.shipping || [];

            const newShipping = {
                id: String(Date.now()), // Генерируем уникальный ID для локальной записи
                userId: req.user?.id || req.user?.userId,
                ...req.body
            };

            shippingList.push(newShipping);
            db.shipping = shippingList;
            dbService.writeDB(db);

            res.status(201).json(newShipping);
        } catch (err) {
            console.error('Failed to add shipping entry:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};