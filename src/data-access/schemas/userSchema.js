import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    koreanName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      postCode: {
        type: Number,
        required: true,
      },
      roughAddress: {
        type: String,
        required: true,
      },
      detailAddress: {
        type: String,
        required: true,
      },
    },
    cheerTeam: {
      type: Schema.Types.ObjectId,
      ref: 'teams',
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
