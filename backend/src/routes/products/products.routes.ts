import express from "express";
import { upload } from "#middleware/upload.products.ts";
import { authMiddleware } from "#middleware/auth.middleware.ts";
import { productsController } from "#controllers/products/products.controller.ts";

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/searched', productsController.getSearchedProducts);
router.get('/filtered/:type/:filter', productsController.getFilteredProducts);

router.get('/my/products/:userId', productsController.getMyProducts);

router.get('/products/week/:type/:filter', productsController.getWeekProducts);
router.get('/products/year/:type/:filter', productsController.getYearProducts);
router.get('/products/collections/:collection', productsController.getCollections);

router.get('/products/:id', productsController.getProductsById);

router.post('/products', authMiddleware, upload.array('images', 5), productsController.createdProduct);

router.patch('/products/:id/:index/images', authMiddleware, upload.array('images', 5),
    productsController.updateProductImages);
router.patch('/products/:id', authMiddleware, productsController.updateProductItem);

router.delete('/products/:id', authMiddleware, productsController.deleteProduct);


export default router;