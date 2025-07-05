import { NextFunction, Request, Response } from "express";
import { generateToken } from "@/utils/jwt";
import { CLIENT_URL } from "@/constants/dotenv";
import { type UserSelect } from "@/db/schemas/User";

export function callbackUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as UserSelect;
    const token = generateToken(user);

    // redirect to client
    res.redirect(`${CLIENT_URL}/auth/callback?token=${token}`);
  } catch (error) {
    next(error);
  }
}
