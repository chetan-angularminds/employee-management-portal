import { Credentials } from "../interfaces/auth.interfaces";
import api from "./api.service";

export default class AuthService {
  constructor() {}

  async login(credentials: Credentials) {
    api
      .post("auth/login", credentials)
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("token", response.data.data.token);
        }
        if (response.data.data.expiryTime) {
          localStorage.setItem("token", response.data.data.expiryTime);
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
  }

  async register(userDetails: Credentials) {
    api
      .post("auth/login", userDetails)
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("token", response.data.data.token);
        }
        if (response.data.data.expiryTime) {
          localStorage.setItem("token", response.data.data.expiryTime);
        }
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return err.response.data;
      });
  }
}
