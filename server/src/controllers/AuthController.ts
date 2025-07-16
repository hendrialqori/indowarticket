import { Request, Response } from "express";
import { status } from "http-status";
import { generateToken } from "@/utils/jwt";
import { CLIENT_URL } from "@/constants/dotenv";
import { mockApiSuccess } from "@/utils/mockResponse";
import { type UserSelect } from "@/db/schemas/User";
import { AuthService } from "@/services/AuthService";
import { AuthRepository } from "@/repositories/AuthRepository";

export class AuthController {
    private repository = new AuthRepository()
    private service = new AuthService();

    private getUser = (req: Request): UserSelect => {
        return req.user as UserSelect;
    };

    callbackUrl = (req: Request, res: Response) => {
        const user = this.getUser(req);
        const token = generateToken(user);
        res.redirect(`${CLIENT_URL}/auth/callback?token=${token}`);
    };

    credential = async (req: Request, res: Response) => {
        const user = this.getUser(req);
        const result = await this.repository.showByProviderId(user.provider_id);

        mockApiSuccess(res, {
            statusCode: status.OK,
            message: "ok",
            data: result,
        });
    };

    transaction = async (req: Request, res: Response) => {
        const user = this.getUser(req);
        const result = await this.service.transaction(user.id);

        mockApiSuccess(res, {
            statusCode: status.OK,
            message: "ok",
            data: result,
        });
    };

    ticket = async (req: Request, res: Response) => {
        const user = this.getUser(req);
        const result = await this.service.ticket(user.id);

        mockApiSuccess(res, {
            statusCode: status.OK,
            message: "ok",
            data: result,
        });
    };

    conversation = async (req: Request, res: Response) => {
        const user = this.getUser(req);
        const result = await this.service.conversation(user.id, user.role!);

        mockApiSuccess(res, {
            statusCode: status.OK,
            message: "ok",
            data: result,
        });
    };

    message = async (req: Request, res: Response) => {
        const user = this.getUser(req);
        const conversationId = req.params.conversation_id;
        const result = await this.service.message(user.id, conversationId);

        mockApiSuccess(res, {
            statusCode: status.OK,
            message: "ok",
            data: result,
        });
    };
}
