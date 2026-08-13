import { supabase } from '#lib/supabase.js';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';

export const addressesController = {
    async getAddresses(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const { data: addresses, error } = await supabase
                .from('addresses')
                .select('*')
                .eq('userId', userId);

            if (error) throw error;

            return res.json(addresses || []);
        } catch (err) {
            console.error(`Failed to get user addresses for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async getAddress(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { data: address, error } = await supabase
                .from('addresses')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (error) throw error;
            if (!address) return res.status(404).json({ message: "Address not found" });

            return res.json(address);
        } catch (err) {
            console.error(`Failed to get address ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async addAddress(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.user?.id;
            const { address, postalCode, ...rest } = req.body;

            if (address) {
                const { data: existingAddress, error: checkError } = await supabase
                    .from('addresses')
                    .select('id')
                    .eq('userId', userId)
                    .eq('address', address)
                    .maybeSingle();

                if (checkError) throw checkError;

                if (existingAddress) {
                    return res.status(400).json({
                        message: `This address is already exist for this accounts.`,
                        errors: { email: `Limit reached. You can only have one of a kind account per address.` }
                    });
                }
            }

            const newAddress = {
                userId,
                address,
                ...(postalCode !== undefined && { postalCode: Number(postalCode) }),
                ...rest
            };

            const { data: createdAddress, error: insertError } = await supabase
                .from('addresses')
                .insert([newAddress])
                .select()
                .single();

            if (insertError) throw insertError;

            res.status(201).json(createdAddress);
        } catch (err) {
            console.error('Failed to create the user address:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async updateAddress(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const updateData = { ...req.body };
            if (updateData.postalCode !== undefined) {
                updateData.postalCode = Number(updateData.postalCode);
            }

            const { data: updatedAddress, error } = await supabase
                .from('addresses')
                .update(updateData)
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!updatedAddress) return res.status(404).json({ message: 'Address record not found' });

            res.status(200).json(updatedAddress);
        } catch (err) {
            console.error(`Failed to update address ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    },

    async deleteAddress(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { data: deletedAddress, error } = await supabase
                .from('addresses')
                .delete()
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!deletedAddress) return res.status(404).json({ message: "Адрес не найден" });

            res.json(deletedAddress);
        } catch (err) {
            console.error(`Failed to delete address ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error'
            res.status(500).json({ error: message });
        }
    }
};