import { ITest } from "../ITest";
import { ITopic } from "../ITopic";
import { IUser } from "../IUser";

export interface TestsResponse {
  tests: ITest[];
  creators: IUser[];
  topics: ITopic[];
}
