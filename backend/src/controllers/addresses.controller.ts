import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid, updateOwned, deleteOwned } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, requireUser, requireSelf, pickKeys, cleanText, normalizeEmail,
} from '#db/security';

const ADDRESS_FIELDS = [
    'addressName', 'email', 'phone', 'firstName', 'lastName',
    'country', 'stateRegion', 'address', 'city', 'postalCode',
] as const;

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

// Чистит и обрезает пробелы у всех текстовых полей и записывает очищенное значение обратно.
// Раньше адрес только проверялся, а в базу уходила исходная строка, и «Main St » не считался дублем «Main St».
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

    updateAddress: handle('Failed to update address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const changes = pickKeys(req.body, ADDRESS_FIELDS);

        if (changes.address !== undefined && (typeof changes.address !== 'string' || !cleanText(changes.address, 300))) {
            throw new HttpError(400, 'Invalid address', { address: 'Invalid address' });
        }
        sanitize(changes);

        if (changes.address !== undefined && isUuid(id)) {
            const duplicates = unwrap(
                await supabase.from('addresses').select('id')
                    .eq('userId', user.id)
                    .eq('address', changes.address)
                    .neq('id', id)
                    .limit(1),
            );
            if (duplicates.length) throw duplicateAddress();
        }

        const updated = await updateOwned('addresses', id, user.id, changes, duplicateAddress());

        if (!updated) throw new HttpError(404, 'Address not found');

        res.status(200).json(updated);
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
