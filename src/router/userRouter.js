import { Router } from 'express';
import { userController } from '../controller';
import { adminRequired, loginRequired } from '../middleware';

const userRouter = Router();

userRouter.get('/', adminRequired, userController.getAllUsers);

userRouter.post('/', userController.addUser);

userRouter.get('/me', loginRequired, userController.getUser);

userRouter.put('/me', loginRequired, userController.setUser);

userRouter.patch('/password', userController.setUserPassword);

userRouter.delete('/me', loginRequired, userController.deleteUser);

userRouter.get('/:email', adminRequired, userController.getUser);

userRouter.put('/:email', adminRequired, userController.setUser);

userRouter.delete('/:email', adminRequired, userController.deleteUser);

export { userRouter };
