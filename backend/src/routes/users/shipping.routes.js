import express from "express";
import { validation } from "#middleware/validation.js";
import { authMiddleware } from "#middleware/auth.middleware.js";
import { shippingController } from "#controllers/users/shipping.controller.js";

const router = express.Router();

router.post('/shipping', authMiddleware, validation.shippingValidation,
    validation.handleValidationErrors, shippingController.addShipping);

export default router;