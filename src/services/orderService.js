import { orderDAO, productDAO, shippingDAO } from '../data-access/model';

const DEFAULT_PAYMENT_METHOD = '무통장 입금';
const STATUS_BY_DEFAULT_PAYMENT_METHOD = '결제확인중';
const STATUS_BY_PAYMENT_METHOD = '상품준비중';

const orderService = {
  // 주문 저장하기
  async createOrder(orderInfo) {
    // const createdOrder = await orderDAO.createOrder(orderInfo);

    // 총 상품 금액과 총 주문 금액 계산하기
    const { productsPayment, deliveryCharge, totalPayment } = await this.calculatePayments(
      orderInfo
    );

    // 결제 방식에 따라 주문 정보를 결정하기
    const status = this.setOrderStatusByPaymentMethod(orderInfo.paymentMethod);

    // orderId 계산하기
    const orderId = await orderDAO.createOrderId();

    // 주문 등록하기
    await orderDAO.createOrder({
      ...orderInfo,
      orderId,
      productsPayment,
      deliveryCharge,
      totalPayment,
      status,
    });

    // 주문을 저장 후, [해당 productId의 상품 수량]에서 [주문 수량]만큼 차감해야 한다.
    await this.updateProductQuantityAfterOrder(orderInfo);

    // 완료된 주문 정보를 클라이언트에 전달하기
    const createdOrder = await orderDAO.getOrderByOrderId(orderId);
    return createdOrder;
  },

  // 모든 주문 정보 조회하기
  async getAllOrders() {
    const orders = await orderDAO.getAllOrders();

    return orders;
  },

  // 특정 유저의 모든 주문 정보 조회하기
  async getOrdersByUserId(ordererEmail) {
    const orders = await orderDAO.getOrdersByUserId(ordererEmail);

    return orders;
  },

  // 특정 orderId 에 해당하는 주문 정보 조회하기
  async getOrderByOrderId(orderId) {
    const order = await orderDAO.getOrderByOrderId(orderId);

    return order;
  },

  // 특정 orderId 에 해당하는 배송지 정보 수정
  async updateRecipientByOrderId(orderId, recipientInfo) {
    await orderDAO.updateRecipientByOrderId(orderId, recipientInfo);
  },

  // 특정 orderId 에 해당하는 배송 상태 정보 수정
  async updateStatusByOrderId(orderId, status) {
    await orderDAO.updateStatusByOrderId(orderId, status);
  },

  // 다수의 orderId 에 해당하는 배송 상태 정보 수정
  async updateStatus(orderIds, status) {
    let modifiedCount = 0;
    const promises = orderIds.map(async (orderId) => {
      const result = await orderDAO.updateStatusByOrderId(orderId, status);
      modifiedCount += result;
    });

    await Promise.all(promises);

    return modifiedCount;
  },

  // 특정 orderId 에 해당하는 주문 정보 삭제하기
  async deleteOrderByOrderId(orderId) {
    const deletedCount = await orderDAO.deleteOrderByOrderId(orderId);

    let modifiedCount = 0;

    const order = await orderDAO.getOrderByOrderId(orderId);
    const { products } = order;
    const promises = products.map(async ({ productId, quantity }) => {
      const result = productDAO.addInventoryByCanceldOrder(productId, quantity);
      modifiedCount += result;
    });

    await Promise.all(promises);

    return { deletedCount, modifiedCount };
  },

  // 다수의 orderId 에 해당하는 주문 정보들을 삭제하기
  async deleteOrders(orderIds) {
    let deletedCount = 0;
    let modifiedCount = 0;
    const promises = orderIds.map(async (orderId) => {
      const result = await this.deleteOrderByOrderId(orderId);
      deletedCount += result.deletedCount;
      modifiedCount += result.modifiedCount;
    });

    await Promise.all(promises);

    return { deletedCount, modifiedCount };
  },

  // 결제 수단에 따라 기본 배송 상태를 정하기 ('결제전' or '상품준비중')
  setOrderStatusByPaymentMethod(paymentMethod) {
    let status = STATUS_BY_PAYMENT_METHOD;

    // TODO: 프론트단에서도 미리 결제 수단이 undefined 로 넘어오지 않도록 처리하는 게 더 좋을 것 같다.
    if (paymentMethod === undefined || paymentMethod === DEFAULT_PAYMENT_METHOD) {
      status = STATUS_BY_DEFAULT_PAYMENT_METHOD;
    }

    return status;
  },

  async calculatePayments(orderInfo) {
    const initialValue = 0;
    const { products } = orderInfo;

    // 총 상품 금액 계산하기
    const productsPayment = products.reduce(
      (accumulator, product) => accumulator + product.quantity * product.price,
      initialValue
    );

    // 기본 배송비 조회
    const { deliveryCharge } = await shippingDAO.getDefaultDeliveryInfo();

    // 총 결제금액 계산 : 총 상품 금액 + 배송비
    const totalPayment = productsPayment + deliveryCharge;

    return { productsPayment, deliveryCharge, totalPayment };
  },

  // 주문 생성 후, 주문한 수량만큼 상품 재고에서 차감하기
  async updateProductQuantityAfterOrder(orderInfo) {
    const { products } = orderInfo;

    // 주문한 상품마다 productId, quantity 를 확인한다.
    const orderedProductsIdAndQuantity = products.map(({ productId, quantity }) => ({
      orderedProductId: productId,
      orderedProductQuantity: quantity,
    }));

    orderedProductsIdAndQuantity.forEach(async ({ orderedProductId, orderedProductQuantity }) => {
      // 주문한 상품 정보를 조회해서 재고 확인하기
      const product = await productDAO.findProductByProductId(orderedProductId);

      // 수정될 상품 수량 계산하기
      const quantityToBeUpdated = product.inventory - orderedProductQuantity;

      await productDAO.updateProductByProductId(orderedProductId, {
        inventory: quantityToBeUpdated,
      });
    });
  },
};

export { orderService };
