import { Router } from 'express';

import { categoryController } from '../controller';

const categoryRouter = Router();

// 특정 팀의 카테고리 목록 조회
categoryRouter.get('/teams/:teamId/categories', categoryController.getCategoriesByTeamId);

// 특정 팀의 카테고리 추가
categoryRouter.post('/teams/:teamId/categories', categoryController.addCategory);

// 특정 카테고리 정보 조회
categoryRouter.get('/categories/:categoryId/info', categoryController.getCategoryByCategoryId);

// 특정 카테고리 정보 수정
categoryRouter.put('/categories/:categoryId', categoryController.updateCategoryByCategoryId);

// 특정 카테고리 정보 삭제
categoryRouter.delete('/categories/:categoryId', categoryController.deleteCategoryByCategoryId);

export { categoryRouter };
