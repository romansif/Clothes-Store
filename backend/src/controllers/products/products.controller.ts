import { v4 as uuid4 } from 'uuid';
import { type Request, type Response } from 'express';
import { type AuthenticatedRequest } from '../../interfaces.ts';
import { dbService } from '../../db/db.config.ts';

export const productsController = {
    async getAllProducts(_req: Request, res: Response) {
        try {
            const db = dbService.readDB();
            const products: any[] = db.products || [];

            res.json(products);
        } catch (err) {
            console.error('Failed to get the product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getFilteredProducts(req: Request, res: Response) {
        try {
            const { type, filter } = req.params;
            const db = dbService.readDB();
            let products: any[] = [...(db.products || [])];

            if (type && type !== "ALL") {
                if (type === "CATEGORY") {
                    products = products.filter(p => p.category === filter);
                } else if (type === "SIZE") {
                    products = products.filter(p => Array.isArray(p.sizes) && p.sizes.includes(filter));
                } else if (type === "COLOR") {
                    products = products.filter(p => Array.isArray(p.colors) && p.colors.some((c: any) => c.colorName === filter));
                } else if (type === "STATUS") {
                    products = products.filter(p => p.status === filter);
                } else if (type === "GENDER") {
                    products = products.filter(p => p.gender === filter);
                }
            }

            products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(products);
        } catch (err) {
            console.error('Failed to get the filtered product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getWeekProducts (_req: Request, res: Response) {
        try {
            const sevenDayAgo = new Date();
            sevenDayAgo.setDate(sevenDayAgo.getDate() - 7);

            const db = dbService.readDB();
            const products: any[] = db.products || [];

            const weekProducts = products.filter(p => new Date(p.created_at) >= sevenDayAgo);
            weekProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(weekProducts);
        } catch (err) {
            console.error('Failed to get the week product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getYearProducts (req: Request, res: Response) {
        try {
            const { type, filter } = req.params;

            const last365Days = new Date();
            last365Days.setDate(last365Days.getDate() - 365);

            const db = dbService.readDB();
            let products: any[] = (db.products || []).filter((p: any) => new Date(p.created_at) >= last365Days);

            if (type && type !== "ALL") {
                if (type === "GENDER") {
                    products = products.filter(p => p.gender === filter);
                }
            }

            products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(products);
        } catch (err) {
            console.error('Failed to get the year product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getSearchedProducts(req: Request, res: Response) {
        try {
            const search = String(req.query.search || '').trim().toLowerCase();
            const db = dbService.readDB();
            let products: any[] = db.products || [];

            if (search) {
                products = products.filter(p => {
                    return (
                        (p.title && String(p.title).toLowerCase().includes(search)) ||
                        (p.category && String(p.category).toLowerCase().includes(search)) ||
                        (p.material && String(p.material).toLowerCase().includes(search)) ||
                        (p.description && String(p.description).toLowerCase().includes(search)) ||
                        (p.gender && String(p.gender).toLowerCase().includes(search))
                    );
                });
            }

            products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(products);
        } catch (err) {
            console.error('Failed to get the searched product list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getMyProducts(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const db = dbService.readDB();
            const products: any[] = db.products || [];

            const myProducts = products.filter(p => String(p.userId) === String(userId));
            myProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            res.json(myProducts);
        } catch (err) {
            console.error(`Failed to get my stack products:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getProductsById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const db = dbService.readDB();
            const products: any[] = db.products || [];

            const product = products.find(p => String(p.id) === String(id));

            res.json(product || {});
        } catch (err) {
            console.error(`Failed to get the product by id ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async createdProduct(req: AuthenticatedRequest, res: Response) {
        try {
            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({ message: 'Product photos are mandatory.' });
            }
            const files = req.files as Express.Multer.File[];
            const images = files.map((file: any) => `uploads/products/${file.filename}`);

            const db = dbService.readDB();
            const products: any[] = db.products || [];

            const newProduct = {
                id: uuid4,
                userId: req.user?.id || req.user?.userId,
                images,
                ...req.body,
                quantity: Number(req.body.quantity) || 0,
                price: Number(req.body.price) || 0,
                created_at: new Date().toISOString(),
                favorite: false,
                checked: false
            };

            products.push(newProduct);
            db.products = products;
            dbService.writeDB(db);

            res.status(201).json(newProduct);
        } catch (err) {
            console.error('Failed to create the product cover:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateProductImages(req: Request, res: Response) {
        try {
            const { id, index } = req.params;

            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({ message: 'Product photos are mandatory.' });
            }
            const files = req.files as Express.Multer.File[];
            const images = files.map((file: any) => `uploads/products/${file.filename}`);

            const targetIndex = index !== undefined && index !== null ? Number(index) : null;

            const db = dbService.readDB();
            const products: any[] = db.products || [];
            const product = products.find(p => String(p.id) === String(id));

            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            let updatedImage = product.images ? [...product.images] : [];

            if (targetIndex !== null && !isNaN(targetIndex)) {
                const newUrl = images[0];
                if (updatedImage[targetIndex] !== undefined) {
                    updatedImage[targetIndex] = newUrl;
                }
            } else {
                updatedImage = images;
            }

            product.images = updatedImage;
            dbService.writeDB(db);

            res.status(201).json(product);
        } catch (err) {
            console.error(`Failed to update the product images ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async updateProductItem(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const sanitizedBody = Object.fromEntries(
                Object.entries(req.body).filter(([_, value]) =>
                    value !== "" && value !== null && value !== undefined
                )
            );

            const db = dbService.readDB();
            const products: any[] = db.products || [];
            const index = products.findIndex(p => String(p.id) === String(id));

            if (index === -1) return res.status(404).json({ message: 'Product not found' });

            products[index] = {
                ...products[index],
                ...sanitizedBody
            };

            db.products = products;
            dbService.writeDB(db);

            return res.json(products[index]);
        } catch (err) {
            console.error(`Failed to update the product ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = dbService.readDB();
            const products: any[] = db.products || [];
            const index = products.findIndex(p => String(p.id) === String(id));

            if (index === -1) return res.status(404).json({ message: 'Product not found' });

            const deletedProduct = products[index];

            db.products = products.filter(p => String(p.id) !== String(id));
            dbService.writeDB(db);

            res.json(deletedProduct);
        } catch (err) {
            console.error(`Failed to delete the product ${req.params.id}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
};

export default productsController;