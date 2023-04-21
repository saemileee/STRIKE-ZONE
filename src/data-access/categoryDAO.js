import { Category } from './model';

const categoryDAO = {
  async addCategory(teamId, categoryName, description) {
    await Category.create({ teamId, categoryName, description });
  },

  async getCategories(teamId) {
    const categories = await Category.find({ teamId });

    return categories;
  },
};

export { categoryDAO };
