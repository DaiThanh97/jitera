import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { winstonFormat } from './configs/syslog';
import { format } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GraphQLError } from 'graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const OPEN_PLAYGROUND = configService.get<boolean>('OPEN_PLAYGROUND');
  const LOG_INLINE = configService.get<string>('LOG_INLINE');
  const SERVICE_NAME = configService.get<string>('SERVICE_NAME');

  if (!LOG_INLINE) {
    winstonFormat.push(format.prettyPrint({ colorize: true }));
  }

  app.use(helmet({ ...(OPEN_PLAYGROUND && { contentSecurityPolicy: false }) }));

  await app
    .listen(PORT)
    .then(() => Logger.log(`🚀  ${SERVICE_NAME} is ready at ${PORT}`))
    .catch((err) => Logger.error('Something went wrong ', err));
}
bootstrap();
