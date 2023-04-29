import { teamDAO } from '../data-access/model';

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

  async updateTeamById(teamId, updateInfo) {
    await teamDAO.updateByTeamId(teamId, updateInfo);
  },

  async deleteTeamById(teamId) {
    await teamDAO.deleteByTeamId(teamId);
  },

};

export { teamService };
