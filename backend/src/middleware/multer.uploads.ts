import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import multer, { type FileFilterCallback } from 'multer';
import type { Request } from 'express';
import { UPLOADS_ROOT } from '#middleware/upload.config';


const EXTENSION_BY_MIME: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
};

const ALLOWED_EXTENSIONS = /\.(jpeg|jpg|png|gif|webp)$/i;

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const isExtensionValid = ALLOWED_EXTENSIONS.test(path.extname(file.originalname));
    const isMimeValid = Object.hasOwn(EXTENSION_BY_MIME, file.mimetype);

    if (!isExtensionValid || !isMimeValid) {
        return cb(new Error('Only images are allowed!'));
    }

    cb(null, true);
};

const createUpload = (folder: string, prefix: string) => {
    const uploadDir = path.join(UPLOADS_ROOT, folder);
    fs.mkdirSync(uploadDir, { recursive: true });

    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadDir);
        },

        filename: (_req, file, cb) => {
            const unique = crypto.randomBytes(16).toString('hex');
            const extension = EXTENSION_BY_MIME[file.mimetype] ?? '';

            cb(null, `${prefix}-${Date.now()}-${unique}${extension}`);
        },
    });

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024,
            files: 5,
            fields: 50,
            fieldSize: 1024 * 1024,
            parts: 60,
        },
    });
};

export const productUpload = createUpload('products', 'product');

export const reviewUpload = createUpload('reviews', 'review');

export const avatarUpload = createUpload('avatars', 'avatar');