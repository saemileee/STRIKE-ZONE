import { shippingService } from '../services';

const shippingController = {

  // 카테고리 추가
  async getDefaultDeliveryCharge(request, response, next) {
    try {
      const defaultDeliveryCharge = await shippingService.getDefaultDeliveryCharge();

      response.status(200).json({ deliveryCharge: defaultDeliveryCharge });
    } catch (error) {
      next(error);
    }
  },

};

export { shippingController };
