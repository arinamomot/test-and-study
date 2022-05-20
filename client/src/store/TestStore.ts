import { AlertColor } from "@mui/material/Alert";
import { makeAutoObservable } from "mobx";
import Router from "next/router";
import { IAnswer } from "../models/IAnswer";
import { IQuestion } from "../models/IQuestion";
import { IResponse } from "../models/IResponse";
import { ITest } from "../models/ITest";
import { ITestType } from "../models/ITestType";
import { ITopic } from "../models/ITopic";
import { IUser } from "../models/IUser";
import TestService from "../services/TestService";

export default class TestStore {
  test = {} as ITest;
  testType = {} as ITestType;
  testTypes = [] as ITestType[];
  testCreator = {} as IUser;
  isLoading = false;
  color: string | undefined;
  questions = [] as IQuestion[];
  topic = {} as ITopic;
  members = [] as IUser[];
  questionsTopics = [] as ITopic[];
  alertBox = { show: false, type: "success" as AlertColor, message: "" };
  responses = [] as IResponse[];
  respUsers = [] as IUser[];

  constructor() {
    makeAutoObservable(this);
  }

  setAlertBox(bool: boolean, type: AlertColor, message?: any) {
    this.alertBox.show = bool;
    this.alertBox.message = message;
    this.alertBox.type = type;
  }

  setTest(test: ITest) {
    this.test = test;
  }

  setCreator(creator: IUser) {
    this.testCreator = creator;
  }

  getCreator() {
    return this.testCreator;
  }

  setTopic(topic: ITopic) {
    this.topic = topic;
  }

  getTopic() {
    return this.topic;
  }

  setResponses(responses: IResponse[]) {
    this.responses = responses;
  }

  getResponses() {
    return this.responses;
  }

  setRespUsers(users: IUser[]) {
    this.respUsers = users;
  }

  getRespUsers() {
    return this.respUsers;
  }

  setQuestionsTopics(topics: ITopic[]) {
    this.questionsTopics = topics;
  }

  getQuestionsTopics() {
    return this.questionsTopics;
  }

  setQuestions(questions: IQuestion[]) {
    this.questions = questions;
  }

  getQuestions() {
    return this.questions;
  }

  setTestTypes(testTypes: ITestType[]) {
    this.testTypes = testTypes;
  }

  getTestTypes() {
    return this.testTypes;
  }

  setMembers(members: IUser[]) {
    this.members = members;
  }

  getMembers() {
    return this.members;
  }

  setColor(color: string) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  getTest() {
    return this.test;
  }

