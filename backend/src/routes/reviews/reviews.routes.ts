import express from "express";
import { reviewsController } from "#controllers/reviews/reviews.controller.ts";
import {authMiddleware, roleMiddleware} from "#middleware/auth.middleware.ts";

const router = express.Router();

router.get('/reviews/:productId', authMiddleware, roleMiddleware('Buyer'), reviewsController.getReviews);
router.post('/reviews', authMiddleware, roleMiddleware('Buyer'), reviewsController.createReview);

export default router;