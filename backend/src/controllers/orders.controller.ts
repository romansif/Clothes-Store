import { supabase } from '#db/supabase.ts';
import { unwrap, updateOwned, deleteOwned } from '#db/query.ts';
import {
    HttpError, handle, param, requireUser, requireSelf, pickKeys, isPlainObject,
} from '#db/security';

const FINISHED_STATUSES = ['Delivered', 'Cancelled'];

const CREATE_FIELDS = ['orderItems', 'orderTotal', 'delivery', 'status'] as const;

const UPDATE_FIELDS = [
    ...CREATE_FIELDS,
    'cause_replace', 'cancelled_at', 'date_cancelled_at', 'time_cancelled_at',
] as const;

export const ordersController = {
    getOrders: handle('Failed to get the current orders', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const orders = unwrap(
            await supabase.from('orders').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: false }),
        );

        res.json(orders);
    }),

    getFilteredOrders: handle('Failed to get the filtered orders', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const orders = unwrap(
            await supabase.from('orders').select('*')
                .eq('userId', user.id)
                .not('status', 'in', `(${FINISHED_STATUSES.join(',')})`)
                .order('created_at', { ascending: false }),
        );

        res.json(orders);
    }),

    addOrder: handle('Failed to create the order', async (req, res) => {
        const user = requireUser(req);

        if (!isPlainObject(req.body)) {
            throw new HttpError(400, 'Order data is required');
        }

        const date = new Date();
        const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

        const newOrder = unwrap(
            await supabase.from('orders').insert({
                ...pickKeys(req.body, CREATE_FIELDS),
                userId: user.id,
                created_at: date.toISOString(),
                date_created_at: date.toLocaleDateString(),
                time_created_at: time,
            }).select().single(),
        );

        res.status(201).json({ message: 'Product added to orderItems', data: newOrder });
    }),

    updateOrder: handle('Failed to update the order item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const updated = await updateOwned('orders', id, user.id, pickKeys(req.body, UPDATE_FIELDS));

        if (!updated) throw new HttpError(404, 'Order not found');

        res.json(updated);
    }),

    deleteOrderItems: handle('Failed to delete the order', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('orders', id, user.id);

        if (!deleted) throw new HttpError(404, 'Order Product not found');

        res.json(deleted);
    }),
};

export default ordersController;