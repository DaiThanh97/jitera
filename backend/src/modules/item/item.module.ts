import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ItemResolver } from './item.resolver';
import { UserModule } from '../user/user.module';
import { ItemSchema, ITEMS_MODEL_NAME } from './item.schema';
import { ItemService } from './item.service';
import { BullModule } from '@nestjs/bull';
import { ITEM_QUEUE } from './item.constant';
import { ExpiresProcessor } from './processors/expires.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ITEMS_MODEL_NAME, schema: ItemSchema }]),
    BullModule.registerQueue({
      name: ITEM_QUEUE,
    }),
    AuthModule,
    UserModule,
  ],
  providers: [ItemResolver, ItemService, ExpiresProcessor],
})
export class ItemModule {}
