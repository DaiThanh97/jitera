import { HttpStatus } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';
import { BaseError } from '../common/errors/base.error';

interface IOriginalError {
  statusCode: HttpStatus;
  message: string[];
}

interface IException {
  message: string;
  statusCode: HttpStatus;
}

const handleMessage = (formattedError: BaseError, err: any) => {
  const originalError = err.extensions?.originalError as IOriginalError;
  if (originalError) {
    return originalError.message[0];
  }

  return (
    (formattedError?.extensions?.exception as IException)?.message ||
    formattedError?.message
  );
};

const handleStatusCode = (formattedError: BaseError, err: any) => {
  const originalError = err.extensions?.originalError as IOriginalError;
  if (originalError) {
    return originalError.statusCode;
  }

  return (
    (formattedError?.extensions?.exception as IException)?.statusCode ||
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};

export const formatError = (
  formattedError: BaseError,
  error: any,
): GraphQLFormattedError => {
  const graphQLFormattedError = {
    message: handleMessage(formattedError, error),
    status: handleStatusCode(formattedError, error),
  };
  return graphQLFormattedError;
};
