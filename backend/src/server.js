import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api/', usersRoutes);
app.use('/api/', productsRoutes);

app.listen(PORT, () => {
    console.log(`✓ Сервер запущен на http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
});