import { mockApiError } from "@/utils/mockResponse";
import httpStatus from "http-status";
import { type Response } from "express";

export class AuthError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export function throwErrorResponse(err: AuthError, res: Response) {
    return mockApiError(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: err.message,
        errors: [],
    });
}
