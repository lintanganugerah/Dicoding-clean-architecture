const DeleteComment = require("../DeleteComment");

describe("DeleteComment Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "comment-123",
    };

    // Action and Assert
    expect(() => new DeleteComment(payload)).toThrow(
      "DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: true,
      owner: "user-123",
    };

    // Action and Assert
    expect(() => new DeleteComment(payload)).toThrow(
      "DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return COMMENT object correctly", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      owner: "user-123",
    };

    // Action
    const commentData = new DeleteComment(payload);

    // Assert
    expect(commentData.id).toEqual(payload.id);
    expect(commentData.title).toEqual(payload.title);
    expect(commentData.body).toEqual(payload.body);
  });
});
