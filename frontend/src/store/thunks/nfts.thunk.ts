import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserNotFound } from "../../errors";
import {
  NFTMintedResponse,
  NFTSFetchedResponse,
} from "../../domain/entities/nft.entity";

const BASE_URL = process.env.REACT_APP_NFT_API_BASEURL;

export const fetchAllNFTs = createAsyncThunk("posts/fetchAllNFTs", async () => {
  try {
    const res: NFTSFetchedResponse = await fetch(`${BASE_URL}/nfts/`, {
      method: "GET",
    }).then((res) => res.json());

    return res.nfts;
  } catch (error) {
    throw error;
  }
});

export const mintNFT = createAsyncThunk(
  "posts/mintNFT",
  async (id: string, { getState }) => {
    const state = getState() as RootState;
    const user = state.user.user;

    if (user === null) {
      throw new UserNotFound();
    }

    const address = user.address;

    try {
      const res: NFTMintedResponse = await fetch(`${BASE_URL}/nfts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientAddress: address }),
      }).then((res) => res.json());

      return res.nft;
    } catch (error) {
      throw error;
    }
  }
);
