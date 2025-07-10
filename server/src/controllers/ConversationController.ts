import { Request, Response } from "express";
import * as conversationService from "@/services/ConversationService";
import { mockApiSuccess } from "@/utils/mockResponse";
import status from "http-status";
import { UserSelect } from "@/db/schemas/User";
import { ConversationInsert } from "@/db/schemas/Conversation";

export async function create(req: Request, res: Response) {
    const userId = (req.user as UserSelect).id;
    const requestBody = req.body as ConversationInsert;
    requestBody.buyer_id = userId;

    const conv = await conversationService.create(requestBody);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: { conversation_id: conv.id },
    });
}

export async function remove(req: Request, res: Response) {
    const id = req.params.id;
    await conversationService.remove(id);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: [],
    });
}
