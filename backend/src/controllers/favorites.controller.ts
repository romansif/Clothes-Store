import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid, findOwnedItem } from '#db/query.ts';
import { HttpError, handle, param, requireUser, requireSelf, pickKeys } from '#db/security';

// color / size — в единственном числе: именно так их шлёт фронт (toggle-to-favorite.ts)
const FAVORITE_FIELDS = [
    'productId', 'images', 'title', 'category', 'material', 'price', 'description',
    'color', 'size', 'gender', 'variants', 'quantity', 'status', 'favorite', 'checked',
] as const;

const FAVORITE_UPDATABLE = FAVORITE_FIELDS.filter(field => field !== 'productId');

export const favoritesController = {
    getFavorites: handle('Failed to get the favorite list', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const favorites = unwrap(
            await supabase.from('favorites').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: false }),
        );

        res.json(favorites);
    }),

    addToFavorite: handle('Failed to add the product to the favorite', async (req, res) => {
        const user = requireUser(req);

        const body = pickKeys(req.body, FAVORITE_FIELDS);
        if (body.productId === undefined || body.productId === null || body.productId === '') {
            throw new HttpError(400, 'productId is required');
        }

        const product = isUuid(body.productId)
            ? unwrap(await supabase.from('products').select('id').eq('id', body.productId).maybeSingle())
            : null;

        if (!product) throw new HttpError(400, 'Product not found');

        const newFavoriteItem = unwrap(
            await supabase.from('favorites').insert({ ...body, userId: user.id }).select().single(),
        );

        res.status(201).json({ message: 'Product added to favorite', data: newFavoriteItem });
    }),

    updateFavoriteItems: handle('Failed to update the favorite item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const item = await findOwnedItem('favorites', user.id, id);
        if (!item) throw new HttpError(404, 'Favorite item not found');

        const changes = pickKeys(req.body, FAVORITE_UPDATABLE);

        const updated = Object.keys(changes).length
            ? unwrap(await supabase.from('favorites').update(changes).eq('id', item.id).select().single())
            : item;

        res.json(updated);
    }),

    deleteFavorite: handle('Failed to delete the product from favorites', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const item = await findOwnedItem('favorites', user.id, id);
        if (!item) throw new HttpError(404, 'Favorite Product not found');

        unwrap(
            await supabase.from('favorites').delete()
                .eq('userId', user.id)
                .or(`id.eq.${id},productId.eq.${id}`),
        );

        res.json(item);
    }),
};

export default favoritesController;