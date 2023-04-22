import { Shipping } from './model';

const shippingDAO = {
  async getDefaultDeliveryInfo() {
    const defaultDeliveryInfo = await Shipping.findOne({ shippingId: 'default' });

    return defaultDeliveryInfo;
  },
};

export { shippingDAO };
