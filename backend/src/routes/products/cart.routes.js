import express from "express";
import { validation } from "#middleware/validation.js";
import { authMiddleware } from "#middleware/auth.middleware.js";
import { cartController } from "#controllers/products/cart.controller.js";

const router = express.Router();

router.get('/cart/:userId', authMiddleware, cartController.getCart);

router.post('/cart', authMiddleware, validation.addProductToCartValidation, validation.handleValidationErrors,
    cartController.addToCart);

router.patch('/cart/:id', authMiddleware, cartController.updateCartItem);

router.delete('/cart/:id', authMiddleware, cartController.deleteCartItem);


export default router;