import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid } from '#db/query.ts';
import {
    HttpError, handle, param, requireUser, requireSelf, pickKeys, isPlainObject, cleanText,
} from '#db/security';

const FINISHED_STATUSES = ['Delivered', 'Cancelled'];
const FINISHED_FILTER = `(${FINISHED_STATUSES.join(',')})`;

const ORDER_INPUT = ['contactId', 'addressId', 'paymentId', 'delivery', 'idempotencyKey'] as const;
const CHECKOUT_ERRORS: Record<string, number> = { CK001: 400, CK002: 409, CK003: 409 };

const MAX_CAUSE_LENGTH = 500;
const TIME_ZONE = 'Asia/Tashkent';

const formatOrderDate = (date: Date): string => date.toLocaleDateString('en-US', { timeZone: TIME_ZONE });

const formatOrderTime = (date: Date): string =>
    date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: TIME_ZONE });

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
                .not('status', 'in', FINISHED_FILTER)
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

        const now = new Date();
        const { data, error } = await supabase.rpc('create_order', {
            p_user_id: user.id,
            p_contact_id: contactId,
            p_address_id: addressId,
            p_payment_id: paymentId,
            p_delivery: delivery,
            p_key: idempotencyKey,
            p_date: formatOrderDate(now),
            p_time: formatOrderTime(now),
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

        if (body.status !== 'Cancelled') {
            throw new HttpError(400, 'Only cancelling an order is supported');
        }
        if (!isUuid(id)) throw new HttpError(404, 'Order not found');

        const changes: Record<string, unknown> = { status: 'Cancelled' };

        if (body.cause_replace !== undefined && body.cause_replace !== null) {
            const cause = cleanText(body.cause_replace, MAX_CAUSE_LENGTH);
            if (cause === null) {
                throw new HttpError(400, 'Invalid cancellation reason', { cause_replace: 'Invalid cancellation reason' });
            }
            changes.cause_replace = cause;
        }

        const now = new Date();
        changes.cancelled_at = now.toISOString();
        changes.date_cancelled_at = formatOrderDate(now);
        changes.time_cancelled_at = formatOrderTime(now);

        const updated = unwrap(
            await supabase.from('orders').update(changes)
                .eq('id', id).eq('userId', user.id)
                .not('status', 'in', FINISHED_FILTER)
                .select().maybeSingle(),
        );

        if (!updated) {
            const exists = unwrap(
                await supabase.from('orders').select('id').eq('id', id).eq('userId', user.id).maybeSingle(),
            );
            if (!exists) throw new HttpError(404, 'Order not found');
            throw new HttpError(409, 'This order is already finished and cannot be cancelled');
        }

        res.json(updated);
    }),

    deleteOrderItems: handle('Failed to delete the order', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        if (!isUuid(id)) throw new HttpError(404, 'Order not found');

        const deleted = unwrap(
            await supabase.from('orders').delete()
                .eq('id', id).eq('userId', user.id)
                .in('status', FINISHED_STATUSES)
                .select().maybeSingle(),
        );

        if (!deleted) {
            const exists = unwrap(
                await supabase.from('orders').select('id').eq('id', id).eq('userId', user.id).maybeSingle(),
            );
            if (!exists) throw new HttpError(404, 'Order not found');
            throw new HttpError(409, 'Only delivered or cancelled orders can be deleted');
        }

        res.json(deleted);
    }),
};

export default ordersController;
