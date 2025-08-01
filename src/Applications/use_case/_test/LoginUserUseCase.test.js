const UserRepository = require("../../../Domains/users/UserRepository");
const AuthenticationRepository = require("../../../Domains/authentications/AuthenticationRepository");
const AuthenticationTokenManager = require("../../security/AuthenticationTokenManager");
const PasswordHash = require("../../security/PasswordHash");
const LoginUserUseCase = require("../LoginUserUseCase");
const NewAuth = require("../../../Domains/authentications/entities/NewAuth");

describe("GetAuthenticationUseCase", () => {
  it("should orchestrating the get authentication action correctly", async () => {
    // Arrange
    const useCasePayload = {
      username: "dicoding",
      password: "secret",
    };
    const mockedAuthentication = new NewAuth({
      accessToken: "access_token",
      refreshToken: "refresh_token",
    });
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve("encrypted_password"));
    mockPasswordHash.comparePassword = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockedAuthentication.accessToken)
      );
    mockAuthenticationTokenManager.createRefreshToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(mockedAuthentication.refreshToken)
      );
    mockUserRepository.getIdByUsername = jest
      .fn()
      .mockImplementation(() => Promise.resolve("user-123"));
    mockAuthenticationRepository.addToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(
      new NewAuth({
        accessToken: "access_token",
        refreshToken: "refresh_token",
      })
    );
    expect(mockUserRepository.getPasswordByUsername).toHaveBeenCalledWith(
      "dicoding"
    );
    expect(mockPasswordHash.comparePassword).toHaveBeenCalledWith(
      "secret",
      "encrypted_password"
    );
    expect(mockUserRepository.getIdByUsername).toHaveBeenCalledWith("dicoding");
    expect(
      mockAuthenticationTokenManager.createAccessToken
    ).toHaveBeenCalledWith({ username: "dicoding", id: "user-123" });
    expect(
      mockAuthenticationTokenManager.createRefreshToken
    ).toHaveBeenCalledWith({ username: "dicoding", id: "user-123" });
    expect(mockAuthenticationRepository.addToken).toHaveBeenCalledWith(
      mockedAuthentication.refreshToken
    );
  });
});
