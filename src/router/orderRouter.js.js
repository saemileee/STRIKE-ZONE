import { Router } from 'express';

import { orderController } from '../controller';

const orderRouter = Router();

// 주문 추가
orderRouter.post('/orders', orderController.createOrder);

// 모든 주문 조회
orderRouter.get('/orders', orderController.getAllOrders);

// 특정 유저의 주문 목록 조회
orderRouter.get('/users/:email/orders', orderController.getOrdersByUserId);

// 특정 orderId 의 주문 정보 조회
orderRouter.get('/orders/:orderId', orderController.getOrderByOrderId);

export { orderRouter };
