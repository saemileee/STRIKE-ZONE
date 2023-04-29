import { model } from 'mongoose';
import { OrderSchema } from '../schemas';

const Order = model('orders', OrderSchema);

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
    const { modifiedCount } = await Order.updateOne({ orderId }, { status });

    return modifiedCount;
  },

  async deleteOrderByOrderId(orderId) {
    const { deletedCount } = await Order.deleteOne({ orderId });
    return deletedCount;
  },

  async createOrderId() {
    const currentDocumentsCount = await Order.countDocuments();
    const nextOrderId = currentDocumentsCount === 0 ? 1 : currentDocumentsCount + 1;
    return nextOrderId;
  },
};

export { orderDAO };
