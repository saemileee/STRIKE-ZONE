import { model } from 'mongoose';
import ProductSchema from '../shcemas/product-schema';

const Product = model('products', ProductSchema);

const productDAO = {
  async createProduct(productInfo) {
    const createNewProduct = await Product.create(productInfo);
    return createNewProduct;
  },

  // 전체 상품 조회
  async findAll() {
    const products = await Product.find({});
    return products;
  },

  // 특정 상품 조회
  async findByProductId(productId) {
    const product = await Product.find({ productId });
    return product;
  },

  // 상품 정보 수정
  async updateByProductId(productId, updateInfo) {
    const option = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate({ productId }, updateInfo, option);
    return updatedProduct;
  },

  async deleteByProductId(productId) {
    const deletedProduct = await Product.findOneAndDelete({ productId });
    return deletedProduct;
  },
};

export default productDAO;
