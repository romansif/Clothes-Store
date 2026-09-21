import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer, { type FileFilterCallback } from 'multer';
import type { Request } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const allowedExtensions = /\.(jpeg|jpg|png|gif|webp)$/i;
    const allowedMimeTypes = /^image\/(jpeg|png|gif|webp)$/;

    const isExtensionValid = allowedExtensions.test(
        path.extname(file.originalname)
    );

    const isMimeValid = allowedMimeTypes.test(file.mimetype);

    if (!isExtensionValid || !isMimeValid) {
        return cb(new Error('Only images are allowed!'));
    }

    cb(null, true);
};

const createUpload = (
    folder: string,
    prefix: string
) => {
    const uploadDir = path.join(
        __dirname,
        `../uploads/${folder}`
    );

    // Если папки нет — создаст автоматически
    fs.mkdirSync(uploadDir, { recursive: true });

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadDir);
        },

        filename: (_req, file, cb) => {
            const uniqueSuffix =
                `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

            const extension = path
                .extname(file.originalname)
                .toLowerCase();

            cb(
                null,
                `${prefix}-${uniqueSuffix}${extension}`
            );
        },
    });

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    });
};

export const productUpload = createUpload(
    'products',
    'product'
);

export const reviewUpload = createUpload(
    'reviews',
    'review'
);

export const avatarUpload = createUpload(
    'avatars',
    'avatar'
);