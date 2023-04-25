import { Router } from 'express';

import { productController } from '../controller';

import { upload } from '../image-uploader';

const productRouter = Router();

// 상품 목록 조회
productRouter.get('/products', productController.getAllProducts);

// 상품 단일 조회 (productId)
productRouter.get('/products/:productId', productController.getProductByProductId);

// 상품 수정 (productId)
productRouter.put('/products/:productId', productController.updateProductByProductId);

// 특정 카테고리의 상품 목록 조회
productRouter.get('/categories/:categoryId/products', productController.getProductsByCategoryId);

// 특정 카테고리(ex. 유니폼) 에 해당하는 모든 구단의 상품 목록 조회
productRouter.get('/categories/:categoryName', productController.getProductsByCategoryName);

// 상품 추가 (관리자)
productRouter.post('/categories/:categoryId/products', productController.postProduct);

// 상품 추가하기 업데이트
productRouter.post('/categories/:categoryId/products/uploads', upload.fields(
  [{ name: 'thumbnail' }, { name: 'subThumbnails' }, { name: 'subThumbnails' }, { name: 'detailDescription' }],
), productController.postProductWithImage);

// 상품 삭제 (productId)
productRouter.delete('/products/:productId', productController.deleteProductByProductId);

// 다수의 상품 일괄 삭제 (productId 배열을 받아 처리)
productRouter.delete('/products', productController.deleteProductsByProductIds);

export { productRouter };
