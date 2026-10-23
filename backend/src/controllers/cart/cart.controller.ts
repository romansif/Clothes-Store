import { v4 as uuidv4 } from 'uuid';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, requireSelf,
    omitKeys, byNewest, SERVER_OWNED_FIELDS,
} from '#lib/security';

const CART_UPDATE_PROTECTED = [...SERVER_OWNED_FIELDS, 'productId'] as const;

const matchesItem = (item: Row, id: string) => sameId(item.id, id) || sameId(item.productId, id);

export const cartController = {
    getCart: handle('Failed to get the cart list', async (req, res) => {
        const user = requireSelf(req, param(req, 'userId'));

        const cart: Row[] = dbService.readDB().cart || [];

        res.json(cart.filter(item => sameId(item.userId, user.id)).sort(byNewest));
    }),

    addToCart: handle('Failed to add the product to the cart', async (req, res) => {
        const user = requireUser(req);

        const body = omitKeys(req.body, SERVER_OWNED_FIELDS);
        if (body.productId === undefined || body.productId === null || body.productId === '') {
            throw new HttpError(400, 'productId is required');
        }

        const db = dbService.readDB();
        const products: Row[] = db.products || [];

        if (!products.some(p => sameId(p.id, body.productId))) {
            throw new HttpError(400, 'Product not found');
        }

        const cart: Row[] = db.cart || [];

        const newCartItem = {
            ...body,
            id: uuidv4(),
            userId: user.id,
            created_at: new Date().toISOString(),
        };

        cart.push(newCartItem);
        db.cart = cart;
        dbService.writeDB(db);

        res.status(201).json({ message: 'Product added to cart', data: newCartItem });
    }),

    updateCartItem: handle('Failed to update the cart item', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const cart: Row[] = db.cart || [];

        const index = cart.findIndex(item => sameId(item.userId, user.id) && matchesItem(item, id));

        if (index === -1) throw new HttpError(404, 'Cart item not found');

        cart[index] = {
            ...cart[index],
            ...omitKeys(req.body, CART_UPDATE_PROTECTED),
        };

        db.cart = cart;
        dbService.writeDB(db);

        res.json(cart[index]);
    }),

    deleteCartItem: handle('Failed to delete the product from cart', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const cart: Row[] = db.cart || [];

        const isTarget = (item: Row) => sameId(item.userId, user.id) && matchesItem(item, id);
        const deletedProduct = cart.find(isTarget);

        if (!deletedProduct) throw new HttpError(404, 'Cart Product not found');

        db.cart = cart.filter(item => !isTarget(item));
        dbService.writeDB(db);

        res.json(deletedProduct);
    }),
};

export default cartController;
