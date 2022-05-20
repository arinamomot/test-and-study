import { AxiosResponse } from "axios";
import { IAnswer } from "../models/IAnswer";
import { IResponse } from "../models/IResponse";
import { ITest } from "../models/ITest";
import { ITestType } from "../models/ITestType";
import { IUser } from "../models/IUser";
import { AnswersResponse } from "../models/response/AnswersResponse";
import { AttachmentResponse } from "../models/response/AttachmentResponse";
import { IncorrectRunResponse } from "../models/response/IncorrectRunResponse";
import { MessageResponse } from "../models/response/MessageResponse";
import { QuestionsResponse } from "../models/response/QuestionsResponse";
import { ResponseResponse } from "../models/response/ResponseResponse";
import { ResponsesResponse } from "../models/response/ResponsesResponse";
import { TestResponse } from "../models/response/TestResponse";
import { TestsResponse } from "../models/response/TestsResponse";
import { TopicResponse } from "../models/response/TopicResponse";
import { UpdateTestResponse } from "../models/response/UpdateTestResponse";
import { UsersResponse } from "../models/response/UsersResponse";
import $api from "../http";
// import {ResponseResponse} from "../models/response/ResponseResponse";

export default class TestService {
  static async createTest(
    title: string,
    description: string,
    testType: string
  ): Promise<AxiosResponse<TestResponse>> {
    return $api.post<TestResponse>("/tests/createTest", {
      title,
      description,
      testType,
    });
  }

  static async getTestResponses(
    testId: string
  ): Promise<AxiosResponse<ResponsesResponse>> {
    return $api.get<ResponsesResponse>(`/tests/responses/${testId}`, {
      params: {
        testId: testId,
      },
    });
  }

  static async getUserResponses(
    testId: string
  ): Promise<AxiosResponse<ResponsesResponse>> {
    return $api.get<ResponsesResponse>(`/tests/userResponses/${testId}`, {
      params: {
        testId: testId,
      },
    });
  }

  static async getTestMembers(
    testId: string
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>(`/tests/members/${testId}`, {
      params: {
        testId: testId,
      },
    });
  }

  static uploadTestPhoto(
    data: FormData
  ): Promise<AxiosResponse<AttachmentResponse>> {
    return $api.post<AttachmentResponse>(
      "/attachment/uploadTestPhoto",
      data
      // {
      //   headers: {
      //     "Content-type": "multipart/form-data",
      //   }
      // }
    );
  }

  static async getAllTests(): Promise<AxiosResponse<TestsResponse>> {
    return $api.get<TestsResponse>("/tests/tests");
  }

  static async getAllUserTests(): Promise<AxiosResponse<TestsResponse>> {
    return $api.get<TestsResponse>("/tests/userTests");
  }

  static async getAllQuestionsByTestId(
    testId: string
  ): Promise<AxiosResponse<QuestionsResponse>> {
    return $api.get<QuestionsResponse>(`/tests/questions/${testId}`, {
      params: {
        testId: testId,
      },
    });
  }

  static async shareTest(
    email: string,
    testId: string
  ): Promise<AxiosResponse<MessageResponse>> {
    return $api.put<MessageResponse>(`/tests/shareTest/${testId}`, {
      email,
      testId,
    });
  }

  static async deleteMemberFromTest(
    testId: string,
    memberId: string
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.put<UsersResponse>(`/tests/deleteMember/${testId}`, {
      testId: testId,
      memberId: memberId,
    });
  }

  static async deleteAllMembersFromTest(
    testId: string
  ): Promise<AxiosResponse<UsersResponse>> {
    return $api.put<UsersResponse>(`/tests/deleteAllMembers/${testId}`, {
      testId: testId,
    });
  }

  static async getTestById(id: any): Promise<AxiosResponse<TestResponse>> {
    return $api.get<TestResponse>(`/tests/test/${id}`, {
      params: {
        testId: id,
      },
    });
  }

  static async getTestCreator(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>("/tests/creator", {
      params: {
        creator: id,
      },
    });
  }

  static async deleteTest(id: string): Promise<AxiosResponse<MessageResponse>> {
    return $api.delete(`/tests/deleteTest/${id}`, {
      params: {
        testId: id,
      },
    });
  }

  static async deleteTestPhoto(
    testPhoto: string,
    testId: string
  ): Promise<AxiosResponse<MessageResponse>> {
    return $api.put<MessageResponse>(`/tests/deleteTestPhoto/${testId}`, {
      testPhoto: testPhoto,
      testId: testId,
    });
  }

  static async deleteResponse(
    respId: string
  ): Promise<AxiosResponse<MessageResponse>> {
    return $api.delete(`/tests/deleteResponse/`, {
      data: {
        respId: respId,
      },
    });
  }

  static async createTopic(topic: {
    title: string;
    subTopic: string;
  }): Promise<AxiosResponse<TopicResponse>> {
    return $api.post<TopicResponse>("/tests/createTestTopic", {
      topic,
    });
  }

  static async runIncorrect(
    respId: string,
    testId: string
  ): Promise<AxiosResponse<IncorrectRunResponse>> {
    return $api.post<IncorrectRunResponse>(
      `/tests/runIncorrect/${testId}`,
      {
        respId,
        testId,
      },
      {
        params: {
          testId: testId,
        },
      }
    );
  }

  // static async updateTest(
  //   testId: string,
  //   title: string,
  //   description: string,
  //   testType: string,
  //   questions: [],
  //   topic: {},
  //   members: [],
  //   time: number,
  //   color: string
  // ): Promise<AxiosResponse<UserResponse>> {
  //   return $api.put<UserResponse>(
  //     `/tests/updateTest/${testId}`,
  //     {
  //       title,
  //       description,
  //       testType,
  //       questions,
  //       topic,
  //       members,
  //       time,
  //       color
  //     },
  //     {
  //       params: {
  //         testId: testId,
  //       },
  //     }
  //   );
  // }

  static async updateResponse(
    responseId: string | null,
    answers: IAnswer[]
  ): Promise<AxiosResponse<AnswersResponse>> {
    return $api.put<AnswersResponse>(
      `/tests/updateResponse/${responseId}`,
      {
        answers,
      },
      {
        params: {
          responseId: responseId,
        },
      }
    );
  }

  static async updateTest(
    test: ITest,
    questionsToDelete: string[]
  ): Promise<AxiosResponse<UpdateTestResponse>> {
    return $api.put<UpdateTestResponse>(
      `/tests/updateTest/${test._id}`,
      {
        test,
        questionsToDelete,
        // test.title,
        //       test.description,
        //       test.testType,
        //       test.questions,
        //       test.topic,
        //       test.members,
        //       test.time,
        //       test.color
      },
      {
        params: {
          testId: test._id,
        },
      }
    );
  }

  static async getResponseAnswers(
    respId: string
  ): Promise<AxiosResponse<IAnswer[]>> {
    return $api.get<IAnswer[]>(`/tests/answers/${respId}`, {
      params: {
        respId: respId,
      },
    });
  }

  static async submitTest(
    testId: string,
    testResponse: IResponse,
    answers: IAnswer[]
  ): Promise<AxiosResponse<ResponseResponse>> {
    return $api.post<ResponseResponse>(
      `/tests/submitTest/${testId}`,
      {
        testResponse,
        answers,
      },
      {
        params: {
          testId: testId,
        },
      }
    );
  }

  static async getTestTypes(): Promise<AxiosResponse<ITestType[]>> {
    return $api.get<ITestType[]>("/tests/testTypes");
  }
}
