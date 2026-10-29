import { type NextFunction, type Request, type Response } from 'express';
import { supabase } from '#db/supabase.ts';
import { unwrap, isUuid } from '#db/query.ts';
import {
    type Row, HttpError, handle, param, requireUser, cleanText, parseJsonField,
    getUploadedFiles, assertImages, removeUploadedFiles,
} from '#db/security';

const MAX_REVIEW_IMAGES = 10;
const MAX_COMMENT_LENGTH = 2000;

// В базе created_at — timestamptz, а фронт ждёт «Oct 29, 2026», как раньше.
const formatDate = (value: unknown): string => {
    const date = new Date(value as string);
    return Number.isNaN(date.getTime())
        ? String(value ?? '')
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const toApiReview = (review: Row): Row => ({ ...review, created_at: formatDate(review.created_at) });

const SORTS: Record<string, { column: string; ascending: boolean }> = {
    'Latest': { column: 'created_at', ascending: false },
    'Highest rated': { column: 'rating', ascending: false },
    'Lowest rated': { column: 'rating', ascending: true },
};

export const reviewsController = {
    getReviews: handle('Failed to get the review list', async (_req, res) => {
        const reviews = unwrap(
            await supabase.from('reviews').select('*').order('created_at', { ascending: true }),
        );

        res.json(reviews.map(toApiReview));
    }),

    getFilteredReviews: handle('Failed to get the filtered review list', async (req, res) => {
        const productId = param(req, 'productId');
        const filter = param(req, 'filter');

        if (!isUuid(productId)) {
            res.json([]);
            return;
        }

        const sort = Object.hasOwn(SORTS, filter) ? SORTS[filter]! : { column: 'created_at', ascending: true };

        let reviews: Row[] = unwrap(
            await supabase.from('reviews').select('*')
                .eq('productId', productId)
                .order(sort.column, { ascending: sort.ascending }),
        );

        if (filter === 'With photos') {
            reviews = reviews.filter(review => Array.isArray(review.images) && review.images.length > 0);
        }

        res.json(reviews.map(toApiReview));
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

        const product = isUuid(body.productId)
            ? unwrap(await supabase.from('products').select('id').eq('id', body.productId).maybeSingle())
            : null;

        if (!product) throw new HttpError(404, 'Product not found');

        const author = unwrap(
            await supabase.from('users').select('name, surName, avatarUrl').eq('id', user.id).maybeSingle(),
        );

        const newReview = unwrap(
            await supabase.from('reviews').insert({
                userId: user.id,
                productId: body.productId,
                user: {
                    name: author?.name ?? '',
                    surName: author?.surName ?? '',
                    avatar: author?.avatarUrl ?? '',
                },
                rating,
                comment,
                images: files.map(file => `uploads/reviews/${file.filename}`),
            }).select().single(),
        );

        res.status(201).json({ message: 'Review added', data: toApiReview(newReview) });
    }),

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