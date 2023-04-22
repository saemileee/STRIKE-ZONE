import { authService } from "../services";

const authController = {
  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const userToken = await authService.getUserToken(email, password);

      res.json({ token: userToken });
    } catch (err) {
      next(err);
    }
  },

  async passwordCheck(req, res, next) {
    try {
      const { email, password } = req.body;

      await authService.checkPasswordCorrect(email, password);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },
};

export { authController };