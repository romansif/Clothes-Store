import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid, findOwnedItem } from '#db/query.ts';
import { withProducts } from '#db/relations.ts';
import { type Row, HttpError, handle, param, requireUser, requireSelf, pickKeys } from '#db/security';

// В таблице favorites лежит только пара userId + productId.
// Все данные товара берутся из products при каждом запросе.
const FAVORITE_FIELDS = ['productId'] as const;

const findFavorite = async (userId: string, productId: string): Promise<Row | null> => {
    const rows: Row[] = unwrap(
        await supabase.from('favorites').select('*').eq('userId', userId).eq('productId', productId).limit(1),
    );
    return rows[0] ?? null;
};

const presentOne = async (item: Row): Promise<Row> => (await withProducts([item]))[0] ?? item;

export const favoritesController = {
    getFavorites: handle('Failed to get the favorite list', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const favorites: Row[] = unwrap(
            await supabase.from('favorites').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: false }),
        );

        res.json(await withProducts(favorites));
    }),

    addToFavorite: handle('Failed to add the product to the favorite', async (req, res) => {
        const user = requireUser(req);

        const { productId } = pickKeys(req.body, FAVORITE_FIELDS);
        if (!isUuid(productId)) {
            throw new HttpError(400, 'productId is required');
        }

        const product = unwrap(await supabase.from('products').select('id').eq('id', productId).maybeSingle());
        if (!product) throw new HttpError(404, 'Product not found');

        // повторное добавление не создаёт копию, а возвращает уже существующую запись
        const existing = await findFavorite(user.id, productId);
        if (existing) {
            res.status(200).json({ message: 'Product is already in favorites', data: await presentOne(existing) });
            return;
        }

        const created = unwrapOrConflict(
            await supabase.from('favorites').insert({ productId, userId: user.id }).select().single(),
            new HttpError(409, 'Product is already in favorites'),
        );

        res.status(201).json({ message: 'Product added to favorite', data: await presentOne(created) });
    }),

    deleteFavorite: handle('Failed to delete the product from favorites', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        // id уходит в фильтр PostgREST, поэтому строго uuid
        if (!isUuid(id)) throw new HttpError(404, 'Favorite product not found');

        const item = await findOwnedItem('favorites', user.id, id);
        if (!item) throw new HttpError(404, 'Favorite product not found');

        unwrap(
            await supabase.from('favorites').delete()
                .eq('userId', user.id)
                .or(`id.eq.${id},productId.eq.${id}`),
        );

        res.json(await presentOne(item));
    }),
};

export default favoritesController;
