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
    const id = (req.user as UserSelect).provider_id;
    const user = await authRepository.showByProviderId(id);

    mockApiSuccess(res, {
        message: "ok",
        statusCode: status.OK,
        data: user,
    });
}

export async function transaction(req: Request, res: Response) {
    const id = (req.user as UserSelect).id;
    const result = await authRepository.transaction(id);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: result,
    });
}

export async function ticket(req: Request, res: Response) {
    const id = (req.user as UserSelect).id;
    const result = await authRepository.ticket(id);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: result,
    });
}

export async function conversation(req: Request, res: Response) {
    const { id, role } = req.user as UserSelect;
    const result = await authRepository.conversation(id, role as NonNullable<typeof role>);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: result,
    });
}

export async function message(req: Request, res: Response) {
    const user_id = (req.user as UserSelect).id;
    const conversation_id = req.params.conversation_id;
    const result = await authRepository.message(user_id, conversation_id);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: result,
    });
}
