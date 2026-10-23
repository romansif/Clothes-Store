import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    omitKeys, isPlainObject, cardFingerprint, storedFingerprint, isValidCardNumber,
    maskCard, toPublicPayment, PAYMENT_PROTECTED_FIELDS,
} from '#lib/security';

/**
 * Card numbers are never stored in full and the CVV is never stored at all.
 * What is kept: the masked number (last 4 digits) and a keyed fingerprint used to spot duplicates.
 */
const withProtectedCard = (data: Row): Row => {
    if (!('cardNumber' in data)) return data;

    // The front end may send back the masked value it received earlier: that means "unchanged".
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

        const payments: Row[] = dbService.readDB().payments || [];

        res.json(payments.filter(p => sameId(p.userId, user.id)).map(toPublicPayment));
    }),

    getPayment: handle('Failed to get payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const payments: Row[] = dbService.readDB().payments || [];
        const payment = payments.find(p => sameId(p.id, id) && sameId(p.userId, user.id));

        if (!payment) throw new HttpError(404, 'Payment not found');

        res.json(toPublicPayment(payment));
    }),

    addPayment: handle('Failed to add payment', async (req, res) => {
        const user = requireUser(req);

        if (!isPlainObject(req.body)) {
            throw new HttpError(400, 'Payment data is required');
        }

        const db = dbService.readDB();
        const payments: Row[] = db.payments || [];

        const newPayment = {
            ...withProtectedCard(omitKeys(req.body, PAYMENT_PROTECTED_FIELDS)),
            id: uuidv4(),
            userId: user.id,
        };

        payments.push(newPayment);
        db.payments = payments;
        dbService.writeDB(db);

        res.status(201).json(toPublicPayment(newPayment));
    }),

    updatePayment: handle('Failed to update payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const payments: Row[] = db.payments || [];
        const index = payments.findIndex(p => sameId(p.id, id) && sameId(p.userId, user.id));

        if (index === -1) throw new HttpError(404, 'Payment record not found');

        const currentPayment = payments[index]!;
        const changes = withProtectedCard(omitKeys(req.body, PAYMENT_PROTECTED_FIELDS));

        if (changes.cardFingerprint) {
            const duplicateCard = payments.find(p =>
                sameId(p.userId, user.id) &&
                !sameId(p.id, id) &&
                storedFingerprint(p) === changes.cardFingerprint
            );

            if (duplicateCard) {
                throw new HttpError(400, `This card number is already exist for this accounts.`, {
                    email: `Limit reached. You can only have one of a kind account per card number.`,
                });
            }
        }

        const updated = { ...currentPayment, ...changes };
        // Records saved before this change may still hold the full number or a CVV: remove them on touch.
        delete updated.cvv;
        delete updated.cvc;
        delete updated.cvv2;
        delete updated.securityCode;
        if (!changes.cardFingerprint && currentPayment.cardNumber && !String(currentPayment.cardNumber).includes('*')) {
            updated.cardFingerprint = cardFingerprint(currentPayment.cardNumber);
            updated.cardNumber = maskCard(currentPayment.cardNumber);
        }

        payments[index] = updated;
        db.payments = payments;
        dbService.writeDB(db);

        res.status(200).json(toPublicPayment(updated));
    }),

    deletePayment: handle('Failed to delete payment', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const payments: Row[] = db.payments || [];
        const deletedPayment = payments.find(p => sameId(p.id, id) && sameId(p.userId, user.id));

        if (!deletedPayment) throw new HttpError(404, 'Способ оплаты не найден');

        db.payments = payments.filter(p => p !== deletedPayment);
        dbService.writeDB(db);

        res.json(toPublicPayment(deletedPayment));
    }),
};

export default paymentsController;
