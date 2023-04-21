import { Team } from './model';

const teamDAO = {
  async createTeam(teamInfo) {
    const createNewTeam = await Team.create(teamInfo);

    return createNewTeam;
  },

  async findAll() {
    const teams = await Team.find({});

    return teams;
  },

  async findByTeamId(teamId) {
    const team = await Team.findOne({ teamId });

    return team;
  },

  async findByTeamTitle(title) {
    const team = await Team.findOne({ title });

    return team;
  },

  async updateByTeamId(teamId, updateInfo) {
    const option = { returnOriginal: false };
    const updatedTeam = await Team.findOneAndUpdate({ teamId }, updateInfo, option);

    return updatedTeam;
  },

  async deleteByTeamId(teamId) {
    const deletedTeam = await Team.findOneAndDelete({ teamId });

    return deletedTeam;
  },
};

export { teamDAO };
