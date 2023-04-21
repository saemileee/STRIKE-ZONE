import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    teamId: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    teamDescription: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
    },
    shortDescription: {
      type: String,
    },
    detailDescription: {
      type: String,
    },
    img: {
      type: Array,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export { ProductSchema };
