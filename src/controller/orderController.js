import { orderService } from '../services';

const orderController = {
  // 주문 저장하기
  async createOrder(req, res, next) {
    try {
      const orderInfo = req.body;

      const createdOrder = await orderService.createOrder(orderInfo);

      res.status(201).json({ result: 'success', createdOrder });
    } catch (error) {
      next(error);
    }
  },

  // 모든 주문 정보 조회하기
  async getAllOrders(req, res, next) {
    try {
      const orders = await orderService.getAllOrders();

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  // 특정 유저의 모든 주문 정보 조회하기
  async getOrdersByUserId(req, res, next) {
    try {
      const { ordererEmail } = req.params;

      const orders = await orderService.getOrdersByUserId(ordererEmail);

      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  // 특정 orderId 에 해당하는 주문 정보 조회하기
  async getOrderByOrderId(req, res, next) {
    try {
      const { orderId } = req.params;

      const order = await orderService.getOrderByOrderId(orderId);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  // 특정 orderId 에 해당하는 배송지 정보 수정하기
  async updateRecipientByOrderId(req, res, next) {
    try {
      const { orderId } = req.params;
      const recipientInfo = req.body;

      await orderService.updateRecipientByOrderId(orderId, recipientInfo);

      res.status(200).json({ result: 'order recipient updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // 특정 orderId 에 해당하는 배송 상태 수정하기
  async updateStatusByOrderId(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      await orderService.updateStatusByOrderId(orderId, status);

      res.status(200).json({ result: 'order status updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  // 다수의 orderId 에 해당하는 배송 상태 수정하기
  async updateStatus(req, res, next) {
    try {
      const { orderIds, status } = req.body;

      const updatedCount = await orderService.updateStatus(orderIds, status);

      res
        .status(200)
        .json({ result: `${updatedCount}개 주문의 배송 상태가 '${status}'로 변경되었습니다.` });
    } catch (error) {
      next(error);
    }
  },

  // 특정 orderId 에 해당하는 주문 정보 삭제하기
  async deleteOrderByOrderId(req, res, next) {
    try {
      const { orderId } = req.params;

      const { deletedCount } = await orderService.deleteOrderByOrderId(orderId);

      res.status(200).json({ result: `${deletedCount}의 주문이 취소되었습니다.` });
    } catch (error) {
      next(error);
    }
  },

  // 다수의 orderId 들에 해당하는 주문 정보들을 삭제하기
  async deleteOrders(req, res, next) {
    try {
      const { orderIds } = req.body;

      const deletedCount = await orderService.deleteOrders(orderIds);

      res.status(200).json({ result: `${deletedCount}개의 주문이 삭제되었습니다.` });
    } catch (error) {
      next(error);
    }
  },
};

export { orderController };
