import { IAttachment } from "../IAttachment";
import { IUser } from "../IUser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  avatar?: IAttachment;
}
