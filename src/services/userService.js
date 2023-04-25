import bcrypt from 'bcrypt';
import { userDAO } from '../data-access';

const userService = {
  async getAllUsers() {
    const allUsers = await userDAO.findAll();

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

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const isValid = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');

      let newUser = {
        email,
        password: hashedPassword,
        isValid,
        ...restUserInfo,
      };

      newUser = await userDAO.create(newUser);

      return newUser;
    }

    throw new Error('이미 존재하는 email입니다.');
  },

  async setUser(email, toUpdate) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const { password } = toUpdate;

    const newHashedPassword = await bcrypt.hash(password, 10);

    toUpdate.password = newHashedPassword;

    const updatedUser = await userDAO.update(email, toUpdate);

    return updatedUser;
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

    const newHashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userDAO.update(email, {
      password: newHashedPassword,
      isPasswordReset: false,
    });

    return updatedUser;
  },

  async deleteUser(email) {
    const user = await userDAO.findByEmail(email);

    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const deletedResult = await userDAO.deleteByEmail(email);

    return deletedResult;
  },
};

export { userService };
