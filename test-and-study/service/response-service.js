const userService = require("./user-service");
const TestModel = require("../models/test-model");
const AnswerModel = require("../models/answer-model");
const ResponseModel = require("../models/response-model");
const UserDto = require("../dtos/user-dto");
const TopicModel = require("../models/topic-model");
const TopicDto = require("../dtos/topic-dto");
const ApiError = require("../exceptions/api-error");
const ResponseDto = require("../dtos/response-dto");

class ResponseService {
  async createResponse(testId, questions, maxPoints, answers, refreshToken) {
    const user = await userService.getAccountInfo(refreshToken);
    const userId = user.user.id;

    const responseDto = new ResponseDto(response);

    let userAnswers = [];
    let userPoints = 0;

    const response = await ResponseModel.create({
      user: userId,
      test: testId,
      questions,
      answers: userAnswers,
      maxPoints,
      userPoints,
    });

    const test = await TestModel.create({
      title,
      description,
      testType,
      creator: creatorId,
    });

    const creatorDto = new UserDto(creator);
    return { test, message: "Test successfully created.", creator: creatorDto };
  }

  async createTestTopic(topic) {
    const testTopic = await TopicModel.create({
      title: topic.title,
      subTopic: topic.subTopic,
    });

    const testTopicDto = new TopicDto(testTopic);
    return { topic: testTopicDto };
  }

  async deleteResponse(respId) {
    const resp = await ResponseModel.findById(respId);

    if (!resp) {
      throw ApiError.NotFound();
    }

    const respDto = new ResponseDto(resp);

    for (const ans of respDto.answers) {
      await AnswerModel.findByIdAndDelete(ans);
    }

    await ResponseModel.findByIdAndDelete(respId);

    return { message: "Response successfully deleted." };
  }
}

module.exports = new ResponseService();
