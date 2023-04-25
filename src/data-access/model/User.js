import { model } from 'mongoose';
import { UserSchema } from '../schemas';

const User = model('users', UserSchema);

const userDAO = {
  async findByEmail(email) {
    const user = await User.findOne({ email }).populate('cheerTeam');

    return user;
  },

  async findById(userId) {
    const user = await User.findOne({ _id: userId }).populate('cheerTeam');

    return user;
  },

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);

    return createdNewUser;
  },

  async findAll() {
    const users = await User.find({}).populate('cheerTeam');

    return users;
  },

  async update(email, update) {
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate({ email }, update, option);

    return updatedUser;
  },

  async deleteByEmail(email) {
    const result = await User.deleteOne({ email });

    return result;
  },
};

export { userDAO };
