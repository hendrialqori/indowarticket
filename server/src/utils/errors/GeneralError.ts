import { mockApiError } from "@/utils/mockResponse";
import httpStatus from "http-status";
import { type Response } from "express";

export class GeneralError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export function throwErrorResponse(err: GeneralError, res: Response) {
    mockApiError(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || "Internal server error",
        errors: err,
    });
}
