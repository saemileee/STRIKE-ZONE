import { Schema } from 'mongoose';

const CategorySchema = new Schema(
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
      enum: ['유니폼', '모자', '의류', '잡화', '응원용품', '야구용품'],
      required: true,
    },
    categoryDescription: {
      type: String,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  },
);

export { CategorySchema };
