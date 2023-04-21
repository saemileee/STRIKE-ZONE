import { userService } from '../services';

const userController = {
  async getAllUsers(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers();

      res.json(allUsers);
    } catch (err) {
      res.end(err.message);
    }
  },

  async getUser(req, res, next) {
    try {
      const { email } = req.params;

      const user = await userService.getUser(email);

      res.json(user);
    } catch (err) {
      res.end(err.message);
    }
  },

  async addUser(req, res, next) {
    try {
      const { postCode, roughAddress, detailAddress, ...restUserInfo } =
        req.body;

      const address = {
        postCode,
        roughAddress,
        detailAddress,
      };

      const userInfo = { address, ...restUserInfo };

      const newUser = await userService.addUser(userInfo);

      res.json(newUser);
    } catch (err) {
      res.end(err.message);
    }
  },

  async setUser(req, res, next) {
    try {
      const { email } = req.params;
      const { postCode, roughAddress, detailAddress, ...restUpdateInfo } =
        req.body;

      const address = {
        postCode,
        roughAddress,
        detailAddress,
      };

      const toUpdate = { address, ...restUpdateInfo };

      const updatedUser = await userService.setUser(email, toUpdate);

      res.json(updatedUser);
    } catch (err) {
      res.end(err.message);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { email } = req.params;

      const deletedUser = await userService.deleteUser(email);

      res.json(deletedUser);
    } catch (err) {
      res.end(err.message);
    }
  },
};

export { userController };
