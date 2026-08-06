import { supabase } from '#lib/supbase.js'; // Укажи правильный путь к своему файлу supbase.js

export const shippingController = {
    async addShipping(req, res) {
        try {
            const newShipping = {
                userId: req.user.id,
                ...req.body
            };

            const { data: createdShipping, error } = await supabase
                .from('shipping')
                .insert([newShipping])
                .select()
                .single();

            if (error) throw error;

            res.status(201).json(createdShipping);
        } catch (err) {
            console.error('Failed to add shipping entry:', err);
            res.status(500).json({ error: err.message });
        }
    }
};