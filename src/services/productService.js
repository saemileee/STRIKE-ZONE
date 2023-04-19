import { productDAO } from '../data-access';

const productService = {
  // 상품 목록 조회
  async getProducts() {
    const products = await productDAO.findAll();
    return products;
  },

  // 단일 상품 조회
  async getProduct(productId) {
    const product = await productDAO.findByProductId(productId);
    return product;
  },

  // 상품 추가하기 (관리자)
  async addProduct(productInfo) {
    await productDAO.createProduct(productInfo);
  },

  // 상품 정보 수정하기 (관리자)
  async updateProductById(productId, updateInfo) {
    await productDAO.updateByProductId(productId, updateInfo);
  },

  // 상품 정보 삭제하기 (관리자)
  async deleteProductById(productId) {
    await productDAO.deleteByProductId(productId);
  },
};

export { productService };
