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
    const category = await Category.findOne({ categoryId });

    const {
      teamId, teamName, teamDescription, categoryName,
    } = category;

    const createNewProduct = await Product.create({
      teamId, teamName, teamDescription, categoryId, categoryName, ...productInfo,
    });

    return createNewProduct;
  },
};

export { productDAO };
