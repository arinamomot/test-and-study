const TestModel = require("../models/test-model");
const QuestionTypeModel = require("../models/questionType-model");
const QuestionModel = require("../models/question-model");
const TopicModel = require("../models/topic-model");
const QuestionDto = require("../dtos/question-dto");
const TopicDto = require("../dtos/topic-dto");
const TestDTO = require("../dtos/test-dto");

class QuestionService {
  async createQuestion(question) {
    if (question._id) {
      const questionResult = await QuestionModel.findByIdAndUpdate(
        question._id,
        question,
        {
          new: true,
        }
      );
      const questionDto = new QuestionDto(questionResult);
      return {
        question: questionDto,
        message: "Question successfully updated.",
      };
    } else {
      const questionResult = await QuestionModel.create(question);

      const questionDto = new QuestionDto(questionResult);

      return {
        question: questionDto,
        message: "Question successfully created.",
      };
    }
  }

  async createTopic(topic) {
    const topicDB = await TopicModel.create(topic);

    const topicDto = new TopicDto(topicDB);

    return { topic: topicDto, message: "Topic successfully created." };
  }

  async createQuestionType(questionType) {
    await QuestionTypeModel.create({
      questionType,
    });

    return { message: "Question type successfully created." };
  }

  async getQuestionsByTestId(id) {
    const questions = await QuestionModel.find({ test: id });

    return questions;
  }

  async deleteAllQuestions() {
    const response = await QuestionModel.deleteMany();
    return response;
  }

  async getAllQuestionsByTestId(testId) {
    const testDB = await TestModel.findById(testId);
    const testDto = new TestDTO(testDB);

    let quesReturn = [];
    for (const ques of testDto.questions) {
      const quesDB = await QuestionModel.findById(ques);
      const quesDto = new QuestionDto(quesDB);
      quesReturn.push(quesDto);
    }

    const questions = await QuestionModel.find();

    return { questions: quesReturn };
  }

  async getAllQuestionsIdsByTestId(testId) {
    const questions = await QuestionModel.find({ test: testId });
    const questionsIds = [];
    for (const question of questions) {
      const questionDto = new QuestionDto(question);
      questionsIds.push(questionDto.id);
    }

    return { questionsIds };
  }

  async deleteQuestionById(questionId) {
    const response = await QuestionModel.findByIdAndDelete(questionId);
    return response;
  }
}

module.exports = new QuestionService();
