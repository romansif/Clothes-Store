import express from "express";
import { validation } from "#middleware/validation.ts";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { addressesController } from "#controllers/users/addresses.controller.ts";

const router = express.Router();

router.get('/address/:userId', authMiddleware, addressesController.getAddresses);
router.get('/address/item/:id', authMiddleware, addressesController.getAddress);

router.post('/address', authMiddleware, validation.addAddressValidation,
    validation.handleValidationErrors, addressesController.addAddress);

router.put('/address/:id', authMiddleware, validation.addAddressValidation,
    validation.handleValidationErrors, addressesController.updateAddress);

router.delete('/address/:id', authMiddleware, addressesController.deleteAddress);

export default router;