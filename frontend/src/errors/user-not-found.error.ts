class UserNotFound extends Error {
  constructor() {
    super("User not found, please connect your  wallet to continue.", {
      cause: "Wallet not connected.",
    });
  }
}

export { UserNotFound };
