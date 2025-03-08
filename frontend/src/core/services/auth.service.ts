/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject } from "rxjs";
import { Credentials, SignInResponse } from "../interfaces/auth.interfaces";
import api from "./api.service";
import { getToast } from "./toasts.service";


class AuthService {
  isLoading: boolean = false;
  private isUserAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  get isUserAuthenticated$() {
    return this.isUserAuthenticated.asObservable();
  }
  setisUserAuthenticated(value: boolean) {
    this.isUserAuthenticated.next(value);
  }
  constructor() {
    this.isAuthenticated();
  }

  async login(credentials: Credentials): Promise<SignInResponse> {
    return api
      .post("auth/login", credentials)
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("token", response.data.data.token);
          this.setisUserAuthenticated(true);
        }
        if (response.data.data.expiryTime) {
          localStorage.setItem("token-expiry", response.data.data.expiryTime);
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        this.setisUserAuthenticated(false);
        return err.response.data;
      });
  }

  async register(userDetails: Credentials): Promise<SignInResponse> {
    return api
      .post("auth/register", userDetails)
      .then((response: any) => {
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
    this.isLoading = true;
    if (!this.getAccessToken()) {
      this.isLoading = false;
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
        this.setisUserAuthenticated(false);
        return false;
      });
      
      
    this.isLoading = false;
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
      .post("organization/create", organizationDetails, {
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

  async checkIdValidity(id: string): Promise<boolean> {
    return api
      .get(`organization/check-id/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`,
        },
      })
      .then((response: any) => {
        return response.data.isValid;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}

const authService = new AuthService();
export default authService;
