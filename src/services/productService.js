import { productDAO, categoryDAO } from '../data-access/model';

import {
  NEW_PRODUCT_STANDARD_DAY,
  PRODUCT_IMG_PATH,
} from '../constants';

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

  // 특정 팀의 전체 상품 목록 조회
  async getAllProductsByTeamId(teamId) {
    const products = await productDAO.findAllProductsByTeamId(teamId);
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

    // productId 구하기
    const productId = await productDAO.createProductId();

    const productInfoToBeCreated = {
      ...productInfo,
      productId,
      teamId,
      teamName,
      teamDescription,
      categoryId,
      categoryName,
      discountedPrice,
    };

    await productDAO.createProduct(productInfoToBeCreated);
  },

  // 상품 추가하기 with 이미지 업로드
  async postProductWithImage(req) {
    const {
      name, inventory, price, rate, shortDescription,
    } = req.body;

    // 이미지는 각각 배열로 넘어온다.
    const { thumbnail, subThumbnails, detailDescription } = req.files;

    // 상품 정보에 등록할 img 배열을 만들어야한다.
    const imgArray = [];
    imgArray.push(PRODUCT_IMG_PATH + thumbnail[0].filename); // 썸네일
    subThumbnails.forEach((subThumbnail) => {
      imgArray.push(PRODUCT_IMG_PATH + subThumbnail.filename);
    });
    const detailImg = PRODUCT_IMG_PATH + detailDescription[0].filename;

    // categoryId 로 소속 team 및 category 정보 조회하기
    const { categoryId } = req.params;
    const category = await categoryDAO.getCategoryByCategoryId(categoryId);
    const {
      teamId, teamName, teamDescription, categoryName,
    } = category;

    // 할인율을 적용한 상품 가격 계산하기
    const discountedPrice = this.calculateDiscountedPrice({ price, rate });

    // 새 상품의 productId 구하기
    const productId = await productDAO.createProductId();

    const productInfoToBeCreated = {
      productId,
      teamId,
      teamName,
      teamDescription,
      categoryId,
      categoryName,
      discountedPrice,
      name,
      inventory: Number(inventory),
      price: Number(price),
      rate: Number(rate),
      shortDescription,
      detailDescription: detailImg,
      img: imgArray,
    };

    const result = await productDAO.createProduct(productInfoToBeCreated);
    const postedProduct = await productDAO.findProductByProductId(productId);

    return postedProduct;
  },

  // 상품 수정하기 (관리자)
  async updateProductByProductId(productId, updateInfo) {
    const discountedPrice = this.calculateDiscountedPrice(updateInfo);

    const prodctInfoToBeUpdate = { ...updateInfo, discountedPrice };

    await productDAO.updateProductByProductId(productId, prodctInfoToBeUpdate);
  },

  // 상품 삭제하기 (관리자)
  async deleteProductByProductId(productId) {
    await productDAO.deleteProductByProductId(productId);
  },

  // 다수의 상품 삭제하기 (관리자)
  async deleteProductsByProductIds(productIds) {
    let deletedCount = 0;

    const promises = productIds.map(async (productId) => {
      const result = await productDAO.deleteProductByProductId(productId);
      deletedCount += result;
    });

    await Promise.all(promises);

    return deletedCount;
  },

  // 할인된 가격을 구하는 함수
  calculateDiscountedPrice(productInfo) {
    const { price, rate } = productInfo;
    const discountedPrice = rate === 0 ? price : Math.ceil(price - (price * (rate / 100)));

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
