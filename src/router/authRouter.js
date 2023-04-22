import { Router } from 'express';
import { authController } from '../controller';
import { loginRequired } from '../middleware';

const authRouter = Router();

authRouter.get('/', loginRequired, authController.getEmailByToken);

authRouter.post('/login', authController.userLogin);

authRouter.post('/check', loginRequired, authController.passwordCheck);

export { authRouter };
