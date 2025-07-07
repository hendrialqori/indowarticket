import { JWT_ACCESS_KEY } from "@/constants/dotenv";
import { AuthError } from "@/utils/errors/AuthError";
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new AuthError("authorization header needed!");

    const token = authorization?.split(" ")[1]!;
    if (!token) throw new AuthError("token needed!");

    try {
        const verify = jwt.verify(token, String(JWT_ACCESS_KEY));
        req.user = verify;
        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new AuthError(error.message);
        }
    }
}
