import { Router } from 'express';
import { userController } from '../controller';
import { loginRequired } from '../middleware';

const userRouter = Router();

userRouter.get('/list', userController.getAllUsers);

userRouter.get('/', loginRequired, userController.getUser);

userRouter.post('/', userController.addUser);

userRouter.put('/', loginRequired, userController.setUser);

userRouter.delete('/', loginRequired, userController.deleteUser);

export { userRouter };
