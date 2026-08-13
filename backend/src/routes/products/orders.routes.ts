import express from "express";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { ordersController } from "#controllers/products/orders.controller.ts";
import { validation } from "#middleware/validation.ts";

const router = express.Router();

router.get('/orders/:userId', authMiddleware, ordersController.getOrders);

router.get('/orders/active/:userId', authMiddleware, ordersController.getFilteredOrders);

router.post('/orders', authMiddleware, ordersController.addOrder);

router.patch('/orders/:id', authMiddleware, validation.replaceOrderValidation, validation.handleValidationErrors,
    ordersController.updateOrder);

router.delete('/orders/:id', authMiddleware, ordersController.deleteOrderItems);


export default router;