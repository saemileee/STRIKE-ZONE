import bcrypt from 'bcrypt';
import { userDAO } from '../data-access';

const userService = {
  async getAllUsers() {
    const allUsers = await userDAO.findAll();

    return allUsers;
  },

  async getUser(email) {
    const user = await userDAO.findByEmail(email);

    if (user) return user;

    throw new Error('해당 유저가 존재하지 않습니다.');
  },

  async addUser(userInfo) {
    const { email, password, ...restUserInfo } = userInfo;

    const user = await userDAO.findByEmail(email);

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser = { email, password: hashedPassword, ...restUserInfo };

      newUser = await userDAO.create(newUser);

      return newUser; 
    }

    throw new Error('이미 존재하는 email입니다.');
  },

  async setUser(email, toUpdate) {
    const user = await userDAO.findByEmail(email);

    if (user) {
      const updatedUser = await userDAO.update(email, toUpdate);

      return updatedUser;
    }

    throw new Error('해당 유저가 존재하지 않습니다.');
  },

  async deleteUser(email) {
    const user = await userDAO.findByEmail(email);

    if (user) {
      const deletedUser = await userDAO.deleteByEmail(email);

      return deletedUser;
    }

    throw new Error('해당 유저가 존재하지 않습니다.');
  },
};

export {
  userService,
};
