import { Router } from 'express';

import productController from '../controller/postController';

const productRouter = Router();

// 상품 목록 조회
productRouter.get('/products', productController.getProducts);

// 상품 단일 조회
productRouter.get('/products/:productId', productController.getProduct);

// 상품 추가 (관리자)
productRouter.post('/products', productController.addProduct);

// 상품 정보 수정 (관리자)
productRouter.put('/products/:productId', productController.updateProduct);

// 상품 삭제 (관리자)
productRouter.delete('/products/:productId', productController.deleteProduct);

export default productRouter;
