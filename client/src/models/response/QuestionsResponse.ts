import { IQuestion } from "../IQuestion";
import { ITopic } from "../ITopic";

export interface QuestionsResponse {
  questions: IQuestion[];
  topics?: ITopic[];
}
