const CommentRepository = require("../../../Domains/diskusi/CommentRepository");
const DeleteCommentUseCase = require("../DeleteCommentUseCase");

describe("Delete comment use case", () => {
  it("should orchestrating Delete comment correctly", async () => {
    //Arrange
    const deleteCommentUseCasePayload = {
      id: "comment-123",
      thread: "thread-123",
      owner: "owner-123",
    };

    //Creating dependency of use case
    const mockCommentRepository = new CommentRepository();

    //Mocking function
    mockCommentRepository.deleteComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    //Creating use case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      CommentRepository: mockCommentRepository,
    });

    //Action
    await deleteCommentUseCase.execute(deleteCommentUseCasePayload);

    //Assert
    expect(
      mockCommentRepository.verifyCommentAvailability
    ).toHaveBeenCalledWith(
      deleteCommentUseCasePayload.id,
      deleteCommentUseCasePayload.owner
    );

    expect(mockCommentRepository.deleteComment).toHaveBeenCalledWith(
      deleteCommentUseCasePayload.id
    );
  });
});
