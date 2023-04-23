import { Order } from './model';

const orderDAO = {

  async createOrder(orderInfo) {
    await Order.create(orderInfo);
  },

  async getAllOrders() {
    const orders = await Order.find({});

    return orders;
  },

  async getOrdersByUserId(ordererEmail) {
    const orders = await Order.find({ 'orderer.email': ordererEmail });

    return orders;
  },

  async getOrderByOrderId(orderId) {
    const order = await Order.findOne({ orderId });

    return order;
  },

  // 특정 주문의 배송지 정보 수정
  async updateRecipientByOrderId(orderId, recipientInfo) {
    await Order.updateOne({ orderId }, { recipient: { ...recipientInfo } });
  },

  // 특정 주문의 배송 상태 수정
  async updateStatusByOrderId(orderId, status) {
    await Order.updateOne({ orderId }, { status });
  },

  async deleteOrderByOrderId(orderId) {
    await Order.deleteOne({ orderId });
  },

  async createOrderId() {
    // 가장 마지막에 등록된 주문의 orderId + 1 해서 새 주문의 orderId 로 사용한다.
    const lastOrder = await Order.find({}).sort({ createdAt: -1 }).limit(1);
    const lastOrderId = lastOrder.length === 0 ? 0 : lastOrder[0].orderId;
    const nextOrderId = lastOrderId + 1;

    return nextOrderId;
  },

};

export { orderDAO };
