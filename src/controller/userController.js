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

      const updatedUser = await userService.setUser(email, toUpdate);

      if (!updatedUser) {
        throw new Error('유저 수정에 실패하였습니다.');
      }

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async setUserPassword(req, res, next) {
    try {
      const { email, password } = req.body;

      const isPasswordSet = await userService.setUserPassword(email, password);

      if (!isPasswordSet) {
        throw new Error('비밀번호 변경에 실패하였습니다.');
      }

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
