import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Contract } from "web3";
import Web3 from "web3";
import TweetContractABI from "../../utils/TweetContractABI.json";

// Define a type for the slice state
interface ContractState {
  contract: Contract<typeof TweetContractABI.abi> | null;
}

// Define the initial state using that type
const initialState: ContractState = {
  contract: null,
};

export const contractSlice = createSlice({
  name: "tweetContract",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initTweetContract: (state, action: PayloadAction<string>) => {
      const provider = action.payload;

      const web3 = new Web3(provider);

      const tweetContract: Contract<typeof TweetContractABI.abi> =
        new web3.eth.Contract(
          TweetContractABI.abi,
          process.env.REACT_APP_TWEET_CONTRACT
        );

      // @ts-ignore
      state.contract = tweetContract;
    },
  },
});

export const { initTweetContract } = contractSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTweetContract = (state: RootState) =>
  state.tweetContract.contract as Contract<typeof TweetContractABI.abi> | null;

export default contractSlice.reducer;
