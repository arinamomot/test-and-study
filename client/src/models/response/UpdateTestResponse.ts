import { IQuestion } from "../IQuestion";

export interface UpdateTestResponse {
  questions: IQuestion[];
  message: string;
}
