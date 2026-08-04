import express from "express";
import { validation } from "#middleware/validation.js";
import { upload } from "#middleware/upload.products.js";
import { authMiddleware } from "#middleware/auth.middleware.js";
import { productsController } from "#controllers/products/products.controller.js";

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/searched', productsController.getSearchedProducts);
router.get('/filtered/:type/:filter', productsController.getFilteredProducts);
router.get('/stack/:userId', productsController.getMyStackProducts);
router.get('/out/of/stack/:userId', productsController.getMyOutOfStackProducts);
router.get('/products/:id', productsController.getProductsById);

router.post('/products', authMiddleware, upload.array('images', 5), validation.createProductValidation,
    validation.handleValidationErrors, productsController.createdProduct);

router.patch('/products/:id', authMiddleware, productsController.updateProductItem);

router.delete('/products/:id', authMiddleware, productsController.deleteProduct);


export default router;