import express from "express";
import { authMiddleware, roleMiddleware } from "#middleware/auth.middleware.ts";
import { reviewsController } from "#controllers/reviews/reviews.controller.ts";
import { reviewUpload } from "#middleware/multer.uploads.ts";
import { validation } from "#middleware/validation.ts";

const router = express.Router();

router.get('/reviews/:productId/:filter', authMiddleware, reviewsController.getReviews);
router.post('/reviews', authMiddleware, roleMiddleware('Buyer'), reviewUpload.array('images', 4),
    reviewsController.reviewParse, validation.createReviewValidation, validation.handleValidationErrors,
    reviewsController.createReview);

export default router;