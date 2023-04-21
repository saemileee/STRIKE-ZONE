import { Category, Team } from './model';

const categoryDAO = {
  async addCategory(teamId, categoryName, description) {
    const team = await Team.findOne({ teamId });

    const teamName = team.title;
    const teamDescription = team.description;

    await Category.create({
      teamId, teamName, teamDescription, categoryName, description,
    });
  },

  async getCategories(teamId) {
    const categories = await Category.find({ teamId });

    return categories;
  },
};

export { categoryDAO };
