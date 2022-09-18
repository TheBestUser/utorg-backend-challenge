export type Response<T = any> = ResponseSuccess<T> | ResponseFailure;

export interface ResponseSuccess<T> {
  success: true;
  data: T;
}

export interface ResponseFailure {
  success: false;
  error: string;
}
