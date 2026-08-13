import express from "express";
import { upload } from '#middleware/upload.avatar.ts'
import { validation } from "#middleware/validation.ts";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { usersController } from '#controllers/users/users.controller.ts'

const router = express.Router();

router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.get('/checkout', authMiddleware, usersController.getAllCheckout);

router.patch('/avatar/:id', authMiddleware, upload.single('avatar'), usersController.updateUserAvatar);
router.patch('/name/:id', authMiddleware, validation.updateUserNameValidation, validation.handleValidationErrors,
    usersController.updateUser);
router.patch('/surname/:id', authMiddleware, validation.updateUserSurNameValidation, validation.handleValidationErrors,
    usersController.updateUser);
router.patch('/phone/:id', authMiddleware, validation.updateUserPhoneValidation, validation.handleValidationErrors,
    usersController.updateUser);
router.patch('/companyName/:id', authMiddleware, validation.updateUserCompanyNameValidation, validation.handleValidationErrors,
    usersController.updateUser);
router.patch('/publicPhone/:id', authMiddleware, validation.updateUserPublicPhoneValidation, validation.handleValidationErrors,
    usersController.updateUser);
router.patch('/email/:id', authMiddleware, validation.updateUserEmailValidation, validation.handleValidationErrors,
    usersController.updateUser);

router.post('/password/:id', authMiddleware, validation.updateUserPasswordValidation, validation.handleValidationErrors,
    usersController.updateUserPassword);

router.delete('/users/:id', authMiddleware, usersController.deleteUser);


export default router;