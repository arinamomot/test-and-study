import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { AvatarResponse } from "../models/response/AvatarResponse";
import { UserResponse } from "../models/response/UserResponse";
import { UsersResponse } from "../models/response/UsersResponse";
import $api from "../http";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/user/users");
  }

  static uploadAvatar(data: FormData): Promise<AxiosResponse<UserResponse>> {
    return $api.post<UserResponse>("/attachment/uploadAvatar", data, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  }

  static async getAllUsers(): Promise<AxiosResponse<UsersResponse>> {
    return $api.get<UsersResponse>("/user/users");
  }

  static async getUserAvatar(): Promise<AxiosResponse<AvatarResponse>> {
    return $api.get<AvatarResponse>("/attachment/getUserAvatar");
  }

  static async deleteAccount(): Promise<void> {
    return $api.delete("/user/deleteAccount");
  }

  static async changeAccountInfo(
    email: string,
    password: string,
    newPassword: string,
    firstName: string,
    lastName: string
  ): Promise<AxiosResponse<UserResponse>> {
    return $api.put<UserResponse>("/user/updateAccount", {
      email,
      password,
      newPassword,
      firstName,
      lastName,
    });
  }
}
