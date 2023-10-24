class ContractNotInitializedError extends Error {
  constructor() {
    super("Woops! Something went wrong. Please refreash your page.", {
      cause: "Contract not initialized.",
    });
  }
}

export { ContractNotInitializedError };
