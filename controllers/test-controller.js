const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const testService = require("../service/test-service");
const userService = require("../service/user-service");
const questionService = require("../service/question-service");
const mongoose = require("mongoose");
const TestDto = require("../dtos/test-dto");

class TestController {
  async createTest(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error.", errors.array()));
      }

      const { title, description, testType } = req.body;
      const { refreshToken } = req.cookies;
      const testData = await testService.createTest(
        title,
        description,
        testType,
        refreshToken
      );
      return res.status(201).json(testData);
    } catch (e) {
      next(e);
    }
  }

  async runIncorrect(req, res, next) {
    try {
      const { testId, respId } = req.body;
      const { refreshToken } = req.cookies;
      const userId = (await userService.getAccountInfo(refreshToken)).user.id;

      const testData = await testService.runIncorrect(testId, respId, userId);

      return res.status(201).json(testData);
    } catch (e) {
      next(e);
    }
  }

  async deleteTest(req, res, next) {
    try {
      const { testId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }

      const { refreshToken } = req.cookies;
      const userId = (await userService.getAccountInfo(refreshToken)).user.id;

      const testData = await testService.deleteTest(testId, userId);
      return res.json(testData);
    } catch (e) {
      next(e);
    }
  }

  async deleteMember(req, res, next) {
    try {
      const { testId, memberId } = req.body;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }

      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        return res.status(404).send(`No member with id: ${memberId}`);
      }

      const testData = await testService.deleteMember(testId, memberId);
      return res.json(testData);
    } catch (e) {
      next(e);
    }
  }

  async deleteTestPhoto(req, res, next) {
    try {
      const { testPhoto, testId } = req.body;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }

      const testData = await testService.deleteTestPhoto(testPhoto, testId);
      return res.json(testData);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllMembers(req, res, next) {
    try {
      const { testId } = req.body;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }

      const testData = await testService.deleteAllMembers(testId);
      return res.json(testData);
    } catch (e) {
      next(e);
    }
  }

  async createTestTopic(req, res, next) {
    try {
      const { topic } = req.body;
      const testData = await testService.createTestTopic(topic);
      return res.status(201).json(testData);
    } catch (e) {
      next(e);
    }
  }

  async updateTest(req, res, next) {
    try {
      let { testId } = req.params;
      const { test, questionsToDelete } = req.body;

      const testTopicTitle = test.topic.split(" ")[0];
      const testTopicSubTopic = test.topic.split(" ")[1];

      console.log("testTopicTitle: ", testTopicTitle);
      console.log("testTopicSubTopic: ", testTopicSubTopic);

      const topicDto = await testService.createTestTopic({
        title: testTopicTitle,
        subTopic: testTopicSubTopic,
      });
      test.topic = topicDto.topic.id;

      const testDto = new TestDto(test);

      console.log("test.topic: ", test.topic);

      if (questionsToDelete.length > 0) {
        for (const questionId of questionsToDelete) {
          const response = await questionService.deleteQuestionById(questionId);
        }
      }

      let questionIds = [];
      for (const question of testDto.questions) {
        question.test = testId;
        const questionDto = await questionService.createQuestion(question);
        questionIds.push((await questionDto).question.id);
      }

      const updatedTest = {
        title: testDto.title,
        topic: testDto.topic,
        description: testDto.description,
        testType: testDto.testType,
        _id: testId,
        questions: questionIds,
        members: testDto.members,
        time: testDto.time,
        color: testDto.color,
        evaluation: testDto.evaluation,
      };

      const testData = await testService.updateTest(updatedTest);
      return res.json(testData);
    } catch (e) {
      next(e);
    }
  }

  async updateResponse(req, res, next) {
    try {
      const { responseId } = req.params;
      const { answers } = req.body;

      const answersData = await testService.updateResponse(responseId, answers);

      return res.json(answersData);
    } catch (e) {
      next(e);
    }
  }

  async submitTest(req, res, next) {
    try {
      const { testId } = req.params;
      const { testResponse, answers } = req.body;
      const { refreshToken } = req.cookies;

      const testSubmitData = await testService.submitTest(
        testId,
        testResponse,
        answers,
        refreshToken
      );

      return res.json(testSubmitData);
    } catch (e) {
      next(e);
    }
  }

  async getTestById(req, res, next) {
    try {
      const { testId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }
      const response = await testService.getTest(testId);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getTestResponses(req, res, next) {
    try {
      const { testId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }
      const response = await testService.getTestResponses(testId);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getUserResponses(req, res, next) {
    try {
      const { testId } = req.params;
      const { refreshToken } = req.cookies;
      const userId = (await userService.getAccountInfo(refreshToken)).user.id;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }

      const response = await testService.getUserResponses(userId, testId);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getTestMembers(req, res, next) {
    try {
      const { testId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(404).send(`No test with id: ${testId}`);
      }
      const response = await testService.getTestMembers(testId);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getResponseAnswers(req, res, next) {
    try {
      const { respId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(respId)) {
        return res.status(404).send(`No test with id: ${respId}`);
      }

      const answers = await testService.getResponseAnswers(respId);

      return res.status(200).json(answers);
    } catch (e) {
      next(e);
    }
  }

  async getAllTests(req, res, next) {
    try {
      const tests = await testService.getAllTests();
      return res.status(200).json(tests);
    } catch (e) {
      next(e);
    }
  }

  async getAllUserTests(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userId = (await userService.getAccountInfo(refreshToken)).user.id;
      const tests = await testService.getAllUserTests(userId);
      return res.status(200).json(tests);
    } catch (e) {
      next(e);
    }
  }

  async getTestCreator(req, res, next) {
    try {
      const testCreator = await testService.getTestCreator(req.query.creator);
      return res.status(200).json(testCreator);
    } catch (e) {
      next(e);
    }
  }

  async getTestTypes(req, res, next) {
    try {
      const testTypes = await testService.getTestTypes();
      return res.status(200).json(testTypes);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllTests(req, res, next) {
    try {
      const response = await testService.deleteAllTests();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllTopics(req, res, next) {
    try {
      const response = await testService.deleteAllTopics();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllAnswers(req, res, next) {
    try {
      const response = await testService.deleteAllAnswers();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteAllResponses(req, res, next) {
    try {
      const response = await testService.deleteAllResponses();
      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async shareTest(req, res, next) {
    try {
      const { email, testId } = req.body;
      const response = await testService.shareTest(email, testId);
      return res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TestController();
