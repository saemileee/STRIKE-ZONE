import { Schema } from 'mongoose';

const OrderSchema = new Schema({
  orderId: { type: Number, required: true },

  productId: { type: Number, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  totalPayment: { type: Number, required: true },
  img: { type: String, required: true },

  ordererEmail: { type: String, required: true },
  ordererName: { type: String, required: true },
  ordererPhoneNumber: { type: String, required: true },

  recipientName: { type: String, required: true },
  recipientAddress1: { type: String, required: true },
  recipientAddress2: { type: String, required: true },
  recipientZipCode: { type: String, required: true },
  recipientPhoneNumber: { type: String, required: true },
}, {
  collection: 'orders',
  timestamps: true,
});

export { OrderSchema };
