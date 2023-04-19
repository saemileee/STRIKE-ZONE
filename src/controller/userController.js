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

  async getUser(req, res, next) {
    try {
      const { email } = req.params;

      const user = await userService.getUser(email);

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async addUser(req, res, next) {
    try {
      const { postCode, roughAddress, detailAddress, ...user } = req.body;

      const address = {
          postCode: postCode,
          roughAddress: roughAddress,
          detailAddress: detailAddress,
        };

      const userInfo = { address, ...user };

      const newUser = await userService.addUser(userInfo);

      res.json(newUser);
    } catch (err) {
      next(err);
    }
  },

  async setUser(req, res, next) {
    try {
      const { email } = req.params;
      const toUpdate = req.body;

      const updatedUser = await userService.setUser(email, toUpdate);

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { email } = req.params;

      const deletedUser = await userService.deleteUser(email);

      res.json(deletedUser);
    } catch (err) {
      next(err);
    }
  },
};

export { userController };
