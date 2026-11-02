import { supabase } from '#db/supabase.ts';
import { unwrap, deleteOwned, isUuid, updateOwned } from '#db/query.ts';
import {
    HttpError, handle, param, requireUser, requireSelf, pickKeys, isPlainObject,
} from '#db/security';

const FINISHED_STATUSES = ['Delivered', 'Cancelled'];

const ORDER_INPUT = ['contactId', 'addressId', 'paymentId', 'delivery', 'idempotencyKey'] as const;
const CHECKOUT_ERRORS: Record<string, number> = { CK001: 400, CK002: 409, CK003: 409 };

const UPDATE_FIELDS = [
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

        const { contactId, addressId, paymentId, delivery, idempotencyKey } =
            pickKeys(req.body, ORDER_INPUT);

        if (
            ![contactId, addressId, paymentId].every((v) => isUuid(v)) ||
            typeof delivery !== 'string' ||
            typeof idempotencyKey !== 'string' || idempotencyKey.length > 100
        ) {
            throw new HttpError(400, 'Invalid checkout data');
        }

        const date = new Date();
        const { data, error } = await supabase.rpc('create_order', {
            p_user_id: user.id,
            p_contact_id: contactId,
            p_address_id: addressId,
            p_payment_id: paymentId,
            p_delivery: delivery,
            p_key: idempotencyKey,
            p_date: date.toLocaleDateString(),
            p_time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        });

        if (error) {
            const status = CHECKOUT_ERRORS[error.code];
            if (status) throw new HttpError(status, error.message);
            throw error;
        }

        res.status(201).json({ message: 'Order created', data });
    }),

    updateOrder: handle('Failed to update the order', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');
        const body = isPlainObject(req.body) ? req.body : {};

        const changes: Record<string, unknown> = pickKeys(body, UPDATE_FIELDS);
        if (body.status === 'Cancelled') changes.status = 'Cancelled'; // единственный статус от клиента

        const updated = await updateOwned('orders', id, user.id, changes);
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