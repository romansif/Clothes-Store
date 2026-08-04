import express from "express";
import { validation } from "#middleware/validation.js";
import { authMiddleware } from "#middleware/auth.middleware.js";
import { paymentsController } from "#controllers/users/payments.controller.js";

const router = express.Router();

router.get('/payment/:userId', authMiddleware, paymentsController.getCheckoutPayments);
router.get('/payment/item/:id', authMiddleware, paymentsController.getCheckoutPayment);

router.post('/payment', authMiddleware, validation.shippingValidation,
    validation.handleValidationErrors, paymentsController.addCheckoutPayments);

router.put('/payment/:id', authMiddleware, validation.paymentValidation,
    validation.handleValidationErrors, paymentsController.updateCheckoutPayment);

router.delete('/payment/:id', authMiddleware, paymentsController.deleteCheckoutPayment);


export default router;