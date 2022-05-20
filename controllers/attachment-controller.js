const ApiError = require("../exceptions/api-error");
const attachmentService = require("../service/attachment-service");

class AttachmentController {
  async uploadAttachment(req, res, next) {
    try {
      const file = req.file;

      if (req.file === undefined) return next(ApiError.NotFound());

      const { refreshToken } = req.cookies;
      const response = await attachmentService.uploadAttachment(
        file,
        refreshToken
      );
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      const file = req.file;

      if (req.file === undefined) return next(ApiError.NotFound());

      const { refreshToken } = req.cookies;
      const response = await attachmentService.uploadAvatar(file, refreshToken);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAvatar(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const response = await attachmentService.getAvatar(refreshToken);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteAll(req, res, next) {
    try {
      const response = await attachmentService.deleteAll();
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async uploadTestPhoto(req, res, next) {
    try {
      const file = req.file; // file passed from client
      const testId = req.body.test;

      if (req.file === undefined) return next(ApiError.NotFound());

      const { refreshToken } = req.cookies;
      const response = await attachmentService.uploadTestPhoto(
        file,
        refreshToken,
        testId
      );
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AttachmentController();
