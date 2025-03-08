/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Credentials{
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
  data:{ [key: string]: any } | null | string;
  message: string;
  success: boolean;
  redirect: null;
}