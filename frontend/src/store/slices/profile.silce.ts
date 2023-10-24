import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Address } from "web3";
import { NFT } from "../../domain/entities/nft.entity";

// Define a type for the slice state
interface ProfileState {
  ownNftModalOpen: NFT | null;
  othersNftModalOpen: NFT | null;
}

// Define the initial state using that type
const initialState: ProfileState = {
  ownNftModalOpen: null,
  othersNftModalOpen: null,
};

export const profileSlice = createSlice({
  name: "profile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleOwnNFTModalOpen: (state, action: PayloadAction<NFT | null>) => {
      state.ownNftModalOpen = action.payload;
    },

    toggleOthersNFTModalOpen: (state, action: PayloadAction<NFT | null>) => {
      state.othersNftModalOpen = action.payload;
    },
  },
});

export const { toggleOwnNFTModalOpen, toggleOthersNFTModalOpen } =
  profileSlice.actions;

export const selectOwnNftModalOpen = (state: RootState) =>
  state.profile.ownNftModalOpen;

export const selectOthersNftModalOpen = (state: RootState) =>
  state.profile.othersNftModalOpen;

export default profileSlice.reducer;
