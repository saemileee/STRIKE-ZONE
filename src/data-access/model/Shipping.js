import { model } from 'mongoose';
import { ShippingSchema } from '../schemas';

const Shipping = model('shippings', ShippingSchema);

const shippingDAO = {
  async getDefaultDeliveryInfo() {
    const defaultDeliveryInfo = await Shipping.findOne({ shippingId: 'default' });

    return defaultDeliveryInfo;
  },
};

export { shippingDAO };
