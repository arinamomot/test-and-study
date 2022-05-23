const userService = require("../service/user-service");
const tokenService = require("../service/token-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const Uuid = require("uuid");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error.", errors.array()));
      }
      const { email, password, firstName, lastName } = req.body;
      const userData = await userService.registration(
        email,
        password,
        firstName,
        lastName
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //30d
        httpOnly: false,
        sameSite: "none",
        secure: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error.", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
        secure: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = tokenService.validateRefreshToken(refreshToken);
      await tokenService.removeToken(refreshToken);
      const result = await userService.deleteAccount(userData.id);
      res.clearCookie("refreshToken");
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "none",
        secure: true
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getAccountInfo(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await userService.getAccountInfo(refreshToken);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async updateAccount(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error.", errors.array()));
      }
      const { refreshToken } = req.cookies;
      const { email, firstName, lastName, password, newPassword } = req.body;
      const userData = await userService.updateAccount(
        refreshToken,
        email,
        firstName,
        lastName,
        password,
        newPassword
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userId = (await userService.getAccountInfo(refreshToken)).user.id;
      const user = await userService.getCurrentUser(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
