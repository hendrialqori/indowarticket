import { Response } from "express";
import { mockApiError } from "@/utils/mockResponse";

class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError);
  }

  static reponse(err: ApiError, res: Response) {
    mockApiError(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: [],
    });
  }
}

export default ApiError;
