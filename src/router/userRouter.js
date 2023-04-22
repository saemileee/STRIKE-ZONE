import { Router } from 'express';
import { userController } from '../controller';
import { loginRequired } from '../middleware';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:email', loginRequired, userController.getUser);

userRouter.post('/', userController.addUser);

userRouter.put('/:email', loginRequired, userController.setUser);

userRouter.delete('/:email', loginRequired, userController.deleteUser);

export { userRouter };
