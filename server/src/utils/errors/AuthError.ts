import { mockApiError } from "@/utils/mockResponse";
import httpStatus from "http-status";
import { type Response } from "express";

class AuthError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, AuthError);
  }

  static reponse(err: AuthError, res: Response) {
    mockApiError(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      message: err.message,
      errors: [],
    });
  }
}

export default AuthError;
