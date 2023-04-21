import { orderService } from '../services';

const orderController = {

  // 주문 저장하기
  async createOrder(request, response, next) {
    try {
      const orderInfo = request.body;

      await orderService.createOrder(orderInfo);

      response.status(200).json({ result: 'success' });
    } catch (error) {
      next(error);
    }
  },

  // 모든 주문 정보 조회하기
  async getAllOrders(request, response, next) {
    try {
      const orders = await orderService.getAllOrders();

      response.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  // 특정 유저의 모든 주문 정보 조회하기
  async getOrdersByUserId(request, response, next) {
    try {
      const { ordererEmail } = request.params;

      const orders = await orderService.getOrdersByUserId(ordererEmail);

      response.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  // 특정 orderId 에 해당하는 주문 정보 조회하기
  async getOrderByOrderId(request, response, next) {
    try {
      const { orderId } = request.params;

      const order = await orderService.getOrderByOrderId(orderId);

      response.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

};

export { orderController };
