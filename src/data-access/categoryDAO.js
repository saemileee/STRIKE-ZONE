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
};

export { categoryDAO };