  async getTestTypesStore() {
    this.setLoading(true);
    try {
      const response = await TestService.getTestTypes();
      if (response.data) {
        this.setTestTypes(response.data);
        localStorage.setItem("testTypes", JSON.stringify(response.data));
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async createTest(title: string, description: string, testType: string) {
    try {
      const response = await TestService.createTest(
        title,
        description,
        testType
      );
      this.setTest(response.data.test);
      if (response.data.creator) this.setCreator(response.data.creator);
      await this.getTestTypesStore();
      await this.getTestById(response.data.test._id);
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async runIncorrect(respId: string, testId: string) {
    try {
      const response = await TestService.runIncorrect(respId, testId);
      localStorage.setItem("run", JSON.stringify(true));
      localStorage.setItem("preview", JSON.stringify(false));
      this.getAllQuestionsByTestId(response.data.newTestId);
      this.getTestTypesStore();
      this.getTestById(response.data.newTestId, true);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async deleteTest(id: string) {
    try {
      await TestService.deleteTest(id);
      if (localStorage.getItem("testId")) localStorage.removeItem("testId");
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async deleteTestPhoto(testPhoto: string, testId: string) {
    try {
      await TestService.deleteTestPhoto(testPhoto, testId);
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async uploadTestPhoto(data: FormData) {
    try {
      const response = await TestService.uploadTestPhoto(data);
      this.setAlertBox(true, "success", response.data.message);
      return response.data.image;
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
      console.error(e.response?.data?.message);
    }
  }

  async updateTest(test: ITest, questionsToDelete: string[]) {
    try {
      const response = await TestService.updateTest(test, questionsToDelete);
      if (localStorage.getItem("questions"))
        localStorage.removeItem("questions");
      localStorage.setItem(
        "questions",
        JSON.stringify(response.data.questions)
      );
      this.setAlertBox(true, "success", "Test successfully updated.");
      return response;
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
      console.error(e.response?.data?.message);
    }
  }

  async submitTest(
    testId: string,
    testResponse: IResponse,
    answers: IAnswer[]
  ) {
    try {
      const response = await TestService.submitTest(
        testId,
        testResponse,
        answers
      );
      this.setAlertBox(true, "success", "Test successfully accepted.");
      if (localStorage.getItem("run")) localStorage.removeItem("run");
      localStorage.setItem("preview", JSON.stringify(true));
      localStorage.setItem("points", JSON.stringify(response.data.points));
      localStorage.setItem(
        "maxPoints",
        JSON.stringify(response.data.maxPoints)
      );
      localStorage.setItem(
        "responseId",
        JSON.stringify(response.data.responseId)
      );
      localStorage.setItem(
        "userAnswers",
        JSON.stringify(response.data.answers)
      );
      await Router.push(`/testSubmitted/${response.data.responseId}`);
      return response;
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
      console.error(e.response?.data?.message);
    }
  }

  async showMemberResponse(
    resp: IResponse,
    userEmail: string,
    respPage?: boolean
  ) {
    try {
      const response = await TestService.getResponseAnswers(resp.id);
      localStorage.setItem("preview", JSON.stringify(true));
      if (respPage) localStorage.setItem("respPage", JSON.stringify(true));
      else localStorage.setItem("showResponse", JSON.stringify(true));
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("points", JSON.stringify(resp.userPoints));
      localStorage.setItem("maxPoints", JSON.stringify(resp.maxPoints));
      localStorage.setItem("responseId", JSON.stringify(resp.id));
      localStorage.setItem("userAnswers", JSON.stringify(response.data));
      await Router.push(`/testSubmitted/${resp.id}`);
      return response;
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
      console.error(e.response?.data?.message);
    }
  }

  async getTestResponses(testId: string) {
    try {
      const response = await TestService.getTestResponses(testId);
      this.setResponses(response.data.responses);
      if (response.data.users) this.setRespUsers(response.data.users);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async getUserResponses(testId: string) {
    try {
      const response = await TestService.getUserResponses(testId);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async deleteResponse(respId: string) {
    try {
      const response = await TestService.deleteResponse(respId);
      this.setAlertBox(true, "success", response.data.message);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async getTestMembers(testId: string) {
    try {
      const response = await TestService.getTestMembers(testId);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async updateResponse(responseId: string | null, answers: IAnswer[]) {
    try {
      const response = await TestService.updateResponse(responseId, answers);
      localStorage.setItem(
        "userAnswers",
        JSON.stringify(response.data.answers)
      );
      localStorage.setItem("points", JSON.stringify(response.data.points));
      await Router.push(`/testSubmitted/${responseId}`);
      this.setAlertBox(true, "success", "Response successfully updated.");
      return response;
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
      console.error(e.response?.data?.message);
    }
  }

  async createTopic(topic: { title: string; subTopic: string }) {
    try {
      const response = await TestService.createTopic(topic);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async getTestById(id: any, type?: boolean) {
    this.setLoading(true);
    try {
      const response = await TestService.getTestById(id);
      this.setTest(response.data.test);
      localStorage.setItem("test", JSON.stringify(response.data.test));
      if (response.data.creator) {
        this.setCreator(response.data.creator);
        localStorage.setItem(
          "testCreator",
          JSON.stringify(response.data.creator)
        );
      }
      if (response.data.topic) {
        this.setTopic(response.data.topic);
        localStorage.setItem("testTopic", JSON.stringify(response.data.topic));
      }
      if (response.data.members) {
        this.setMembers(response.data.members);
        localStorage.setItem("members", JSON.stringify(response.data.members));
      }
      localStorage.setItem("testId", response.data.test._id);
      if (type) {
        await Router.push(`/response/${id}`);
        return;
      }
      await Router.push(`/test/${id}`);
    } catch (e: any) {
      console.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async getAllTests() {
    try {
      const response = await TestService.getAllUserTests();
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async shareTest(email: string, testId: string) {
    try {
      const response = await TestService.shareTest(email, testId);
      if (response.data.error !== "")
        this.setAlertBox(true, "error", response.data.error);
      else this.setAlertBox(true, "success", response.data.message);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async deleteMemberFromTest(testId: string, memberId: string) {
    try {
      const response = await TestService.deleteMemberFromTest(testId, memberId);
      this.setAlertBox(true, "success", response.data.message);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async deleteAllMembersFromTest(testId: string) {
    try {
      const response = await TestService.deleteAllMembersFromTest(testId);
      this.setAlertBox(true, "success", response.data.message);
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async setQues(questions: IQuestion[]) {
    try {
      this.setQuestions(questions);
    } catch (e: any) {
      console.error(e);
    }
  }

  async getAllQuestionsByTestId(testId: any) {
    try {
      const response = await TestService.getAllQuestionsByTestId(testId);
      if (response.data.questions) this.setQuestions(response.data.questions);
      localStorage.setItem(
        "questions",
        JSON.stringify(response.data.questions)
      );
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }
}
