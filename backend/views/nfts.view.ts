import express from "express";
import { nftsController } from "../controllers";
import { NFT, NFTS } from "./route-defs";

const nftsView = express.Router();

//Fetching a department
nftsView.get(NFTS, nftsController.fetchNFTS);
nftsView.patch(NFT, nftsController.updateNFT);
nftsView.put(NFT, nftsController.addNFT);

export { nftsView };
