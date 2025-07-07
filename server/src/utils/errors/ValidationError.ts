import httpStatus from "http-status";
import { ZodError } from "zod/v4";
import { mockApiError } from "@/utils/mockResponse";
import { type Response } from "express";

export class ValidationError extends Error {
    constructor(
        public errors: ZodError,
        public message: string,
    ) {
        super(message);
    }
}

export function throwErrorResponse(err: ValidationError, res: Response) {
    mockApiError(res, {
        statusCode: httpStatus.UNPROCESSABLE_ENTITY,
        message: err.message,
        errors: err.errors.issues,
    });
}
