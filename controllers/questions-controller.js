const questionService = require("../service/question-service");

class QuestionsController {
  async createQuestion(req, res, next) {
    try {
      const { questionText, questionType, options, points, topic } = req.body;
      const response = await questionService.createQuestion();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async createQuestionType(req, res, next) {
    try {
      const { questionType } = req.body;
      const response = await questionService.createQuestionType(questionType);
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAllQuestionsByTestId(req, res, next) {
    try {
      const { testId } = req.params;
      const tests = await questionService.getAllQuestionsByTestId(testId);
      return res.status(200).json(tests);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllQuestions(req, res, next) {
    try {
      const response = await questionService.deleteAllQuestions();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new QuestionsController();
