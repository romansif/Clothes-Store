import express from "express";
import { validation } from "#middleware/validation.ts";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { shippingController } from "#controllers/users/shipping.controller.ts";

const router = express.Router();

router.get('/shipping/:paymentId', authMiddleware, shippingController.getShipping);

router.post('/shipping', authMiddleware, validation.shippingValidation,
    validation.handleValidationErrors, shippingController.addShipping);

export default router;