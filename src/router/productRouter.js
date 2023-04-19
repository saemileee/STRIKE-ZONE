import { Router } from 'express';

import { productController } from '../controller';

const productRouter = Router();

// 상품 목록 조회
productRouter.get('/', productController.getProducts);

// 상품 단일 조회
productRouter.get('/:productId', productController.getProduct);

// 상품 추가 (관리자)
productRouter.post('/', productController.addProduct);

// 상품 정보 수정 (관리자)
productRouter.put('/:productId', productController.updateProduct);

// 상품 삭제 (관리자)
productRouter.delete('/:productId', productController.deleteProduct);

export { productRouter };
