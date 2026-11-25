import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid, deleteOwned } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, requireUser, requireSelf, pickKeys, cleanText, normalizeEmail, isPlainObject,
} from '#db/security';
import { type Request } from 'express';

const ADDRESS_TABLE = 'addresses';

const ADDRESS_FIELDS = [
    'addressName', 'email', 'phone', 'firstName', 'lastName',
    'country', 'stateRegion', 'address', 'city', 'postalCode',
] as const;

const ADDRESS_TEXT_FIELDS = {
    addressName: 100, firstName: 100, lastName: 100,
    country: 100, stateRegion: 100, address: 200, city: 100, phone: 32,
} as const;

const TEXT_LIMITS: Record<string, number> = {
    addressName: 100,
    phone: 32,
    firstName: 100,
    lastName: 100,
    country: 100,
    stateRegion: 100,
    address: 300,
    city: 100,
};

const toPostalCode = (value: unknown): number => {
    const code = Number(value);
    if (!Number.isFinite(code) || code < 0) {
        throw new HttpError(400, 'Invalid postal code', { postalCode: 'Invalid postal code' });
    }
    return code;
};

const sanitize = (data: Row): void => {
    for (const [field, max] of Object.entries(TEXT_LIMITS)) {
        if (data[field] === undefined || data[field] === null) continue;

        const text = cleanText(data[field], max);
        if (text === null) throw new HttpError(400, `Invalid ${field}`, { [field]: `Invalid ${field}` });
        data[field] = text;
    }

    if (data.email !== undefined && data.email !== null && data.email !== '') {
        const email = normalizeEmail(data.email);
        if (!email) throw new HttpError(400, 'Invalid email address.', { email: 'Enter a valid email address.' });
        data.email = email;
    }

    if (data.postalCode !== undefined) data.postalCode = toPostalCode(data.postalCode);
};

const duplicateAddress = () =>
    new HttpError(400, 'This address already exists on your account.', {
        address: 'You already have this address saved.',
    });


const requireUserId = (req: Request): string => {
    const userId = (req as Request & { user?: { userId?: string } }).user?.userId;
    if (!isUuid(userId)) throw new HttpError(401, 'Unauthorized');
    return userId;
};

export const addressesController = {
    getAddresses: handle('Failed to get user addresses', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const addresses = unwrap(
            await supabase.from('addresses').select('*')
                .eq('userId', user.id)
                .order('created_at', { ascending: true }),
        );

        res.json(addresses);
    }),

    getAddress: handle('Failed to get address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const address = isUuid(id)
            ? unwrap(await supabase.from('addresses').select('*').eq('id', id).eq('userId', user.id).maybeSingle())
            : null;

        if (!address) throw new HttpError(404, 'Address not found');

        res.json(address);
    }),

    addAddress: handle('Failed to create the user address', async (req, res) => {
        const user = requireUser(req);

        const fields = pickKeys(req.body, ADDRESS_FIELDS);

        if (typeof fields.address !== 'string' || !cleanText(fields.address, 300)) {
            throw new HttpError(400, 'Invalid address', { address: 'Invalid address' });
        }
        sanitize(fields);

        const existing = unwrap(
            await supabase.from('addresses').select('id')
                .eq('userId', user.id)
                .eq('address', fields.address)
                .limit(1),
        );
        if (existing.length) throw duplicateAddress();

        const created = unwrapOrConflict(
            await supabase.from('addresses').insert({ ...fields, userId: user.id }).select().single(),
            duplicateAddress(),
        );

        res.status(201).json(created);
    }),

    updateAddress: handle('Failed to update the address', async (req, res) => {
        const userId = requireUserId(req);
        const { id } = req.params;
        if (!isUuid(id)) throw new HttpError(400, 'Invalid address id.');

        const body = isPlainObject(req.body) ? req.body : {};
        const patch: Row = {};

        for (const [field, max] of Object.entries(ADDRESS_TEXT_FIELDS)) {
            if (body[field] === undefined) continue;
            const value = cleanText(body[field], max);
            if (!value) throw new HttpError(400, `Invalid ${field}.`, { [field]: `${field} is invalid.` });
            patch[field] = value;
        }

        if (body.email !== undefined) {
            const email = normalizeEmail(body.email);
            if (!email) throw new HttpError(400, 'Invalid email address.', { email: 'Enter a valid email address.' });
            patch.email = email;
        }

        if (body.postalCode !== undefined) {
            const postalCode = Number(body.postalCode);
            if (!Number.isInteger(postalCode) || postalCode <= 0 || postalCode > 999_999_999) {
                throw new HttpError(400, 'Invalid postal code.', { postalCode: 'Postal code is invalid.' });
            }
            patch.postalCode = postalCode;
        }

        if (!Object.keys(patch).length) throw new HttpError(400, 'Nothing to update.');

        const updated = unwrap(
            await supabase.from(ADDRESS_TABLE).update(patch).eq('id', id).eq('userId', userId).select('*').maybeSingle(),
        );
        if (!updated) throw new HttpError(404, 'Address not found.');

        res.json(updated);
    }),
    deleteAddress: handle('Failed to delete address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('addresses', id, user.id);

        if (!deleted) throw new HttpError(404, 'Address not found');

        res.json(deleted);
    }),
};

export default addressesController;
