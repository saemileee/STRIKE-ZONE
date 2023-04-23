import { productDAO, categoryDAO } from '../data-access';

import { NEW_PRODUCT_STANDARD_DAY } from '../constants';
import { getMsToCheckNewProduct } from '../utils';

const productService = {
  // 전체 상품 목록 조회
  async getAllProducts() {
    const products = await productDAO.findAllProducts();

    // 신상품 여부를 추가하기
    const updatedProducts = products.map(
      (product) => this.addIsNewInProduct(product),
    );

    return updatedProducts;
  },

  // 특정 팀의 카테고리에 해당하는 상품 목록 조회
  async getProductsByCategoryId(categoryId) {
    const products = await productDAO.findProductsByCategoryId(categoryId);

    // 신상품 여부를 추가하기
    const updatedProducts = products.map(
      (product) => this.addIsNewInProduct(product),
    );

    return updatedProducts;
  },

  // 특정 카테고리(ex. 유니폼)에 속한 모든 팀의 상품 목록 조회
  async getProductsByCategoryName(categoryName) {
    const products = await productDAO.findProductsByCategoryName(categoryName);

    // 신상품 여부를 추가하기
    const updatedProducts = products.map(
      (product) => this.addIsNewInProduct(product),
    );

    return updatedProducts;
  },

  // 상품 상세 조회 (productId)
  async getProductByProductId(id) {
    const product = await productDAO.findProductByProductId(id);

    // 신상품 여부를 추가하기
    const updatedProduct = this.addIsNewInProduct(product);

    return updatedProduct;
  },

  // 상품 추가하기 (관리자)
  async postProduct(categoryId, productInfo) {
    const category = await categoryDAO.getCategoryByCategoryId(categoryId);

    const {
      teamId, teamName, teamDescription, categoryName,
    } = category;

    // 할인율을 적용한 상품 가격 계산하기
    const discountedPrice = this.calculateDiscountedPrice(productInfo);

    const productInfoToBeCreated = {
      ...productInfo,
      teamId,
      teamName,
      teamDescription,
      categoryId,
      categoryName,
      discountedPrice,
    };

    await productDAO.createProduct(productInfoToBeCreated);
  },

  // 상품 수정하기 (관리자)
  async updateProductByProductId(productId, updateInfo) {
    await productDAO.updateProductByProductId(productId, updateInfo);
  },

  // 상품 삭제하기 (관리자)
  async deleteProductByProductId(productId) {
    await productDAO.deleteProductByProductId(productId);
  },

  // 할인된 가격을 구하는 함수
  calculateDiscountedPrice(productInfo) {
    const { price, rate } = productInfo;
    const discountedPrice = rate === 0 ? price : price - (price * (rate / 100));

    return discountedPrice;
  },

  // 조회한 상품 데이터에 신상품 여부(isNewProduct) 프로퍼티를 추가하는 함수
  addIsNewInProduct(product) {
    const isNewProduct = this.checkIsNewProduct(product);
    return { ...product.toObject(), isNewProduct };
  },

  // 해당 상품이 신상품인지 체크하는 함수
  checkIsNewProduct(product) {
    const { createdAt } = product;

    // [현재 시간] 과 [상품이 등록된 시간]의 차이를 구한다. (단위: 밀리세컨즈) --- (1)
    const nowDate = new Date();
    const createdAtDate = new Date(createdAt);
    const millisecondsDifference = nowDate - createdAtDate;

    // 신상품인지의 기준이 될 기간 (단위: 밀리세컨즈) (ex. 7일 -> 604800000) --- (2)
    const standardMsOfNewProduct = getMsToCheckNewProduct(NEW_PRODUCT_STANDARD_DAY);

    // (1) 이 (2) 보다 크면 신상품이 아니다.
    if (millisecondsDifference > standardMsOfNewProduct) {
      return false;
    }

    return true;
  },
};

export { productService };
