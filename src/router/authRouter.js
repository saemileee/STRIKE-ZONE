import { Router } from 'express';
import { authController } from '../controller';
import { loginRequired } from '../middleware';

const authRouter = Router();

authRouter.get('/', loginRequired, authController.getEmailByToken);

authRouter.get('/email', loginRequired, authController.sendValidationEmail);

authRouter.post('/email', loginRequired, authController.emailValidation);

authRouter.post('/login', authController.userLogin);

authRouter.post('/password', loginRequired, authController.passwordCheck);

authRouter.post('/logout', loginRequired, authController.userLogout);

export { authRouter };
