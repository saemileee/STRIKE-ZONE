import { Router } from 'express';

import { productController } from '../controller';

import { upload } from '../image-uploader';

import { PRODUCT_IMG_PATH } from '../constants';

const productRouter = Router();

// 상품 목록 조회
productRouter.get('/products', productController.getAllProducts);

// 특정 팀의 전체 상품 조회
productRouter.get('/teams/:teamId/products', productController.getAllProductsByTeamId);

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
  [{ name: 'thumbnail' }, { name: 'subThumbnails' }, { name: 'detailDescription' }],
), productController.postProductWithImage);

// 상품 삭제 (productId)
productRouter.delete('/products/:productId', productController.deleteProductByProductId);

// 다수의 상품 일괄 삭제 (productId 배열을 받아 처리)
productRouter.delete('/products', productController.deleteProductsByProductIds);

// 썸네일 업로드만 처리
productRouter.post(
  '/products/thumbnail',
  upload.single('thumbnail'),
  async (req, res) => {
    const filenameOfThumbnail = req.file.filename;

    res.json({ thumbnail: PRODUCT_IMG_PATH + filenameOfThumbnail });
  },
);

// 서브 썸네일 업로드만 처리
productRouter.post(
  '/products/sub-thumbnails',
  upload.array('subThumbnails'),
  async (req, res) => {
    const subThumbnails = req.files;

    console.log(req.files);

    const filenamesOfSubthumbnail = subThumbnails.map(
      (subThumbnail) => PRODUCT_IMG_PATH + subThumbnail.filename,
    );

    res.json({ subThumbnails: filenamesOfSubthumbnail });
  },
);

// 상품 상세 정보 이미지 업로드만 처리
productRouter.post(
  '/products/detail-description',
  upload.single('detailDescription'),
  async (req, res) => {
    const filenameOfDetail = req.file.filename;

    res.json({ detailDescription: PRODUCT_IMG_PATH + filenameOfDetail });
  },
);

export { productRouter };
