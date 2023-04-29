import { model } from 'mongoose';
import { ProductSchema } from '../schemas';

const Product = model('products', ProductSchema);

const productDAO = {
  // 팀, 카테고리 상관없이 전체 상품 조회
  async findAllProducts() {
    const products = await Product.find({});
    return products;
  },

  // 특정 팀의 모든 상품 조회
  async findAllProductsByTeamId(teamId) {
    const products = await Product.find({ teamId });
    return products;
  },

  // 특정 팀의 카테고리에 속한 상품 목록 조회
  async findProductsByCategoryId(categoryId) {
    const products = await Product.find({ categoryId });

    return products;
  },

  // 특정 카테고리(ex. 유니폼)에 속한 모든 팀의 상품 목록 조회
  async findProductsByCategoryName(categoryName) {
    const products = await Product.find({ categoryName });
    return products;
  },

  // 상품 상세 조회 (productId)
  async findProductByProductId(productId) {
    const product = await Product.findOne({ productId });

    return product;
  },

  // 상품 추가 (관리자)
  async createProduct(productInfo) {
    await Product.create(productInfo);
  },

  // 상품 수정
  async updateProductByProductId(productId, updateInfo) {
    await Product.updateOne({ productId }, updateInfo);
  },

  // 상품 삭제
  async deleteProductByProductId(productId) {
    const { deletedCount } = await Product.deleteOne({ productId });

    return deletedCount;
  },

  async createProductId() {
    const currentDocumentsCount = await Product.countDocuments();
    const nextProductId = currentDocumentsCount === 0 ? 1 : currentDocumentsCount + 1;
    return nextProductId;
  },

  // 주문 취소 시 상품의 재고를 주문량만큼 다시 추가하기
  async addInventoryByCanceldOrder(productId, quantity) {
    const orderedProduct = await Product.findOne({ productId });
    const { inventory } = orderedProduct;

    const result = await Product.updateOne(
      { productId },
      { inventory: inventory + quantity },
    );

    return result;
  },
};

export { productDAO };
