import { Schema } from 'mongoose';

import { v4 as uuid4 } from 'uuid';

const categoryId = {
  type: String,
  default: () => uuid4(),
  required: true,
  index: true,
};

const CategorySchema = new Schema(
  {
    teamId: {
      type: String,
      required: true,
    },
    categoryId,
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  },
);

export { CategorySchema };
