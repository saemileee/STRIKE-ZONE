import userDAO from '../data-access/index';

const userService = {
  async getAllUsers() {
    const allUsers = await userDAO.findAll();

    return allUsers;
  },

  async addUser(userInfo) {
    const newUser = await userDAO.create(userInfo);

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
  }
};

export default userService;
