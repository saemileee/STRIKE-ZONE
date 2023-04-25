import { Router } from 'express';
import { authController } from '../controller';
import { loginRequired } from '../middleware';

const authRouter = Router();

authRouter.get('/', loginRequired, authController.getEmailByToken);

authRouter.get('/email', authController.sendValidationEmail);

authRouter.post('/email', authController.emailValidation);

authRouter.post('/login', authController.userLogin);

authRouter.patch('/password', authController.passwordReset);

authRouter.post('/password', loginRequired, authController.passwordCheck);

authRouter.post('/logout', loginRequired, authController.userLogout);

export { authRouter };
