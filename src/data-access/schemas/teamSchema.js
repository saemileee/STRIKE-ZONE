import { Schema } from 'mongoose';

const TeamSchema = new Schema(
  {
    teamId: {
      type: String,
      required: true,
    },
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
