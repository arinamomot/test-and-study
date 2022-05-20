import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import $api from "../http";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/user/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/user/registration", {
      email,
      password,
      firstName,
      lastName,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/user/logout");
  }

  static async deleteAccount(): Promise<void> {
    return $api.delete("/user/deleteAccount");
  }
}
