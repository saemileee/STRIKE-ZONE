import { shippingService } from '../services';

const shippingController = {

  // 카테고리 추가
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
