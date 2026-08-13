import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const favoritesController = {
    async getFavorites(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const { data: favorites, error } = await supabase
                .from('favorites')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', userId);

            if (error) throw error;

            res.json(favorites || []);
        } catch (err) {
            console.error(`Failed to get the favorite list for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async addToFavorite(req: AuthenticatedRequest, res: Response) {
        try {
            const newFavoriteItem = {
                userId: req.user?.id,
                productId: req.body.productId,
                ...req.body,
                created_at: new Date(),
            };

            const { data: createdFavorite, error } = await supabase
                .from('favorites')
                .insert([newFavoriteItem])
                .select()
                .single();

            if (error) throw error;

            res.status(201).json({ message: 'Product added to favorite', data: createdFavorite });
        } catch (err) {
            console.error('Failed to add the product to the favorite:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateFavoriteItems(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { data: updatedFavorite, error } = await supabase
                .from('favorites')
                .update(req.body)
                .or(`id.eq.${id},productId.eq.${id}`)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!updatedFavorite) return res.status(404).json({ message: 'Favorite item not found' });

            res.json(updatedFavorite);
        } catch (err) {
            console.error(`Failed to update the favorite item ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async deleteFavorite(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { data: deletedProduct, error } = await supabase
                .from('favorites')
                .delete()
                .or(`id.eq.${id},productId.eq.${id}`)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!deletedProduct) return res.status(404).json({ message: "Favorite Product not found" });

            res.json(deletedProduct);
        } catch (err) {
            console.error(`Failed to delete the product from favorites ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};