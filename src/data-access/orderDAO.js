import { Order, Product, Shipping } from './model';

const orderDAO = {

  async createOrder(orderInfo) {
    // 총 상품 금액과 총 주문 금액 계산하기
    const {
      productsPayment,
      deliveryCharge,
      totalPayment,
    } = await this.calculatePayments(orderInfo);

    // orderId 계산하기
    const orderId = await this.createOrderId();

    // 주문 등록하기
    await Order.create({
      ...orderInfo, orderId, productsPayment, totalPayment, deliveryCharge,
    });

    // 주문을 저장 후, [해당 productId의 상품 수량]에서 [주문 수량]만큼 차감해야 한다.
    await this.updateProductQuantityByOrder(orderInfo);

    // 완료된 주문 정보를 클라이언트에 전달하기
    const createdOrder = await Order.findOne({ orderId });
    return createdOrder;
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

  async createOrderId() {
    // 가장 마지막에 등록된 주문의 orderId + 1 해서 새 주문의 orderId 로 사용한다.
    const lastOrder = await Order.find({}).sort({ createdAt: -1 }).limit(1);
    const lastOrderId = lastOrder.length === 0 ? 0 : lastOrder[0].orderId;
    const nextOrderId = lastOrderId + 1;

    return nextOrderId;
  },

  async calculatePayments(orderInfo) {
    const initialValue = 0;
    const { products } = orderInfo;

    const productsPayment = products.reduce(
      (accumulator, product) => accumulator + (product.quantity * product.price),
      initialValue,
    );

    // 기본 배송비 조회
    const { deliveryCharge } = await Shipping.findOne({ shippingId: 'default' });

    const totalPayment = productsPayment + deliveryCharge;

    return { productsPayment, deliveryCharge, totalPayment };
  },

  async updateProductQuantityByOrder(orderInfo) {
    const { products } = orderInfo;

    // 주문한 상품마다 productId, quantity 를 확인한다.
    const orderedProductsIdAndQuantity = products.map(
      ({ productId, quantity }) => (
        { orderedProductId: productId, orderedProductQuantity: quantity }
      ),
    );

    orderedProductsIdAndQuantity.forEach(
      async ({ orderedProductId, orderedProductQuantity }) => {
      // 주문한 상품 정보를 조회해서 재고 확인하기
        const product = await Product.findOne({ productId: orderedProductId });

        // 수정될 상품 수량 계산하기
        const quantityToBeUpdated = product.quantity - orderedProductQuantity;

        await Product.updateOne(
          { productId: orderedProductId },
          { quantity: quantityToBeUpdated },
        );
      },
    );
  },
};

export { orderDAO };
