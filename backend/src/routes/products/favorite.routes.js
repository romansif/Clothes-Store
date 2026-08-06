import express from "express";
import { authMiddleware } from "#middleware/auth.middleware.js";
import { favoritesController } from "#controllers/products/favorites.controller.js";

const router = express.Router();

router.get('/favorites/:userId', authMiddleware, favoritesController.getFavorites);

router.post('/favorites', authMiddleware, favoritesController.addToFavorite);

router.patch('/favorites/:id', authMiddleware, favoritesController.updateFavoriteItems);

router.delete('/favorites/:id', authMiddleware, favoritesController.deleteFavorite);


export default router;