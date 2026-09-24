import { v4 as uuidv4 } from 'uuid';
import { dbService } from "../../db/db.config.ts";
import {type NextFunction, type Request, type Response} from 'express';
import type {AuthenticatedRequest} from "../../interfaces.ts";

export const reviewsController = {
    async getReviews(_req: Request, res: Response) {
        try{
            const db = dbService.readDB();
            const reviews: any[] = db.reviews || [];

            res.json(reviews);
        }catch(err){
            console.error('Failed to get the review list:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async getFilteredReviews(req: Request, res: Response) {
        try{
            const { productId, filter } = req.params;

            const db = dbService.readDB();
            let reviews: any[] = db.reviews || [];

            reviews = reviews.filter(review => review.productId === productId)

            if(filter && filter !== 'All reviews'){
                if(filter === 'With photos'){
                    reviews = reviews.filter(review => review.images.length > 0);
                }else if(filter === 'Latest'){
                    reviews = reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                }else if(filter === 'Highest rated'){
                    reviews.sort((a, b) => b.rating - a.rating);
                }else if(filter === 'Lowest rated'){
                    reviews.sort((a, b) => a.rating - b.rating);
                }
            }

            res.json(reviews);
        }catch(err){
            console.error(`Failed to get the review list for user ${req.params.userId}:`, err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async createReview(req: AuthenticatedRequest, res: Response) {
        try{
            const db = dbService.readDB();
            const reviews: any[] = db.reviews || [];

            const files =
                (req.files as Express.Multer.File[] | undefined) ?? [];

            const images = files.map(file =>
                `uploads/reviews/${file.filename}`
            );

            const userId =
                req.user?.id || req.user?.userId;

            if (!userId) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            const newReview = {
                id: uuidv4(),
                userId,
                productId: req.body.productId,
                user: req.body.user,
                rating: Number(req.body.rating),
                comment: req.body.comment,
                images,
                created_at: new Date().toLocaleDateString(
                    'en-US',
                    {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    }
                ),
            };

            reviews.push(newReview);
            db.reviews = reviews;
            dbService.writeDB(db);

            res.status(201).json({message: 'Review added', data: newReview});
        }catch(err){
            console.error('Failed to add the review to the reviews:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    },

    async reviewParse(req: Request, _res: Response, next: NextFunction) {
        try {
            req.body = JSON.parse(req.body.review);
            next();
        } catch (error) {
            next(error);
        }
    },
}