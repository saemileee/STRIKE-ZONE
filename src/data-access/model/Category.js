import { model } from 'mongoose';
import { CategorySchema } from '../schemas';

const Category = model('categories', CategorySchema);

export { Category };
