import { Router } from 'express';

import { teamController } from '../controller';

const teamRouter = Router();

// 전체 팀 목록 조회
teamRouter.get('/', teamController.getTeams);

// 특정 팀 상세 조회
teamRouter.get('/:teamId', teamController.getTeamById);

// 팀 추가
teamRouter.post('/', teamController.addTeam);

export { teamRouter };
