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
      const { isAdmin } = req;

      let { email } = req;

      if (isAdmin && req.params.email) {
        email = req.params.email;
      }

      const user = await userService.getUser(email);

      res.json(user);
    } catch (err) {
      next(err);
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

      await userService.addUser(userInfo);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async setUser(req, res, next) {
    try {
      const { isAdmin } = req;

      let { email } = req;

      if (isAdmin && req.params.email) {
        email = req.params.email;
      }

      const { postCode, roughAddress, detailAddress, ...restUpdateInfo } =
        req.body;

      const address = {
        postCode,
        roughAddress,
        detailAddress,
      };

      const toUpdate = { address, ...restUpdateInfo };

      await userService.setUser(email, toUpdate);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async setUserPassword(req, res, next) {
    try {
      const { email, password } = req.body;

      await userService.setUserPassword(email, password);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { isAdmin } = req;

      let { email } = req;

      if (isAdmin && req.params.email) {
        email = req.params.email;
      }

      await userService.deleteUser(email);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },
};

export { userController };
