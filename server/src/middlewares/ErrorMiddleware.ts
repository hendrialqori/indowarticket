import { NextFunction, Request, Response } from "express";
import * as Api from "@/utils/errors/ApiError";
import * as Validation from "@/utils/errors/ValidationError";
import * as Auth from "@/utils/errors/AuthError";
import * as General from "@/utils/errors/GeneralError";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof Api.ApiError) {
        Api.throwErrorResponse(err, res);
    } else if (err instanceof Auth.AuthError) {
        Auth.throwErrorResponse(err, res);
    } else if (err instanceof Validation.ValidationError) {
        Validation.throwErrorResponse(err, res);
    } else {
        General.throwErrorResponse(err, res);
    }
}
