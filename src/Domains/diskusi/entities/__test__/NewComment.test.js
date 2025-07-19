const NewComment = require("../NewComment");

describe("NewComment Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrow(
      "NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "123",
      thread: "a",
      content: true,
      owner: "123",
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrow(
      "NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return COMMENT object correctly", () => {
    // Arrange
    const payload = {
      thread: "THREAD-123",
      content: "Isi komen",
      owner: "user-123",
    };

    // Action
    const commentData = new NewComment(payload);

    // Assert
    expect(commentData.thread).toEqual(payload.thread);
    expect(commentData.content).toEqual(payload.content);
    expect(commentData.owner).toEqual(payload.owner);
  });
});
