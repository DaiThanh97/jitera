import { HttpStatus } from '@nestjs/common';
import { BaseError, IBaseError } from '../../common/errors/base.error';

export class UserError extends BaseError {}

export const USER_NOT_EXIST: IBaseError = {
  message: 'User does not existed.',
  statusCode: HttpStatus.NOT_FOUND,
};
