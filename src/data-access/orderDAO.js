import { Order, Product } from './model';

const orderDAO = {

  // 주문 저장하기
  async createOrder(orderInfo) {
    // 가장 마지막에 등록된 주문의 orderId + 1 해서 새 주문의 orderId 로 사용한다.
    const lastOrder = await Order.find({}).sort({ createdAt: -1 }).limit(1);
    const lastOrderId = lastOrder.length === 0 ? 0 : lastOrder[0].orderId;
    const nextOrderId = lastOrderId + 1;
    await Order.create({ ...orderInfo, orderId: nextOrderId });

    // TODO : 주문을 저장 후, [해당 productId의 상품 수량]에서 [주문 수량]만큼 차감해야 한다.
    const { productId, quantity: orderedQuantity } = orderInfo;

    const product = await Product.findOne({ productId });
    const currentProductQuantity = product.quantity;

    await Product.updateOne({ productId }, { quantity: currentProductQuantity - orderedQuantity });
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
