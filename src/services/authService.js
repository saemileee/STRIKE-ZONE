import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDAO } from '../data-access/model';
import { sendValidEmail, sendPasswordEmail } from './emailService';
import { EMAIL_VALID } from '../constants';

const authService = {
  async getUserEmailByToken(token) {
    const secretKey = process.env.SECRET_KEY || null;

    const decodedToken = jwt.verify(token, secretKey);

    const { email, isAdmin } = decodedToken;

    return { email, isAdmin };
  },

  async getUserToken(email, password) {
    const { isPasswordCorrect, isAdmin } = await this.checkPasswordAndAdmin(
      email,
      password
    );

    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const secretKey = process.env.SECRET_KEY || null;

    const userToken = jwt.sign({ email, isAdmin }, secretKey);

    return userToken;
  },

  async checkPasswordAndAdmin(email, password) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const correctPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(password, correctPassword);

    if (!isPasswordCorrect) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const { isAdmin } = user;

    return { isPasswordCorrect, isAdmin };
  },

  async checkEmailValidCodeCorrect(email, inputCode) {
    const user = await userDAO.findByEmail(email);

    const isEmailValid = user.isValid;

    if (isEmailValid === EMAIL_VALID) {
      return true;
    }

    if (isEmailValid !== inputCode) {
      throw new Error('인증 코드가 일치하지 않습니다.');
    }

    return true;
  },

  async sendValidEmail(email) {
    const user = await userDAO.findByEmail(email);

    const validCode = user.isValid;

    await sendValidEmail(email, validCode);

    return true;
  },

  async makeEmailValid(email) {
    const { isValid } = await userDAO.update(email, { isValid: EMAIL_VALID });

    if (isValid !== EMAIL_VALID) {
      throw new Error('이메일 인증 정보 업데이트에 실패하였습니다.');
    }

    return true;
  },

  async checkEmailValidAndPasswordReset(email) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const { isValid, isPasswordReset } = user;

    if (isValid !== EMAIL_VALID) {
      return { isEmailValid: false, isPasswordReset };
    }

    return { isEmailValid: true, isPasswordReset };
  },

  async resetUserPassword(email, koreanName) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    if (user.koreanName !== koreanName) {
      throw new Error('입력한 이름과 등록된 이름이 다릅니다.');
    }

    const randomPassword = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    const hashRandomPassword = await bcrypt.hash(randomPassword, 10);

    const passwordResetUser = await userDAO.update(email, {
      password: hashRandomPassword,
      isPasswordReset: true,
    });

    if (!passwordResetUser) {
      throw new Error('비밀번호 초기화에 실패하였습니다.');
    }

    await sendPasswordEmail(email, koreanName, randomPassword);

    return true;
  },
};

export { authService };
