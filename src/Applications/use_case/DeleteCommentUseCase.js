const DeleteComment = require("../../Domains/diskusi/entities/DeleteComment");

class DeleteCommentUseCase {
  constructor({ CommentRepository }) {
    this._commentRepository = CommentRepository;
  }

  async execute(payload) {
    this._validatePayload(payload);
    const deleteComment = new DeleteComment(payload);
    await this._commentRepository.verifyCommentAvailability(
      deleteComment.id,
      deleteComment.owner
    );
    return this._commentRepository.deleteComment(deleteComment.id);
  }

  _validatePayload(payload) {
    const { id, owner } = payload;
    if (!id || !owner) {
      throw new Error("DELETE_COMMENT_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN");
    }

    if (typeof id !== "string" || typeof owner !== "string") {
      throw new Error(
        "DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = DeleteCommentUseCase;
