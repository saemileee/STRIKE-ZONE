import { userService } from '../services';

const userController = {
  async getAllUsers(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers();

      res.json(allUsers);
    } catch (err) {
      next(err);
    }
  },

  async addUser(req, res, next) {
    try {
      const user = req.body;

      const newUser = await userService.addUser(user);

      res.json(newUser);
    } catch (err) {
      next(err);
    }
  },

  async setUser(req, res, next) {
    try {
      const { userId, ...toUpdate } = req.body;

      const updatedUser = await userService.setUser(userId, toUpdate);

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { userId } = req.body;

      const deletedUser = await userService.deleteUser(userId);

      res.json(deletedUser);
    } catch (err) {
      next(err);
    }
  },
};

export { userController };
