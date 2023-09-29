import { Timestamp } from "firebase-admin/firestore";
import { BaseResponse } from "./base-response.entity";
import { TransactionResponse } from "ethers";

export interface NFTBase {
  name: string;
  description: string;
  image: string;
  owner: `0x${string}` | null;
}

export interface NFT extends NFTBase {
  id: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  mintTransactionHash?: string;
  mintedAt?: Timestamp;
}

export interface NFTUpdatedResponse extends BaseResponse {
  nft: NFT;
}

export interface NFTAddedResponse extends BaseResponse {
  nft: NFT;
}

export interface NFTSFetchedResponse extends BaseResponse {
  nfts: NFT[];
  ntfsCount: number;
}

export interface NFTFetchedResponse extends BaseResponse {
  nft: NFT;
}

export interface NFTMintedResponse extends BaseResponse {
  nft: NFT;
}
