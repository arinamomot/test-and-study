import { AlertColor } from "@mui/material/Alert";
import axios from "axios";
import { makeAutoObservable } from "mobx";
import Router from "next/router";
import { API_URL } from "../http";
import { IAttachment } from "../models/IAttachment";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Clean from "../utils/clean";

export default class UserStore {
  user = {} as IUser;
  avatar = {} as IAttachment;
  isAuth = false;
  isLoading = false;
  alertBox = { show: false, type: "success" as AlertColor, message: "" };

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  getUserRoles() {
    return this.user.roles;
  }

  setAvatar(avatar: IAttachment) {
    this.avatar = avatar;
  }

  getAvatar() {
    return this.avatar;
  }

  getAvatarName() {
    return this.avatar.img;
  }

  getUser() {
    return this.user;
  }

  getIsAuth() {
    return this.isAuth;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setAlertBox(bool: boolean, type: AlertColor, message?: any) {
    this.alertBox.show = bool;
    this.alertBox.message = message;
    this.alertBox.type = type;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      localStorage.setItem("currentUser", response.data.user.id);
      localStorage.setItem("currentUserEmail", response.data.user.email);
      if (response.data.avatar) this.setAvatar(response.data.avatar);
      await Router.push("/main");
      this.setAlertBox(true, "success", "Successful login.");
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    }
  }

  async registration(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const response = await AuthService.registration(
        email,
        password,
        firstName,
        lastName
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      await Router.push("/login");
      this.setAlertBox(true, "success", "Account successfully created.");
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      await Clean.cleanLocalStorage();
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserEmail");
      this.setAuth(false);
      this.setUser({} as IUser);
      await Router.push("/");
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    }
  }

  async deleteAccount() {
    try {
      const response = await UserService.deleteAccount();
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserEmail");
      this.setAuth(false);
      this.setUser({} as IUser);
      await Router.push("/");
      this.setAlertBox(true, "success", "Account deleted");
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    }
  }

  async notAuth() {
    this.setLoading(true);
    await Router.push("/");
    this.setLoading(false);
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${API_URL}/user/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      localStorage.setItem("currentUser", response.data.user.id);
      localStorage.setItem("currentUserEmail", response.data.user.email);
      if (response.data.avatar) this.setAvatar(response.data.avatar);
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async changeAccountInfo(
    email: string,
    password: string,
    newPassword: string,
    firstName: string,
    lastName: string
  ) {
    this.setLoading(true);
    try {
      const response = await UserService.changeAccountInfo(
        email,
        password,
        newPassword,
        firstName,
        lastName
      );
      this.setUser(response.data.newUser);
      localStorage.setItem("currentUserEmail", response.data.newUser.email);
      this.setAlertBox(true, "success", response.data.message);
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async uploadAvatar(data: FormData) {
    try {
      const response = await UserService.uploadAvatar(data);
      this.setUser(response.data.newUser);
      if (response.data.avatar) {
        this.setAvatar(response.data.avatar);
      }
      this.setAlertBox(true, "success", response.data.message);
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    }
  }

  async getAllUsers() {
    try {
      const response = await UserService.getAllUsers();
      return response;
    } catch (e: any) {
      console.error(e.response?.data?.message);
    }
  }

  async getUserAvatar() {
    try {
      const response = await UserService.getUserAvatar();
      return response.data.avatar;
    } catch (e: any) {
      this.setAlertBox(true, "error", e.response?.data?.message);
    }
  }
}
