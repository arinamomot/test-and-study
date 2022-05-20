import { IAnswer } from "../IAnswer";

export interface AnswersResponse {
  message: string;
  answers: IAnswer[];
  points: number;
}
