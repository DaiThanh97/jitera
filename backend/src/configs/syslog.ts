import { format, Logform } from 'winston';

export const winstonFormat: Logform.Format[] = [
  format.timestamp({ format: 'isoDateTime' }),
  format.json(),
];
