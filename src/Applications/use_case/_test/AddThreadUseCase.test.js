const NewThread = require("../../../Domains/diskusi/entities/NewThread");
const AddedThread = require("../../../Domains/diskusi/entities/AddedThread");
const ThreadRepository = require("../../../Domains/diskusi/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");

describe("Add Thread use case", () => {
  it("should orchestrating add thread correctly", async () => {
    //Arrange
    const threadUseCasePayload = {
      title: "New Title",
      body: "New Body",
      owner: "user-123",
    };

    //Mock addded thread langsung memanggil dari AddedThread sehingga seolah olah (mock) data dikembalikan dari database
    //Disini AddedThread digunakan agar pengujian toStrictEqual memiliki object yang sama
    const mockAddedThread = new AddedThread({
      id: "thread-123",
      title: threadUseCasePayload.title,
      body: threadUseCasePayload.body,
      owner: "user-123",
    });

    //Creating dependency of use case
    const mockThreadRepository = new ThreadRepository();

    //Mocking function
    mockThreadRepository.addThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));

    //Creating use case instance
    const threadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    //Action
    const addedThread = await threadUseCase.execute(threadUseCasePayload);

    //Assert
    expect(addedThread).toStrictEqual(
      new AddedThread({
        id: "thread-123",
        title: threadUseCasePayload.title,
        body: threadUseCasePayload.body,
        owner: "user-123",
      })
    );

    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(
      new NewThread({
        title: threadUseCasePayload.title,
        body: threadUseCasePayload.body,
        owner: threadUseCasePayload.owner,
      })
    );
  });
});
