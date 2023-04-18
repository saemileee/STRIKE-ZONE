import UserModel from '../db/index.js';

class UserService {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  async getAllUsers() {
    const allUsers = await this.userModel.findAll();

    return allUsers;
  }

  async addUser(userInfo) {
    const newUser = await this.userModel.create(userInfo);

    return newUser;
  }

  async setUser(userId, toUpdate) {
    let updatedUser = await this.userModel.findById(userId);

    updatedUser = await this.userModel.update(userId, toUpdate);

    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await this.userModel.deleteById(userId);

    return deletedUser;
  }
}

const userService = new UserService(UserModel);

export default userService;
