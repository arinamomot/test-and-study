const UserModel = require("../models/user-model");
const AttachmentModel = require("../models/attachment-model");
const RoleModel = require("../models/userRole-model");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const AttachmentDto = require("../dtos/attachment-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password, firstName, lastName) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `User with email address ${email} already exists.`
      );
    }
    const hashPassword = await bcrypt.hash(password, 7);

    const userRole = await RoleModel.findOne({ role: "USER" });

    const user = await UserModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      roles: [userRole.role],
    });

    const userDto = new UserDto(user); // id, email, firstName, lastName, roles
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      message: "User successfully registered.",
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} was not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Invalid password.");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const avatar = await AttachmentModel.findOne(userDto.avatar);
    if (avatar) {
      const avatarDto = await new AttachmentDto(avatar);
      return { ...tokens, user: userDto, avatar: avatarDto };
    }
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async updateAccount(
    refreshToken,
    email,
    firstName,
    lastName,
    password,
    newPassword
  ) {
    const userId = (await this.getAccountInfo(refreshToken)).user.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} was not found`);
    }

    await UserModel.findByIdAndUpdate(userId, {
      email: email,
      firstName: firstName,
      lastName: lastName,
    });

    if (password.length > 0 && newPassword.length > 0) {
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw ApiError.BadRequest("Current password is not correct.");
      } else {
        const hashPassword = await bcrypt.hash(newPassword, 7);
        await UserModel.findByIdAndUpdate(userId, {
          password: hashPassword,
        });
      }
    }

    const newUser = await UserModel.findById(userId);
    const userDto = new UserDto(newUser);
    return {
      newUser: userDto,
      message: "User successfully updated.",
    };
  }

  async deleteAccount(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.NotFound();
    }
    await UserModel.deleteOne({ _id: userId });
    return { message: "User successfully deleted." };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    const avatar = await AttachmentModel.findOne(userDto.avatar);
    if (avatar) {
      const avatarDto = await new AttachmentDto(avatar);
      return { ...tokens, user: userDto, avatar: avatarDto };
    }
    return { ...tokens, user: userDto };
  }

  async getAccountInfo(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    if (!user) {
      throw ApiError.NotFound();
    }
    const userDto = new UserDto(user);
    return { user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return { users, message: "All users" };
  }

  async getUserIdByToken(token) {
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(token);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    return userData.id;
  }

  async getCurrentUser(userId) {
    const user = await UserModel.findById(userId);
    return user;
  }
}

module.exports = new UserService();
