const NewComment = require("../../../Domains/diskusi/entities/NewComment");
const AddedComments = require("../../../Domains/diskusi/entities/AddedComment");
const CommentRepository = require("../../../Domains/diskusi/CommentRepository");
const AddCommentUseCase = require("../AddCommentUseCase");

describe("Add comment use case", () => {
  it("should orchestrating add comment correctly", async () => {
    //Arrange
    const commentUseCasePayload = {
      thread: "thread-123",
      content: "New content",
      owner: "user-123",
    };

    //Mock addded comment langsung memanggil dari AddedComment sehingga seolah olah (mock) data dikembalikan dari database
    //Disini AddedComment digunakan agar pengujian toStrictEqual memiliki object yang sama
    const mockAddedComment = new AddedComments({
      id: "comment-123",
      thread: commentUseCasePayload.thread,
      content: commentUseCasePayload.content,
      owner: commentUseCasePayload.owner,
    });

    //Creating dependency of use case
    const mockCommentRepository = new CommentRepository();

    //Mocking function
    mockCommentRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    //Creating use case instance
    const commentUseCase = new AddCommentUseCase({
      CommentRepository: mockCommentRepository,
    });

    //Action
    const AddedComment = await commentUseCase.execute(commentUseCasePayload);

    //Assert
    expect(AddedComment).toStrictEqual(
      new AddedComments({
        id: "comment-123",
        thread: "thread-123",
        content: "New content",
        owner: "user-123",
      })
    );

    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(
      new NewComment({
        thread: commentUseCasePayload.thread,
        content: commentUseCasePayload.content,
        owner: commentUseCasePayload.owner,
      })
    );
  });
});
