import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'db.json');

type Database = Record<string, []>;

const createEmptyDB = (): Database => ({
    users: [],
    products: [],
    cart: [],
    favorites: [],
    addresses: [],
    shipping: [],
    payments: [],
    orders: [],
    reviews: [],
});

export const dbService = {
    readDB(): Database {
        try {
            if (!fs.existsSync(dbPath)) {
                const database = createEmptyDB();
                fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
                return database;
            }

            return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) as Database;
        } catch (error) {
            console.error('Ошибка чтения db.json:', error);
            return createEmptyDB();
        }
    },

    writeDB(database: Database): void {
        try {
            fs.writeFileSync(dbPath, JSON.stringify(database, null, 2), 'utf-8');
        } catch (error) {
            console.error('Ошибка записи в db.json:', error);
        }
    },
};
