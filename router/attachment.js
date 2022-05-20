const { upload } = require("../middlewares/upload-middleware");
const attachmentController = require("../controllers/attachment-controller");
const AttachmentModel = require("../models/attachment-model");
const router = require("express").Router();

router.post(
  "/upload",
  upload.single("file"),
  attachmentController.uploadAttachment
);

router.post(
  "/uploadAvatar",
  upload.single("file"),
  attachmentController.uploadAvatar
);

router.post(
  "/uploadTestPhoto",
  upload.single("file"),
  attachmentController.uploadTestPhoto
);

router.get("/getUserAvatar", attachmentController.getAvatar);

router.get("/uploads", async (req, res, next) => {
  try {
    const uploads = await AttachmentModel.find();
    return res.status(200).json(uploads);
  } catch (e) {
    next(e);
  }
});

router.delete("/deleteAll", attachmentController.deleteAll);

module.exports = router;
