import { Schema } from 'mongoose';

const ShippingSchema = new Schema({
  shippingId: { type: String, required: true },
  deliveryCharge: { type: Number, default: 3000, required: true },
  shippingOrigin: {
    type: String,
    default: '성수 엘리스랩',
    required: true,
  },
}, {
  collection: 'shippings',
});

export { ShippingSchema };
