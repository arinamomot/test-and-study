const Router = require("express");
const router = new Router();
const userRouter = require("./user");
const testsRouter = require("./tests");
const attachmentRouter = require("./attachment");

router.use("/user", userRouter);
router.use("/tests", testsRouter);
router.use("/attachment", attachmentRouter);

module.exports = router;
