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
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isValid: {
      type: String,
      required: false,
      default: 'invalid',
    },
    isPasswordReset: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
