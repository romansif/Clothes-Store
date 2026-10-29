import { supabase } from '#db/supabase.ts';
import { unwrap } from '#db/query.ts';
import { HttpError, handle, param, requireUser, pickKeys, isPlainObject } from '#db/security';

const SHIPPING_FIELDS = ['paymentId', 'delivery'] as const;

export const shippingController = {
    getShipping: handle('Failed to get user shipping', async (req, res) => {
        const user = requireUser(req);
        const paymentId = param(req, 'paymentId');

        let query = supabase.from('shipping').select('*').eq('userId', user.id);
        if (paymentId) query = query.eq('paymentId', paymentId);

        res.json(unwrap(await query.order('created_at', { ascending: true })));
    }),

    addShipping: handle('Failed to add shipping entry', async (req, res) => {
        const user = requireUser(req);

        if (!isPlainObject(req.body)) {
            throw new HttpError(400, 'Shipping data is required');
        }

        const fields = pickKeys(req.body, SHIPPING_FIELDS);
        if (typeof fields.delivery !== 'string' || !fields.delivery) {
            throw new HttpError(400, 'Shipping Method Code required to order', {
                delivery: 'Shipping Method Code required to order',
            });
        }

        const newShipping = unwrap(
            await supabase.from('shipping').insert({ ...fields, userId: user.id }).select().single(),
        );

        res.status(201).json(newShipping);
    }),
};

export default shippingController;