import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import express, { type Request, type Response } from 'express';

dotenv.config();

import authRoutes from '#routes/auth.routes.ts';

import usersRoutes from "#routes/users/users.routes.ts";
import addressesRoutes from "#routes/users/addresses.routes.ts";
import shippingRoutes from "#routes/users/shipping.routes.ts";
import paymentsRoutes from "#routes/users/payments.routes.ts";

import productsRoutes from "#routes/products/products.routes.ts";
import cartRoutes from "#routes/products/cart.routes.ts";
import favoritesRoutes from "#routes/products/favorite.routes.ts";
import ordersRoutes from "#routes/products/orders.routes.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const apiRoutes = [
    authRoutes,

    usersRoutes,
    addressesRoutes,
    shippingRoutes,
    paymentsRoutes,

    productsRoutes,
    cartRoutes,
    favoritesRoutes,
    ordersRoutes,
]

app.use('/lib', apiRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

interface CustomError extends Error {
    status?: number;
}

app.use((err: CustomError, _req: Request, res: Response) => {
    console.error('❌ Ошибка сервера:', err.stack || err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Внутренняя ошибка сервера',
    });
});

app.listen(PORT, () => {
    console.log(`✓ Сервер запущен на http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
});