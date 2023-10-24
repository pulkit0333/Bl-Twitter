import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ContractNotInitializedError,
  NFTModalNotOpenError,
  NFTOwnerNotFoundError,
  UserNotFound,
} from "../../errors";
import { User, UserBase, UserStatus } from "../../domain/entities/user.entity";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const fetchUserStatus = createAsyncThunk(
  "users/fetchUserStatus",
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
      const status: UserStatus = await contract.methods
        .getUserStats(address)
        .call();

      return status;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (address: `0x${string}`): Promise<User> => {
    let userData: UserBase = {
      description: null,
      image: null,
      level: 1,
    };

    try {
      // Check if the user exists
      const userDoc = await getDoc(doc(db, "users", address));

      if (userDoc.exists()) {
        // User exists, fetch user data
        userData = userDoc.data() as UserBase;
      } else {
        // User doesn't exist, create new user
        await setDoc(doc(db, "users", address), userData);
      }

      return { ...userData, address };
    } catch (error) {
      throw error;
    }
  }
);

export const setUserProfile = createAsyncThunk(
  "users/setUserProfile",
  async (_, { getState }): Promise<string> => {
    const state = getState() as RootState;
    const ownNftModalOpen = state.profile.ownNftModalOpen;

    if (!ownNftModalOpen) {
      throw new NFTModalNotOpenError();
    }

    if (!ownNftModalOpen.owner) {
      throw new NFTOwnerNotFoundError();
    }

    try {
      await updateDoc(doc(db, "users", ownNftModalOpen.owner), {
        image: ownNftModalOpen.image,
      });

      return ownNftModalOpen.image;
    } catch (error) {
      throw error;
    }
  }
);
