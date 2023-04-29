import { authService } from '../services';

const authController = {
  async getEmailByToken(req, res, next) {
    const { token } = req.headers;

    const { email, isAdmin } = await authService.getUserEmailByToken(token);

    res.json({ email, isAdmin });
  },

  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const userToken = await authService.getUserToken(email, password);

      const { isEmailValid, isPasswordReset } =
        await authService.checkEmailValidAndPasswordReset(email);

      res.json({ token: userToken, isEmailValid, isPasswordReset });
    } catch (err) {
      next(err);
    }
  },

  async sendValidationEmail(req, res, next) {
    const { email } = req.headers;

    try {
      await authService.sendValidEmail(email);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async validateEmail(req, res, next) {
    try {
      const { email, inputCode } = req.body;

      await authService.checkEmailValidCodeCorrect(email, inputCode);

      await authService.makeEmailValid(email);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { email, koreanName } = req.body;

      await authService.resetUserPassword(email, koreanName);

      res.json({ result: 'sucess' });
    } catch (err) {
      next(err);
    }
  },

  async checkPassword(req, res, next) {
    try {
      const { email } = req;

      const { password } = req.body;

      await authService.checkPasswordAndAdmin(email, password);

      res.json({ result: 'success' });
    } catch (err) {
      next(err);
    }
  },

  async userLogout(req, res, next) {
    try {
      if (req.email) {
        res.json({ result: 'success' });
      }
    } catch (err) {
      next(err);
    }
  },
};

export { authController };
