import { Request, Response } from "express";
import {
  NFTBase,
  NFTUpdatedResponse,
  NFTFetchedResponse,
  NFTMintedResponse,
  NFTSFetchedResponse,
  NFT,
  NFTAddedResponse,
} from "../domain/entity";
import { NFTSFetched, NFTAdded, NFTUpdated } from "../events";
import { FieldValidationError, validationResult } from "express-validator";
import { InvalidInput } from "../errors";
import db from "../firebase";
import { Timestamp } from "firebase-admin/firestore";

const nftsController = {
  /**
   * Fetch all unclaimed nfts from database.
   * @param {Request<{}, NFTSFetchedResponse>} req - Request Body
   * @param {Response<NFTSFetchedResponse>} res - Response Body
   * @returns {void}
   */
  fetchNFTS: async (
    req: Request<{}, NFTSFetchedResponse>,
    res: Response<NFTSFetchedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    try {
      const queryResult = await db
        .collection("nfts")
        .where("owner", "==", null)
        .get();

      const nftsFetched = new NFTSFetched(queryResult);

      return res
        .status(nftsFetched.getStatusCode())
        .send(nftsFetched.serializeRest());
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update NFT Detail in DB.
   * @param {Request<{id: string}, NFTUpdatedResponse>} req - Request Body
   * @param {Response<NFTUpdatedResponse>} res - Response Body
   * @returns {void}
   */
  updateNFT: async (
    req: Request<{ id: string }, NFTUpdatedResponse, NFT>,
    res: Response<NFTUpdatedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const nft: NFT = req.body;
    const id: string = req.params.id;

    try {
      const currentServerTime = Timestamp.now();

      const nftData = {
        ...nft,
        updatedAt: currentServerTime,
      };

      await db.collection("nfts").doc(id).update(nftData);

      const nftUpdated = (
        await db.collection("nfts").doc(id).get()
      ).data() as NFT;

      const nftUpdatedEvent = new NFTUpdated(nftUpdated);

      return res
        .status(nftUpdatedEvent.getStatusCode())
        .send(nftUpdatedEvent.serializeRest());
    } catch (error) {
      throw error;
    }
  },

  /**
   * Add NFT Detail in DB.
   * @param {Request<{id: string}, NFTAddedResponse>} req - Request Body
   * @param {Response<NFTAddedResponse>} res - Response Body
   * @returns {void}
   */
  addNFT: async (
    req: Request<{ id: string }, NFTAddedResponse, NFTBase>,
    res: Response<NFTAddedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const nft: NFTBase = req.body;
    const id: string = req.params.id;

    try {
      const currentServerTime = Timestamp.now();

      const nftData = {
        ...nft,
        createdAt: currentServerTime,
      };

      await db.collection("nfts").doc(id).set(nftData);

      const nftUpdatedEvent = new NFTAdded({ ...nftData, id });

      return res
        .status(nftUpdatedEvent.getStatusCode())
        .send(nftUpdatedEvent.serializeRest());
    } catch (error) {
      throw error;
    }
  },
};

export { nftsController };
