import { teamDAO } from '../data-access';

const teamService = {

  async addTeam(teamInfo) {
    await teamDAO.createTeam(teamInfo);
  },

  async getTeams() {
    const teams = await teamDAO.findAll();
    return teams;
  },

  async getTeamById(teamId) {
    const team = await teamDAO.findByTeamId(teamId);
    return team;
  },

  async getTeamByTitle(title) {
    const team = await teamDAO.findByTeamTitle(title);
    return team;
  },

  async updateProductById(productId, updateInfo) {
    await teamDAO.updateByProductId(productId, updateInfo);
  },

  async deleteProductById(productId) {
    await teamDAO.deleteByProductId(productId);
  },

};

export { teamService };
