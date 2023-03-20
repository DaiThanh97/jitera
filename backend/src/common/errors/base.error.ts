import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';

export interface IBaseError {
  message: string;
  statusCode: number;
}

export abstract class BaseError extends GraphQLError {
  readonly statusCode: HttpStatus;

  constructor(baseError: IBaseError) {
    const { message, statusCode } = baseError;
    super(message, {
      extensions: {
        exception: {
          statusCode,
          message,
        },
      },
      originalError: new Error('HEHE'),
    });
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, BaseError);
  }
}
