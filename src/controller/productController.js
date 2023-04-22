import { productService } from '../services';

const productController = {

  // 전체 상품 조회
  async getAllProducts(request, response, next) {
    try {
      const products = await productService.getAllProducts();

      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 팀의 카테고리의 상품 목록 조회
  async getProductsByCategoryId(request, response, next) {
    try {
      const { categoryId } = request.params;

      const products = await productService.getProductsByCategoryId(categoryId);

      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 카테고리(ex. 유니폼)에 해당하는 모든 팀의 상품 목록 조회
  async getProductsByCategoryName(request, response, next) {
    try {
      const { categoryName } = request.params;

      const products = await productService.getProductsByCategoryName(categoryName);

      response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  // 특정 productID 상품 조회
  async getProductByProductId(request, response, next) {
    try {
      const { productId } = request.params;

      const product = await productService.getProductByProductId(productId);

      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },

  // 상품 추가
  async postProduct(request, response, next) {
    const { categoryId } = request.params;
    const {
      name, inventory, price, rate, shortDescription, detailDescription, img,
    } = request.body;

    const productInfo = {
      name, inventory, price, rate, shortDescription, detailDescription, img,
    };

    try {
      await productService.postProduct(categoryId, productInfo);

      response
        .status(201)
        .json({ result: 'success' });
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

};

export { productController };
