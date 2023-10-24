import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  fetchAllPosts,
  fetchPostById,
  fetchPostComments,
  fetchUserPosts,
  likePost,
  postComment,
  postTweet,
} from "../thunks/posts.thunk";
import { DataFetchState } from "../../domain/entities/data-fetch-state.entity";
import { Tweet } from "../../domain/entities/tweet.entity";
import toast from "react-hot-toast";

// Define a type for the slice state
interface PostsState {
  postModalOpen: boolean;
  posts: DataFetchState<Tweet[]>;
  currentPost: DataFetchState<Tweet | null>;
  currentPostComments: DataFetchState<Tweet[]>;
}

// Define the initial state using that type
const initialState: PostsState = {
  postModalOpen: false,
  posts: { data: [], loading: false },
  currentPost: { data: null, loading: false },
  currentPostComments: { data: [], loading: false },
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    togglePostModalOpen: (state) => {
      state.postModalOpen = !state.postModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.posts.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts.data = action.payload;
        state.posts.error = undefined;
        state.posts.loading = false;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.posts.loading = false;
        state.posts.error = action.error;
      });

    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.posts.loading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts.data = action.payload;
        state.posts.error = undefined;
        state.posts.loading = false;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.posts.loading = false;
        state.posts.error = action.error;
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.currentPost.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost.data = action.payload;
        state.currentPost.error = undefined;
        state.currentPost.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentPost.loading = false;
        state.currentPost.error = action.error;
      });

    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.currentPostComments.loading = true;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.currentPostComments.data = action.payload;
        state.currentPostComments.error = undefined;
        state.currentPostComments.loading = false;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.currentPostComments.loading = false;
        state.currentPostComments.error = action.error;
      });

    builder
      .addCase(postTweet.fulfilled, (state, action) => {
        const addedPost = action.payload;
        state.posts.data.push(addedPost);
        toast.success("Posted successfully!");

        toast.dismiss("post-tweet");
      })
      .addCase(postTweet.pending, () => {
        toast.loading("Posting your thoughts...", {
          id: "post-tweet",
        });
      })
      .addCase(postTweet.rejected, (_, action) => {
        toast.dismiss("post-tweet");
        toast.error(action.error.message || "Something went wrong!");
      });

    builder
      .addCase(likePost.fulfilled, (state) => {
        if (state.currentPost && state.currentPost.data) {
          const currentLikeCount = Number(state.currentPost.data.likesCount);
          state.currentPost.data.likesCount = BigInt(currentLikeCount + 1);
          toast.dismiss("post-like");
          toast.success("Posted liked!");
        }
      })
      .addCase(likePost.pending, () => {
        toast.loading("Liking post...", {
          id: "post-like",
        });
      })
      .addCase(likePost.rejected, (_, action) => {
        toast.dismiss("post-like");
        toast.error(action.error.message || "Something went wrong!");
      });

    builder
      .addCase(postComment.fulfilled, (state, action) => {
        const addedComment = action.payload;
        state.currentPostComments.data.push(addedComment);

        if (state.currentPost && state.currentPost.data) {
          const currentCommentCount = Number(
            state.currentPost.data.commentsCount
          );
          state.currentPost.data.commentsCount = BigInt(
            currentCommentCount + 1
          );
        }

        toast.dismiss("post-comment");
        toast.success("Comment Posted!");
      })
      .addCase(postComment.pending, () => {
        toast.loading("Adding comment...", {
          id: "post-comment",
        });
      })
      .addCase(postComment.rejected, (_, action) => {
        toast.dismiss("post-comment");
        toast.error(action.error.message || "Something went wrong!");
      });
  },
});

export const { togglePostModalOpen } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostModalOpen = (state: RootState) =>
  state.posts.postModalOpen as boolean;

export const selectAllPosts = (state: RootState) =>
  state.posts.posts as DataFetchState<Tweet[]>;

export const selectCurrentPost = (state: RootState) =>
  state.posts.currentPost as DataFetchState<Tweet>;

export const selectCurrentPostComments = (state: RootState) =>
  state.posts.currentPostComments as DataFetchState<Tweet[]>;

export default postsSlice.reducer;
