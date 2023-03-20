import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { ICurrentUser } from '../user/user.interface';
import {
  BidItemDto,
  CreateItemDto,
  ItemFilterDto,
  PublishItemDto,
} from './item.dto';
import { ItemService } from './item.service';
import { IItem, IItemsResult } from './item.interface';
import { UserService } from '../user/user.service';

@Resolver('Item')
@UseGuards(JwtGuard)
export class ItemResolver {
  constructor(
    private readonly itemService: ItemService,
    private readonly userService: UserService,
  ) {}

  @Query('items')
  items(
    @Args('filter') filter: ItemFilterDto,
    @Args('limit') limit: number,
    @Args('skip') skip: number,
  ): Promise<IItemsResult> {
    return this.itemService.items(filter, limit, skip);
  }

  @Query('itemsByUser')
  itemsByUser(
    @Args('limit') limit: number,
    @Args('skip') skip: number,
    @CurrentUser() user: ICurrentUser,
  ): Promise<IItemsResult> {
    return this.itemService.itemsByUser(limit, skip, user.sub);
  }

  @Mutation('createItem')
  createItem(
    @Args('input') createItemDto: CreateItemDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<IItem> {
    return this.itemService.createItem(createItemDto, user.sub);
  }

  @Mutation('publishItem')
  publishItem(
    @Args('input') publishItemDto: PublishItemDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<IItem> {
    return this.itemService.publishItem(publishItemDto, user.sub);
  }

  @Mutation('bidItem')
  bidItem(
    @Args('input') bidItemDto: BidItemDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<IItem> {
    return this.itemService.bidItem(bidItemDto, user.sub);
  }

  @ResolveField('createdBy')
  async createdBy(@Parent() parent: IItem) {
    return this.userService.getUserById(parent.createdBy);
  }

  @ResolveField('bidBy')
  async bidBy(@Parent() parent: IItem) {
    return this.userService.getUserById(parent.bidBy);
  }
}
