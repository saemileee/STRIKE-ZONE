import { Schema } from 'mongoose';

const OrderedProductSchema = new Schema({
  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const OrdererSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const RecipientSchema = new Schema({
  name: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  zipCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const OrderSchema = new Schema({
  orderId: { type: Number, required: true },
  productsPayment: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalPayment: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['무통장 입금', '카드', '네이버페이', '카카오페이', '토스'],
    default: '무통장 입금',
  },
  requirement: { type: String },
  status: {
    type: String,
    enum: ['결제 전', '상품 준비중', '배송 준비중', '배송 중', '배송 완료'],
    default: '결제 전',
  },
  products: [OrderedProductSchema],
  orderer: OrdererSchema,
  recipient: RecipientSchema,
}, {
  collection: 'orders',
  timestamps: true,
});

export { OrderSchema };
