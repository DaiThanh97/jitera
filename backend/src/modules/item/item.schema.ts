import { Document, Schema } from 'mongoose';
import { BidStatus, ItemState } from '../../graphql';
import { USERS_MODEL_NAME } from '../user/user.schema';
import IdTransformer from '../../utils/transform/mongoose-id-transformer';
import { IItem } from './item.interface';

export const ITEMS_MODEL_NAME = 'items';
export const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    startedPrice: { type: Number, required: true },
    currentPrice: { type: Number },
    duration: { type: Number, required: true },
    state: {
      type: String,
      enum: Object.values(ItemState),
      required: true,
      default: ItemState.DRAFT,
    },
    bidStatus: {
      type: String,
      enum: Object.values(BidStatus),
      required: true,
      default: BidStatus.ONGOING,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: USERS_MODEL_NAME },
    bidBy: { type: Schema.Types.ObjectId, ref: USERS_MODEL_NAME },
    expiredDate: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform: IdTransformer,
    },
  },
);

export type ItemDocument = IItem & Document;
