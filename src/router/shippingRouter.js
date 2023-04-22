import { Router } from 'express';

import { shippingController } from '../controller';

const shippingRouter = Router();

// 기본 배송료 조회
shippingRouter.get('/shippings/default', shippingController.getDefaultDeliveryCharge);

export { shippingRouter };