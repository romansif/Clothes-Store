import express from "express";
import { upload } from "#middleware/upload.products.ts";
import { authMiddleware, roleMiddleware } from "#middleware/auth.middleware.ts";
import { productsController } from "#controllers/products/products.controller.ts";
import { validation } from "#middleware/validation.ts";

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/searched', productsController.getSearchedProducts);
router.get('/filtered/:type/:filter', productsController.getFilteredProducts);

router.get('/my/products/:id', productsController.getMyProducts);

router.get('/products/week/:type/:filter', productsController.getWeekProducts);
router.get('/products/year/:type/:filter', productsController.getYearProducts);
router.get('/products/collections/:collection', productsController.getCollections);

router.get('/products/:id', productsController.getProductsById);

router.post('/products', authMiddleware, roleMiddleware('Seller'), upload.array('images', 5),
    productsController.productParse, validation.createProductValidation, validation.handleValidationErrors,
    productsController.createdProduct);

router.patch('/products/:id/:index/images', authMiddleware, roleMiddleware('Seller'),
    upload.array('images', 5), productsController.updateProductImages);
router.patch('/products/:id', authMiddleware, productsController.updateProductItem);

router.delete('/products/:id', authMiddleware, roleMiddleware('Seller'),
    productsController.deleteProduct);


export default router;