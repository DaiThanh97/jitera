import { IUser } from "../Auth/types";

export interface IAuctionListQueryResponse {
  items: IAuctionListQueryResult;
}

export interface IAuctionListByUserQueryResponse {
  itemsByUser: IAuctionListQueryResult;
}

export interface IAuctionListQueryResult {
  result: IItem[];
  totalCount: number;
}

export interface IAuctionListVars {
  filter: {
    bidStatus?: BidStatus;
  };
}

export interface IBidItemVars {
  input: IBidInput;
}

export interface ICreateItemInput {
  name: string;
  startedPrice: number;
  duration: number;
}

export interface ICreateItemVars {
  input: ICreateItemInput;
}

export interface IPublishItemVars {
  input: {
    id: string;
  };
}

export interface IBidInput {
  id: string;
  price: number;
}

export interface IBidItemResult {
  bidItem: IItem;
}

export interface ICreateItemResult {
  createItem: IItem;
}

export interface IPublishItemResult {
  publishItem: IItem;
}

export interface IItem {
  id: string;
  name: string;
  startedPrice: number;
  currentPrice: number;
  bidStatus: BidStatus;
  state: ItemState;
  expiredDate: Date;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  bidBy: IUser;
  createdBy: IUser;
}

export enum ItemState {
  DRAFT = "DRAFT",
  PUBLISH = "PUBLISH",
}

export enum BidStatus {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}
