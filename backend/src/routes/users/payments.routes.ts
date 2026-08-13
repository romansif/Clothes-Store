import express from "express";
import { validation } from "#middleware/validation.ts";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { paymentsController } from "#controllers/users/payments.controller.ts";

const router = express.Router();

router.get('/payment/:userId', authMiddleware, paymentsController.getPayments);
router.get('/payment/item/:id', authMiddleware, paymentsController.getPayment);

router.post('/payment', authMiddleware, validation.paymentValidation,
    validation.handleValidationErrors, paymentsController.addPayment);

router.put('/payment/:id', authMiddleware, validation.paymentValidation,
    validation.handleValidationErrors, paymentsController.updatePayment);

router.delete('/payment/:id', authMiddleware, paymentsController.deletePayment);


export default router;