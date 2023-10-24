class PostNotFound extends Error {
  constructor() {
    super("Post id not found! Please comment on a valid post.", {
      cause: "Invalid Post",
    });
  }
}

export { PostNotFound };
