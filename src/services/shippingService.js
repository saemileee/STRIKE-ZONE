import { shippingDAO } from '../data-access';

const shippingService = {

  async getDefaultDeliveryCharge() {
    const defaultDeliveryInfo = await shippingDAO.getDefaultDeliveryInfo();

    return defaultDeliveryInfo;
  },
};

export { shippingService };
