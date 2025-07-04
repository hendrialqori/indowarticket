import { Request, Response } from "express";
import ZodError from "@/utils/errors/ZodError";
import ApiError from "@/utils/errors/ApiError";
import AuthError from "@/utils/errors/AuthError";

export function errorMiddleware(err: Error, req: Request, res: Response) {
  switch (true) {
    case err instanceof ZodError:
      return ZodError.reponse(err, res);

    case err instanceof ApiError:
      return ApiError.reponse(err, res);

    case err instanceof AuthError:
      return AuthError.reponse(err, res);
  }
}
