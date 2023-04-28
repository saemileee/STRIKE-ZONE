import { model } from 'mongoose';
import { CategorySchema } from '../schemas';

const Category = model('categories', CategorySchema);

const categoryDAO = {
  async addCategory(categoryInfo) {
    await Category.create(categoryInfo);
  },

  async getCategories(teamId) {
    const categories = await Category.find({ teamId });
    return categories;
  },

  async getCategoryByCategoryId(categoryId) {
    const category = await Category.findOne({ categoryId });
    return category;
  },

  async updateCategoryByCategoryId(categoryId, updateInfo) {
    await Category.findOneAndUpdate({ categoryId }, updateInfo);
  },

  async deleteCategoryByCategoryId(categoryId) {
    await Category.deleteOne({ categoryId });
  },
};

export { categoryDAO };
