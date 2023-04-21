import { Schema } from 'mongoose';

import { v4 as uuid4 } from 'uuid';

const teamId = {
  type: String,
  default: () => uuid4(),
  required: true,
  index: true,
};

const TeamSchema = new Schema(
  {
    teamId,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    emblemPath: {
      type: String,
    },
  },
  {
    collection: 'teams',
    timestamps: true,
  },
);

export { TeamSchema };
