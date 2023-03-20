import { HttpStatus } from '@nestjs/common';
import { BaseError, IBaseError } from '../../common/errors/base.error';

export class AuthError extends BaseError {
  constructor(baseError: IBaseError) {
    super(baseError);
  }
}

export const NOT_AUTHENTICATED: IBaseError = {
  message: 'Invalid credentials.',
  statusCode: HttpStatus.UNAUTHORIZED,
};

export const EMAIL_EXISTS: IBaseError = {
  message: 'Email is already existed! Please try another email.',
  statusCode: HttpStatus.BAD_REQUEST,
};

export const UNKNOWN_ERROR: IBaseError = {
  message: 'An unknown error occurred',
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
};

export const NOT_AUTHORIZED: IBaseError = {
  message: 'Not allowed to access.',
  statusCode: HttpStatus.UNAUTHORIZED,
};

export const USER_NOT_FOUND: IBaseError = {
  message: 'User not found.',
  statusCode: HttpStatus.NOT_FOUND,
};
