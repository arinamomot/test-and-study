const testService = require("../service/test-service");
const responseService = require("../service/response-service");
const questionService = require("../service/question-service");

class ResponseController {
  async createResponse(req, res, next) {
    try {
      const { questions, answers } = req.body;
      const { testId } = req.params;
      const { refreshToken } = req.cookies;

      let questionIds = [];
      let maxPoints = 0;
      for (const question of questions) {
        const questionDto = await questionService.createQuestion(question);
        questionIds.push((await questionDto).question.id);
        maxPoints += questionDto.question.points;
      }

      const testData = await responseService.createResponse(
        testId,
        questions,
        answers,
        maxPoints,
        refreshToken
      );
      return res.status(201).json(testData);
    } catch (e) {
      next(e);
    }
  }

  async getResponseById(req, res, next) {
    try {
      const { responseId } = req.body;
      const responseData = await testService.getResponseById(responseId);
      return res.status(201).json(responseData);
    } catch (e) {
      next(e);
    }
  }

  async deleteResponse(req, res, next) {
    try {
      const { respId } = req.body;
      const response = await responseService.deleteResponse(respId);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ResponseController();
