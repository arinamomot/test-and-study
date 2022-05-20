module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User not authorized.");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static AccessDenied() {
    return new ApiError(403, "You don't have access.");
  }

  static NotFound() {
    return new ApiError(404, "Not found.");
  }
};
