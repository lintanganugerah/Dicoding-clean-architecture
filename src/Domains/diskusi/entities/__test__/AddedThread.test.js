const AddedThread = require("../AddedThread");

describe("AddedThread Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrow(
      "ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      title: "a",
      body: true,
      owner: "123",
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrow(
      "ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should return Thread object correctly", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "Title",
      body: "Body",
      owner: "user-123",
    };

    // Action
    const threadData = new AddedThread(payload);

    // Assert
    expect(threadData.id).toEqual(payload.id);
    expect(threadData.title).toEqual(payload.title);
    expect(threadData.body).toEqual(payload.body);
  });
});
