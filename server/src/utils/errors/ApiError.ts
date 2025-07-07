import { Response } from "express";
import { mockApiError } from "@/utils/mockResponse";

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
    ) {
        super(message);
    }
}

export function throwErrorResponse(err: ApiError, res: Response) {
    mockApiError(res, {
        statusCode: err.statusCode,
        message: err.message,
        errors: [],
    });
}
