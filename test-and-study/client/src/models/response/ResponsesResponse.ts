import { IResponse } from "../IResponse";
import { IUser } from "../IUser";

export interface ResponsesResponse {
  responses: IResponse[];
  users?: IUser[];
}
