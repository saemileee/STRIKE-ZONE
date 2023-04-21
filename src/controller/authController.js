import { authService } from "../services";
// import jwt from 'jsonwebtoken';

const authController = {
  async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const userToken = await authService.getUserToken(email, password);

      // const decodedEmail = jwt.verify(userToken, process.env.SECRET_KEY).email;

      // console.log(decodedEmail);

      res.json(userToken);
    } catch (err) {
      res.end(err.message);
    }
  },

  async passwordCheck(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await authService.checkPasswordCorrect(email, password);

      res.json(user);
    } catch (err) {
      res.end(err.message);
    }
  },
};

export { authController };