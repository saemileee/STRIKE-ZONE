import { model } from 'mongoose';
import UserSchema from '../schemas/user-schema.js';

const User = model('users', UserSchema);

export default User;
