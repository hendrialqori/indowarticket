import { UserSelect } from "@/db/schemas/User";
import { Request, Response } from "express";
import * as messageService from "@/services/MessageService";
import { MessageInsert } from "@/db/schemas/Messages";
import { mockApiSuccess } from "@/utils/mockResponse";
import status from "http-status";

export async function send(req: Request, res: Response) {
    const userId = (req.user as UserSelect).id;
    const requestBody = req.body as MessageInsert;

    requestBody.sender_id = userId;
    await messageService.send(requestBody);

    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: requestBody,
    });
}
