const AddedComment = require("../../Domains/diskusi/entities/AddedComment");
const CommentRepository = require("../../Domains/diskusi/CommentRepository");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(payload) {
    const { content, thread, owner } = payload;
    const id = `comment-${this._idGenerator}`;

    const sqlQuery = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, content, owner, thread",
      values: [id, content, owner, thread],
    };

    const result = await this._pool.query(sqlQuery);
    return new AddedComment({ ...result.rows[0] });
  }

  async getAllCommentByThread(id) {
    const query = {
      text: "SELECT * FROM comments WHERE thread = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async deleteComment(id) {
    const query = {
      text: "DELETE FROM comments WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async verifyCommentAvailability(comment_id, thread_id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1 AND thread = $2",
      values: [comment_id, thread_id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError("comment tidak ditemukan, atau telah dihapus");
    }
    return result.rows;
  }
}

module.exports = CommentRepositoryPostgres;
