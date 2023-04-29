import { Router } from 'express';
import { authController } from '../controller';
import { loginRequired } from '../middleware';

const authRouter = Router();

authRouter.get('/', loginRequired, authController.getEmailByToken);

authRouter.get('/email', authController.sendValidationEmail);

authRouter.post('/email', authController.validateEmail);

authRouter.post('/login', authController.userLogin);

authRouter.patch('/password', authController.resetPassword);

authRouter.post('/password', loginRequired, authController.checkPassword);

authRouter.post('/logout', loginRequired, authController.userLogout);

export { authRouter };
