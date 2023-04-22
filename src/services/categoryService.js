import { categoryDAO } from '../data-access';

const categoryService = {

  async addCategory(teamId, categoryInfo) {
    await categoryDAO.addCategory(teamId, categoryInfo);
  },

  async getCategoriesByTeamId(teamId) {
    const categories = await categoryDAO.getCategories(teamId);
    return categories;
  },
};

export { categoryService };
