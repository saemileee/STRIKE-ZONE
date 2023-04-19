import { Router } from 'express';
import { userController } from '../controller';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:email', userController.getUser);

userRouter.post('/', userController.addUser);

userRouter.put('/', userController.setUser);

userRouter.delete('/', userController.deleteUser);

export { userRouter };
