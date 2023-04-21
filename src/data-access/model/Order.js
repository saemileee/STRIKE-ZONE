import { model } from 'mongoose';
import { OrderSchema } from '../schemas';

const Order = model('orders', OrderSchema);

export { Order };
