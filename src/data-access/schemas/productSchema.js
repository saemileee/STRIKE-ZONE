import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    teamId: { type: String, required: true },
    teamName: { type: String, required: true },
    teamDescription: { type: String, required: true },
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    inventory: { type: Number, required: true },
    price: { type: Number, required: true },
    rate: { type: Number, default: 0 },
    discountedPrice: { type: Number },
    shortDescription: { type: String },
    detailDescription: { type: String },
    img: { type: Array },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export { ProductSchema };
