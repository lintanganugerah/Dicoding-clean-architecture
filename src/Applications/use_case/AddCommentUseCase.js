const NewComment = require("../../Domains/diskusi/entities/NewComment");

class AddCommentUseCase {
  constructor({ CommentRepository }) {
    this._commentRepository = CommentRepository;
  }

  async execute(payload) {
    const newComment = new NewComment(payload);
    return this._commentRepository.addComment(newComment);
  }

  _validatePayload(payload) {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error("ADD_COMMENT_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN");
    }

    if (typeof refreshToken !== "string") {
      throw new Error(
        "ADD_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = AddCommentUseCase;
