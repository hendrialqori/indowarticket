import httpStatus from "http-status";
import { ZodError as ZodErrorInstace } from "zod";
import { mockApiError } from "@/utils/mockResponse";
import { type Response } from "express";

class ZodError extends ZodErrorInstace {
  static reponse(err: ZodError, res: Response) {
    mockApiError(res, {
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: err.message,
      errors: err.flatten().fieldErrors,
    });
  }
}

export default ZodError;
