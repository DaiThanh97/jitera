import { QueryHookOptions, useMutation, useQuery } from "@apollo/client";
import {
  BID_ITEM,
  CREATE_ITEM,
  GET_AUCTION_LIST,
  GET_AUCTION_LIST_BY_USER,
  PUBLISH_ITEM,
} from "./graphql";
import {
  IAuctionListByUserQueryResponse,
  IAuctionListQueryResponse,
  IBidItemResult,
  IBidItemVars,
  ICreateItemResult,
  ICreateItemVars,
  IPublishItemResult,
  IPublishItemVars,
} from "./types";

export const useAuctionListQuery = (
  options: QueryHookOptions<IAuctionListQueryResponse>
) => useQuery<IAuctionListQueryResponse>(GET_AUCTION_LIST, options);

export const useAuctionListByUserQuery = (
  options: QueryHookOptions<IAuctionListByUserQueryResponse>
) =>
  useQuery<IAuctionListByUserQueryResponse>(GET_AUCTION_LIST_BY_USER, options);

export const useBidItem = () =>
  useMutation<IBidItemResult, IBidItemVars>(BID_ITEM);

export const useCreateItem = () =>
  useMutation<ICreateItemResult, ICreateItemVars>(CREATE_ITEM);

export const usePublishItem = () =>
  useMutation<IPublishItemResult, IPublishItemVars>(PUBLISH_ITEM);
