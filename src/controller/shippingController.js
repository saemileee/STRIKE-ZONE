import { shippingService } from '../services';

const shippingController = {

  async getDefaultDeliveryCharge(request, response, next) {
    try {
      const defaultDeliveryInfo = await shippingService.getDefaultDeliveryCharge();

      response.status(200).json(defaultDeliveryInfo);
    } catch (error) {
      next(error);
    }
  },

};

export { shippingController };
