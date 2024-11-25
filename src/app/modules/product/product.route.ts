import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/api/products', ProductController.createProduct);
router.get('/api/products', ProductController.getAllProducts);
// router.get('/api/products/:productId', ProductController.getSpecificProduct);
router.put('/api/products/:productId', ProductController.upadateProduct);

export const ProductRoutes = router;
