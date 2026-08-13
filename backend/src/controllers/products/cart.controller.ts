import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const cartController = {
    async getCart(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const { data: cart, error } = await supabase
                .from('cart')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', userId);

            if (error) throw error;

            res.json(cart || []);
        } catch (err) {
            console.error(`Failed to get the cart list for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async addToCart(req: AuthenticatedRequest, res: Response) {
        try {
            const { productId } = req.body;

            console.log('colors:', req.body.colors);

            const { data: product, error: productError } = await supabase
                .from('products')
                .select('id')
                .eq('id', productId)
                .maybeSingle();

            if (productError) throw productError;
            if (!product) return res.status(400).json({ message: 'Product not found' });

            const newCartItem = {
                userId: req.user?.id,
                ...req.body,
                created_at: new Date(),
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateCartItem(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async deleteCartItem(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};