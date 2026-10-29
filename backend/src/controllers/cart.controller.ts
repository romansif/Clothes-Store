import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid, findOwnedItem } from '#db/query.ts';
import { HttpError, handle, param, requireUser, requireSelf, pickKeys } from '#db/security';

const CART_FIELDS = [
    'productId', 'images', 'title', 'category', 'material', 'price', 'description',
    'colors', 'sizes', 'gender', 'variants', 'quantity', 'status', 'favorite', 'checked',
] as const;

const CART_UPDATABLE = CART_FIELDS.filter(field => field !== 'productId');

export const cartController = {
    getCart: handle('Failed to get the cart list', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const cart = unwrap(
            await supabase.from('cart').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: false }),
        );

        res.json(cart);
    }),

    addToCart: handle('Failed to add the product to the cart', async (req, res) => {
        const user = requireUser(req);

        const body = pickKeys(req.body, CART_FIELDS);
        if (body.productId === undefined || body.productId === null || body.productId === '') {
            throw new HttpError(400, 'productId is required');
        }

        const product = isUuid(body.productId)
            ? unwrap(await supabase.from('products').select('id').eq('id', body.productId).maybeSingle())
            : null;

        if (!product) throw new HttpError(400, 'Product not found');

        const newCartItem = unwrap(
            await supabase.from('cart').insert({ ...body, userId: user.id }).select().single(),
        );

        res.status(201).json({ message: 'Product added to cart', data: newCartItem });
    }),

    updateCartItem: handle('Failed to update the cart item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const item = await findOwnedItem('cart', user.id, id);
        if (!item) throw new HttpError(404, 'Cart item not found');

        const changes = pickKeys(req.body, CART_UPDATABLE);

        const updated = Object.keys(changes).length
            ? unwrap(await supabase.from('cart').update(changes).eq('id', item.id).select().single())
            : item;

        res.json(updated);
    }),

    deleteCartItem: handle('Failed to delete the product from cart', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const item = await findOwnedItem('cart', user.id, id);
        if (!item) throw new HttpError(404, 'Cart Product not found');

        // как и раньше: удаляются все записи, подходящие по id записи или по productId
        unwrap(
            await supabase.from('cart').delete()
                .eq('userId', user.id)
                .or(`id.eq.${id},productId.eq.${id}`),
        );

        res.json(item);
    }),
};

export default cartController;