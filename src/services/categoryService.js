import { categoryDAO, teamDAO } from '../data-access';

const categoryService = {

  async addCategory(teamId, categoryInfo) {
    // 팀 정보 조회
    const team = await teamDAO.findByTeamId(teamId);
    const { teamName, teamDescription } = team;

    const categoryInfoToBeCreated = {
      ...categoryInfo, teamId, teamName, teamDescription,
    };

    await categoryDAO.addCategory(categoryInfoToBeCreated);
  },

  async getCategoriesByTeamId(teamId) {
    const categories = await categoryDAO.getCategories(teamId);
    return categories;
  },

  async getCategoryByCategoryId(categoryId) {
    const category = await categoryDAO.getCategoryByCategoryId(categoryId);
    return category;
  },

  async updateCategoryByCategoryId(categoryId, updateInfo) {
    await categoryDAO.updateCategoryByCategoryId(categoryId, updateInfo);
  },

  async deleteCategoryByCategoryId(categoryId) {
    await categoryDAO.deleteCategoryByCategoryId(categoryId);
  },
};

export { categoryService };
