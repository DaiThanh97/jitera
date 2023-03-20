import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITEM_JOB, ITEM_QUEUE } from '../item.constant';
import { ItemDocument, ITEMS_MODEL_NAME } from '../item.schema';
import { IItemJobExpiration } from '../item.interface';
import { BidStatus } from 'src/graphql';
import { ItemError } from '../item.error';

@Processor(ITEM_QUEUE)
export class ExpiresProcessor {
  constructor(
    @InjectModel(ITEMS_MODEL_NAME) private itemModel: Model<ItemDocument>,
  ) {}

  @Process(ITEM_JOB)
  async processExpiration(job: Job<IItemJobExpiration>) {
    try {
      const { itemId } = job.data;
      await this.itemModel.findByIdAndUpdate(itemId, {
        $set: {
          bidStatus: BidStatus.COMPLETED,
        },
      });
    } catch (err) {
      throw new ItemError(err);
    }
  }
}
