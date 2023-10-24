import { createAsyncThunk } from "@reduxjs/toolkit";
import { Tweet, TweetBase } from "../../domain/entities/tweet.entity";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "..";
import toast from "react-hot-toast";
import {
  ContractNotInitializedError,
  PostNotFound,
  UserNotFound,
} from "../../errors";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { getState }): Promise<Tweet[]> => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    try {
      const posts: Tweet[] = await contract.methods.getAllTweets().call();
      return posts;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: string, { getState }): Promise<Tweet> => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    try {
      const post: Tweet = await contract.methods.getTweetById(id).call();
      return post;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostComments = createAsyncThunk(
  "posts/fetchPostComments",
  async (_, { getState }): Promise<Tweet[]> => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;
    const postId = state.posts.currentPost.data?.id;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    try {
      const post: Tweet[] = await contract.methods.getComments(postId).call();
      return post;
    } catch (error) {
      throw error;
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;
    const postId = state.posts.currentPost.data?.id;
    const user = state.user.user;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    if (user === null) {
      throw new UserNotFound();
    }

    const address = user.address;

    try {
      const post = await contract.methods
        .likeTweet(postId)
        .send({ from: address });

      return postId;
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;
    const user = state.user.user;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    if (user === null) {
      throw new UserNotFound();
    }

    const address = user.address;

    try {
      const posts: Tweet[] = await contract.methods
        .getUserTweets(address)
        .call();
      return posts;
    } catch (error) {
      throw error;
    }
  }
);

export const postTweet = createAsyncThunk(
  "posts/postTweet",
  async (tweet: TweetBase, { getState }): Promise<Tweet> => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;
    const user = state.user.user;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    if (user === null) {
      throw new UserNotFound();
    }

    const address = user.address;

    try {
      const tweetId = uuidv4();

      const postTransaction = await contract.methods
        .postTweet(tweetId, tweet.content)
        .send({ from: address });

      const post: Tweet = await contract.methods.getTweetById(tweetId).call();

      return post;
    } catch (error: any) {
      throw error;
    }
  }
);

export const postComment = createAsyncThunk(
  "posts/postComment",
  async (comment: TweetBase, { getState }) => {
    const state = getState() as RootState;
    const contract = state.tweetContract.contract;
    const currentPost = state.posts.currentPost.data;
    const user = state.user.user;

    if (contract === null) {
      throw new ContractNotInitializedError();
    }

    if (user === null) {
      throw new UserNotFound();
    }

    if (currentPost === undefined || currentPost === null) {
      throw new PostNotFound();
    }

    const address = user.address;

    try {
      const commentId = uuidv4();
      const commentTx = await contract.methods
        .postComment(currentPost.id, commentId, comment.content)
        .send({ from: address });

      const commentAdded: Tweet = await contract.methods
        .getTweetById(commentId)
        .call();

      return commentAdded;
    } catch (error: any) {
      throw error;
    }
  }
);
