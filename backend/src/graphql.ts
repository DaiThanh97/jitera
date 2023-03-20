
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ItemState {
    DRAFT = "DRAFT",
    PUBLISH = "PUBLISH"
}

export enum BidStatus {
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED"
}

export class SignUpInput {
    email: string;
    password: string;
    nickname?: Nullable<string>;
}

export class LoginInput {
    email: string;
    password: string;
}

export class ItemFilterInput {
    bidStatus?: Nullable<BidStatus>;
}

export class CreateItemInput {
    name: string;
    startedPrice: number;
    duration: number;
}

export class PublishItemInput {
    id: string;
}

export class BidItemInput {
    id: string;
    price: number;
}

export class DepositInput {
    balance: number;
}

export abstract class IQuery {
    abstract userByToken(token: string): Nullable<User> | Promise<Nullable<User>>;

    abstract items(filter?: Nullable<ItemFilterInput>, limit?: Nullable<number>, skip?: Nullable<number>): Nullable<ItemsResult> | Promise<Nullable<ItemsResult>>;

    abstract itemsByUser(limit?: Nullable<number>, skip?: Nullable<number>): Nullable<ItemsResult> | Promise<Nullable<ItemsResult>>;
}

export abstract class IMutation {
    abstract logIn(input: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract signUp(input: SignUpInput): boolean | Promise<boolean>;

    abstract createItem(input: CreateItemInput): Item | Promise<Item>;

    abstract publishItem(input: PublishItemInput): Item | Promise<Item>;

    abstract bidItem(input: BidItemInput): Item | Promise<Item>;

    abstract deposit(input: DepositInput): DepositResponse | Promise<DepositResponse>;
}

export class LoginResponse {
    id: string;
    email: string;
    nickname?: Nullable<string>;
    accessToken: string;
    balance: number;
}

export class Item {
    id: string;
    name: string;
    startedPrice: number;
    currentPrice: number;
    duration: number;
    state: ItemState;
    bidStatus: BidStatus;
    expiredDate?: Nullable<DateTime>;
    createdBy: User;
    bidBy?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class ItemsResult {
    result?: Nullable<Nullable<Item>[]>;
    totalCount?: Nullable<number>;
}

export class User {
    id: string;
    email: string;
    nickname?: Nullable<string>;
    balance: number;
}

export class DepositResponse {
    balance: number;
}

export type DateTime = any;
type Nullable<T> = T | null;
