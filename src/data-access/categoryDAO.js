import { Category, Team } from './model';

const categoryDAO = {
  async addCategory(teamId, categoryInfo) {
    const team = await Team.findOne({ teamId });

    const { teamName, teamDescription } = team;

    await Category.create({
      teamId, teamName, teamDescription, ...categoryInfo,
    });
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
};

export { categoryDAO };
