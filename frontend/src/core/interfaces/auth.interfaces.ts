/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Credentials {
  username?: string;
  email?: string;
  password: string;
}

export interface SignInResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
  redirect: null;
}

export interface Data {
  token: string;
  expiryTime: string;
}

export interface IsUserAuthenticatedResponse {
  statusCode: number;
  data: { [key: string]: any } | null | string;
  message: string;
  success: boolean;
  redirect: null;
}

export interface SignUpResponse {
  statusCode: number;
  data: {
    user: User;
    authTokens: {
      token: string;
      expiryTime: string;
    };
  } | null;
  message: string;
  success: boolean;
  redirect: null;
}

interface User {
  fullName: FullName;
  email: string;
  userName: string;
  contactNumber: ContactNumber;
  role: string;
  isEmailVerified?: boolean;
  status?: string;
  mfaEnabled?: boolean;
  _id?: string;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  registrationToken?: string;
}

interface ContactNumber {
  countryCode: string;
  number: string;
  _id?: string;
}

interface FullName {
  firstName: string;
  lastName: string;
  _id?: string;
}
