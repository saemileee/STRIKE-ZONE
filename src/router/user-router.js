import { Router } from "express";
import userController from '../controller/index';

const router = Router();

router.get('/', userController.getAllUsers);

router.post('/', userController.addUser);

router.put('/', userController.setUser);

router.delete('/', userController.deleteUser);

export default router;