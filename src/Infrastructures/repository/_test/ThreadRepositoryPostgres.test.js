const ThreadTableTestHelper = require("../../../../tests/ThreadTableTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const NewThread = require("../../../Domains/diskusi/entities/NewThread");
const AddedThread = require("../../../Domains/diskusi/entities/AddedThread");
const RegisterUser = require("../../../Domains/users/entities/RegisterUser");
const pool = require("../../database/postgres/pool");
const ThreadRepositoryPostgres = require("../ThreadRepositoryPostgres");
const UserRepositoryPostgres = require("../UserRepositoryPostgres");
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");

describe("Thread Repository Postgres test", () => {
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("Add thread function", () => {
    it("should return newly created thread correctly", async () => {
      const fakeIdGenerator = () => "123"; //This is stub!

      //CREATE USER FIRST (because thread have contraint with user id);
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

      //Arrange
      const ThreadPayload = new NewThread({
        title: "New Title",
        body: "New Body",
        owner: newUser.id,
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //Action
      const newThread = await threadRepositoryPostgres.addThread(ThreadPayload);

      //Assert
      expect(newThread).toStrictEqual(
        new AddedThread({
          id: "thread-123",
          title: "New Title",
          body: "New Body",
          owner: newUser.id,
        })
      );
    });

    it("should persist newly created thread", async () => {
      const fakeIdGenerator = () => "123"; //This is stub!

      //CREATE USER FIRST (because thread have contraint with user id);
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

      //Arrange
      const payload = new NewThread({
        title: "New Title",
        body: "New Body",
        owner: newUser.id,
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      //Action
      await threadRepositoryPostgres.addThread(payload);

      //Assert
      //Cek apakah benar data ada di database
      const data = await ThreadTableTestHelper.findThreadById("thread-123");
      expect(data).toHaveLength(1);
    });
  });
});
