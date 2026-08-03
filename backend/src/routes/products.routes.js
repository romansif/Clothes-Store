import express from "express";
import { validation } from "../middleware/validation.js";
import { upload } from "../middleware/upload.products.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getProductsController } from "../controllers/products-controllers/get.products.controller.js";
import { addProductsController } from "../controllers/products-controllers/add.products.controller.js";
import { updateProductsController } from "../controllers/products-controllers/update.products.controller.js";
import { deleteProductsController } from "../controllers/products-controllers/delete.products.controller.js";

const router = express.Router();

router.get('/products', getProductsController.getAllProducts);
router.get('/searched/products', getProductsController.getSearchedProducts);
router.get('/filtered/products/:type/:filter', getProductsController.getFilteredProducts);
router.get('/products/stack/:userId', getProductsController.getMyStackProducts);
router.get('/products/out/of/stack/:userId', getProductsController.getMyOutOfStackProducts);
router.get('/products/item/:id', getProductsController.getProductsById);

router.get('/cart/:userId', getProductsController.getCart);
router.get('/favorites/:userId', getProductsController.getFavorites);
router.get('/orders/:userId', authMiddleware, getProductsController.getOrders);
router.get('/filtered/orders/:userId', authMiddleware, getProductsController.getFilteredOrders);

router.post('/products', authMiddleware, upload.array('images', 5), validation.createProductValidation,
    validation.handleValidationErrors, addProductsController.createdProduct);
router.post('/cart', authMiddleware, validation.addProductToCartValidation, validation.handleValidationErrors,
    addProductsController.addToCart);
router.post('/favorites', authMiddleware, addProductsController.addToFavorite);
router.post('/orders', authMiddleware, addProductsController.addOrder);

router.patch('/products/:id', authMiddleware, updateProductsController.updateProductItem);
router.patch('/cart/:id', authMiddleware, updateProductsController.updateCartItem);
router.patch('/favorites/:id', authMiddleware, updateProductsController.updateFavoriteItems);

router.delete('/products/:id', authMiddleware, deleteProductsController.deleteProduct);
router.delete('/cart/:id', authMiddleware, deleteProductsController.deleteCartItem);
router.delete('/favorites/:id', authMiddleware, deleteProductsController.deleteFavorite);
router.delete('/order/:id', authMiddleware, deleteProductsController.deleteOrderItems);

export default router;