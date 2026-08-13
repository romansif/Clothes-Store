import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const shippingController = {
    async getShipping (req: Request, res: Response) {
        try{
            const { paymentId } = req.params;

            const { data: shipping, error } = await supabase
                .from('shipping')
                .select('*')
                .eq('paymentId', paymentId)

            if (error) throw error;

            return res.json(shipping || []);
        }catch(err){
            console.error(`Failed to get user shipping for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async addShipping(req: AuthenticatedRequest, res: Response) {
        try {
            const newShipping = {
                userId: req.user?.id,
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
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};