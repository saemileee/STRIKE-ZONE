import { Router } from 'express';
import { authController } from '../controller';

const authRouter = Router();

authRouter.post('/login', authController.userLogin);

authRouter.post('/check', authController.passwordCheck);

export { authRouter };
