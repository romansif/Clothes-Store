import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid, deleteOwned } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    pickKeys, isPlainObject, cardFingerprint, isValidCardNumber,
    maskCard, toPublicPayment,
} from '#db/security';

// Белый список колонок. cardCvv сюда НЕ входит — CVV не сохраняется никогда.
const PAYMENT_FIELDS = ['paymentId', 'paymentMethod', 'cardName', 'cardNumber', 'expiryDate'] as const;

const withProtectedCard = (data: Row): Row => {
    if (!('cardNumber' in data)) return data;

    if (typeof data.cardNumber === 'string' && data.cardNumber.includes('*')) {
        const { cardNumber: _unchanged, ...rest } = data;
        return rest;
    }

    if (!isValidCardNumber(data.cardNumber)) {
        throw new HttpError(400, 'Invalid card number', { cardNumber: 'Invalid card number' });
    }

    return {
        ...data,
        cardFingerprint: cardFingerprint(data.cardNumber),
        cardNumber: maskCard(data.cardNumber),
    };
};

export const paymentsController = {
    getPayments: handle('Failed to get user payments', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const payments = unwrap(
            await supabase.from('payments').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: true }),
        );

        res.json(payments.map(toPublicPayment));
    }),

    getPayment: handle('Failed to get payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        // фронт передаёт сюда paymentId (uuid, связывающий доставку и оплату), поэтому ищем и по нему
        const rows: Row[] = isUuid(id)
            ? unwrap(
                await supabase.from('payments').select('*')
                    .eq('userId', user.id)
                    .or(`id.eq.${id},paymentId.eq.${id}`)
                    .order('created_at', { ascending: true }),
            )
            : [];

        const payment = rows.find(p => sameId(p.id, id)) ?? rows[0];

        if (!payment) throw new HttpError(404, 'Payment not found');

        res.json(toPublicPayment(payment));
    }),

    addPayment: handle('Failed to add payment', async (req, res) => {
        const user = requireUser(req);

        if (!isPlainObject(req.body)) {
            throw new HttpError(400, 'Payment data is required');
        }

        const fields = withProtectedCard(pickKeys(req.body, PAYMENT_FIELDS));

        if (typeof fields.paymentMethod !== 'string' || !fields.paymentMethod) {
            throw new HttpError(400, 'Select a payment method', { paymentMethod: 'Select a payment method' });
        }

        const newPayment = unwrap(
            await supabase.from('payments').insert({ ...fields, userId: user.id }).select().single(),
        );

        res.status(201).json(toPublicPayment(newPayment));
    }),

    updatePayment: handle('Failed to update payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const current = isUuid(id)
            ? unwrap(await supabase.from('payments').select('*').eq('id', id).eq('userId', user.id).maybeSingle())
            : null;

        if (!current) throw new HttpError(404, 'Payment record not found');

        const changes = withProtectedCard(pickKeys(req.body, PAYMENT_FIELDS));

        if (changes.cardFingerprint) {
            const duplicates = unwrap(
                await supabase.from('payments').select('id')
                    .eq('userId', user.id)
                    .eq('cardFingerprint', changes.cardFingerprint)
                    .neq('id', id)
                    .limit(1),
            );

            if (duplicates.length) {
                throw new HttpError(400, `This card number is already exist for this accounts.`, {
                    email: `Limit reached. You can only have one of a kind account per card number.`,
                });
            }
        }

        // запись, импортированная со старым незамаскированным номером, дозамаскируется здесь
        if (!changes.cardFingerprint && current.cardNumber && !String(current.cardNumber).includes('*')) {
            changes.cardFingerprint = cardFingerprint(current.cardNumber);
            changes.cardNumber = maskCard(current.cardNumber);
        }

        const updated = Object.keys(changes).length
            ? unwrap(await supabase.from('payments').update(changes).eq('id', id).select().single())
            : current;

        res.status(200).json(toPublicPayment(updated));
    }),

    deletePayment: handle('Failed to delete payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('payments', id, user.id);

        if (!deleted) throw new HttpError(404, 'Способ оплаты не найден');

        res.json(toPublicPayment(deleted));
    }),
};

export default paymentsController;