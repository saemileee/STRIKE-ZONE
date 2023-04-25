import { Router } from 'express';

import { orderController } from '../controller';

const orderRouter = Router();

// 주문 추가
orderRouter.post('/orders', orderController.createOrder);

// 모든 주문 조회
orderRouter.get('/orders', orderController.getAllOrders);

// 특정 유저의 주문 목록 조회
orderRouter.get('/users/:ordererEmail/orders', orderController.getOrdersByUserId);

// 특정 orderId 의 주문 정보 조회
orderRouter.get('/orders/:orderId', orderController.getOrderByOrderId);

// 특정 orderId 의 배송지 정보 수정 (사용자)
orderRouter.put('/orders/:orderId/recipient', orderController.updateRecipientByOrderId);

// 특정 orderId 의 배송 상태(ex. "배송중") (관리자)
orderRouter.put('/orders/:orderId/status', orderController.updateStatusByOrderId);

// 다수 orderId 들의 배송 상태(ex. "배송중") (관리자)
orderRouter.put('/orders/status', orderController.updateStatus);

// 특정 orderId 의 주문 취소
orderRouter.delete('/orders/:orderId', orderController.deleteOrderByOrderId);

// 다수의 orderId 들의 주문 취소
orderRouter.delete('/orders', orderController.deleteOrders);

export { orderRouter };
