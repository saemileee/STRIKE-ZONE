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
    const { isPasswordCorrect, isAdmin } = await this.checkPasswordAndAdmin(
      email,
      password
    );

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

    await sendEmail(
      email,
      '스트라이크존 이메일 인증 코드입니다.',
      `이메일 인증 코드는 ${validCode}입니다.`
    );

    return true;
  },

  async makeEmailValid(email) {
    const { isValid } = await userDAO.update(email, { isValid: 'valid' });

    return isValid;
  },

  async checkPasswordReset(email) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    return user.isPasswordReset;
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

    console.log(randomPassword);

    const hashRandomPassword = await bcrypt.hash(randomPassword, 10);

    const passwordResetUser = await userDAO.update(email, {
      password: hashRandomPassword,
      isPasswordReset: true,
    });

    if (!passwordResetUser) {
      throw new Error('비밀번호 초기화에 실패하였습니다.');
    }

    await sendEmail(
      email,
      `${koreanName} 회원님의 비밀번호가 초기화되었습니다.`,
      `초기화된 비밀번호는 ${randomPassword}입니다.\n초기화된 비밀번호로 로그인 후 반드시 비밀번호를 변경해주십시오.`
    );

    return true;
  },
};

export { authService };
