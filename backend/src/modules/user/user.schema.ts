import { Schema, HydratedDocumentFromSchema } from 'mongoose';
import IdTransformer from '../../utils/transform/mongoose-id-transformer';

export const USERS_MODEL_NAME = 'users';
export const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform: IdTransformer,
    },
  },
);

export type UserDocument = HydratedDocumentFromSchema<typeof UserSchema>;
