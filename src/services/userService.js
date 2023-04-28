import bcrypt from 'bcrypt';
import { userDAO } from '../data-access/model';

const userService = {
  async getAllUsers() {
    const allUsers = await userDAO.findAll();

    if (!allUsers) {
      throw new Error('유저 정보 조회에 실패하였습니다.');
    }

    return allUsers;
  },

  async getUser(email) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    return user;
  },

  async addUser(userInfo) {
    const { email, password, ...restUserInfo } = userInfo;

    const user = await userDAO.findByEmail(email);

    if (user) {
      throw new Error('이미 존재하는 email입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isValid = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    const newUser = {
      email,
      password: hashedPassword,
      isValid,
      ...restUserInfo,
    };

    const createdUser = await userDAO.create(newUser);

    if (!createdUser) {
      throw new Error('유저 등록에 실패하였습니다.');
    }

    return true;
  },

  async setUser(email, toUpdate) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const updatePassword = toUpdate.password;

    if (updatePassword) {
      const newHashedPassword = await bcrypt.hash(updatePassword, 10);

      toUpdate.password = newHashedPassword;
    } else {
      toUpdate.password = user.password;
    }

    const updatedUser = await userDAO.update(email, toUpdate);

    if (!updatedUser) {
      throw new Error('유저 수정에 실패하였습니다.');
    }

    return true;
  },

  async setUserPassword(email, password) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const isPasswordSame = await bcrypt.compare(password, user.password);

    if (isPasswordSame) {
      throw new Error('이전 비밀번호와 다른 비밀번호를 입력하십시오.');
    }

    const newHashPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userDAO.update(email, {
      password: newHashPassword,
      isPasswordReset: false,
    });

    if (!updatedUser) {
      throw new Error('비밀번호 변경에 실패하였습니다.');
    }

    return true;
  },

  async deleteUser(email) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const { deletedCount } = await userDAO.deleteByEmail(email);

    if (deletedCount === 0) {
      throw new Error('유저 삭제에 실패하였습니다.');
    }

    return true;
  },
};

export { userService };
