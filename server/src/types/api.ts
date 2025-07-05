export type Success<T> = {
  statusCode: number;
  data: T;
  message: string;
};

export type Error<T = object> = {
  statusCode: number;
  message: string;
  errors: T;
};
