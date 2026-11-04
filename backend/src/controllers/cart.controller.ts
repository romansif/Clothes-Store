import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid, findOwnedItem } from '#db/query.ts';
import { withProducts } from '#db/relations.ts';
import {
    type Row, HttpError, handle, param, requireUser, requireSelf, pickKeys, cleanText, isPlainObject,
} from '#db/security';


const CART_FIELDS = ['productId', 'quantity', 'color', 'size', 'checked'] as const;
const CART_UPDATABLE = ['quantity', 'color', 'size', 'checked'] as const;

const MAX_QUANTITY = 99;
const MAX_OPTION_LENGTH = 50;

const toQuantity = (value: unknown): number => {
    const quantity = Number(value);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        throw new HttpError(400, `Quantity must be between 1 and ${MAX_QUANTITY}`, {
            quantity: `Quantity must be between 1 and ${MAX_QUANTITY}`,
        });
    }
    return quantity;
};

const toOption = (value: unknown, field: 'color' | 'size'): string | null => {
    if (value === undefined || value === null || value === '') return null;

    const text = cleanText(value, MAX_OPTION_LENGTH);
    if (!text) throw new HttpError(400, `Invalid ${field}`, { [field]: `Invalid ${field}` });
    return text;
};

const toColor = (value: unknown): string | null =>
    toOption(isPlainObject(value) ? (value as Row).hex : value, 'color');

const toChecked = (value: unknown): boolean => {
    if (typeof value !== 'boolean') throw new HttpError(400, 'Invalid checked value', { checked: 'Invalid checked value' });
    return value;
};

const alreadyInCart = () => new HttpError(409, 'This product with the same options is already in your cart');

const assertInStock = (product: Row, color: string | null, size: string | null, quantity: number): void => {
    if (!color || !size || !Array.isArray(product.variants)) return;

    const variant = product.variants.find((v: Row) => v?.hex === color && String(v?.size) === size);
    if (!variant) return;

    const count = Number(variant.count) || 0;
    if (quantity > count) {
        const message = count > 0 ? `Only ${count} left in stock` : 'This item is out of stock';
        throw new HttpError(409, message, { quantity: message });
    }
};

const withColorObject = (item: Row): Row => {
    const hex = typeof item.color === 'string' ? item.color : '';

    const fromVariants = Array.isArray(item.variants) ? item.variants.find((v: Row) => v?.hex === hex) : undefined;
    const fromColors = Array.isArray(item.colors) ? item.colors.find((c: Row) => c?.hex === hex) : undefined;

    return { ...item, color: { hex, colorName: fromVariants?.colorName ?? fromColors?.colorName ?? '' } };
};

const present = async (items: Row[]): Promise<Row[]> => (await withProducts(items)).map(withColorObject);

const presentOne = async (item: Row): Promise<Row> => (await present([item]))[0] ?? item;

export const cartController = {
    getCart: handle('Failed to get the cart list', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const cart: Row[] = unwrap(
            await supabase.from('cart').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: false }),
        );

        res.json(await present(cart));
    }),

    addToCart: handle('Failed to add the product to the cart', async (req, res) => {
        const user = requireUser(req);

        const body = pickKeys(req.body, CART_FIELDS);
        if (!isUuid(body.productId)) {
            throw new HttpError(400, 'productId is required');
        }

        const product = unwrap(
            await supabase.from('products').select('id, sizes, variants').eq('id', body.productId).maybeSingle(),
        );
        if (!product) throw new HttpError(404, 'Product not found');

        const quantity = body.quantity === undefined ? 1 : toQuantity(body.quantity);
        const color = toColor(body.color);
        const size = toOption(body.size, 'size');
        const checked = body.checked === undefined ? false : toChecked(body.checked);

        if (size && Array.isArray(product.sizes) && product.sizes.length && !product.sizes.includes(size)) {
            throw new HttpError(400, 'Size is not available for this product', { size: 'Size is not available' });
        }

        const sameProduct: Row[] = unwrap(
            await supabase.from('cart').select('*').eq('userId', user.id).eq('productId', body.productId),
        );
        const existing = sameProduct.find(row => (row.color ?? null) === color && (row.size ?? null) === size);

        if (existing) {
            const total = Math.min(existing.quantity + quantity, MAX_QUANTITY);
            assertInStock(product, color, size, total);

            const merged = unwrapOrConflict(
                await supabase.from('cart')
                    .update({ quantity: total })
                    .eq('id', existing.id).eq('userId', user.id)
                    .select().single(),
                alreadyInCart(),
            );

            res.status(200).json({ message: 'Cart updated', data: await presentOne(merged) });
            return;
        }

        assertInStock(product, color, size, quantity);

        const created = unwrapOrConflict(
            await supabase.from('cart')
                .insert({ productId: body.productId, userId: user.id, quantity, color, size, checked })
                .select().single(),
            alreadyInCart(),
        );

        res.status(201).json({ message: 'Product added to cart', data: await presentOne(created) });
    }),

    updateCartItem: handle('Failed to update the cart item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const item = await findOwnedItem('cart', user.id, id);
        if (!item) throw new HttpError(404, 'Cart item not found');

        const picked = pickKeys(req.body, CART_UPDATABLE);
        const changes: Row = {};

        if (picked.quantity !== undefined) changes.quantity = toQuantity(picked.quantity);
        if (picked.color !== undefined) changes.color = toColor(picked.color);
        if (picked.size !== undefined) changes.size = toOption(picked.size, 'size');
        if (picked.checked !== undefined) changes.checked = toChecked(picked.checked);

        const grows = changes.quantity !== undefined && changes.quantity > item.quantity;
        if (grows || 'color' in changes || 'size' in changes) {
            const product = unwrap(
                await supabase.from('products').select('id, variants').eq('id', item.productId).maybeSingle(),
            );
            if (!product) throw new HttpError(404, 'Product not found');

            assertInStock(
                product,
                'color' in changes ? changes.color : (item.color ?? null),
                'size' in changes ? changes.size : (item.size ?? null),
                changes.quantity ?? item.quantity,
            );
        }

        const updated = Object.keys(changes).length
            ? unwrapOrConflict(
                await supabase.from('cart').update(changes).eq('id', item.id).eq('userId', user.id).select().single(),
                alreadyInCart(),
            )
            : item;

        res.json(await presentOne(updated));
    }),

    resetSelection: handle('Failed to reset the cart selection', async (req, res) => {
        const user = requireUser(req);

        const { error } = await supabase.from('cart').update({ checked: false }).eq('userId', user.id).eq('checked', true);
        if (error) throw error;

        res.json({ ok: true });
    }),

    deleteCartItem: handle('Failed to delete the product from cart', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        if (!isUuid(id)) throw new HttpError(404, 'Cart product not found');

        const item = await findOwnedItem('cart', user.id, id);
        if (!item) throw new HttpError(404, 'Cart product not found');

        unwrap(
            await supabase.from('cart').delete()
                .eq('userId', user.id)
                .or(`id.eq.${id},productId.eq.${id}`),
        );

        res.json(await presentOne(item));
    }),
};

export default cartController;
