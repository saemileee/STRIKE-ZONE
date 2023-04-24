import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDAO } from '../data-access';
import { sendEmail } from './emailService';

const authService = {
  async getUserEmailByToken(token) {
    const secretKey = process.env.SECRET_KEY || 'secret';

    const decodedToken = jwt.verify(token, secretKey);

    const { email, isAdmin } = decodedToken;

    return { email, isAdmin };
  },

  async getUserToken(email, password) {
    const { isPasswordCorrect, isAdmin } = await this.checkPasswordAndAdmin(email, password);

    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const secretKey = process.env.SECRET_KEY || 'secret';

    const userToken = jwt.sign({ email, isAdmin }, secretKey);

    return userToken;
  },

  // 유저 정보 수정 시, 패스워드를 한번 더 요구할 때 사용하기 위함
  async checkPasswordAndAdmin(email, password) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const correctPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, correctPassword);
    
    const { isAdmin } = user;

    return { isPasswordCorrect, isAdmin };
  },
  
  async checkEmailValid(email) {
    const user = await userDAO.findByEmail(email);

    const isEmailValid = user.isValid;

    if (isEmailValid !== 'valid') {
      return isEmailValid;
    }

    return true;
  },

  async sendValidEmail(email) {
    const validCode = await this.checkEmailValid(email);

    try {
      await sendEmail(email, validCode);
    } catch (err) {
      return err;
    }

    return true;
  },

  async makeEmailValid(email) {
    const { isValid } = await userDAO.update(email, { isValid: 'valid' });

    return isValid;
  },
};

export { authService };
