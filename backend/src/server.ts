import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import express, { type Request, type Response } from 'express';

dotenv.config();

import authRoutes from '#routes/auth/auth.routes.ts';

import usersRoutes from "#routes/users/users.routes.ts";
import addressesRoutes from "#routes/address/addresses.routes.ts";
import shippingRoutes from "#routes/shipping/shipping.routes.ts";
import paymentsRoutes from "#routes/payment/payments.routes.ts";

import productsRoutes from "#routes/products/products.routes.ts";
import cartRoutes from "#routes/cart/cart.routes.ts";
import favoritesRoutes from "#routes/favorite/favorite.routes.ts";
import ordersRoutes from "#routes/order/orders.routes.ts";
import reviewsRoutes from "#routes/reviews/reviews.routes.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
    reviewsRoutes
]

app.use('/api', apiRoutes);

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