const AddedThread = require("../../Domains/diskusi/entities/AddedThread");
const ThreadRepository = require("../../Domains/diskusi/ThreadRepository");

class ThreadRepositoryPostgres extends ThreadRepository {
  //Pool adalah postgres or database pool dari config yang diberikan
  //IdGenerator adalah dependensi generator id seperti nanoid atau uuid
  constructor(pool, idGenerator) {
    super();
    (this._pool = pool), (this._idGenerator = idGenerator);
  }

  async addThread(payload) {
    const { title, body, owner } = payload;
    const id = `thread-${this._idGenerator()}`;

    const SqlQuery = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, body, owner",
      values: [id, title, body, owner],
    };

    const result = await this._pool.query(SqlQuery);
    return new AddedThread({ ...result.rows[0] });
  }

  async getAllThread() {
    //
  }

  async getThreadById(id) {
    //
  }
}

module.exports = ThreadRepositoryPostgres;
