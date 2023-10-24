class MetamaskNotFoundError extends Error {
  constructor() {
    super("Metamask client was not found. please install it to continue.", {
      cause: "Metamask client was not found.",
    });
  }
}

export { MetamaskNotFoundError };
