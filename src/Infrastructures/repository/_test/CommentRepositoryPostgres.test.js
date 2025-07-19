const CommentTableTestHelper = require("../../../../tests/CommentTableTestHelper");
const UserTableTestHelper = require("../../../../tests/UsersTableTestHelper");
const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const pool = require("../../database/postgres/pool");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const NewComment = require("../../../Domains/diskusi/entities/NewComment");
const AddedComment = require("../../../Domains/diskusi/entities/AddedComment");
const NewThread = require("../../../Domains/diskusi/entities/NewThread");
const AddedThread = require("../../../Domains/diskusi/entities/AddedThread");
const RegisterUser = require("../../../Domains/users/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");
const UserRepositoryPostgres = require("../UserRepositoryPostgres");
const CommentRepositoryPostgres = require("../CommentRepositoryPostgres");

describe("a Comment Repository Postgres", () => {
  afterEach(async () => {
    await CommentTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
    await UserTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("add comments", () => {
    it("should return newly created comments correctly", async () => {
      const fakeIdGenerator = () => "123"; //Stub id generator

      //CREATE USER FIRST (because thread have contraint with user id, and comment constraint with thread id);
      const UserPayload = new RegisterUser({
        username: "testUser",
        password: "supersecretpassword",
        fullname: "test User here",
      });

      const userRepositoryPostgres = new UserRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      const newUser = await userRepositoryPostgres.addUser(UserPayload);

      //CREATE THREAD (because comment have constraint with thread)
      const ThreadPayload = new NewThread({
        title: "New Title",
        body: "New Body",
        owner: newUser.id,
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );
      const createdThread = await threadRepositoryPostgres.addThread(
        ThreadPayload
      );

      //PART COMMENT
      //Arrange
      const commentPayload1 = new NewComment({
        content: "this is comment",
        owner: newUser.id,
        thread: createdThread.id,
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //Action
      await commentRepositoryPostgres.addComment(commentPayload1);

      //Assert
      //Cek apakah benar data ada di database
      const data = await CommentTableTestHelper.findThreadById("thread-123");
      expect(data).toHaveLength(1);
    });

    it("should persist newly created comment", () => {
      //
    });
  });
});
