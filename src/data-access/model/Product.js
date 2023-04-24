import { model } from 'mongoose';
import { ProductSchema } from '../schemas';

const Product = model('products', ProductSchema);

export { Product };
