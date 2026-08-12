import { supabase } from '#lib/supbase.js';
export const paymentsController = {
    async getPayments(req, res) {
        try {
            const { userId } = req.params;

            const { data: payments, error } = await supabase
                .from('payments')
                .select('*')
                .eq('userId', userId);

            if (error) throw error;

            res.json(payments || []);
        } catch (err) {
            console.error(`Failed to get user payments for user ${req.params.userId}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async getPayment(req, res) {
        try {
            const { id } = req.params;

            const { data: payment, error } = await supabase
                .from('payments')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (error) throw error;
            if (!payment) return res.status(404).json({ message: "Payment not found" });

            res.json(payment);
        } catch (err) {
            console.error(`Failed to get payment ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async addPayment(req, res) {
        try {
            const newPayment = {
                userId: req.user.id,
                ...req.body
            };

            const { data: createdPayment, error } = await supabase
                .from('payments')
                .insert([newPayment])
                .select()
                .single();

            if (error) throw error;

            res.status(201).json(createdPayment);
        } catch (err) {
            console.error('Failed to add payment:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async updatePayment(req, res) {
        try {
            const { id } = req.params;

            // 1. Находим текущую запись платежа
            const { data: currentPayment, error: fetchError } = await supabase
                .from('payments')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (fetchError) throw fetchError;
            if (!currentPayment) {
                return res.status(404).json({ message: 'Payment record not found' });
            }

            if (req.body.cardNumber) {
                const { data: duplicateCard, error: dupError } = await supabase
                    .from('payments')
                    .select('id')
                    .eq('userId', currentPayment.userId)
                    .eq('cardNumber', req.body.cardNumber)
                    .neq('id', id)
                    .maybeSingle();

                if (dupError) throw dupError;

                if (duplicateCard) {
                    return res.status(400).json({
                        message: `This card number is already exist for this accounts.`,
                        errors: { email: `Limit reached. You can only have one of a kind account per card number.` }
                    });
                }
            }

            const { data: updatedPayment, error: updateError } = await supabase
                .from('payments')
                .update(req.body)
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            res.status(200).json(updatedPayment);
        } catch (err) {
            console.error(`Failed to update payment ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    },

    async deletePayment(req, res) {
        try {
            const { id } = req.params;

            const { data: deletedPayment, error } = await supabase
                .from('payments')
                .delete()
                .eq('id', id)
                .select()
                .maybeSingle();

            if (error) throw error;
            if (!deletedPayment) return res.status(404).json({ message: "Способ оплаты не найден" });

            res.json(deletedPayment);
        } catch (err) {
            console.error(`Failed to delete payment ${req.params.id}:`, err);
            res.status(500).json({ error: err.message });
        }
    }
};