import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser,
    omitKeys, isPlainObject, SERVER_OWNED_FIELDS,
} from '#lib/security';

export const shippingController = {
    getShipping: handle('Failed to get user shipping', async (req, res) => {
        const user = requireUser(req);
        const paymentId = param(req, 'paymentId');

        const shippingList: Row[] = dbService.readDB().shipping || [];

        const own = shippingList.filter(s => sameId(s.userId, user.id));

        res.json(paymentId ? own.filter(s => sameId(s.paymentId, paymentId)) : own);
    }),

    addShipping: handle('Failed to add shipping entry', async (req, res) => {
        const user = requireUser(req);

        if (!isPlainObject(req.body)) {
            throw new HttpError(400, 'Shipping data is required');
        }

        const db = dbService.readDB();
        const shippingList: Row[] = db.shipping || [];

        const newShipping = {
            ...omitKeys(req.body, SERVER_OWNED_FIELDS),
            id: uuidv4(),
            userId: user.id,
        };

        shippingList.push(newShipping);
        db.shipping = shippingList;
        dbService.writeDB(db);

        res.status(201).json(newShipping);
    }),
};

export default shippingController;
