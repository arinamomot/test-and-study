import { IUser } from "../IUser";

export interface UsersResponse {
  users: IUser[];
  message?: string;
}
