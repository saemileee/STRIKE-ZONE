import { teamService } from '../services';

const teamController = {
  async addTeam(request, response, next) {
    const { title, description, emblemPath } = request.body;

    try {
      await teamService.addTeam({ title, description, emblemPath });

      response
        .status(201)
        .json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  },

  async getTeams(request, response, next) {
    try {
      const teams = await teamService.getTeams();

      response
        .status(201)
        .json(teams);
    } catch (error) {
      next(error);
    }
  },

  async getTeamById(request, response, next) {
    try {
      const { teamId } = request.params;

      const team = await teamService.getTeamById(teamId);

      response
        .status(201)
        .json(team);
    } catch (error) {
      next(error);
    }
  },

  async getTeamByTitle(request, response, next) {
    try {
      const { title } = request.params;

      const team = await teamService.getTeamByTitle(title);

      response
        .status(201)
        .json(team);
    } catch (error) {
      next(error);
    }
  },

};

export { teamController };