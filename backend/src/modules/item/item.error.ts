import { HttpStatus } from '@nestjs/common';
import { BaseError, IBaseError } from '../../common/errors/base.error';

export class ItemError extends BaseError {}

export const ITEM_NOT_FOUND: IBaseError = {
  message: 'Item not found.',
  statusCode: HttpStatus.NOT_FOUND,
};

export const ITEM_DRAFT: IBaseError = {
  message: 'Cannot bid item which is draft.',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const ITEM_COMPLETED: IBaseError = {
  message: 'Cannot bid item which is completed.',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const BID_PRICE_INVALID: IBaseError = {
  message: 'Bid price must be higher than current price.',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const USER_NOT_ENOUGH_BALANCE: IBaseError = {
  message: 'Not enough balance to bid.',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const USER_TIME_INVALID: IBaseError = {
  message: 'Please wait a moment until next bid on this item.',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const ITEM_PUBPLISHED: IBaseError = {
  message: 'Item was published already.',
  statusCode: HttpStatus.BAD_REQUEST,
};
