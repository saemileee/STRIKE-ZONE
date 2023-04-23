import { categoryService } from '../services';

const categoryController = {

  // 카테고리 추가
  async addCategory(req, res, next) {
    try {
      const { teamId } = req.params;
      const { categoryId, categoryName, categoryDescription } = req.body;

      const categoryInfo = {
        categoryId, categoryName, categoryDescription,
      };

      await categoryService.addCategory(teamId, categoryInfo);

      res.status(201).json({ result: 'category created successfully.' });
    } catch (error) {
      next(error);
    }
  },

  // 특정 팀의 전체 카테고리 조회
  async getCategoriesByTeamId(req, res, next) {
    try {
      const { teamId } = req.params;

      const categories = await categoryService.getCategoriesByTeamId(teamId);

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },

  // 특정 카테고리 정보 조회
  async getCategoryByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;

      const category = await categoryService.getCategoryByCategoryId(categoryId);

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },

  // 특정 카테고리 정보 수정
  async updateCategoryByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const updateInfo = req.body;

      await categoryService.updateCategoryByCategoryId(categoryId, updateInfo);

      res.status(200).json({ result: 'category updated successfully.' });
    } catch (error) {
      next(error);
    }
  },

  // 특정 카테고리 삭제
  async deleteCategoryByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;

      await categoryService.deleteCategoryByCategoryId(categoryId);

      res.status(200).json({ result: 'category deleted successfully.' });
    } catch (error) {
      next(error);
    }
  },
};

export { categoryController };
