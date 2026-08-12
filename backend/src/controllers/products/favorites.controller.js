import { supabase } from '#lib/supbase.js';

export const favoritesController = {
    async getFavorites(req, res) {
        try {
            const { userId } = req.params;

            const { data: favorites, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('userId', userId);

            if (error) throw error;

            res.json(favorites || []);
        } catch (err) {
            console.error(`Failed to get the favorite list for user ${req.params.userId}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async addToFavorite(req, res) {
        try {
            const newFavoriteItem = {
                userId: req.user.id,
                productId: req.body.productId,
                ...req.body
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
            res.status(500).json({ error: err.message });
        }
    },

    async updateFavoriteItems(req, res) {
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
            res.status(500).json({ error: err.message });
        }
    },

    async deleteFavorite(req, res) {
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
            res.status(500).json({ error: err.message });
        }
    }
};