import { IQuestion } from "../IQuestion";
import { ITest } from "../ITest";
import { ITestType } from "../ITestType";
import { ITopic } from "../ITopic";
import { IUser } from "../IUser";

export interface TestResponse {
  test: ITest;
  testType?: ITestType;
  creator?: IUser;
  questions: IQuestion[];
  topic: ITopic;
  members: IUser[];
}
