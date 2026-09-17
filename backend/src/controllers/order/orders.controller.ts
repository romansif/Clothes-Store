import { v4 as uuidv4 } from 'uuid';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts';

export const ordersController = {
    async getOrders(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const db = dbService.readDB();
            const orders: any[] = db.orders || [];

            const userOrders = orders.filter(o => String(o.userId) === String(userId));
            userOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(userOrders);
        } catch (err) {
            console.error('Failed to get the current orders:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getFilteredOrders(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const db = dbService.readDB();
            const orders: any[] = db.orders || [];

            const filteredOrders = orders.filter(o =>
                String(o.userId) === String(userId) &&
                o.status !== 'Delivered' &&
                o.status !== 'Cancelled'
            );

            filteredOrders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(filteredOrders);
        } catch (err) {
            console.error('Failed to get the filterProduct orders:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async addOrder(req: AuthenticatedRequest, res: Response) {
        try {
            const date = new Date();
            const dateCreated = date.toLocaleDateString();
            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const db = dbService.readDB();
            const orders: any[] = db.orders || [];

            const newOrder = {
                id: uuidv4(),
                userId: req.user?.id || req.user?.userId,
                ...req.body,
                created_at: date,
                date_created_at: dateCreated,
                time_created_at: time,
            };

            orders.push(newOrder);
            db.orders = orders;
            dbService.writeDB(db);

            res.status(201).json({ message: 'Product added to orderItems', data: newOrder });
        } catch (err) {
            console.error('Failed to create the order:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const orders: any[] = db.orders || [];
            const index = orders.findIndex(o => String(o.id) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: 'Order not found' });
            }

            orders[index] = {
                ...orders[index],
                ...req.body
            };

            db.orders = orders;
            dbService.writeDB(db);

            res.json(orders[index]);
        } catch (err) {
            console.error(`Failed to update the order item ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deleteOrderItems(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const orders: any[] = db.orders || [];
            const index = orders.findIndex(o => String(o.id) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: 'Order Product not found' });
            }

            const deletedOrder = orders[index];

            db.orders = orders.filter(o => String(o.id) !== String(id));
            dbService.writeDB(db);

            res.json(deletedOrder);
        } catch (err) {
            console.error(`Failed to delete the order ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default ordersController;