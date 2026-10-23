import { v4 as uuidv4 } from 'uuid';
import { type NextFunction, type Request, type Response } from 'express';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, cleanText, parseJsonField,
    pickKeys, getUploadedFiles, assertImages, removeUploadedFiles, byNewest,
} from '#lib/security';

const MAX_PRODUCT_IMAGES = 10;
const MAX_SEARCH_LENGTH = 100;

const PRODUCT_FIELDS = [
    'title', 'collection', 'category', 'material', 'gender', 'sku',
    'description', 'sizes', 'colors', 'status',
] as const;


type StatusFilter = (products: Row[], filter: string) => Row[];

const variantsOf = (product: Row): Row[] => (Array.isArray(product.variants) ? product.variants : []);

const byStock: StatusFilter = (products, filter) => {
    if (filter === 'Availability') return products.filter(p => variantsOf(p).some(v => v.count > 0));
    if (filter === 'Exhausted') return products.filter(p => variantsOf(p).every(v => v.count === 0));
    return products;
};

const byStatusField: StatusFilter = (products, filter) => products.filter(p => p.status === filter);

const applyFilter = (products: Row[], type: string, filter: string, statusFilter: StatusFilter): Row[] => {
    switch (type) {
        case 'CATEGORY':
            return products.filter(p => p.category === filter);
        case 'SIZE':
            return products.filter(p => Array.isArray(p.sizes) && p.sizes.includes(filter));
        case 'COLOR':
            return products.filter(p => Array.isArray(p.colors) && p.colors.some((c: Row) => c?.colorName === filter));
        case 'STATUS':
            return statusFilter(products, filter);
        case 'GENDER':
            return products.filter(p => p.gender === filter);
        default:
            return products;
    }
};

const newerThan = (products: Row[], since: Date): Row[] =>
    products.filter(p => new Date(p.created_at) >= since);

const daysAgo = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

const toCount = (value: unknown): number => {
    const n = Math.trunc(Number(value));
    return Number.isFinite(n) && n > 0 ? n : 0;
};

const normalizeVariants = (raw: unknown): Row[] =>
    (Array.isArray(raw) ? raw : [])
        .filter((v: Row) => v?.hex && v?.size)
        .map((v: Row) => ({
            hex: v.hex,
            colorName: v.colorName,
            size: v.size,
            count: toCount(v.count),
        }));

const toPrice = (value: unknown): number => {
    const price = Number(value) || 0;
    if (price < 0) {
        throw new HttpError(400, 'Price cannot be negative', { price: 'Price cannot be negative' });
    }
    return price;
};

const requireSeller = (req: Request) => {
    const auth = requireUser(req);
    const account = (dbService.readDB().users || []).find((u: Row) => sameId(u.id, auth.id));

    if (!account || account.role !== 'Seller') {
        throw new HttpError(403, 'Only sellers can manage products');
    }
    return account;
};

const findOwnProduct = (products: Row[], id: string, userId: string): number =>
    products.findIndex(p => sameId(p.id, id) && sameId(p.userId, userId));

