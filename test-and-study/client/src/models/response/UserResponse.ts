import { IAttachment } from "../IAttachment";
import { IUser } from "../IUser";

export interface UserResponse {
  newUser: IUser;
  message?: string;
  avatar?: IAttachment;
}
