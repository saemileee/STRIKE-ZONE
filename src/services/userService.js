import bcrypt from 'bcrypt';
import { userDAO } from '../data-access';

const userService = {
  async getAllUsers() {
    const allUsers = await userDAO.findAll();

    return allUsers;
  },

  async getUser(email) {
    const user = await userDAO.findByEmail(email);

    return user;
  },

  async addUser(userInfo) {
    const { email, password, ...user } = userInfo;

    const isDuplicated = await userDAO.findByEmail(email);

    if (isDuplicated) {
      throw new Error('이미 존재하는 email입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = { email, password: hashedPassword, ...user };

    newUser = await userDAO.create(newUser);

    return newUser;
  },

  async setUser(userId, toUpdate) {
    let updatedUser = await userDAO.findById(userId);

    updatedUser = await userDAO.update(userId, toUpdate);

    return updatedUser;
  },

  async deleteUser(userId) {
    const deletedUser = await userDAO.deleteById(userId);

    return deletedUser;
  },
};

export {
  userService,
};
