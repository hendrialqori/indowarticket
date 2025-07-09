import { Response } from "express";
import type { Error, Success } from "@/types/api";

export function mockApiSuccess<T extends object>(res: Response, body: Success<T>) {
    res.status(body.statusCode).send(body);
}

export function mockApiError(res: Response, error: Error) {
    res.status(error.statusCode).send(error);
}
