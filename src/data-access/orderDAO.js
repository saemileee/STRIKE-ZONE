import { Order } from './model';

const orderDAO = {

  // 주문 저장하기
  async createOrder(orderInfo) {
    // 가장 마지막에 등록된 주문을 검색해서 해당 orderId 에서 +1 을 한 값을
    // 새로 저장할 주문의 orderId 로 사용한다.
    const lastOrder = await Order.find({}).sort({ createdAt: -1 }).limit(1);
    const lastOrderId = lastOrder ? lastProduct[0].productId : 0;
    const nextOrderId = lastOrderId + 1;
    await Order.create({ ...orderInfo, orderId: nextOrderId });
  },

  // 모든 주문 정보 조회하기
  async getAllOrders() {
    const orders = await Order.find({});

    return orders;
  },

  // 특정 유저의 모든 주문 정보 조회하기
  async getOrdersByUserId(ordererEmail) {
    const orders = await Order.find({ ordererEmail });

    return orders;
  },

  // 특정 orderId 에 해당하는 주문 정보 조회하기
  async getOrderByOrderId(orderId) {
    const order = await Order.findOne({ orderId });

    return order;
  },

};

export { orderDAO };
