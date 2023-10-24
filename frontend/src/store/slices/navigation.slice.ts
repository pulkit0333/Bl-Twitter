import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// Define a type for the slice state
interface NavigationState {
  activeTab: number;
}

// Define the initial state using that type
const initialState: NavigationState = {
  activeTab: 0,
};

export const navigationSlice = createSlice({
  name: "navigation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = navigationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectActiveTab = (state: RootState) => state.navigation.activeTab;

export default navigationSlice.reducer;
