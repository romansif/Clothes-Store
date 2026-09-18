import { v4 as uuidv4 } from 'uuid';
import { dbService } from "../../db/db.config.ts";
import { type Request, type Response } from 'express';
import type {AuthenticatedRequest} from "../../interfaces.ts";

export const reviewsController = {
    async getReviews(req: Request, res: Response) {
        try{
            const { productId } = req.params;

            const db = dbService.readDB();
            const reviews: any[] = db.reviews || [];

            const productReviews = reviews.filter(review => review.productId === productId)

            res.json(productReviews)
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

            const date = new Date();

            const newReview = {
                id: uuidv4(),
                userId: req.user?.id || req.user?.userId,
                ...req.body,
                created_at: date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }),
            }

            reviews.push(newReview);
            db.reviews = reviews;
            dbService.writeDB(db);

            res.status(201).json({ message: 'Review added to cart', data: newReview });
        }catch(err){
            console.error('Failed to add the review to the reviews:', err);
            const message = err instanceof Error ? err.message : 'Unknown Error';
            res.status(500).json({ error: message });
        }
    }
}