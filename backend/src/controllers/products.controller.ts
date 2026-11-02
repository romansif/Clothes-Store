import { v4 as uuidv4 } from './uuid';
import { type NextFunction, type Request, type Response } from 'express';
import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid, updateOwned, deleteOwned } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, requireUser, cleanText, parseJsonField,
    pickKeys, getUploadedFiles, assertImages, removeUploadedFiles, deleteUploadedFile,
} from '#db/security';

// Должен совпадать с лимитом в multer на роуте (productUpload.array('images', 5)).
const MAX_PRODUCT_IMAGES = 5;
const MAX_SEARCH_LENGTH = 100;
const PAGE_MAX = 500;
const PRODUCT_IMAGES_DIR = 'uploads/products/';

const PRODUCT_FIELDS = [
    'title', 'collection', 'category', 'material', 'gender', 'sku',
    'description', 'sizes', 'colors', 'status',
] as const;

const TEXT_LIMITS: Record<string, number> = {
    category: 100,
    material: 100,
    gender: 50,
    sku: 100,
    description: 5000,
    status: 50,
};

// ---- фильтрация в базе ---------------------------------------------------
// Фильтры, поиск и сортировка выполняет Postgres. Таблица целиком в память не выгружается,
// а наличие считается по актуальным variants в момент запроса.

const productsQuery = () => supabase.from('products').select('*');
type ProductsQuery = ReturnType<typeof productsQuery>;

// stock = true: STATUS — это наличие (Availability / Exhausted), иначе — поле status.
// Для Availability / Exhausted нужна SQL-функция in_stock() из migration.sql.
const applyFilter = (query: ProductsQuery, type: string, filter: string, stock: boolean): ProductsQuery => {
    switch (type) {
        case 'CATEGORY':
            return query.eq('category', filter);
        case 'SIZE':
            // для jsonb массив нужно передавать JSON-строкой
            return query.contains('sizes', JSON.stringify([filter]));
        case 'COLOR':
            return query.contains('colors', JSON.stringify([{ colorName: filter }]));
        case 'GENDER':
            return query.eq('gender', filter);
        case 'STATUS':
            if (!stock) return query.eq('status', filter);
            if (filter === 'Availability') return query.eq('in_stock', true);
            if (filter === 'Exhausted') return query.eq('in_stock', false);
            return query;
        default:
            return query;
    }
};

const pageOf = (req: Request): { from: number; to: number } => {
    const limit = Math.min(Math.max(Math.trunc(Number(req.query.limit)) || PAGE_MAX, 1), PAGE_MAX);
    const offset = Math.max(Math.trunc(Number(req.query.offset)) || 0, 0);
    return { from: offset, to: offset + limit - 1 };
};

const listProducts = async (query: ProductsQuery, req: Request, ascending = false): Promise<Row[]> => {
    const { from, to } = pageOf(req);

    return unwrap(
        await query
            .order('created_at', { ascending })
            .order('id', { ascending: true }) // стабильный порядок для пагинации
            .range(from, to),
    );
};

const daysAgo = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

