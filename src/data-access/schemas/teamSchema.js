import { Schema } from 'mongoose';

const TeamSchema = new Schema(
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
