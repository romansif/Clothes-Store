import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const ordersController = {
    async getOrders(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', userId);

            if (error) throw error;

            res.json(orders || []);
        } catch (err) {
            console.error('Failed to get the current orders:', err);
           const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getFilteredOrders(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const { data: orders, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('userId', userId)
                .neq('status', 'Delivered')
                .neq('status', 'Cancelled');

            if (error) throw error;

            res.json(orders || []);
        } catch (err) {
            console.error('Failed to get the filtered orders:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async addOrder(req: AuthenticatedRequest, res: Response) {
        try {
            const date = new Date();
            const dateCreated = date.toLocaleDateString();
            const time = date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const newOrder = {
                userId: req.user?.id,
                ...req.body,
                created_at: date,
                date_created_at: dateCreated,
                time_created_at: time,
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateOrder(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async deleteOrderItems(req: Request, res: Response) {
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};