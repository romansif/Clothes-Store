import type { PostgrestError } from '@supabase/supabase-js';
import { type Row, HttpError, sameId } from './security';
import { supabase } from './supabase.ts';

type DbResult<T> = { data: T | null; error: PostgrestError | null };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Проверка до запроса: Postgres падает с 500, если в uuid-колонку попала не-uuid строка. */
export const isUuid = (value: unknown): value is string =>
    typeof value === 'string' && UUID_RE.test(value);

export const isUniqueViolation = (error: PostgrestError | null): boolean => error?.code === '23505';

/** Достаёт data или бросает 500 (детали ошибки уходят только в лог). */
export const unwrap = <T>({ data, error }: DbResult<T>): T => {
    if (error) {
        console.error('[db]', error.code, error.message);
        throw new HttpError(500, 'Internal server error');
    }
    return data as T;
};

/** Как unwrap, но нарушение unique-ограничения превращает в понятную 4xx-ошибку. */
export const unwrapOrConflict = <T>(result: DbResult<T>, conflict: HttpError): T => {
    if (isUniqueViolation(result.error)) throw conflict;
    return unwrap(result);
};

/** Строка корзины/избранного по id записи ИЛИ по productId (так работает фронт). */
export const findOwnedItem = async (
    table: 'cart' | 'favorites',
    userId: string,
    id: string,
): Promise<Row | null> => {
    if (!isUuid(id)) return null;

    const rows = unwrap(
        await supabase
            .from(table)
            .select('*')
            .eq('userId', userId)
            .or(`id.eq.${id},productId.eq.${id}`)
            .order('created_at', { ascending: true }),
    );

    return rows.find((row: Row) => sameId(row.id, id)) ?? rows[0] ?? null;
};

/** UPDATE своей записи. Пустой набор изменений просто возвращает запись. */
export const updateOwned = async (
    table: string,
    id: string,
    userId: string,
    changes: Row,
    conflict?: HttpError,
): Promise<Row | null> => {
    if (!isUuid(id)) return null;

    const query: any = Object.keys(changes).length
        ? supabase.from(table).update(changes).eq('id', id).eq('userId', userId).select()
        : supabase.from(table).select('*').eq('id', id).eq('userId', userId);

    const result = await query.maybeSingle();
    if (conflict && isUniqueViolation(result.error)) throw conflict;
    return unwrap(result);
};

/** DELETE своей записи, возвращает удалённую строку (или null). */
export const deleteOwned = async (table: string, id: string, userId: string): Promise<Row | null> => {
    if (!isUuid(id)) return null;

    const rows = unwrap(
        await supabase.from(table).delete().eq('id', id).eq('userId', userId).select(),
    );
    return rows[0] ?? null;
};