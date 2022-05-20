const TestModel = require("../models/test-model");
const TestTypeModel = require("../models/testType-model");
const UserModel = require("../models/user-model");
const TopicModel = require("../models/topic-model");
const AnswerModel = require("../models/answer-model");
const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");
const userService = require("./user-service");
const questionService = require("./question-service");
const TestDTO = require("../dtos/test-dto");
const TopicDto = require("../dtos/topic-dto");
const QuestionModel = require("../models/question-model");
const AnswerDto = require("../dtos/answer-dto");
const ResponseDto = require("../dtos/response-dto");
const QuestionDto = require("../dtos/question-dto");
const ResponseModel = require("../models/response-model");
const TestDto = require("../dtos/test-dto");
const fs = require("fs");
const AttachmentModel = require("../models/attachment-model");

class TestService {
  async createTest(title, description, testType, refreshToken) {
    const creator = await userService.getAccountInfo(refreshToken);
    const creatorId = creator.user.id;

    const test = await TestModel.create({
      title,
      description,
      testType,
      creator: creatorId,
    });
    const testDto = new TestDTO(test);

    const creatorDto = new UserDto(creator.user);
    let updateCreatedTests = creatorDto.createdTests;
    if (creatorDto.createdTests === undefined) updateCreatedTests = [];
    else updateCreatedTests = creatorDto.createdTests;
    updateCreatedTests.push(testDto._id);
    const updatedCreatorDB = await UserModel.findOneAndUpdate(
      { email: creatorDto.email },
      {
        createdTests: updateCreatedTests,
      },
      {
        new: true,
      }
    );
    const creatorUpdatedDto = new UserDto(updatedCreatorDB);

    return {
      test,
      message: "Test successfully created.",
      creator: creatorUpdatedDto,
    };
  }

  async submitTest(testId, testResponse, answers, refreshToken) {
    const user = await userService.getAccountInfo(refreshToken);
    const userId = user.user.id;

    let answersFromDB = [];
    for (const answer of answers) {
      let answerDto = new AnswerDto(answer);

      answerDto.isCorrect = true;
      answerDto.userPoints = answerDto.questionPoints;
      if (answerDto.questionPoints !== 0) {
        for (const answerC of answerDto.userAnswers) {
          if (
            !answerDto.correctAnswers.includes(answerC) ||
            answerDto.correctAnswers.length !== answerDto.userAnswers.length
          )
            answerDto.isCorrect = false;
        }
      }

      if (!answerDto.isCorrect) answerDto.userPoints = 0;

      const answerFromDB = await AnswerModel.create({
        question: answerDto.question,
        userAnswers: answerDto.userAnswers,
        isCorrect: answerDto.isCorrect,
        userPoints: answerDto.userPoints,
        questionPoints: answerDto.questionPoints,
        user: userId,
        test: testId,
        correctAnswers: answerDto.correctAnswers,
        required: answerDto.required,
        answerFeedback: answerDto.answerFeedback,
      });
      answersFromDB.push(answerFromDB);
    }

    let answersIds = [];
    let allAnswersFromDB = [];
    let userPointsFromAnswers = 0;
    for (const answer of answersFromDB) {
      const answerDbDto = new AnswerDto(answer);
      answersIds.push(answerDbDto.id);
      allAnswersFromDB.push(answerDbDto);
      userPointsFromAnswers += answerDbDto.userPoints;
    }

    const newResponse = new ResponseDto(testResponse);

    const testFromDB = await TestModel.findById(testId);
    const testDto = new TestDTO(testFromDB);

    const testResponseDB = await ResponseModel.create({
      user: userId,
      test: testId,
      questions: newResponse.questions,
      time: newResponse.time,
      maxPoints: newResponse.maxPoints,
      userPoints: userPointsFromAnswers,
      answers: answersIds,
      evaluation: testDto.evaluation,
    });
    const testResponseDto = new ResponseDto(testResponseDB);

    return {
      responseId: testResponseDto.id,
      answers: allAnswersFromDB,
      points: userPointsFromAnswers,
      maxPoints: newResponse.maxPoints,
      message: "Test successfully submitted.",
    };
  }

  async createTestTopic(topic) {
    const testTopic = await TopicModel.create({
      title: topic.title,
      subTopic: topic.subTopic,
    });

    const testTopicDto = new TopicDto(testTopic);
    return { topic: testTopicDto };
  }

