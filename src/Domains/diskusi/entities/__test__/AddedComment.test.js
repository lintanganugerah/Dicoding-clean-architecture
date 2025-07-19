const AddedComment = require("../AddedComment");

describe("AddedComment Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      content: "abc",
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrow(
      "ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "123",
      content: true,
      owner: "123",
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrow(
      "ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return COMMENT object correctly", () => {
    // Arrange
    const payload = {
      id: "COMMENT-123",
      content: "Isi komen",
      owner: "user-123",
    };

    // Action
    const commentData = new AddedComment(payload);

    // Assert
    expect(commentData.id).toEqual(payload.id);
    expect(commentData.title).toEqual(payload.title);
    expect(commentData.body).toEqual(payload.body);
  });
});