// значение в двойных кавычках для фильтров PostgREST (запятые, скобки и т.д. внутри значения безопасны)
const quote = (value: string): string => `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

// ---- валидация -----------------------------------------------------------

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

const toList = (value: unknown, field: string): unknown[] => {
    if (value === undefined || value === null || value === '') return [];
    if (!Array.isArray(value)) {
        throw new HttpError(400, `Invalid ${field}`, { [field]: `Invalid ${field}` });
    }
    return value;
};

const cleanTextFields = (data: Row): void => {
    for (const [field, max] of Object.entries(TEXT_LIMITS)) {
        const value = data[field];
        if (value === undefined || value === null || value === '') continue;

        const text = cleanText(value, max);
        if (text === null) throw new HttpError(400, `Invalid ${field}`, { [field]: `Invalid ${field}` });
        data[field] = text;
    }
};

// ---- вспомогательное -----------------------------------------------------

const ownProduct = async (id: string, userId: string): Promise<Row | null> =>
    isUuid(id)
        ? unwrap(await supabase.from('products').select('*').eq('id', id).eq('userId', userId).maybeSingle())
        : null;

// удаляем с диска только файлы из папки товаров
const removeProductImages = (images: unknown): void => {
    if (!Array.isArray(images)) return;

    for (const image of images) {
        if (typeof image === 'string' && image.startsWith(PRODUCT_IMAGES_DIR) && !image.includes('..')) {
            deleteUploadedFile(image);
        }
    }
};

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
    getAllProducts: handle('Failed to get the product list', async (req, res) => {
        res.json(await listProducts(productsQuery(), req, true));
    }),

    getFilteredProducts: handle('Failed to get the filtered product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        res.json(await listProducts(applyFilter(productsQuery(), type, filter, true), req));
    }),

    getWeekProducts: handle('Failed to get the week product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        const query = productsQuery().gte('created_at', daysAgo(7).toISOString());

        res.json(await listProducts(applyFilter(query, type, filter, false), req));
    }),

    getYearProducts: handle('Failed to get the year product list', async (req, res) => {
        const type = param(req, 'type');
        const filter = param(req, 'filter');

        const query = productsQuery().gte('created_at', daysAgo(365).toISOString());

        res.json(await listProducts(applyFilter(query, type, filter, false), req));
    }),

    getCollections: handle('Failed to get the collection product list', async (req, res) => {
        const collection = param(req, 'collection');

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        let query = productsQuery().gte('created_at', sixMonthsAgo.toISOString());

        if (collection && collection !== 'ALL') {
            const value = quote(collection);
            query = query.or(`collection->>name.eq.${value},collection->>season.eq.${value}`);
        }

        res.json(await listProducts(query, req));
    }),

    getSearchedProducts: handle('Failed to get the searched product list', async (req, res) => {
        // оставляем буквы, цифры, пробелы, точку и дефис: так в строку фильтра не попадут
        // служебные символы PostgREST и подстановочные знаки LIKE
        const search = String(req.query.search || '')
            .slice(0, MAX_SEARCH_LENGTH)
            .replace(/[^\p{L}\p{N}\s.-]/gu, '')
            .trim();

        let query = productsQuery();

        if (search) {
            const pattern = `*${search}*`;
            query = query.or(
                ['title', 'category', 'material', 'description', 'gender', 'collection->>name']
                    .map(column => `${column}.ilike.${pattern}`)
                    .join(','),
            );
        }

        res.json(await listProducts(query, req));
    }),

    getMyProducts: handle('Failed to get my stack products', async (req, res) => {
        const id = param(req, 'id');

        if (!isUuid(id)) {
            res.json([]);
            return;
        }

        res.json(await listProducts(productsQuery().eq('userId', id), req));
    }),

    getProductsById: handle('Failed to get the product by id', async (req, res) => {
        const id = param(req, 'id');

        const product = isUuid(id)
            ? unwrap(await supabase.from('products').select('*').eq('id', id).maybeSingle())
            : null;

        if (!product) throw new HttpError(404, 'Product not found');

        res.json(product);
    }),

    createdProduct: handle('Failed to create the product', async (req, res) => {
        const files = getUploadedFiles(req);

        try {
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

            const fields = pickKeys(body, PRODUCT_FIELDS);
            cleanTextFields(fields);

            const newProduct = unwrap(
                await supabase.from('products').insert({
                    ...fields,
                    id: uuidv4(),
                    userId: seller.id,
                    images: files.map(file => `${PRODUCT_IMAGES_DIR}${file.filename}`),
                    title,
                    sizes: toList(body.sizes, 'sizes'),
                    colors: toList(body.colors, 'colors'),
                    price: toPrice(body.price),
                    variants: normalizeVariants(body.variants),
                }).select().single(),
            );

            res.status(201).json(newProduct);
        } catch (error) {
            // товар не создан — загруженные фото не должны остаться мусором на диске
            removeUploadedFiles(files);
            throw error;
        }
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

        try {
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

            // чужой товар для продавца выглядит как несуществующий
            const product = await ownProduct(id, user.id);
            if (!product) throw new HttpError(404, 'Product not found.');

            const uploaded = files.map(file => `${PRODUCT_IMAGES_DIR}${file.filename}`);
            const current: string[] = Array.isArray(product.images) ? [...product.images] : [];
            const targetIndex = index === '' ? NaN : Number(index);

            let nextImages: string[];
            let replaced: string[];
            let unused: typeof files = [];

            if (Number.isInteger(targetIndex)) {
                if (targetIndex < 0 || targetIndex >= current.length) {
                    throw new HttpError(400, 'Image index is out of range.');
                }
                nextImages = [...current];
                nextImages[targetIndex] = uploaded[0]!;
                replaced = [current[targetIndex]!];
                unused = files.slice(1); // заменяется одна картинка, остальные загруженные не нужны
            } else {
                nextImages = uploaded;
                replaced = current;
            }

            const updated = unwrap(
                await supabase.from('products')
                    .update({ images: nextImages })
                    .eq('id', product.id).eq('userId', user.id)
                    .select().single(),
            );

            // база обновлена: убираем с диска заменённые и неиспользованные файлы
            removeProductImages(replaced);
            if (unused.length) removeUploadedFiles(unused);

            res.status(200).json(updated);
        } catch (error) {
            removeUploadedFiles(files);
            throw error;
        }
    }),

    updateProductItem: handle('Failed to update the product', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        // форма редактирования шлёт `collections`, а колонка называется `collection`
        const picked = pickKeys(req.body, [...PRODUCT_FIELDS, 'collections', 'price', 'variants']);
        if ('collections' in picked) {
            picked.collection ??= picked.collections;
            delete picked.collections;
        }

        const changes: Row = Object.fromEntries(
            Object.entries(picked).filter(([, value]) => value !== '' && value !== null && value !== undefined),
        );

        if ('price' in changes) changes.price = toPrice(changes.price);
        if ('variants' in changes) changes.variants = normalizeVariants(changes.variants);
        if ('sizes' in changes) changes.sizes = toList(changes.sizes, 'sizes');
        if ('colors' in changes) changes.colors = toList(changes.colors, 'colors');
        if ('title' in changes) {
            const title = cleanText(changes.title, 200);
            if (!title) throw new HttpError(400, 'Invalid title', { title: 'Invalid title' });
            changes.title = title;
        }
        cleanTextFields(changes);

        // update идёт сразу с условием userId: править можно только свой товар
        const updated = Object.keys(changes).length
            ? await updateOwned('products', id, user.id, changes)
            : await ownProduct(id, user.id);

        if (!updated) throw new HttpError(404, 'Product not found');

        res.json(updated);
    }),

    deleteProduct: handle('Failed to delete the product', async (req, res) => {
        const user = requireUser(req);
        const id = param(req, 'id');

        const deleted = await deleteOwned('products', id, user.id);

        if (!deleted) throw new HttpError(404, 'Product not found');

        // фото удалённого товара больше не нужны. Корзины и избранное чистит ON DELETE CASCADE,
        // а в старых заказах остаётся снимок позиции (orderItems).
        removeProductImages(deleted.images);

        res.json(deleted);
    }),
};

export default productsController;
