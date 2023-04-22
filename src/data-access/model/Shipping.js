import { model } from 'mongoose';
import { ShippingSchema } from '../schemas';

const Shipping = model('shippings', ShippingSchema);

export { Shipping };
