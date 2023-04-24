import { model } from 'mongoose';
import { UserSchema } from '../schemas';

const User = model('users', UserSchema);

export { User };
