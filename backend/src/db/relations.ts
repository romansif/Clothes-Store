import { supabase } from '#db/supabase.ts';
import { unwrap } from '#db/query.ts';
import { type Row } from '#db/security';

// Положить рядом с query.ts и security.ts (папка #db).
//
// Правило: в cart / favorites / reviews хранятся только ссылки (productId, userId).
// Всё остальное (цена, фото, название, имя и аватар автора) читается из products / users
// в момент запроса, поэтому устареть оно не может.

const CHUNK_SIZE = 100; // ограничение длины URL у PostgREST при in (...)

const uniqueIds = (values: unknown[]): string[] => [
    ...new Set(values.filter((value): value is string => typeof value === 'string' && value !== '')),
];

export const fetchById = async (table: string, ids: unknown[], columns = '*'): Promise<Map<string, Row>> => {
    const list = uniqueIds(ids);
    const result = new Map<string, Row>();
    if (!list.length) return result;

    const chunks: string[][] = [];
    for (let i = 0; i < list.length; i += CHUNK_SIZE) chunks.push(list.slice(i, i + CHUNK_SIZE));

    const pages = await Promise.all(
        chunks.map(async (chunk): Promise<Row[]> =>
            unwrap(await supabase.from(table).select(columns).in('id', chunk)),
        ),
    );

    for (const row of pages.flat()) result.set(String(row.id), row);
    return result;
};

// Плоская запись «строка корзины/избранного + актуальные поля товара».
// id, userId, created_at берутся из самой строки; id продавца отдаётся как sellerId.
// Строки с удалённым товаром пропускаются.
export const withProducts = async (items: Row[]): Promise<Row[]> => {
    const products = await fetchById('products', items.map(item => item.productId));

    return items.flatMap((item): Row[] => {
        const product = products.get(String(item.productId));
        return product ? [{ ...product, sellerId: product.userId, ...item }] : [];
    });
};

// Подставляет в отзывы актуальные имя, фамилию и аватар автора из users.
export const withAuthors = async (reviews: Row[]): Promise<Row[]> => {
    const authors = await fetchById('users', reviews.map(review => review.userId), 'id, name, surName, avatarUrl');

    return reviews.map(review => {
        const author = authors.get(String(review.userId));
        return {
            ...review,
            user: {
                name: author?.name ?? '',
                surName: author?.surName ?? '',
                avatar: author?.avatarUrl ?? '',
            },
        };
    });
};
