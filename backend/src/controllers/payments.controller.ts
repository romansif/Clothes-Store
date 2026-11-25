import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid, deleteOwned } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    pickKeys, isPlainObject, cardFingerprint, isValidCardNumber,
    maskCard, toPublicPayment, cleanText,
} from '#db/security';
import type { Request } from "express";

const PAYMENT_TABLE = 'payments';

const PAYMENT_FIELDS = ['paymentId', 'paymentMethod', 'cardName', 'cardNumber', 'expiryDate'] as const;

const formatPaymentDate = (value: unknown): string => {
    const date = new Date(value as string);
    if (Number.isNaN(date.getTime())) return String(value ?? '');

    const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Tashkent',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        })
            .formatToParts(date)
            .map(part => [part.type, part.value]),
    );

    return `${parts.day}.${parts.month}.${parts.year}/${parts.hour}:${parts.minute}`;
};

const toApiPayment = (payment: Row): Row => ({
    ...toPublicPayment(payment),
    created_at: formatPaymentDate(payment.created_at),
});

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

const requireUserId = (req: Request): string => {
    const userId = (req as Request & { user?: { userId?: string } }).user?.userId;
    if (!isUuid(userId)) throw new HttpError(401, 'Unauthorized');
    return userId;
};

export const paymentsController = {
    getPayments: handle('Failed to get user payments', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const payments = unwrap(
            await supabase.from('payments').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: true }),
        );

        res.json(payments.map(toApiPayment));
    }),

    getPayment: handle('Failed to get payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

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

        res.json(toApiPayment(payment));
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

        if (fields.cardFingerprint) {
            const existing = unwrap(
                await supabase.from('payments').select('*')
                    .eq('userId', user.id)
                    .eq('cardFingerprint', fields.cardFingerprint)
                    .limit(1),
            );
            if (existing.length) {
                res.status(200).json(toApiPayment(existing[0]));
                return;
            }
        }

        const newPayment = unwrap(
            await supabase.from('payments').insert({ ...fields, userId: user.id }).select().single(),
        );

        res.status(201).json(toApiPayment(newPayment));
    }),

    updatePayment: handle('Failed to update the payment method', async (req, res) => {
        const userId = requireUserId(req);
        const { id } = req.params;
        if (!isUuid(id)) throw new HttpError(400, 'Invalid payment id.');

        const existing = unwrap(
            await supabase.from(PAYMENT_TABLE).select('id, paymentMethod').eq('id', id).eq('userId', userId).maybeSingle(),
        );
        if (!existing) throw new HttpError(404, 'Payment method not found.');
        if (existing.paymentMethod !== 'card') {
            throw new HttpError(400, 'Only card payment methods can be edited.');
        }

        const body = isPlainObject(req.body) ? req.body : {};
        const patch: Row = {};

        if (body.cardName !== undefined) {
            const cardName = cleanText(body.cardName, 100);
            if (!cardName) throw new HttpError(400, 'Invalid card name.', { cardName: 'Enter the cardholder name.' });
            patch.cardName = cardName;
        }

        if (body.cardNumber !== undefined) {
            const digits = String(body.cardNumber).replace(/[\s-]/g, '');
            if (!/^\d{16}$/.test(digits)) {
                throw new HttpError(400, 'Invalid card number.', { cardNumber: 'Card number must have 16 digits.' });
            }
            patch.cardNumber = digits.replace(/(\d{4})(?=\d)/g, '$1-'); // тот же формат, что у фронта
        }

        if (body.expiryDate !== undefined) {
            const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(String(body.expiryDate));
            const expired = match
                ? new Date(2000 + Number(match[2]), Number(match[1]), 1) <= new Date() // конец месяца
                : true;
            if (!match || expired) {
                throw new HttpError(400, 'Invalid expiry date.', { expiryDate: 'Card is expired or the date is invalid.' });
            }
            patch.expiryDate = body.expiryDate;
        }

        // cardCvv намеренно не принимается и не обновляется (см. ниже)

        if (!Object.keys(patch).length) throw new HttpError(400, 'Nothing to update.');

        const updated = unwrap(
            await supabase.from(PAYMENT_TABLE).update(patch).eq('id', id).eq('userId', userId).select('*').maybeSingle(),
        );
        if (!updated) throw new HttpError(404, 'Payment method not found.');

        res.json(updated);
    }),

    deletePayment: handle('Failed to delete payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('payments', id, user.id);

        if (!deleted) throw new HttpError(404, 'Payment not found');

        res.json(toApiPayment(deleted));
    }),
};

export default paymentsController;