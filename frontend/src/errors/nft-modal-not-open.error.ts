class NFTModalNotOpenError extends Error {
  constructor() {
    super("NFT Modal was not open.", {
      cause: "NFT Modal was not open.",
    });
  }
}

export { NFTModalNotOpenError };
