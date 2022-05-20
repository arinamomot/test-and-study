import { IAnswer } from "../IAnswer";

export interface ResponseResponse {
  responseId: string;
  points?: string;
  maxPoints?: string;
  message: string;
  answers: IAnswer[];
}
