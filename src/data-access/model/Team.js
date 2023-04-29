import { model } from 'mongoose';
import { TeamSchema } from '../schemas';

const Team = model('teams', TeamSchema);

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
    await Team.updateOne({ teamId }, updateInfo);
  },

  async deleteByTeamId(teamId) {
    await Team.deleteOne({ teamId });
  },
};

export { teamDAO };
