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

      const { email } = isAdmin ? req.params : req;

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

      const newUser = await userService.addUser(userInfo);

      if (!newUser) {
        throw new Error('유저 등록에 실패하였습니다.');
      }

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async setUser(req, res, next) {
    try {
      const { isAdmin } = req;

      const { email } = isAdmin ? req.params : req;

      const { postCode, roughAddress, detailAddress, ...restUpdateInfo } =
        req.body;

      const address = {
        postCode,
        roughAddress,
        detailAddress,
      };

      const toUpdate = { address, ...restUpdateInfo };

      const updatedUser = await userService.setUser(email, toUpdate);

      if (!updatedUser) {
        throw new Error('유저 수정에 실패하였습니다.');
      }

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { isAdmin } = req;

      const { email } = isAdmin ? req.params : req;

      const { deletedCount } = await userService.deleteUser(email);

      if (deletedCount === 0) {
        throw new Error('유저 삭제에 실패하였습니다.');
      }

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },
};

export { userController };
