const NewThread = require("../../Domains/diskusi/entities/NewThread");

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    const newThread = new NewThread(payload);
    return this._threadRepository.addThread(newThread);
  }
}

module.exports = AddThreadUseCase;
