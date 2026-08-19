import { v4 as uuidv4 } from 'uuid';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts'; // Подставь свой путь к файлу конфигурации

export const favoritesController = {
    async getFavorites(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const db = dbService.readDB();
            const favorites: any[] = db.favorites || [];

            const userFavorites = favorites.filter(f => String(f.userId) === String(userId));
            userFavorites.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(userFavorites);
        } catch (err) {
            console.error(`Failed to get the favorite list for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async addToFavorite(req: AuthenticatedRequest, res: Response) {
        try {
            const db = dbService.readDB();
            const favorites: any[] = db.favorites || [];

            const newFavoriteItem = {
                id: uuidv4(),
                userId: req.user?.id || req.user?.userId,
                productId: req.body.productId,
                ...req.body,
                created_at: new Date().toISOString(),
            };

            favorites.push(newFavoriteItem);
            db.favorites = favorites;
            dbService.writeDB(db);

            res.status(201).json({ message: 'Product added to favorite', data: newFavoriteItem });
        } catch (err) {
            console.error('Failed to add the product to the favorite:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateFavoriteItems(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const favorites: any[] = db.favorites || [];

            const index = favorites.findIndex(f => String(f.id) === String(id) || String(f.productId) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: 'Favorite item not found' });
            }

            favorites[index] = {
                ...favorites[index],
                ...req.body
            };

            db.favorites = favorites;
            dbService.writeDB(db);

            res.json(favorites[index]);
        } catch (err) {
            console.error(`Failed to update the favorite item ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deleteFavorite(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const favorites: any[] = db.favorites || [];

            const index = favorites.findIndex(f => String(f.id) === String(id) || String(f.productId) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: "Favorite Product not found" });
            }

            const deletedProduct = favorites[index];

            db.favorites = favorites.filter(f => String(f.id) !== String(id) && String(f.productId) !== String(id));
            dbService.writeDB(db);

            res.json(deletedProduct);
        } catch (err) {
            console.error(`Failed to delete the product from favorites ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default favoritesController;