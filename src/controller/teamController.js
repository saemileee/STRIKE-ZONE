import { teamService } from '../services';

const teamController = {
  async addTeam(req, res, next) {
    const {
      teamId, teamName, teamDescription, emblemPath,
    } = req.body;

    const teamInfo = {
      teamId, teamName, teamDescription, emblemPath,
    };

    try {
      await teamService.addTeam(teamInfo);

      res.status(201).json({ result: 'team created successfully.' });
    } catch (error) {
      next(error);
    }
  },

  async getTeams(req, res, next) {
    try {
      const teams = await teamService.getTeams();

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  },

  async getTeamById(req, res, next) {
    try {
      const { teamId } = req.params;

      const team = await teamService.getTeamById(teamId);

      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  },

  async getTeamByTitle(req, res, next) {
    try {
      const { title } = req.params;

      const team = await teamService.getTeamByTitle(title);

      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  },

  async updateTeamById(req, res, next) {
    try {
      const { teamId } = req.params;
      const updateInfo = req.body;

      await teamService.updateTeamById(teamId, updateInfo);

      res.status(200).json({ result: 'team updated successfully.' });
    } catch (error) {
      next(error);
    }
  },

  async deleteTeamById(req, res, next) {
    try {
      const { teamId } = req.params;

      await teamService.deleteTeamById(teamId);

      res.status(200).json({ result: 'team deleted successfully.' });
    } catch (error) {
      next(error);
    }
  },

};

export { teamController };
