class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    this.title = payload.title;
    this.body = payload.body;
    this.id = payload.id;
    this.owner = payload.owner;
  }

  _verifyPayload(payload) {
    const { title, body, id, owner } = payload;

    if (!title || !body || !id || !owner) {
      throw new Error("ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof title != "string" ||
      typeof body != "string" ||
      typeof id != "string" ||
      typeof owner != "string"
    ) {
      throw new Error("ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddedThread;
