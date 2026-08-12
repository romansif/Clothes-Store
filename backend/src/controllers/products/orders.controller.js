import { supabase } from '#lib/supbase.js';

export const ordersController = {
    async getOrders(req, res) {
        try {
            const { userId } = req.params;

            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .eq('userId', userId);

            if (error) throw error;

            res.json(orders || []);
        } catch (err) {
            console.error('Failed to get the current orders:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getFilteredOrders(req, res) {
        try {
            const { userId } = req.params;

            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .eq('userId', userId)
                .neq('status', 'Delivered')
                .neq('status', 'Cancelled');

            if (error) throw error;

            res.json(orders || []);
        } catch (err) {
            console.error('Failed to get the filtered orders:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async addOrder(req, res) {
        try {
            const newOrder = {
                userId: req.user.id,
                ...req.body
            };

            const { data: createdOrder, error } = await supabase
                .from('orders')
                .insert([newOrder])
                .select()
                .single();

            if (error) throw error;

            res.status(201).json({ message: 'Product added to orderItems', data: createdOrder });
        } catch (err) {
            console.error('Failed to create the order:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async updateOrder(req, res) {
        try {
            const { id } = req.params;

            const { data: updatedOrder, error } = await supabase
                .from('orders')
                .update(req.body)
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

            res.json(updatedOrder);
        } catch (err) {
            console.error(`Failed to update the order item ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async deleteOrderItems(req, res) {
        try {
            const { id } = req.params;

            const { data: deletedOrder, error } = await supabase
                .from('orders')
                .delete()
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!deletedOrder) return res.status(404).json({ message: 'Order Product not found' });

            res.json(deletedOrder);
        } catch (err) {
            console.error(`Failed to delete the order ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    }
};