export const productsController = {
    getAllProducts: handle('Failed to get the product list', async (_req, res) => {
        res.json(dbService.readDB().products || []);
    }),

    getFilteredProducts: handle('Failed to get the filtered product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        const products: Row[] = [...(dbService.readDB().products || [])];

        res.json(applyFilter(products, type, filter, byStock).sort(byNewest));
    }),

    getWeekProducts: handle('Failed to get the week product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        const products = newerThan(dbService.readDB().products || [], daysAgo(7));

        res.json(applyFilter(products, type, filter, byStatusField).sort(byNewest));
    }),

    getYearProducts: handle('Failed to get the year product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        const products = newerThan(dbService.readDB().products || [], daysAgo(365));

        res.json(applyFilter(products, type, filter, byStatusField).sort(byNewest));
    }),

    getCollections: handle('Failed to get the collection product list', async (req, res) => {
        const collection = param(req, 'collection');
        const products: Row[] = dbService.readDB().products || [];

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const filtered = products.filter(product => {
            const createdAt = new Date(product.created_at);
            if (Number.isNaN(createdAt.getTime()) || createdAt < sixMonthsAgo) return false;

            if (!collection || collection === 'ALL') return true;

            return product.collection?.name === collection || product.collection?.season === collection;
        });

        res.json(filtered.sort(byNewest));
    }),

    getSearchedProducts: handle('Failed to get the searched product list', async (req, res) => {
        const search = String(req.query.search || '').trim().toLowerCase().slice(0, MAX_SEARCH_LENGTH);
        let products: Row[] = [...(dbService.readDB().products || [])];

        if (search) {
            const matches = (value: unknown) => !!value && String(value).toLowerCase().includes(search);

            products = products.filter(p =>
                matches(p.title) || matches(p.category) || matches(p.material) ||
                matches(p.description) || matches(p.gender) || matches(p.collection?.name)
            );
        }

        res.json(products.sort(byNewest));
    }),

    getMyProducts: handle('Failed to get my stack products', async (req, res) => {
        const id = param(req, 'id');
        const products: Row[] = dbService.readDB().products || [];

        res.json(products.filter(p => sameId(p.userId, id)).sort(byNewest));
    }),

    getProductsById: handle('Failed to get the product by id', async (req, res) => {
        const id = param(req, 'id');
        const products: Row[] = dbService.readDB().products || [];

        res.json(products.find(p => sameId(p.id, id)) || {});
    }),

    createdProduct: handle('Failed to create the product cover', async (req, res) => {
        const files = getUploadedFiles(req);
        const seller = requireSeller(req);

        if (files.length === 0) {
            throw new HttpError(400, 'Product photos are mandatory.');
        }
        if (files.length > MAX_PRODUCT_IMAGES) {
            throw new HttpError(400, `At most ${MAX_PRODUCT_IMAGES} photos per product.`);
        }
        assertImages(files);

        const body: Row = req.body ?? {};

        const title = cleanText(body.title, 200);
        if (!title) {
            throw new HttpError(400, 'Title is required', { title: 'Title is required' });
        }

        const db = dbService.readDB();
        const products: Row[] = db.products || [];

        const newProduct = {
            ...pickKeys(body, PRODUCT_FIELDS),
            id: uuidv4(),
            userId: seller.id,
            images: files.map(file => `uploads/products/${file.filename}`),
            title,
            price: toPrice(body.price),
            variants: normalizeVariants(body.variants),
            created_at: new Date(),
        };

        products.push(newProduct);
        db.products = products;
        dbService.writeDB(db);

        res.status(201).json(newProduct);
    }),

    productParse: async (req: Request, res: Response, next: NextFunction) => {
        const parsed = parseJsonField(req.body?.product);

        if (!parsed) {
            removeUploadedFiles(getUploadedFiles(req));
            res.status(400).json({ message: 'Invalid product payload' });
            return;
        }

        req.body = parsed;
        next();
    },

    updateProductImages: handle('Failed to update the product images', async (req, res) => {
        const files = getUploadedFiles(req);
        const user = requireUser(req);
        const id = param(req, 'id');
        const index = param(req, 'index');

        if (files.length === 0) {
            throw new HttpError(400, 'Product photos are mandatory.');
        }
        if (files.length > MAX_PRODUCT_IMAGES) {
            throw new HttpError(400, `At most ${MAX_PRODUCT_IMAGES} photos per product.`);
        }
        assertImages(files);

        const db = dbService.readDB();
        const products: Row[] = db.products || [];
        const productIndex = findOwnProduct(products, id, user.id);

        if (productIndex === -1) throw new HttpError(404, 'Product not found.');

        const product = products[productIndex]!;
        const images = files.map(file => `uploads/products/${file.filename}`);

        let updatedImages: string[] = Array.isArray(product.images) ? [...product.images] : [];
        const targetIndex = index === '' ? NaN : Number(index);

        if (Number.isInteger(targetIndex)) {
            if (updatedImages[targetIndex] !== undefined) {
                updatedImages[targetIndex] = images[0]!;
            }
        } else {
            updatedImages = images;
        }

        product.images = updatedImages;
        dbService.writeDB(db);

        res.status(201).json(product);
    }),

    updateProductItem: handle('Failed to update the product', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const products: Row[] = db.products || [];
        const index = findOwnProduct(products, id, user.id);

        if (index === -1) throw new HttpError(404, 'Product not found');

        const changes = Object.fromEntries(
            Object.entries(pickKeys(req.body, [...PRODUCT_FIELDS, 'price', 'variants']))
                .filter(([, value]) => value !== '' && value !== null && value !== undefined)
        );

        if ('price' in changes) changes.price = toPrice(changes.price);
        if ('variants' in changes) changes.variants = normalizeVariants(changes.variants);
        if ('title' in changes) {
            const title = cleanText(changes.title, 200);
            if (!title) throw new HttpError(400, 'Invalid title', { title: 'Invalid title' });
            changes.title = title;
        }

        products[index] = { ...products[index], ...changes };

        db.products = products;
        dbService.writeDB(db);

        res.json(products[index]);
    }),

    deleteProduct: handle('Failed to delete the product', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const db = dbService.readDB();
        const products: Row[] = db.products || [];
        const index = findOwnProduct(products, id, user.id);

        if (index === -1) throw new HttpError(404, 'Product not found');

        const deletedProduct = products[index]!;

        db.products = products.filter(p => p !== deletedProduct);
        dbService.writeDB(db);

        res.json(deletedProduct);
    }),
};

export default productsController;
