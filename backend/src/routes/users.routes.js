import express from "express";
import { upload } from '../middleware/upload.avatar.js'
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUsersController } from '../controllers/users-controllers/get.users.controller.js'
import { addUsersController } from '../controllers/users-controllers/add.users.controller.js'
import { updateUsersController } from '../controllers/users-controllers/update.users.controller.js'
import { deleteUsersController } from '../controllers/users-controllers/delete.users.controller.js'
import { validation } from "../middleware/validation.js";

const router = express.Router();

router.get('/users', authMiddleware, getUsersController.getUsers);
router.get('/users/:id', authMiddleware, getUsersController.getUserById);

router.get('/checkout', authMiddleware, getUsersController.getAllCheckout);

router.get('/checkout/address/:userId', authMiddleware, getUsersController.getCheckoutAddresses);
router.get('/checkout/address/item/:id', authMiddleware, getUsersController.getCheckoutAddress);

router.get('/checkout/payment/:userId', authMiddleware, getUsersController.getCheckoutPayments);
router.get('/checkout/payment/item/:id', authMiddleware, getUsersController.getCheckoutPayment);

router.post('/checkout/address', authMiddleware, validation.addAddressValidation,
    validation.handleValidationErrors, addUsersController.addCheckoutAddress);
router.post('/checkout/payment', authMiddleware, validation.shippingValidation,
    validation.handleValidationErrors, addUsersController.addCheckoutPayments);

router.put('/checkout/payment/:id', authMiddleware, updateUsersController.updateCheckoutPayment);

router.patch('/users/avata/:id', authMiddleware, upload.single('avatar'), updateUsersController.updateUserAvatar);
router.patch('/users/name/:id', authMiddleware, validation.updateUserNameValidation, validation.handleValidationErrors,
    updateUsersController.updateUser);
router.patch('/users/surName/:id', authMiddleware, validation.updateUserSurNameValidation, validation.handleValidationErrors,
    updateUsersController.updateUser);
router.patch('/users/phone/:id', authMiddleware, validation.updateUserPhoneValidation, validation.handleValidationErrors,
    updateUsersController.updateUser);
router.patch('/users/company/:id', authMiddleware, validation.updateUserCompanyNameValidation, validation.handleValidationErrors,
    updateUsersController.updateUser);
router.patch('/users/public/:id', authMiddleware, validation.updateUserPublicPhoneValidation, validation.handleValidationErrors,
    updateUsersController.updateUser);
router.patch('/users/email/:id', authMiddleware, validation.updateUserEmailValidation, validation.handleValidationErrors,
    updateUsersController.updateUser);
router.post('/users/password/:id', authMiddleware, validation.updateUserPasswordValidation, validation.handleValidationErrors,
    updateUsersController.updateUserPassword);

router.delete('/users/:id', authMiddleware, deleteUsersController.deleteUser);
router.delete('/checkout/address/:id', authMiddleware, deleteUsersController.deleteCheckoutAddress);
router.delete('/checkout/payment/:id', authMiddleware, deleteUsersController.deleteCheckoutPayment);

export default router;