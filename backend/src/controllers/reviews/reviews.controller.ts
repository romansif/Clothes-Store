import { v4 as uuidv4 } from 'uuid';
import { type NextFunction, type Request, type Response } from 'express';
import { dbService } from '../../db/db.config.ts';
import {
    type Row, HttpError, handle, param, sameId, requireUser, cleanText, parseJsonField,
    getUploadedFiles, assertImages, removeUploadedFiles, byNewest,
} from '#lib/security';

const MAX_REVIEW_IMAGES = 10;
const MAX_COMMENT_LENGTH = 2000;

export const reviewsController = {
    getReviews: handle('Failed to get the review list', async (_req, res) => {
        const reviews: Row[] = dbService.readDB().reviews || [];

        res.json(reviews);
    }),

    getFilteredReviews: handle('Failed to get the filtered review list', async (req, res) => {
        const productId = param(req, 'productId');
        const filter = param(req, 'filter');

        const all: Row[] = dbService.readDB().reviews || [];
        let reviews = all.filter(review => sameId(review.productId, productId));

        if (filter && filter !== 'All reviews') {
            if (filter === 'With photos') {
                reviews = reviews.filter(review => Array.isArray(review.images) && review.images.length > 0);
            } else if (filter === 'Latest') {
                reviews.sort(byNewest);
            } else if (filter === 'Highest rated') {
                reviews.sort((a, b) => b.rating - a.rating);
            } else if (filter === 'Lowest rated') {
                reviews.sort((a, b) => a.rating - b.rating);
            }
        }

        res.json(reviews);
    }),

    createReview: handle('Failed to add the review to the reviews', async (req, res) => {
        const files = getUploadedFiles(req);
        const user = requireUser(req);

        if (files.length > MAX_REVIEW_IMAGES) {
            throw new HttpError(400, `At most ${MAX_REVIEW_IMAGES} photos per review.`);
        }
        assertImages(files);

        const body: Row = req.body ?? {};

        const rating = Number(body.rating);
        if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
            throw new HttpError(400, 'Rating must be between 1 and 5', { rating: 'Rating must be between 1 and 5' });
        }

        const comment = body.comment === undefined || body.comment === null ? '' : cleanText(body.comment, MAX_COMMENT_LENGTH);
        if (comment === null) {
            throw new HttpError(400, 'Comment is too long', { comment: `Comment must be at most ${MAX_COMMENT_LENGTH} characters` });
        }

        const db = dbService.readDB();
        const reviews: Row[] = db.reviews || [];
        const products: Row[] = db.products || [];

        if (!products.some(p => sameId(p.id, body.productId))) {
            throw new HttpError(404, 'Product not found');
        }

        const author = (db.users || []).find((u: Row) => sameId(u.id, user.id));
        const displayName = cleanText(body.user, 100) || [author?.name, author?.surName].filter(Boolean).join(' ');

        const newReview = {
            id: uuidv4(),
            userId: user.id,
            productId: body.productId,
            user: displayName,
            rating,
            comment,
            images: files.map(file => `uploads/reviews/${file.filename}`),
            created_at: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
        };

        reviews.push(newReview);
        db.reviews = reviews;
        dbService.writeDB(db);

        res.status(201).json({ message: 'Review added', data: newReview });
    }),

    /** Multipart requests carry the review as a JSON string in the `review` field. */
    reviewParse: (req: Request, res: Response, next: NextFunction) => {
        const parsed = parseJsonField(req.body?.review);

        if (!parsed) {
            removeUploadedFiles(getUploadedFiles(req));
            res.status(400).json({ message: 'Invalid review payload' });
            return;
        }

        req.body = parsed;
        next();
    },
};
