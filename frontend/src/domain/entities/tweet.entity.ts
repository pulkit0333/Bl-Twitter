import { Address } from "web3";

export interface TweetBase {
  content: string;
}

export interface Tweet extends TweetBase {
  id: string;
  createdBy: Address;
  createdAt: BigInt;
  likesCount: BigInt;
  commentsCount: BigInt;
}
