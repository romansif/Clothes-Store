import express from "express";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { ordersController } from "#controllers/orders.controller.ts";

const router = express.Router();

// Заказы
router.get('/orders', authMiddleware, ordersController.getAllOrders);                       // админ

router.get('/orders/active/:userId', authMiddleware, ordersController.getFilteredOrders);

router.get('/orders/details/:id', authMiddleware, ordersController.getOrder);               // заказ + позиции

router.get('/orders/stats/products', authMiddleware, ordersController.getSellerSalesStats);          // все товары продавца

router.get('/orders/stats/product/:productId', authMiddleware, ordersController.getProductSalesStats); // один товар

router.get('/orders/seller/items', authMiddleware, ordersController.getSellerOrderItems);           // позиции продавца к отправке

router.get('/orders/:userId', authMiddleware, ordersController.getOrders);

router.post('/orders', authMiddleware, ordersController.addOrder);

router.patch('/orders/:id', authMiddleware, ordersController.updateOrder);                  // отмена / статус заказа

router.delete('/orders/:id', authMiddleware, ordersController.deleteOrder);

// Позиции заказа
router.get('/orders/:orderId/items', authMiddleware, ordersController.getOrderItems);

router.get('/orders/:orderId/items/:itemId', authMiddleware, ordersController.getOrderItem);

router.patch('/orders/:orderId/items/:itemId', authMiddleware, ordersController.updateOrderItem); // отмена / статус позиции

export default router;