import express from "express";
import { validation } from "#middleware/validation.js";
import { authMiddleware } from "#middleware/auth.middleware.js";
import { addressesController } from "#controllers/users/addresses.controller.js";

const router = express.Router();

router.get('/address/:userId', authMiddleware, addressesController.getCheckoutAddresses);
router.get('/address/item/:id', authMiddleware, addressesController.getCheckoutAddress);

router.post('/address', authMiddleware, validation.addAddressValidation,
    validation.handleValidationErrors, addressesController.addCheckoutAddress);

router.post('/address/:id', authMiddleware, validation.addAddressValidation,
    validation.handleValidationErrors, addressesController.updateCheckoutAddress);

router.delete('/address/:id', authMiddleware, addressesController.deleteCheckoutAddress);

export default router;