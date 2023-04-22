import { authService } from "../services";

const authController = {
  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const userToken = await authService.getUserToken(email, password);

      if (!userToken) {
        throw new Error('토큰 발급에 실패하였습니다.');
      }

      res.json({ token: userToken });
    } catch (err) {
      next(err);
    }
  },

  async passwordCheck(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authService.checkPasswordCorrect(email, password);

      if (!user) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      res.json({ result: 'success' });
    } catch (err) {
      next(err.message);
    }
  },
};

export { authController };