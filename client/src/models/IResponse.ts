import { IAnswer } from "./IAnswer";

export interface IResponse {
  id: string;
  user: string;
  test: string;
  questions: string[];
  time: number; //the time for which the test was completed
  creationDate: Date;
  maxPoints: number;
  userPoints: number;
  answers: IAnswer[];
  evaluation: boolean;
}
