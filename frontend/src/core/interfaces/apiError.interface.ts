/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiError {
    code: string;
    config: Config;
    message: string;
    name: string;
    request: Env;
    response: Response;
    status: number;
    stack: string;
    [key: string]: any;
  }
  
  interface Response {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers2;
    config: Config;
    request: Env;
  }
  
  interface Headers2 {
    'content-length': string;
    'content-type': string;
  }
  
  interface Data {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    redirect?: any;
  }
  
  interface Config {
    transitional: Transitional;
    adapter: string[];
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Env;
    headers: Headers;
    baseURL: string;
    method: string;
    url: string;
    allowAbsoluteUrls: boolean;
  }
  
  interface Headers {
    Accept: string;
    Authorization: string;
  }
  
  interface Env {
    [key: string]: any;
  }
  
  interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
  }