const NewThread = require("../NewThread");

describe("a NewThread Entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow(
      "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      title: true,
      body: true,
      owner: 123,
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow(
      "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when title payload exceed 150 char", () => {
    const payload = {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan metus et mi interdum, ac tempus lectus vulputate. Quisque commodo hendrerit augue, vulputate eleifend tortor tincidunt sed. Mauris blandit vulputate ligula eu interdum. Donec tristique, arcu sit amet ullamcorper aliquam, mauris tortor rutrum leo, id venenatis orci arcu non purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan metus et mi interdum, ac tempus lectus vulputate. Quisque commodo hendrerit augue, vulputate eleifend tortor tincidunt sed. Mauris blandit vulputate ligula eu interdum. Donec tristique, arcu sit amet ullamcorper aliquam, mauris tortor rutrum leo, id venenatis orci arcu non purus.",
      body: "A",
      owner: "user-123",
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow("NEW_THREAD.TITLE_LIMIT_CHAR");
  });

  it("should create Thread Object correctly", () => {
    const payload = {
      title: "Suatu berita",
      body: "Ini adalah body",
      owner: "user-123",
    };

    const { title, body, owner } = new NewThread(payload);

    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
