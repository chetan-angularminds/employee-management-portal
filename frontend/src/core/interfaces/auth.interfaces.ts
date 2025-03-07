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