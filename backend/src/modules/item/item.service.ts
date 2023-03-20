import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { add, isAfter } from 'date-fns';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { ItemDocument, ITEMS_MODEL_NAME } from './item.schema';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  BidItemDto,
  CreateItemDto,
  ItemFilterDto,
  PublishItemDto,
} from './item.dto';
import {
  BID_PRICE_INVALID,
  ItemError,
  ITEM_COMPLETED,
  ITEM_DRAFT,
  ITEM_NOT_FOUND,
  ITEM_PUBPLISHED,
  USER_NOT_ENOUGH_BALANCE,
  USER_TIME_INVALID,
} from './item.error';
import { BidStatus, ItemState } from '../../graphql';
import { UserService } from '../user/user.service';
import { IItem, IItemJobExpiration, IItemsResult } from './item.interface';
import { ITEM_JOB, ITEM_QUEUE } from './item.constant';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(ITEMS_MODEL_NAME) private itemModel: Model<ItemDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue(ITEM_QUEUE) private itemQueue: Queue<IItemJobExpiration>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async items(
    filter: ItemFilterDto,
    limit: number,
    skip: number,
  ): Promise<IItemsResult> {
    try {
      const { bidStatus } = filter;
      const query = {
        ...(bidStatus && { bidStatus }),
        state: ItemState.PUBLISH,
      };

      const [items, totalCount] = await Promise.all([
        this.itemModel
          .find(query)
          .sort({ updatedAt: -1 })
          .skip(skip || 0)
          .limit(limit || 10),
        this.itemModel.countDocuments(query),
      ]);

      return {
        result: items,
        totalCount,
      };
    } catch (err) {
      throw new ItemError(err);
    }
  }

  async itemsByUser(
    limit: number,
    skip: number,
    userId: string,
  ): Promise<IItemsResult> {
    try {
      const query = {
        createdBy: userId,
      };

      const [items, totalCount] = await Promise.all([
        this.itemModel
          .find(query)
          .sort({ updatedAt: -1 })
          .skip(skip || 0)
          .limit(limit || 10),
        this.itemModel.countDocuments(query),
      ]);

      return {
        result: items,
        totalCount,
      };
    } catch (err) {
      throw new ItemError(err);
    }
  }

  async createItem(
    createItemDto: CreateItemDto,
    userId: string,
  ): Promise<IItem> {
    try {
      const { name, startedPrice, duration } = createItemDto;
      const item = await this.itemModel.create({
        name,
        startedPrice,
        currentPrice: startedPrice,
        duration,
        createdBy: userId,
      });
      return item;
    } catch (err) {
      throw new ItemError(err);
    }
  }

  async publishItem(
    publishItemDto: PublishItemDto,
    userId: string,
  ): Promise<IItem> {
    try {
      const { id } = publishItemDto;
      const item = await this.itemModel.findOne({
        _id: id,
        createdBy: userId,
      });

      if (!item) {
        throw new ItemError(ITEM_NOT_FOUND);
      }

      if (item.state === ItemState.PUBLISH) {
        throw new ItemError(ITEM_PUBPLISHED);
      }

      item.state = ItemState.PUBLISH;
      item.expiredDate = add(new Date(), { hours: item.duration });
      const publishedItem = await item.save();

      // JOB to process item expiration
      await this.itemQueue.add(
        ITEM_JOB,
        { itemId: item.id },
        { delay: item.duration * 3600 * 1000 }, // ms
      );

      return publishedItem;
    } catch (err) {
      throw new ItemError(err);
    }
  }

  async bidItem(bidItemDto: BidItemDto, userId: string): Promise<IItem> {
    try {
      const { id, price } = bidItemDto;
      const item = await this.itemModel.findById(id);

      // Check if item does exist
      if (!item) {
        throw new ItemError(ITEM_NOT_FOUND);
      }

      // Check if item is published
      if (item.state === ItemState.DRAFT) {
        throw new ItemError(ITEM_DRAFT);
      }

      // Check if item is ongoing to bid
      if (
        item.bidStatus === BidStatus.COMPLETED ||
        isAfter(new Date(), item.expiredDate)
      ) {
        throw new ItemError(ITEM_COMPLETED);
      }

      const user = await this.userService.getUserById(userId);

      // Check if user has enough balance
      if (user.balance < price) {
        throw new ItemError(USER_NOT_ENOUGH_BALANCE);
      }

      // Check if price is valid
      if (price <= item.currentPrice) {
        throw new ItemError(BID_PRICE_INVALID);
      }

      // Check if user's time is valid to bid
      const userKey = `${userId}:${id}`;
      const userBidValue = await this.cacheManager.get(userKey);
      if (userBidValue) {
        throw new ItemError(USER_TIME_INVALID);
      }

      // Restrict gap time for user to bid item
      // VALID
      const timeGap = this.configService.get<number>('USER_BID_TIME_GAP');
      item.currentPrice = price;
      item.bidBy = userId;
      await Promise.all([
        item.save(),
        this.cacheManager.set(userKey, true, timeGap * 1000),
      ]);

      return item;
    } catch (err) {
      throw new ItemError(err);
    }
  }
}
