/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentTableTestHelper = {
  async addComment({
    id = "comment-123",
    content = "isi komen",
    owner = "user-123",
    thread = "thread-123",
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4)",
      values: [id, content, owner, thread],
    };

    await pool.query(query);
  },

  async getAllCommentByThread(id) {
    const query = {
      text: "SELECT * FROM comments WHERE thread = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteComment(id) {
    const query = {
      text: "DELETE FROM comments WHERE id = $1",
      values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
  },

  async verifyCommentAvailability(comment_id, thread_id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1 AND thread = $2",
      values: [comment_id, thread_id],
    };
    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentTableTestHelper;
