import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

dotenv.config();

import authRoutes from '#routes/auth.routes.js';

import usersRoutes from "#routes/users/users.routes.js";
import addressesRoutes from "#routes/users/addresses.routes.js";
import shippingRoutes from "#routes/users/shipping.routes.js";
import paymentsRoutes from "#routes/users/payments.routes.js";

import productsRoutes from "#routes/products/products.routes.js";
import cartRoutes from "#routes/products/cart.routes.js";
import favoritesRoutes from "#routes/products/favorite.routes.js";
import ordersRoutes from "#routes/products/orders.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api', usersRoutes);
app.use('/api', addressesRoutes);
app.use('/api', shippingRoutes);
app.use('/api', paymentsRoutes);
app.use('/api', productsRoutes);
app.use('/api', cartRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', ordersRoutes);

app.listen(PORT, () => {
    console.log(`✓ Сервер запущен на http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
});