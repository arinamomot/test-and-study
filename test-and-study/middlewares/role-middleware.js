const jwt = require("jsonwebtoken");
const tokenService = require("../service/token-service");
const ApiError = require("../exceptions/api-error");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }

      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      const { roles: userRoles } =
        tokenService.validateAccessToken(accessToken);
      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return next(ApiError.AccessDenied());
      }
      next();
    } catch (e) {
      console.error(e);
      return next(ApiError.UnauthorizedError());
    }
  };
};