  async deleteTest(testId, userId) {
    const test = await TestModel.findById(testId);
    if (!test) {
      throw ApiError.NotFound();
    }

    const user = await UserModel.findById(userId);
    const userDto = new UserDto(user);

    const testDto = new TestDTO(test);

    if (userId.equals(testDto.creator)) {
      await TestModel.deleteOne({ _id: testId });
      const i = userDto.createdTests.indexOf(testId);
      userDto.createdTests.splice(i, 1);
      const newCreatedTests = userDto.sharedTest;
      await UserModel.findByIdAndUpdate(
        userId,
        {
          createdTests: newCreatedTests,
        },
        {
          new: true,
        }
      );
    } else {
      const i = userDto.sharedTest.indexOf(testId);
      userDto.sharedTest.splice(i, 1);
      const newSharedTests = userDto.sharedTest;
      await UserModel.findByIdAndUpdate(
        userId,
        {
          sharedTest: newSharedTests,
        },
        {
          new: true,
        }
      );

      const j = testDto.members.indexOf(userId);
      testDto.members.splice(j, 1);
      const newMembers = testDto.members;
      await TestModel.findByIdAndUpdate(
        testId,
        {
          members: newMembers,
        },
        {
          new: true,
        }
      );
    }

    return { message: "Test successfully deleted." };
  }

