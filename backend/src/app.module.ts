import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import type { RedisClientOptions } from 'redis';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { join } from 'path';
import { ENV_CONFIG, validate } from './configs/env';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ItemModule } from './modules/item/item.module';
import { formatError } from './utils/formatError';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ENV_CONFIG],
      isGlobal: true,
      cache: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUser = configService.get<string>('MONGO_USER');
        const mongoHost = configService.get<string>('MONGO_HOST');
        const mongoPwd = configService.get<string>('MONGO_PASSWORD');
        const mongoDb = configService.get<string>('MONGO_DATABASE');
        const mongoUri = `mongodb://${mongoUser}:${mongoPwd}@${mongoHost}/${mongoDb}?authSource=admin&readPreference=primary`;
        return {
          uri: mongoUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        debug: !configService.get<string>('IS_PROD'),
        playground: configService.get<boolean>('OPEN_PLAYGROUND'),
        introspection: !configService.get<string>('IS_PROD'),
        typePaths: ['./**/*.graphql'],
        formatError,
        definitions: {
          path: join(process.cwd(), 'src', 'graphql.ts'),
          outputAs: 'class',
        },
      }),
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        level: configService.get<string>('LOG_LEVEL'),
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.errors({ stack: true }),
          format.colorize(),
          format.simple(),
        ),
        transports: new transports.Console({
          stderrLevels: ['error'],
          consoleWarnLevels: ['warn'],
        }),
        exceptionHandlers: new transports.Console(),
        exitOnError: false,
      }),
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
        }),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
    AuthModule,
    UserModule,
    WalletModule,
    ItemModule,
  ],
})
export class AppModule {}
