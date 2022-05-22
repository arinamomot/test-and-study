const testController = require("../controllers/test-controller");
const { body } = require("express-validator");
const router = require("express").Router();
const questionController = require("../controllers/questions-controller");
const responseController = require("../controllers/response-controller");
const authMiddleware = require("../middlewares/auth-middleware");

//tests
router.post(
  "/createTest",
  body("title").notEmpty(),
  body("title", "Title must be greater than 3").isLength({ min: 3 }),
  body("testType").notEmpty(),
  authMiddleware,
  testController.createTest
);

router.get("/test/:testId", authMiddleware, testController.getTestById);
router.get("/testTypes", authMiddleware, testController.getTestTypes);
router.get("/tests", authMiddleware, testController.getAllTests);
router.get("/userTests", authMiddleware, testController.getAllUserTests);
router.get("/questions/:testId", questionController.getAllQuestionsByTestId);
router.get(
  "/responses/:testId",
  authMiddleware,
  testController.getTestResponses
);
router.delete(
  "/deleteResponse",
  authMiddleware,
  responseController.deleteResponse
);
router.get(
  "/userResponses/:testId",
  authMiddleware,
  testController.getUserResponses
);
router.post("/runIncorrect/:testId", testController.runIncorrect);
router.get("/members/:testId", authMiddleware, testController.getTestMembers);
router.get(
  "/answers/:respId",
  testController.getResponseAnswers
);
router.delete("/deleteTests", authMiddleware, testController.deleteAllTests);
router.delete(
  "/questions/deleteQuestions",
  questionController.deleteAllQuestions
);
router.delete(
  "/topics/deleteTopics",
  authMiddleware,
  testController.deleteAllTopics
);
router.delete(
  "/answers/deleteAnswers",
  authMiddleware,
  testController.deleteAllAnswers
);
router.delete(
  "/responses/deleteResponses",
  authMiddleware,
  testController.deleteAllResponses
);
router.get("/creator", authMiddleware, testController.getTestCreator);
router.get("/response", authMiddleware, responseController.getResponseById);
router.post("/createTestTopic", authMiddleware, testController.createTestTopic);

router.delete("/deleteTest/:testId", authMiddleware, testController.deleteTest);
router.put(
  "/deleteMember/:testId",
  authMiddleware,
  testController.deleteMember
);
router.put(
  "/deleteTestPhoto/:testId",
  authMiddleware,
  testController.deleteTestPhoto
);
router.put(
  "/deleteAllMembers/:testId",
  authMiddleware,
  testController.deleteAllMembers
);

//Questions
router.put("/updateTest/:testId", testController.updateTest);
router.put("/shareTest/:testId", testController.shareTest);
router.put("/updateResponse/:responseId", testController.updateResponse);
router.post("/submitTest/:testId", testController.submitTest);

router.post(
  "/test/:testId/createQuestion",
  body("questionText").notEmpty(),
  body("questionText", "Title must be greater than 3").isLength({ min: 3 }),
  body("questionType").notEmpty(),
  authMiddleware,
  questionController.createQuestion
);
router.post(
  "/createQuestionType",
  authMiddleware,
  questionController.createQuestionType
);

module.exports = router;
