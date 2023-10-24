import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.sllice";
import postsReducer from "./slices/posts.slice";
import tweetContractReducer from "./slices/tweetContract.slice";
import navigationReducer from "./slices/navigation.slice";
import claimsReducer from "./slices/claims.slice";
import profileReducer from "./slices/profile.silce";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    claims: claimsReducer,
    user: userReducer,
    tweetContract: tweetContractReducer,
    navigation: navigationReducer,
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
