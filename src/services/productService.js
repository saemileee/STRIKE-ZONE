import { productDAO } from '../data-access';

const productService = {
  // 전체 상품 목록 조회
  async getAllProducts() {
    const products = await productDAO.findAllProducts();
    return products;
  },

  // 특정 팀의 카테고리에 해당하는 상품 목록 조회
  async getProductsByCategoryId(categoryId) {
    const products = await productDAO.findProductsByCategoryId(categoryId);
    return products;
  },

  // 특정 카테고리(ex. 유니폼)에 속한 모든 팀의 상품 목록 조회
  async getProductsByCategoryName(categoryName) {
    const products = await productDAO.findProductsByCategoryName(categoryName);
    return products;
  },

  // 상품 상세 조회 (productId)
  async getProductByProductId(productId) {
    const product = await productDAO.findProductByProductId(productId);
    return product;
  },

  // 상품 추가하기 (관리자)
  async postProduct(categoryId, productInfo) {
    await productDAO.createProduct(categoryId, productInfo);
  },
};

export { productService };
