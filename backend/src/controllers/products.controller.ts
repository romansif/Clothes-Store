import { v4 as uuidv4 } from 'uuid';
import { type NextFunction, type Request, type Response } from 'express';
import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid, deleteOwned } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, requireUser, cleanText, parseJsonField,
    pickKeys, getUploadedFiles, assertImages, removeUploadedFiles,
} from '#db/security';

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

// ---- запросы -------------------------------------------------------------

const newestProducts = async (): Promise<Row[]> =>
    unwrap(await supabase.from('products').select('*').order('created_at', { ascending: false }));

const productsSince = async (since: Date): Promise<Row[]> =>
    unwrap(
        await supabase.from('products').select('*')
            .gte('created_at', since.toISOString())
            .order('created_at', { ascending: false }),
    );

const ownProduct = async (id: string): Promise<Row | null> =>
    isUuid(id) ? unwrap(await supabase.from('products').select('*').eq('id', id).maybeSingle()) : null;

const requireSeller = async (req: Request) => {
    const auth = requireUser(req);

    const account = isUuid(auth.id)
        ? unwrap(await supabase.from('users').select('id, role').eq('id', auth.id).maybeSingle())
        : null;

    if (!account || account.role !== 'Seller') {
        throw new HttpError(403, 'Only sellers can manage products');
    }
    return account;
};

export const productsController = {
    getAllProducts: handle('Failed to get the product list', async (_req, res) => {
        res.json(unwrap(await supabase.from('products').select('*').order('created_at', { ascending: true })));
    }),

    getFilteredProducts: handle('Failed to get the filtered product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        res.json(applyFilter(await newestProducts(), type, filter, byStock));
    }),

    getWeekProducts: handle('Failed to get the week product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        res.json(applyFilter(await productsSince(daysAgo(7)), type, filter, byStatusField));
    }),

    getYearProducts: handle('Failed to get the year product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        res.json(applyFilter(await productsSince(daysAgo(365)), type, filter, byStatusField));
    }),

    getCollections: handle('Failed to get the collection product list', async (req, res) => {
        const collection = param(req, 'collection');

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const products = await productsSince(sixMonthsAgo);

        const filtered = products.filter(product => {
            if (!collection || collection === 'ALL') return true;

            return product.collection?.name === collection || product.collection?.season === collection;
        });

        res.json(filtered);
    }),

    getSearchedProducts: handle('Failed to get the searched product list', async (req, res) => {
        const search = String(req.query.search || '').trim().toLowerCase().slice(0, MAX_SEARCH_LENGTH);
        let products = await newestProducts();

        if (search) {
            const matches = (value: unknown) => !!value && String(value).toLowerCase().includes(search);

            products = products.filter(p =>
                matches(p.title) || matches(p.category) || matches(p.material) ||
                matches(p.description) || matches(p.gender) || matches(p.collection?.name)
            );
        }

        res.json(products);
    }),

    getMyProducts: handle('Failed to get my stack products', async (req, res) => {
        const id = param(req, 'id');

        if (!isUuid(id)) {
            res.json([]);
            return;
        }

        res.json(
            unwrap(
                await supabase.from('products').select('*')
                    .eq('userId', id)
                    .order('created_at', { ascending: false }),
            ),
        );
    }),

    getProductsById: handle('Failed to get the product by id', async (req, res) => {
        const id = param(req, 'id');

        const product = isUuid(id)
            ? unwrap(await supabase.from('products').select('*').eq('id', id).maybeSingle())
            : null;

        res.json(product || {});
    }),

    createdProduct: handle('Failed to create the product cover', async (req, res) => {
        const files = getUploadedFiles(req);
        const seller = await requireSeller(req);

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

        const newProduct = unwrap(
            await supabase.from('products').insert({
                ...pickKeys(body, PRODUCT_FIELDS),
                id: uuidv4(),
                userId: seller.id,
                images: files.map(file => `uploads/products/${file.filename}`),
                title,
                price: toPrice(body.price),
                variants: normalizeVariants(body.variants),
            }).select().single(),
        );

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
        const id = param(req, 'id');
        const index = param(req, 'index');

        if (files.length === 0) {
            throw new HttpError(400, 'Product photos are mandatory.');
        }
        if (files.length > MAX_PRODUCT_IMAGES) {
            throw new HttpError(400, `At most ${MAX_PRODUCT_IMAGES} photos per product.`);
        }
        assertImages(files);

        const product = await ownProduct(id);

        if (!product) throw new HttpError(404, 'Product not found.');

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

        const updated = unwrap(
            await supabase.from('products').update({ images: updatedImages }).eq('id', product.id).select().single(),
        );

        res.status(201).json(updated);
    }),

    updateProductItem: handle('Failed to update the product', async (req, res) => {
        const id = param(req, 'id');

        const product = await ownProduct(id);

        if (!product) throw new HttpError(404, 'Product not found');

        // форма редактирования шлёт `collections`, а колонка называется `collection`
        const picked = pickKeys(req.body, [...PRODUCT_FIELDS, 'collections', 'price', 'variants']);
        if ('collections' in picked) {
            picked.collection ??= picked.collections;
            delete picked.collections;
        }

        const changes = Object.fromEntries(
            Object.entries(picked).filter(([, value]) => value !== '' && value !== null && value !== undefined)
        );

        if ('price' in changes) changes.price = toPrice(changes.price);
        if ('variants' in changes) changes.variants = normalizeVariants(changes.variants);
        if ('title' in changes) {
            const title = cleanText(changes.title, 200);
            if (!title) throw new HttpError(400, 'Invalid title', { title: 'Invalid title' });
            changes.title = title;
        }

        const updated = Object.keys(changes).length
            ? unwrap(await supabase.from('products').update(changes).eq('id', product.id).select().single())
            : product;

        res.json(updated);
    }),

    deleteProduct: handle('Failed to delete the product', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('products', id, user.id);

        if (!deleted) throw new HttpError(404, 'Product not found');

        res.json(deleted);
    }),
};

export default productsController;