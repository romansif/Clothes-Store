import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid } from '#db/query.ts';
import {
    HttpError, handle, param, requireUser, requireSelf, pickKeys, isPlainObject, cleanText, type Row,
} from '#db/security';

const FINISHED_STATUSES = ['Delivered', 'Cancelled'];
const FINISHED_FILTER = `(${FINISHED_STATUSES.join(',')})`;

const CANCELLED = 'Cancelled';
// Порядок должен совпадать с order_status_rank в SQL
const STATUS_FLOW = ['Convene', 'Processing', 'Shipped', 'Delivered'];
const ALL_STATUSES: string[] = [...STATUS_FLOW, CANCELLED];

const ORDER_INPUT = ['contactId', 'addressId', 'paymentId', 'delivery', 'idempotencyKey'] as const;
const CHECKOUT_ERRORS: Record<string, number> = { CK001: 400, CK002: 409, CK003: 409 };
// Коды ошибок из SQL-функций (001_order_items_workflow.sql)
const ORDER_ERRORS: Record<string, number> = { OR001: 404, OR002: 409, OR003: 400, OR004: 403 };

// Позиции отдаём под тем же именем orderItems, что и раньше — фронт не ломается
const ORDER_SELECT = '*, orderItems:order_items(*)';

const MAX_CAUSE_LENGTH = 500;
const TIME_ZONE = 'Asia/Tashkent';

const formatOrderDate = (date: Date): string => date.toLocaleDateString('en-US', { timeZone: TIME_ZONE });

const formatOrderTime = (date: Date): string =>
    date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: TIME_ZONE });

type AuthUser = ReturnType<typeof requireUser>;
type Req = Parameters<typeof requireUser>[0];

// Регистр роли не важен: 'admin' и 'Admin' — одно и то же
const isAdmin = (user: AuthUser): boolean =>
    String((user as { role?: string }).role ?? '').toLowerCase() === 'admin';

const assertAdmin = (user: AuthUser): void => {
    if (!isAdmin(user)) throw new HttpError(403, 'Forbidden');
};

const rpc = async (fn: string, args: Record<string, unknown>) => {
    const { error } = await supabase.rpc(fn, args);
    if (error) {
        const status = ORDER_ERRORS[error.code];
        if (status) throw new HttpError(status, error.message);
        throw error;
    }
};

const loadOrder = async (user: AuthUser, id: string): Promise<Row> => {
    if (!isUuid(id)) throw new HttpError(404, 'Order not found');

    const order = unwrap(
        await supabase.from('orders').select(ORDER_SELECT)
            .eq('id', id)
            .order('created_at', { referencedTable: 'order_items', ascending: true })
            .maybeSingle(),
    ) as Row | null;

    // Чужой заказ не раскрываем: для не-админа он выглядит как несуществующий
    if (!order || (!isAdmin(user) && order.userId !== user.id)) {
        throw new HttpError(404, 'Order not found');
    }
    return order;
};

// Ответ продавцу после смены статуса: только его позиции и безопасные поля заказа
// (без данных покупателя — адреса, контактов, оплаты)
const loadSellerView = async (sellerId: string, orderId: string): Promise<Row> => {
    const order = unwrap(
        await supabase.from('orders').select(ORDER_SELECT)
            .eq('id', orderId)
            .order('created_at', { referencedTable: 'order_items', ascending: true })
            .maybeSingle(),
    ) as Row | null;
    if (!order) throw new HttpError(404, 'Order not found');

    const items = (order.orderItems ?? []) as Row[];
    const productIds = [...new Set(items.map((i) => i.productId).filter(isUuid))];

    const owned = productIds.length
        ? (unwrap(
            await supabase.from('products').select('id').in('id', productIds).eq('userId', sellerId),
        ) as Row[])
        : [];
    const ownedIds = new Set(owned.map((p) => p.id));

    const orderItems = items.filter((i) => ownedIds.has(i.productId));
    if (orderItems.length === 0) throw new HttpError(404, 'Order item not found');

    return {
        id: order.id,
        status: order.status,
        delivery: order.delivery,
        created_at: order.created_at,
        date_created_at: order.date_created_at,
        time_created_at: order.time_created_at,
        orderItems,
    };
};

