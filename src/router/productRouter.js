import { Router } from 'express';

import { productController } from '../controller';

const productRouter = Router();

// 상품 목록 조회
productRouter.get('/products', productController.getAllProducts);

// 상품 단일 조회 (productId)
productRouter.get('/products/:productId', productController.getProductByProductId);

// 특정 카테고리의 상품 목록 조회
productRouter.get('/categories/:categoryId/products', productController.getProductsByCategoryId);

// 특정 카테고리(ex. 유니폼) 에 해당하는 모든 구단의 상품 목록 조회
productRouter.get('/categories/:categoryName', productController.getProductsByCategoryName);

// 상품 추가 (관리자)
productRouter.post('/categories/:categoryId/products', productController.postProduct);

export { productRouter };
