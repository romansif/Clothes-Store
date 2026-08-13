import express from "express";
import authController from '#controllers/auth.controller.ts'
import { validation } from "#middleware/validation.ts";

const router = express.Router();

router.post('/auth/signUp', validation.registerValidation, validation.handleValidationErrors, authController.register);
router.post('/auth/signIn', validation.loginValidation, validation.handleValidationErrors, authController.login);
router.post('/auth/google', validation.handleValidationErrors, authController.google);
router.post('/auth/logout', authController.logout);
router.post('/refresh', authController.refresh);

export default router;