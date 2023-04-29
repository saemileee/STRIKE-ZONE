import { productService } from '../services';

const productController = {

  // 전체 상품 조회
  async getAllProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 팀의 모든 상품 조회
  async getAllProductsByTeamId(req, res, next) {
    try {
      const { teamId } = req.params;

      const products = await productService.getAllProductsByTeamId(teamId);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 팀의 카테고리의 상품 목록 조회
  async getProductsByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;

      const products = await productService.getProductsByCategoryId(categoryId);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 카테고리(ex. 유니폼)에 해당하는 모든 팀의 상품 목록 조회
  async getProductsByCategoryName(req, res, next) {
    try {
      const { categoryName } = req.params;

      const products = await productService.getProductsByCategoryName(categoryName);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 productID 상품 조회
  async getProductByProductId(req, res, next) {
    try {
      const { productId } = req.params;

      const product = await productService.getProductByProductId(productId);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  // 상품 추가
  async postProduct(req, res, next) {
    const { categoryId } = req.params;
    const {
      name, inventory, price, rate, shortDescription, detailDescription, img,
    } = req.body;

    const productInfo = {
      name, inventory, price, rate, shortDescription, detailDescription, img,
    };

    try {
      await productService.postProduct(categoryId, productInfo);

      res.status(201).json({ result: 'product created successfully.' });
    } catch (error) {
      next(error);
    }
  },

  // 상품 수정
  async updateProductByProductId(req, res, next) {
    try {
      const { productId } = req.params;
      const updateInfo = req.body;

      await productService.updateProductByProductId(productId, updateInfo);

      res.status(200).json({ result: 'product updated successfully.' });
    } catch (error) {
      next(error);
    }
  },

  // 상품 삭제
  async deleteProductByProductId(req, res, next) {
    try {
      const { productId } = req.params;

      await productService.deleteProductByProductId(productId);

      res.status(200).json({ result: 'product deleted successfully.' });
    } catch (error) {
      next(error);
    }
  },

  // 상품 추가 API : 이미지 업로드 포함
  async postProductWithImage(req, res, next) {
    try {
      const result = await productService.postProductWithImage(req);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // 다수의 상품 삭제 삭제
  async deleteProductsByProductIds(req, res, next) {
    try {
      const { productIds } = req.body;

      const deletedCount = await productService.deleteProductsByProductIds(productIds);

      if (deletedCount <= 0) {
        res.status(200).json({ result: '다수의 상품 삭제에 문제가 발생했습니다.' });
        return;
      }

      res.status(200).json({ result: `${deletedCount}개의 상품이 제거되었습니다.` });
    } catch (error) {
      next(error);
    }
  },

};

export { productController };
