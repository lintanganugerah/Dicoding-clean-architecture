/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadTableTestHelper = {
  async addThread({
    id = "thread-123",
    title = "New Title here",
    body = "New Body Here",
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3)",
      values: [id, title, body],
    };

    await pool.query(query);
  },

  async findThreadById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM users WHERE 1=1");
  },
};

module.exports = ThreadTableTestHelper;
