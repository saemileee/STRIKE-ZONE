import { categoryDAO } from '../data-access';

const categoryService = {

  async addCategory(teamId, categoryName, description) {
    await categoryDAO.addCategory(teamId, categoryName, description);
  },

  async getCategoriesByTeamId(teamId) {
    const categories = await categoryDAO.getCategories(teamId);
    return categories;
  },
};

export { categoryService };
