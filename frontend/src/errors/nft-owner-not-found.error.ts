class NFTOwnerNotFoundError extends Error {
  constructor() {
    super("NFT owner not found.", {
      cause: "NFT not minted by anyone.",
    });
  }
}

export { NFTOwnerNotFoundError };
