import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    omitKeys, isPlainObject, byNewest, SERVER_OWNED_FIELDS,
} from '#lib/security';

const FINISHED_STATUSES = ['Delivered', 'Cancelled'];

export const ordersController = {
    getOrders: handle('Failed to get the current orders', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const orders: Row[] = dbService.readDB().orders || [];

        res.json(orders.filter(o => sameId(o.userId, user.id)).sort(byNewest));
    }),

    getFilteredOrders: handle('Failed to get the filtered orders', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const orders: Row[] = dbService.readDB().orders || [];

        res.json(
            orders
                .filter(o => sameId(o.userId, user.id) && !FINISHED_STATUSES.includes(o.status))
                .sort(byNewest)
        );
    }),

    addOrder: handle('Failed to create the order', async (req, res) => {
        const user = requireUser(req);

        if (!isPlainObject(req.body)) {
            throw new HttpError(400, 'Order data is required');
        }

        const date = new Date();
        const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        const db = dbService.readDB();
        const orders: Row[] = db.orders || [];

        const newOrder = {
            ...omitKeys(req.body, SERVER_OWNED_FIELDS),
            id: uuidv4(),
            userId: user.id,
            created_at: date,
            date_created_at: date.toLocaleDateString(),
            time_created_at: time,
        };

        orders.push(newOrder);
        db.orders = orders;
        dbService.writeDB(db);

        res.status(201).json({ message: 'Product added to orderItems', data: newOrder });
    }),

    updateOrder: handle('Failed to update the order item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const orders: Row[] = db.orders || [];
        const index = orders.findIndex(o => sameId(o.id, id) && sameId(o.userId, user.id));

        if (index === -1) throw new HttpError(404, 'Order not found');

        orders[index] = {
            ...orders[index],
            ...omitKeys(req.body, SERVER_OWNED_FIELDS),
        };

        db.orders = orders;
        dbService.writeDB(db);

        res.json(orders[index]);
    }),

    deleteOrderItems: handle('Failed to delete the order', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const orders: Row[] = db.orders || [];
        const deletedOrder = orders.find(o => sameId(o.id, id) && sameId(o.userId, user.id));

        if (!deletedOrder) throw new HttpError(404, 'Order Product not found');

        db.orders = orders.filter(o => o !== deletedOrder);
        dbService.writeDB(db);

        res.json(deletedOrder);
    }),
};

export default ordersController;
