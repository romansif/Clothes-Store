import { v4 as uuid4 } from 'uuid'
import { type Request, type Response } from "express";
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts'; // Подставь свой путь к файлу конфигурации

export const addressesController = {
    async getAddresses(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const db = dbService.readDB();
            const addresses: any[] = db.addresses || [];

            const userAddresses = addresses.filter(a => String(a.userId) === String(userId));

            return res.json(userAddresses);
        } catch (err) {
            console.error(`Failed to get user addresses for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getAddress(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const addresses: any[] = db.addresses || [];
            const address = addresses.find(a => String(a.id) === String(id));

            if (!address) return res.status(404).json({ message: "Address not found" });

            return res.json(address);
        } catch (err) {
            console.error(`Failed to get address ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async addAddress(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.user?.id || req.user?.userId;
            const { address, postalCode, ...rest } = req.body;

            const db = dbService.readDB();
            const addresses: any[] = db.addresses || [];

            if (address) {
                const existingAddress = addresses.find(a =>
                    String(a.userId) === String(userId) && a.address === address
                );

                if (existingAddress) {
                    return res.status(400).json({
                        message: `This address is already exist for this accounts.`,
                        errors: { email: `Limit reached. You can only have one of a kind account per address.` }
                    });
                }
            }

            const newAddress = {
                id: uuid4,
                userId,
                address,
                ...(postalCode !== undefined && { postalCode: Number(postalCode) }),
                ...rest
            };

            addresses.push(newAddress);
            db.addresses = addresses;
            dbService.writeDB(db);

            res.status(201).json(newAddress);
        } catch (err) {
            console.error('Failed to create the user address:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateAddress(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const addresses: any[] = db.addresses || [];
            const index = addresses.findIndex(a => String(a.id) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: 'Address record not found' });
            }

            const updateData = { ...req.body };
            if (updateData.postalCode !== undefined) {
                updateData.postalCode = Number(updateData.postalCode);
            }

            addresses[index] = {
                ...addresses[index],
                ...updateData
            };

            db.addresses = addresses;
            dbService.writeDB(db);

            res.status(200).json(addresses[index]);
        } catch (err) {
            console.error(`Failed to update address ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deleteAddress(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const addresses: any[] = db.addresses || [];
            const index = addresses.findIndex(a => String(a.id) === String(id));

            if (index === -1) return res.status(404).json({ message: "Адрес не найден" });

            const deletedAddress = addresses[index];

            db.addresses = addresses.filter(a => String(a.id) !== String(id));
            dbService.writeDB(db);

            res.json(deletedAddress);
        } catch (err) {
            console.error(`Failed to delete address ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default addressesController;