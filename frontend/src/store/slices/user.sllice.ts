import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  fetchUser,
  fetchUserStatus,
  setUserProfile,
} from "../thunks/user.thunk";
import { DataFetchState } from "../../domain/entities/data-fetch-state.entity";
import { User, UserStatus } from "../../domain/entities/user.entity";
import toast from "react-hot-toast";

// Define a type for the slice state
interface UserState {
  user: User | null;
  userStatus: DataFetchState<UserStatus>;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  userStatus: {
    loading: false,
    data: { totalCommentsReceived: BigInt(0), totalLikesReceived: BigInt(0) },
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    incrementUserLevel: (state) => {
      if (state.user) {
        state.user.level += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStatus.pending, (state) => {
        state.userStatus.loading = true;
      })
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.userStatus.data = action.payload;
        state.userStatus.loading = false;
      })
      .addCase(fetchUserStatus.rejected, (state, action) => {
        state.userStatus.loading = false;
        state.userStatus.error = action.error;
      });

    builder
      .addCase(setUserProfile.pending, () => {
        toast.loading("Setting up your new profile picure...", {
          id: "profile-pic-update",
        });
      })
      .addCase(setUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.image = action.payload;
        }
        toast.dismiss("profile-pic-update");
        toast.success("Profile picture updated successfully!");
      })
      .addCase(setUserProfile.rejected, (_, action) => {
        toast.dismiss("profile-pic-update");
        if (action.error.message) {
          toast.error(action.error.message);
        }
      });

    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (_, action) => {
        if (action.error.message) {
          toast.error(action.error.message);
        }
      });
  },
});

export const { setUser, incrementUserLevel } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState): User | null => state.user.user;
export const selectUserStatus = (
  state: RootState
): DataFetchState<UserStatus> => state.user.userStatus;

export default userSlice.reducer;
