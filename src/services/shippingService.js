import { shippingDAO } from '../data-access';

const shippingService = {

  async getDefaultDeliveryCharge() {
    const deliveryCharge = await shippingDAO.getDefaultDeliveryCharge();

    return deliveryCharge;
  },
};

export { shippingService };
