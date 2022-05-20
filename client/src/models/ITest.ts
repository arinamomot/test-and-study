import { IQuestion } from "./IQuestion";
import { IUser } from "./IUser";

export interface ITest {
  _id: string;
  title: string;
  description: string;
  testType: string;
  creator: string;
  creationDate: Date;
  questions: IQuestion[];
  topic: string;
  members: IUser[];
  time: number;
  color: string;
  evaluation: boolean;
  image?: string;
}
