import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
import multer, { type FileFilterCallback } from 'multer';
import { type Request } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads/products');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/products')
        cb(null, uploadPath);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `product-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mainMatch = allowedTypes.test(file.mimetype);

    if (isMatch && mainMatch) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!') as unknown as null, false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Ограничение 5МБ
});