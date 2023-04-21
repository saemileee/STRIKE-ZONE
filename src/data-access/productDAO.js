import { Product, Category } from './model';

const productDAO = {
  // 전체 상품 조회
  async findAllProducts() {
    const products = await Product.find({});
    return products;
  },

  // 특정 카테고리의 상품 목록 조회
  async findProductsByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });

    return products;
  },

  // 상품 상세 조회 (productId)
  async findProductByProductId(productId) {
    const product = await Product.findOne({ productId });

    return product;
  },

  // 상품 추가 (관리자)
  async createProduct(categoryId, productInfo) {
    // 가장 마지막에 등록한 상품을 검색해서 해당 productId 에서 +1 을 한 값을
    // 새로 등록할 상품의 productId 로 사용한다.
    const lastProduct = await Product.find({}).sort({ createdAt: -1 }).limit(1);
    const lastProductId = lastProduct[0].productId;
    const nextProductId = lastProductId + 1;

    const category = await Category.findOne({ categoryId });

    const {
      teamId, teamName, teamDescription, categoryName,
    } = category;

    const createNewProduct = await Product.create({
      teamId,
      teamName,
      teamDescription,
      categoryId,
      categoryName,
      productId: nextProductId,
      ...productInfo,
    });

    return createNewProduct;
  },
};

export { productDAO };
