import { supabase } from '#lib/supbase.js'; // Укажи правильный путь к своему файлу supbase.js

export const cartController = {
    async getCart(req, res) {
        try {
            const { userId } = req.params;

            const { data: cart, error } = await supabase
                .from('cart')
                .select('*')
                .eq('userId', userId);

            if (error) throw error;

            res.json(cart || []);
        } catch (err) {
            console.error(`Failed to get the cart list for user ${req.params.userId}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async addToCart(req, res) {
        try {
            const { productId } = req.body;

            const { data: product, error: productError } = await supabase
                .from('products')
                .select('id')
                .eq('id', productId)
                .maybeSingle();

            if (productError) throw productError;
            if (!product) return res.status(400).json({ message: 'Product not found' });

            const newCartItem = {
                userId: req.user.id,
                ...req.body
            };

            const { data: createdItem, error: insertError } = await supabase
                .from('cart')
                .insert([newCartItem])
                .select()
                .single();

            if (insertError) throw insertError;

            res.status(201).json({ message: 'Product added to cart', data: createdItem });
        } catch (err) {
            console.error('Failed to add the product to the cart:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async updateCartItem(req, res) {
        try {
            const { id } = req.params;

            const { data: updatedItem, error } = await supabase
                .from('cart')
                .update(req.body)
                .or(`id.eq.${id},productId.eq.${id}`)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!updatedItem) return res.status(404).json({ message: 'Cart item not found' });

            res.json(updatedItem);
        } catch (err) {
            console.error(`Failed to update the cart item ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async deleteCartItem(req, res) {
        try {
            const { id } = req.params;

            const { data: deletedProduct, error } = await supabase
                .from('cart')
                .delete()
                .or(`id.eq.${id},productId.eq.${id}`)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!deletedProduct) return res.status(404).json({ message: "Cart Product not found" });

            res.json(deletedProduct);
        } catch (err) {
            console.error(`Failed to delete the product from cart ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    }
};