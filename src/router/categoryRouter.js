import { Router } from 'express';

import { categoryController } from '../controller';

const categoryRouter = Router();

// 특정 팀의 카테고리 목록 조회
categoryRouter.get('/teams/:teamId/categories', categoryController.getCategoriesByTeamId);

// 특정 팀의 카테고리 추가
categoryRouter.post('/teams/:teamId/categories', categoryController.addCategory);

export { categoryRouter };
