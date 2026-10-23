import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    omitKeys, byNewest, SERVER_OWNED_FIELDS,
} from '#lib/security';

const FAVORITE_UPDATE_PROTECTED = [...SERVER_OWNED_FIELDS, 'productId'] as const;

const matchesItem = (item: Row, id: string) => sameId(item.id, id) || sameId(item.productId, id);

export const favoritesController = {
    getFavorites: handle('Failed to get the favorite list', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const favorites: Row[] = dbService.readDB().favorites || [];

        res.json(favorites.filter(f => sameId(f.userId, user.id)).sort(byNewest));
    }),

    addToFavorite: handle('Failed to add the product to the favorite', async (req, res) => {
        const user = requireUser(req);

        const body = omitKeys(req.body, SERVER_OWNED_FIELDS);
        if (body.productId === undefined || body.productId === null || body.productId === '') {
            throw new HttpError(400, 'productId is required');
        }

        const db = dbService.readDB();
        const products: Row[] = db.products || [];

        if (!products.some(p => sameId(p.id, body.productId))) {
            throw new HttpError(400, 'Product not found');
        }

        const favorites: Row[] = db.favorites || [];

        const newFavoriteItem = {
            ...body,
            id: uuidv4(),
            userId: user.id,
            created_at: new Date().toISOString(),
        };

        favorites.push(newFavoriteItem);
        db.favorites = favorites;
        dbService.writeDB(db);

        res.status(201).json({ message: 'Product added to favorite', data: newFavoriteItem });
    }),

    updateFavoriteItems: handle('Failed to update the favorite item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const favorites: Row[] = db.favorites || [];

        const index = favorites.findIndex(f => sameId(f.userId, user.id) && matchesItem(f, id));

        if (index === -1) throw new HttpError(404, 'Favorite item not found');

        favorites[index] = {
            ...favorites[index],
            ...omitKeys(req.body, FAVORITE_UPDATE_PROTECTED),
        };

        db.favorites = favorites;
        dbService.writeDB(db);

        res.json(favorites[index]);
    }),

    deleteFavorite: handle('Failed to delete the product from favorites', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const favorites: Row[] = db.favorites || [];

        const isTarget = (f: Row) => sameId(f.userId, user.id) && matchesItem(f, id);
        const deletedProduct = favorites.find(isTarget);

        if (!deletedProduct) throw new HttpError(404, 'Favorite Product not found');

        db.favorites = favorites.filter(f => !isTarget(f));
        dbService.writeDB(db);

        res.json(deletedProduct);
    }),
};

export default favoritesController;
