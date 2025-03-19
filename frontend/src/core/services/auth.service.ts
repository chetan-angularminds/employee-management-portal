/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject } from "rxjs";
import {
  Credentials,
  IsUserAuthenticatedResponse,
  SignInResponse,
  SignUpResponse,
} from "../interfaces/auth.interfaces";
import api from "./api.service";
import { getToast } from "./toasts.service";
import { ApiError } from "../interfaces/apiError.interface";
import { useNavigate } from "react-router-dom";

class AuthService {
  private isUserAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  get isUserAuthenticated$() {
    return this.isUserAuthenticatedSubject.asObservable();
  }
  setisUserAuthenticated(value: boolean) {
    this.isUserAuthenticatedSubject.next(value);
  }
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  get isLoading$() {
    return this.isLoadingSubject.asObservable();
  }
  setisLoading(value: boolean) {
    this.isLoadingSubject.next(value);
  }
  constructor() {
    this.isAuthenticated();
  }
  tokenSaver(data: any) {
    if (data.token) {
      localStorage.setItem("token", data.token);
      this.setisUserAuthenticated(true);
    }
    if (data.expiryTime) {
      localStorage.setItem("token-expiry", data.expiryTime);
    }
  }
  async login(credentials: Credentials): Promise<SignInResponse> {
    return api
      .post("auth/login", credentials)
      .then((response) => {
        this.tokenSaver(response.data.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        this.setisUserAuthenticated(false);
        return err.response.data;
      });
  }

  async register(userDetails: Credentials): Promise<SignUpResponse> {
    return api
      .post("auth/register", userDetails)
      .then((response: any) => {
        this.tokenSaver(response.data.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
  }
  getAccessToken() {
    const token: string | null = localStorage.getItem("token");
    return token;
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("token-expiry");
    this.setisUserAuthenticated(false);
  }
  async isAuthenticated(): Promise<boolean> {
    this.setisLoading(true);
    if (!this.getAccessToken()) {
      this.setisLoading(false);
      return false;
    }
    const result = await api
      .get("/auth/verify-user", {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then((_response: any) => {
        this.setisUserAuthenticated(true);
        console.log(_response);

        return true;
      })
      .catch((_err) => {
        getToast("error", _err?.response?.data?.message || "failed to fetch");
        this.logout();
        this.setisUserAuthenticated(false);
        return false;
      });

    setTimeout(() => {
      this.setisLoading(false);
    }, 2000);
    return result;
  }

  async isAdmin(): Promise<boolean> {
    return api
      .get("/auth/verify-admin", {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then((_response: any) => {
        return true;
      })
      .catch((_err) => {
        return false;
      });
  }

  async createOrganization(organizationDetails: any): Promise<any> {
    return api
      .post("/auth/organization", organizationDetails, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
  }

  async checkIdValidity(id: string): Promise<IsUserAuthenticatedResponse> {
    return api
      .get(`/auth/check-id/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: ApiError) => {
        console.log(err);
        if (err.response.data.redirect) {
          console.log("hello");
        }
        return err.response.data;
      });
  }
}

const authService = new AuthService();
export default authService;
