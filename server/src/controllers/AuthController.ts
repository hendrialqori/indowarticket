import { Request, Response } from "express";
import { status } from "http-status";
import { generateToken } from "@/utils/jwt";
import { CLIENT_URL } from "@/constants/dotenv";
import { mockApiSuccess } from "@/utils/mockResponse";
import * as authRepository from "@/repositories/AuthRepository";
import { type UserSelect } from "@/db/schemas/User";

export function callbackUrl(req: Request, res: Response) {
    const user = req.user as UserSelect;
    const token = generateToken(user);

    // redirect to client
    res.redirect(`${CLIENT_URL}/auth/callback?token=${token}`);
}

export async function credential(req: Request, res: Response) {
    const providerId = (req.user as UserSelect).provider_id;
    const user = await authRepository.show(providerId);

    mockApiSuccess(res, {
        message: "ok",
        statusCode: status.OK,
        data: user,
    });
}
