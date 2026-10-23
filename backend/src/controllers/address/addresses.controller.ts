import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    omitKeys, cleanText, SERVER_OWNED_FIELDS,
} from '#lib/security';

const toPostalCode = (value: unknown): number => {
    const code = Number(value);
    if (!Number.isFinite(code) || code < 0) {
        throw new HttpError(400, 'Invalid postal code', { postalCode: 'Invalid postal code' });
    }
    return code;
};

export const addressesController = {
    getAddresses: handle('Failed to get user addresses', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const addresses: Row[] = dbService.readDB().addresses || [];

        res.json(addresses.filter(a => sameId(a.userId, user.id)));
    }),

    getAddress: handle('Failed to get address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const addresses: Row[] = dbService.readDB().addresses || [];
        const address = addresses.find(a => sameId(a.id, id) && sameId(a.userId, user.id));

        if (!address) throw new HttpError(404, 'Address not found');

        res.json(address);
    }),

    addAddress: handle('Failed to create the user address', async (req, res) => {
        const user = requireUser(req);

        const { address, postalCode, ...rest } = omitKeys(req.body, SERVER_OWNED_FIELDS);

        if (address !== undefined && cleanText(address, 300) === null) {
            throw new HttpError(400, 'Invalid address', { address: 'Invalid address' });
        }

        const db = dbService.readDB();
        const addresses: Row[] = db.addresses || [];

        if (address) {
            const existingAddress = addresses.find(a => sameId(a.userId, user.id) && a.address === address);

            if (existingAddress) {
                throw new HttpError(400, `This address is already exist for this accounts.`, {
                    email: `Limit reached. You can only have one of a kind account per address.`,
                });
            }
        }

        const newAddress = {
            ...rest,
            id: uuidv4(),
            userId: user.id,
            address,
            ...(postalCode !== undefined && { postalCode: toPostalCode(postalCode) }),
        };

        addresses.push(newAddress);
        db.addresses = addresses;
        dbService.writeDB(db);

        res.status(201).json(newAddress);
    }),

    updateAddress: handle('Failed to update address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const addresses: Row[] = db.addresses || [];
        const index = addresses.findIndex(a => sameId(a.id, id) && sameId(a.userId, user.id));

        if (index === -1) throw new HttpError(404, 'Address record not found');

        const updateData = omitKeys(req.body, SERVER_OWNED_FIELDS);

        if (updateData.address !== undefined && cleanText(updateData.address, 300) === null) {
            throw new HttpError(400, 'Invalid address', { address: 'Invalid address' });
        }
        if (updateData.postalCode !== undefined) {
            updateData.postalCode = toPostalCode(updateData.postalCode);
        }

        addresses[index] = { ...addresses[index], ...updateData };

        db.addresses = addresses;
        dbService.writeDB(db);

        res.status(200).json(addresses[index]);
    }),

    deleteAddress: handle('Failed to delete address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const addresses: Row[] = db.addresses || [];
        const deletedAddress = addresses.find(a => sameId(a.id, id) && sameId(a.userId, user.id));

        if (!deletedAddress) throw new HttpError(404, 'Адрес не найден');

        db.addresses = addresses.filter(a => a !== deletedAddress);
        dbService.writeDB(db);

        res.json(deletedAddress);
    }),
};

export default addressesController;
