import express from 'express';
import productController from '../controllers/product.controller.js';

const router = express.Router();

router.post('/api/products', productController.createProduct);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);
router.put('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProductById);
router.delete('/api/products', productController.deleteAllProducts);
router.get('/api/products/search', productController.searchProductsByName);

export default router;
