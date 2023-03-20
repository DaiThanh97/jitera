import { Item, ItemsResult } from '../../graphql';

export interface IItem extends Omit<Item, 'createdBy' | 'bidBy'> {
  createdBy: string;
  bidBy: string;
}

export interface IItemsResult extends Omit<ItemsResult, 'result'> {
  result: IItem[];
}

export interface IItemJobExpiration {
  itemId: string;
}
