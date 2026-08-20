import { v4 as uuidv4 } from 'uuid';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts';

export const cartController = {
    async getCart(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const db = dbService.readDB();
            const cart: any[] = db.cart || [];

            const userCart = cart.filter(item => String(item.userId) === String(userId));
            userCart.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(userCart);
        } catch (err) {
            console.error(`Failed to get the cart list for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async addToCart(req: AuthenticatedRequest, res: Response) {
        try {
            const { productId } = req.body;

            console.log('colors:', req.body.colors);

            const db = dbService.readDB();
            const products: any[] = db.products || [];

            const product = products.find(p => String(p.id) === String(productId));

            if (!product) return res.status(400).json({ message: 'Product not found' });

            const cart: any[] = db.cart || [];

            const newCartItem = {
                id: uuidv4(),
                userId: req.user?.id || req.user?.userId,
                ...req.body,
                created_at: new Date().toISOString(),
            };

            cart.push(newCartItem);
            db.cart = cart;
            dbService.writeDB(db);

            res.status(201).json({ message: 'Product added to cart', data: newCartItem });
        } catch (err) {
            console.error('Failed to add the product to the cart:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateCartItem(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const cart: any[] = db.cart || [];

            const index = cart.findIndex(item => String(item.id) === String(id) || String(item.productId) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            cart[index] = {
                ...cart[index],
                ...req.body
            };

            db.cart = cart;
            dbService.writeDB(db);

            res.json(cart[index]);
        } catch (err) {
            console.error(`Failed to update the cart item ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deleteCartItem(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const cart: any[] = db.cart || [];

            const index = cart.findIndex(item => String(item.id) === String(id) || String(item.productId) === String(id));

            if (index === -1) {
                return res.status(404).json({ message: "Cart Product not found" });
            }

            const deletedProduct = cart[index];

            db.cart = cart.filter(item => String(item.id) !== String(id) && String(item.productId) !== String(id));
            dbService.writeDB(db);

            res.json(deletedProduct);
        } catch (err) {
            console.error(`Failed to delete the product from cart ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default cartController;