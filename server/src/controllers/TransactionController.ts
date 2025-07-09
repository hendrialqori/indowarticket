import { UserSelect } from "@/db/schemas/User";
import * as transactionService from "@/services/TransactionService";
import { TransactionIndexQuery } from "@/types/Transaction";
import { mockApiSuccess } from "@/utils/mockResponse";
import { Request, Response } from "express";
import status from "http-status";

export async function index(req: Request, res: Response) {
    const query = req.query as TransactionIndexQuery;
    const transactions = await transactionService.index(query);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "ok",
        data: transactions,
    });
}

export async function create(req: Request, res: Response) {
    const userId = (req.user as UserSelect).id;
    const requestBody = { event_id: req.body.event_id, user_id: userId };
    await transactionService.create(requestBody);
    mockApiSuccess(res, {
        statusCode: status.OK,
        message: "created",
        data: requestBody,
    });
}
