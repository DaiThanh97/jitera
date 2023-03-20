import { gql } from "@apollo/client";

export const GET_AUCTION_LIST = gql`
  query Query($filter: ItemFilterInput, $skip: Int, $limit: Int) {
    items(filter: $filter, skip: $skip, limit: $limit) {
      result {
        id
        name
        startedPrice
        currentPrice
        bidStatus
        state
        expiredDate
        createdAt
        updatedAt
        duration
        bidBy {
          id
          email
          nickname
        }
        createdBy {
          id
          email

          nickname
        }
      }
      totalCount
    }
  }
`;

export const GET_AUCTION_LIST_BY_USER = gql`
  query Query($skip: Int, $limit: Int) {
    itemsByUser(skip: $skip, limit: $limit) {
      result {
        id
        name
        startedPrice
        currentPrice
        bidStatus
        state
        expiredDate
        createdAt
        updatedAt
        duration
        bidBy {
          id
          email
          nickname
        }
        createdBy {
          id
          email

          nickname
        }
      }
      totalCount
    }
  }
`;

export const BID_ITEM = gql`
  mutation Mutation($input: BidItemInput!) {
    bidItem(input: $input) {
      id
      name
      startedPrice
      currentPrice
      state
      bidStatus
      expiredDate
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateIem($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      startedPrice
      currentPrice
      duration
      state
      bidStatus
      createdAt
      updatedAt
    }
  }
`;

export const PUBLISH_ITEM = gql`
  mutation Mutation($input: PublishItemInput!) {
    publishItem(input: $input) {
      duration
      name
      id
      expiredDate
    }
  }
`;