const parseStatusChange = (req: Req) => {
    const body = isPlainObject(req.body) ? req.body : {};
    const status = body.status;

    if (typeof status !== 'string' || !ALL_STATUSES.includes(status)) {
        throw new HttpError(400, 'Invalid status', { status: 'Invalid status' });
    }

    let cause: string | null = null;
    if (body.cause_replace !== undefined && body.cause_replace !== null) {
        cause = cleanText(body.cause_replace, MAX_CAUSE_LENGTH);
        if (cause === null) {
            throw new HttpError(400, 'Invalid cancellation reason', { cause_replace: 'Invalid cancellation reason' });
        }
    }

    return { status, cause };
};

export const ordersController = {
    // Только для админа: раньше этот список был доступен любому авторизованному пользователю
    getAllOrders: handle('Failed to get orders', async (req, res) => {
        assertAdmin(requireUser(req));

        const orders: Row[] = unwrap(
            await supabase.from('orders').select(ORDER_SELECT)
                .order('created_at', { ascending: false })
                .order('created_at', { referencedTable: 'order_items', ascending: true }),
        );

        res.json(orders);
    }),

    getOrders: handle('Failed to get the current orders', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const orders = unwrap(
            await supabase.from('orders').select(ORDER_SELECT)
                .eq('userId', user.id)
                .order('created_at', { ascending: false })
                .order('created_at', { referencedTable: 'order_items', ascending: true }),
        );

        res.json(orders);
    }),

    getFilteredOrders: handle('Failed to get the filtered orders', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const orders = unwrap(
            await supabase.from('orders').select(ORDER_SELECT)
                .eq('userId', user.id)
                .not('status', 'in', FINISHED_FILTER)
                .order('created_at', { ascending: false })
                .order('created_at', { referencedTable: 'order_items', ascending: true }),
        );

        res.json(orders);
    }),

    // Один заказ вместе с позициями
    getOrder: handle('Failed to get the order', async (req, res) => {
        const user = requireUser(req);
        res.json(await loadOrder(user, param(req, 'id')));
    }),

    // Все позиции заказа
    getOrderItems: handle('Failed to get the order items', async (req, res) => {
        const user = requireUser(req);
        const order = await loadOrder(user, param(req, 'orderId'));
        res.json(order.orderItems);
    }),

    // Одна позиция заказа
    getOrderItem: handle('Failed to get the order item', async (req, res) => {
        const user = requireUser(req);
        const itemId = param(req, 'itemId');
        const order = await loadOrder(user, param(req, 'orderId'));

        const item = isUuid(itemId)
            ? (order.orderItems as Row[]).find((i) => i.id === itemId)
            : undefined;
        if (!item) throw new HttpError(404, 'Order item not found');

        res.json(item);
    }),

    // Статистика продаж по всем товарам текущего продавца (страница myProducts)
    getSellerSalesStats: handle('Failed to get the sales stats', async (req, res) => {
        const user = requireUser(req);

        const { data, error } = await supabase.rpc('seller_sales_stats', { p_user_id: user.id });
        if (error) throw error;

        res.json((data ?? []).map((r: Row) => ({
            productId: r.product_id,
            sold: Number(r.sold),
            revenue: Number(r.revenue),
            inOrders: Number(r.in_orders),
        })));
    }),

    // Статистика продаж по товару: владелец товара (продавец) или админ.
    // Отдаём только числа, без данных покупателей.
    // Владелец товара — products.userId
    getProductSalesStats: handle('Failed to get the sales stats', async (req, res) => {
        const user = requireUser(req);
        const productId = param(req, 'productId');

        if (!isUuid(productId)) throw new HttpError(404, 'Product not found');

        const product = unwrap(
            await supabase.from('products').select('id, userId').eq('id', productId).maybeSingle(),
        ) as Row | null;

        if (!product || (!isAdmin(user) && product.userId !== user.id)) {
            throw new HttpError(404, 'Product not found');
        }

        const { data, error } = await supabase.rpc('product_sales_stats', { p_product_id: productId });
        if (error) throw error;

        const row = data?.[0] ?? { sold: 0, revenue: 0, in_orders: 0 };

        res.json({
            sold: Number(row.sold),
            revenue: Number(row.revenue),
            inOrders: Number(row.in_orders),
        });
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

    // PATCH /orders/:id
    //  { status: 'Cancelled', cause_replace? } — владелец или админ отменяет весь заказ
    //  { status: 'Processing' | 'Shipped' | 'Delivered' } — админ двигает статус всего заказа
    updateOrder: handle('Failed to update the order', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');
        if (!isUuid(id)) throw new HttpError(404, 'Order not found');

        const { status, cause } = parseStatusChange(req);

        if (status === CANCELLED) {
            await rpc('cancel_order', {
                p_order_id: id,
                p_user_id: isAdmin(user) ? null : user.id,
                p_reason: cause,
            });
        } else {
            assertAdmin(user);
            await rpc('set_order_status', { p_order_id: id, p_status: status });
        }

        res.json(await loadOrder(user, id));
    }),

    // PATCH /orders/:orderId/items/:itemId — то же самое, но для одной позиции.
    //  { status: 'Processing' | 'Shipped' | 'Delivered' } — админ любую позицию, продавец — только своего товара
    //  { status: 'Cancelled', cause_replace? } — как и раньше: владелец заказа или админ
    updateOrderItem: handle('Failed to update the order item', async (req, res) => {
        const user = requireUser(req);
        const orderId = param(req, 'orderId');
        const itemId = param(req, 'itemId');
        if (!isUuid(orderId) || !isUuid(itemId)) throw new HttpError(404, 'Order item not found');

        const { status, cause } = parseStatusChange(req);

        if (status === CANCELLED) {
            await rpc('cancel_order_item', {
                p_order_id: orderId,
                p_item_id: itemId,
                p_user_id: isAdmin(user) ? null : user.id,
                p_reason: cause,
            });
        } else {
            // Админ (p_seller_id = null) двигает любую позицию.
            // Любой другой пользователь — только позиции своих товаров: проверка владельца в SQL,
            // чужая позиция для него «не найдена» (404).
            await rpc('set_order_item_status', {
                p_order_id: orderId,
                p_item_id: itemId,
                p_status: status,
                p_seller_id: isAdmin(user) ? null : user.id,
            });
        }

        // Админу и покупателю-владельцу — заказ целиком: у него могли измениться статус и сумма.
        // Продавцу чужого заказа — урезанный вид без данных покупателя.
        if (isAdmin(user)) {
            res.json(await loadOrder(user, orderId));
            return;
        }
        const owner = unwrap(
            await supabase.from('orders').select('userId').eq('id', orderId).maybeSingle(),
        ) as Row | null;

        res.json(owner?.userId === user.id
            ? await loadOrder(user, orderId)
            : await loadSellerView(user.id, orderId));
    }),

    // GET /orders/seller/items — позиции заказов с товарами текущего продавца (что нужно отправить)
    getSellerOrderItems: handle('Failed to get the seller order items', async (req, res) => {
        const user = requireUser(req);

        const { data, error } = await supabase.rpc('seller_order_items', { p_user_id: user.id });
        if (error) throw error;

        res.json(data ?? []);
    }),

    // Удаление завершённого заказа (бывший deleteOrderItems — он удаляет заказ, а не позиции)
    deleteOrder: handle('Failed to delete the order', async (req, res) => {
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