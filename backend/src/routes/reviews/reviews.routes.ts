import express from "express";
import { authMiddleware, roleMiddleware } from "#middleware/auth.middleware.ts";
import { reviewsController } from "#controllers/reviews/reviews.controller.ts";
import { reviewUpload } from "#middleware/multer.uploads.ts";

const router = express.Router();

router.get('/reviews/:productId/:filter', authMiddleware, reviewsController.getReviews);
router.post('/reviews', authMiddleware, roleMiddleware('Buyer'), reviewUpload.array('images', 4),
    reviewsController.reviewParse, reviewsController.createReview);

export default router;