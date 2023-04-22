import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDAO } from '../data-access';

const authService = {
  async getUserToken(email, password) {
    try {
      await this.checkPasswordCorrect(email, password);

      const secretKey = process.env.SECRET_KEY || 'secret';

      const userToken = jwt.sign({ email }, secretKey);

      return userToken;
    } catch (err) {
      return;
    }
  },

  // 유저 정보 수정 시, 패스워드를 한번 더 요구할 때 사용하기 위함
  async checkPasswordCorrect(email, password) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const correctPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, correctPassword);

    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    return;
  },
};

export { authService };
