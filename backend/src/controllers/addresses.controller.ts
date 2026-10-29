import { supabase } from '#db/supabase.ts';
import { unwrap, unwrapOrConflict, isUuid, updateOwned, deleteOwned } from '#db/query.ts';
import {
    HttpError, handle, param, requireUser, requireSelf, pickKeys, cleanText,
} from '#db/security';

const ADDRESS_FIELDS = [
    'addressName', 'email', 'phone', 'firstName', 'lastName',
    'country', 'stateRegion', 'address', 'city', 'postalCode',
] as const;

const toPostalCode = (value: unknown): number => {
    const code = Number(value);
    if (!Number.isFinite(code) || code < 0) {
        throw new HttpError(400, 'Invalid postal code', { postalCode: 'Invalid postal code' });
    }
    return code;
};

const duplicateAddress = () =>
    new HttpError(400, `This address is already exist for this accounts.`, {
        email: `Limit reached. You can only have one of a kind account per address.`,
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

        const { postalCode, ...fields } = pickKeys(req.body, ADDRESS_FIELDS);

        if (cleanText(fields.address, 300) === null) {
            throw new HttpError(400, 'Invalid address', { address: 'Invalid address' });
        }

        const existing = unwrap(
            await supabase.from('addresses').select('id')
                .eq('userId', user.id)
                .eq('address', fields.address)
                .limit(1),
        );
        if (existing.length) throw duplicateAddress();

        const created = unwrapOrConflict(
            await supabase.from('addresses').insert({
                ...fields,
                userId: user.id,
                ...(postalCode !== undefined && { postalCode: toPostalCode(postalCode) }),
            }).select().single(),
            duplicateAddress(),
        );

        res.status(201).json(created);
    }),

    updateAddress: handle('Failed to update address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const changes = pickKeys(req.body, ADDRESS_FIELDS);

        if (changes.address !== undefined && cleanText(changes.address, 300) === null) {
            throw new HttpError(400, 'Invalid address', { address: 'Invalid address' });
        }
        if (changes.postalCode !== undefined) {
            changes.postalCode = toPostalCode(changes.postalCode);
        }

        const updated = await updateOwned('addresses', id, user.id, changes, duplicateAddress());

        if (!updated) throw new HttpError(404, 'Address record not found');

        res.status(200).json(updated);
    }),

    deleteAddress: handle('Failed to delete address', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('addresses', id, user.id);

        if (!deleted) throw new HttpError(404, 'Адрес не найден');

        res.json(deleted);
    }),
};

export default addressesController;