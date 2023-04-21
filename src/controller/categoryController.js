import { categoryService } from '../services';

const categoryController = {

  // 카테고리 추가
  async addCategory(request, response, next) {
    try {
      const { teamId } = request.params;
      const { categoryName, description } = request.body;

      await categoryService.addCategory(teamId, categoryName, description);

      response.status(201).json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  },

  // 특정 팀의 전체 카테고리 조회
  async getCategoriesByTeamId(request, response, next) {
    try {
      const { teamId } = request.params;

      const categories = await categoryService.getCategoriesByTeamId(teamId);

      response.status(201).json(categories);
    } catch (error) {
      next(error);
    }
  },

};

export { categoryController };
