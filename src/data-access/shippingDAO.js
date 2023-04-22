import { Shipping } from './model';

const shippingDAO = {
  async getDefaultDeliveryCharge() {
    const { deliveryCharge } = await Shipping.findOne({ shippingId: 'default' });

    return deliveryCharge;
  },
};

export { shippingDAO };