  async deleteTestPhoto(testPhoto, testId) {
    const test = await TestModel.findById(testId);
    if (!test) {
      throw ApiError.NotFound();
    }

    const testDto = new TestDTO(test);
    if (testDto.image) {
      await TestModel.findByIdAndUpdate(testDto._id, {
        // Delete ref id in Schema
        $unset: { image: "" },
      });
    }

    fs.unlink(`./client/public/uploads/${testPhoto}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file deleted
    });

    await AttachmentModel.findOneAndDelete({ img: testPhoto });

    return {
      message: "Test photo successfully deleted.",
    };
  }

  async deleteMember(testId, memberId) {
    const test = await TestModel.findById(testId);
    if (!test) {
      throw ApiError.NotFound();
    }

    const testDto = new TestDTO(test);
    const i = testDto.members.indexOf(memberId);
    testDto.members.splice(i, 1);
    const newMembers = testDto.members;
    await TestModel.findByIdAndUpdate(
      testId,
      {
        members: newMembers,
      },
      {
        new: true,
      }
    );

    const member = await UserModel.findById(memberId);
    if (!member) {
      throw ApiError.NotFound();
    }
    const memberDto = new UserDto(member);
    const j = memberDto.sharedTest.indexOf(testId);
    memberDto.sharedTest.splice(j, 1);
    const newSharedTest = memberDto.sharedTest;
    await UserModel.findByIdAndUpdate(
      memberId,
      {
        sharedTest: newSharedTest,
      },
      {
        new: true,
      }
    );

    let membersResult = [];
    for (const memb of newMembers) {
      const membDB = await UserModel.findById(memb);
      const membDto = new UserDto(membDB);
      membersResult.push(membDto);
    }

    return {
      users: membersResult,
      message: "Member successfully deleted.",
    };
  }

  async deleteAllMembers(testId) {
    const test = await TestModel.findById(testId);
    if (!test) {
      throw ApiError.NotFound();
    }

    const testDto = new TestDTO(test);

    for (const memb of testDto.members) {
      const membDB = await UserModel.findById(memb);
      const membDto = new UserDto(membDB);
      const j = membDto.sharedTest.indexOf(testId);
      membDto.sharedTest.splice(j, 1);
      const newSharedTest = membDto.sharedTest;
      await UserModel.findByIdAndUpdate(
        membDto.id,
        {
          sharedTest: newSharedTest,
        },
        {
          new: true,
        }
      );
    }

    await TestModel.findByIdAndUpdate(
      testId,
      {
        members: [],
      },
      {
        new: true,
      }
    );

    return {
      users: [],
      message: "Members successfully deleted.",
    };
  }

  async runIncorrect(testId, respId, userId) {
    const respDB = await ResponseModel.findById(respId);
    const respDto = new ResponseDto(respDB);
    console.log("Resp: ", respDto);

    const incorrectQuestions = [];
    for (const ans of respDto.answers) {
      const ansDB = await AnswerModel.findById(ans);
      const ansDto = new AnswerDto(ansDB);
      console.log("Resp: ", ansDto);

      if (!ansDto.isCorrect) {
        incorrectQuestions.push(ansDto.question);
      }
    }

    console.log(incorrectQuestions);

    const testDB = await TestModel.findById(testId);
    const testDto = new TestDTO(testDB);

    const newTitle = testDto.title + " " + "(incorrect)";

    const newTest = await TestModel.create({
      title: newTitle,
      description: testDto.description,
      testType: testDto.testType,
      creator: userId,
      questions: incorrectQuestions,
      topic: testDto.topic,
      members: testDto.members,
      time: testDto.time,
      color: testDto.color,
      evaluation: testDto.evaluation,
    });

    const newTestDto = new TestDTO(newTest);
    const newTestId = newTestDto._id;

    return {
      newTestId: newTestId,
      message: "Test with incorrect answers successfully created.",
    };
  }

  async updateTest(updatedtest) {
    const test = await TestModel.findById(updatedtest._id);
    if (!test) {
      throw ApiError.NotFound();
    }
    await TestModel.findByIdAndUpdate(updatedtest._id, updatedtest, {
      new: true,
    });

    // get questions back
    const testDB = await TestModel.findById(updatedtest._id);
    const testDto = new TestDTO(testDB);
    let quesToReturn = [];
    for (const ques of testDto.questions) {
      const quesDB = await QuestionModel.findById(ques);
      const quesDto = new QuestionDto(quesDB);
      quesToReturn.push(quesDto);
    }

    return { questions: quesToReturn, message: "Test successfully updated." };
  }

  async shareTest(email, testId) {
    const userDB = await UserModel.findOne({ email: email });
    const userDto = new UserDto(userDB);

    if (userDto.sharedTest.includes(testId))
      return { error: `The user ${email} is already a member of this test` };

    const newShared = [...userDto.sharedTest];
    newShared.push(testId);

    const updatedUser = await UserModel.findByIdAndUpdate(
      userDto.id,
      {
        sharedTest: newShared,
      },
      {
        new: true,
      }
    );

    const test = await TestModel.findById(testId);
    if (!test) {
      throw ApiError.NotFound();
    }
    const testDto = new TestDTO(test);

    const newMembers = [...testDto.members];
    newMembers.push(userDto.id);

    const updatedTest = await TestModel.findByIdAndUpdate(
      testId,
      {
        members: newMembers,
      },
      {
        new: true,
      }
    );

    return {
      message: `Test successfully shared with user: ${email}.`,
      error: "",
    };
  }

  async updateResponse(responseId, answers) {
    const updatedAnswers = [];
    let userPoints = 0;

    for (const answer of answers) {
      const answerDto = new AnswerDto(answer);
      userPoints += answerDto.userPoints;
      const updatedAnswer = await AnswerModel.findByIdAndUpdate(
        answer.id,
        {
          isCorrect: answerDto.isCorrect,
          userPoints: answerDto.userPoints,
        },
        {
          new: true,
        }
      );
      const updatedAnswerDto = new AnswerDto(updatedAnswer);
      updatedAnswers.push(updatedAnswerDto);
    }

    const respId = responseId.replace(/"/g, "");

    const response = await ResponseModel.findByIdAndUpdate(
      respId,
      {
        userPoints: userPoints,
      },
      {
        new: true,
      }
    );

    return {
      points: userPoints,
      answers: updatedAnswers,
      message: "Answers successfully updated.",
    };
  }

  async getResponseById(responseId) {
    const response = await ResponseModel.findById(responseId);

    const responseDto = new ResponseDto(response);

    return { response: responseDto };
  }

  async getTest(id) {
    const test = await TestModel.findById(id);

    const testDto = new TestDTO(test);

    // get creator
    const testCreator = await UserModel.findById(testDto.creator);
    const creatorDto = new UserDto(testCreator);

    // get questions
    const questions = await questionService.getQuestionsByTestId(id);

    // get topic
    let testTopicDto = {};
    const testTopic = await TopicModel.findById(testDto.topic);
    if (testTopic) testTopicDto = new TopicDto(testTopic);

    // get members
    const members = [];
    for (const member of testDto.members) {
      const memberDB = await UserModel.findById(member);
      const memberDto = new UserDto(memberDB);
      members.push(memberDto);
    }

    return {
      test: test,
      creator: creatorDto,
      questions: questions,
      topic: testTopicDto,
      members: members,
    };
  }

  async getTestResponses(testId) {
    const test = await TestModel.findById(testId);
    const testResponses = [];
    const responsesUsers = [];
    const responses = await ResponseModel.find({ test: testId });
    for (const tResp of responses) {
      const respDto = new ResponseDto(tResp);
      testResponses.push(respDto);

      //get users
      const user = await UserModel.findById(respDto.user);
      const userDto = new UserDto(user);
      responsesUsers.push(userDto);
    }

    return { responses: testResponses, users: responsesUsers };
  }

  async getUserResponses(userId, testId) {
    const responsesUsers = [];
    const responses = await ResponseModel.find({ test: testId, user: userId });
    for (const tResp of responses) {
      const respDto = new ResponseDto(tResp);

      const responsesAnswers = [];
      for (const answ of respDto.answers) {
        const answDB = await AnswerModel.findById(answ);
        const answDto = new AnswerDto(answDB);
        if (!answDto.isCorrect) responsesAnswers.push(answDto.id);
      }
      respDto.answers = [];
      respDto.answers = responsesAnswers;

      responsesUsers.push(respDto);
    }

    return { responses: responsesUsers };
  }

  async getTestMembers(testId) {
    const test = await TestModel.findById(testId);
    const testDto = new TestDTO(test);

    // get members
    const members = [];
    for (const mem of testDto.members) {
      const memberDB = await UserModel.findById(mem);
      const memberDto = new UserDto(memberDB);
      members.push(memberDto);
    }

    return { users: members };
  }

  async getResponseAnswers(respId) {
    const response = await ResponseModel.findById(respId);
    const responseDto = new ResponseDto(response);

    // get answers
    const answers = [];
    for (const answer of responseDto.answers) {
      const answerDB = await AnswerModel.findById(answer);
      const answerDto = new AnswerDto(answerDB);
      answers.push(answerDto);
    }

    return answers;
  }

  async getAllTests() {
    const tests = await TestModel.find();
    const creators = [];
    const topics = [];
    for (const test of tests) {
      const testDto1 = new TestDTO(test);
      // get creator
      const testCreator = await UserModel.findById(testDto1.creator);
      if (testCreator === null) continue;
      const userDto = new UserDto(testCreator);
      creators.push(userDto);

      // get topic
      const testTopic = await TopicModel.findById(testDto1.topic);
      if (testTopic === null) continue;
      const topicDto = new TopicDto(testTopic);
      topics.push(topicDto);
    }
    return { tests, creators, topics };
  }

  async getAllUserTests(userId) {
    const tests = await TestModel.find();

    let created = [];
    let membered = [];
    for (const test of tests) {
      const testDto1 = new TestDTO(test);
      if (userId.equals(testDto1.creator)) created.push(testDto1._id);

      for (const mem of testDto1.members) {
        if (mem.equals(userId)) membered.push(testDto1._id);
      }
    }

    let result = created.concat(membered);
    result = [...new Set(result)];

    const creators = [];
    const topics = [];
    const testsResult = [];
    for (const test of result) {
      const testDB = await TestModel.findById(test);
      const testDto1 = new TestDTO(testDB);
      testsResult.push(testDto1);
      // get creator
      const testCreator = await UserModel.findById(testDto1.creator);
      if (testCreator === null) continue;
      const userDto = new UserDto(testCreator);
      creators.push(userDto);

      // get topic
      const testTopic = await TopicModel.findById(testDto1.topic);
      if (testTopic === null) continue;
      const topicDto = new TopicDto(testTopic);
      topics.push(topicDto);
    }

    return { tests: testsResult, creators, topics };
  }

  async getTestCreator(Id) {
    const testCreator = await UserModel.findById(Id);
    if (!testCreator) {
      throw ApiError.NotFound();
    }
    const userDto = new UserDto(testCreator);
    return { testCreator: userDto };
  }

  async getTestTypes() {
    const testTypes = await TestTypeModel.find();
    return testTypes;
  }

  async deleteAllTopics() {
    const response = await TopicModel.deleteMany();
    return response;
  }

  async deleteAllAnswers() {
    const response = await AnswerModel.deleteMany();
    return response;
  }

  async deleteAllResponses() {
    const response = await ResponseModel.deleteMany();
    return response;
  }
}

module.exports = new TestService();
