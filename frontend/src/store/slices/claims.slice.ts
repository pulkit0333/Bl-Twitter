import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchAllNFTs, mintNFT } from "../thunks/nfts.thunk";
import { DataFetchState } from "../../domain/entities/data-fetch-state.entity";
import { NFT } from "../../domain/entities/nft.entity";
import toast from "react-hot-toast";

// Define a type for the slice state
interface NFTsState {
  nftModalOpen: NFT | null;
  nftMintSuccessModalOpen: NFT | null;
  nfts: DataFetchState<NFT[]>;
}

// Define the initial state using that type
const initialState: NFTsState = {
  nftModalOpen: null,
  nftMintSuccessModalOpen: null,
  nfts: { data: [], loading: false },
};

export const claimsSlice = createSlice({
  name: "nfts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleNFTModalOpen: (state, action: PayloadAction<NFT | null>) => {
      state.nftModalOpen = action.payload;
    },

    toggleNFTMintSuccessModalOpen: (
      state,
      action: PayloadAction<NFT | null>
    ) => {
      state.nftMintSuccessModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNFTs.pending, (state) => {
        state.nfts.loading = true;
      })
      .addCase(fetchAllNFTs.fulfilled, (state, action) => {
        state.nfts.data = action.payload as any;
        state.nfts.loading = false;
      })
      .addCase(fetchAllNFTs.rejected, (state, action) => {
        state.nfts.loading = false;
        state.nfts.error = action.error;
      });

    builder
      .addCase(mintNFT.pending, () => {
        toast.loading("Minting NFT...", {
          id: "nft-minting",
        });
      })
      .addCase(mintNFT.fulfilled, (state, action) => {
        toast.dismiss("nft-minting");
        toast.success("NFT minted successfully 🎉");
        const nftMinted = action.payload;
        state.nftMintSuccessModalOpen = nftMinted;
      })
      .addCase(mintNFT.rejected, (_, action) => {
        toast.dismiss("nft-minting");
        toast.error(action.error.message || "Something went wrong!");
      });
  },
});

export const { toggleNFTModalOpen, toggleNFTMintSuccessModalOpen } =
  claimsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNFTModalOpen = (state: RootState) =>
  state.claims.nftModalOpen as NFT | null;

export const selectNFTMintSuccessModalOpen = (state: RootState) =>
  state.claims.nftMintSuccessModalOpen as NFT | null;

export const selectAllNFTs = (state: RootState) =>
  state.claims.nfts as DataFetchState<NFT[]>;

export default claimsSlice.reducer;
