import { shippingService } from '../services';

const shippingController = {

  async getDefaultDeliveryCharge(req, res, next) {
    try {
      const defaultDeliveryInfo = await shippingService.getDefaultDeliveryCharge();

      res.status(200).json(defaultDeliveryInfo);
    } catch (error) {
      next(error);
    }
  },

};

export { shippingController };
